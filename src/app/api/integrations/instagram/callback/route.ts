import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { instagramIntegrations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorReason = searchParams.get('error_reason');

  const dashboardUrl = new URL('/dashboard/integrations', req.url);

  if (error) {
    console.error('[Instagram callback] OAuth error:', error, errorReason);
    dashboardUrl.searchParams.set('error', 'instagram_auth_failed');
    return NextResponse.redirect(dashboardUrl);
  }

  if (!code || !state) {
    dashboardUrl.searchParams.set('error', 'instagram_missing_params');
    return NextResponse.redirect(dashboardUrl);
  }

  // Decode state
  let userId: string;
  let redirectUri: string;
  try {
    const decoded = JSON.parse(Buffer.from(state, 'base64url').toString());
    userId = decoded.userId;
    redirectUri = decoded.redirectUri;
    if (!userId || !redirectUri) throw new Error('Missing fields in state');
  } catch (e) {
    console.error('[Instagram callback] Invalid state:', e);
    dashboardUrl.searchParams.set('error', 'instagram_invalid_state');
    return NextResponse.redirect(dashboardUrl);
  }

  const clientId = process.env.INSTAGRAM_CLIENT_ID;
  const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('[Instagram callback] Missing env vars');
    dashboardUrl.searchParams.set('error', 'instagram_not_configured');
    return NextResponse.redirect(dashboardUrl);
  }

  // Step 1: Exchange code for short-lived token via Instagram API
  const tokenRes = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code,
    }),
  });

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    console.error('[Instagram callback] Token exchange failed:', err);
    dashboardUrl.searchParams.set('error', 'instagram_token_failed');
    return NextResponse.redirect(dashboardUrl);
  }

  const tokenData = await tokenRes.json();
  console.log('[Instagram callback] Token response:', JSON.stringify(tokenData));

  // Instagram Login returns { data: [{ access_token, user_id }] } or { access_token, user_id }
  const tokenEntry = Array.isArray(tokenData.data) ? tokenData.data[0] : tokenData;
  const shortToken: string = tokenEntry?.access_token;
  const igUserIdFromToken: string = String(tokenEntry?.user_id || '');

  if (!shortToken) {
    console.error('[Instagram callback] No access_token in response:', tokenData);
    dashboardUrl.searchParams.set('error', 'instagram_token_failed');
    return NextResponse.redirect(dashboardUrl);
  }

  // Step 2: Exchange for a long-lived token (60-day expiry)
  const longRes = await fetch(
    `https://graph.instagram.com/access_token?` +
    new URLSearchParams({
      grant_type: 'ig_exchange_token',
      client_secret: clientSecret,
      access_token: shortToken,
    })
  );

  let longToken = shortToken;
  let tokenExpiresAt: string | null = null;

  if (longRes.ok) {
    const longData = await longRes.json();
    console.log('[Instagram callback] Long-lived token response:', JSON.stringify(longData));
    longToken = longData.access_token || shortToken;
    if (longData.expires_in) {
      tokenExpiresAt = new Date(Date.now() + longData.expires_in * 1000).toISOString();
    }
  } else {
    console.warn('[Instagram callback] Long-lived token exchange failed:', await longRes.text());
  }

  // Step 3: Fetch Instagram account info
  const igId = igUserIdFromToken;
  const meRes = await fetch(
    `https://graph.instagram.com/v21.0/me?fields=id,username,name,profile_picture_url&access_token=${longToken}`
  );

  let igUserId = igId;
  let igUsername = '';
  let igName = '';
  let profilePicUrl: string | null = null;

  if (meRes.ok) {
    const meData = await meRes.json();
    console.log('[Instagram callback] /me response:', JSON.stringify(meData));
    igUserId = meData.id || igId;
    igUsername = meData.username || '';
    igName = meData.name || '';
    profilePicUrl = meData.profile_picture_url || null;
  } else {
    console.error('[Instagram callback] /me failed:', await meRes.text());
  }

  if (!igUserId) {
    console.error('[Instagram callback] Could not determine Instagram user ID');
    dashboardUrl.searchParams.set('error', 'instagram_no_business_account');
    return NextResponse.redirect(dashboardUrl);
  }

  // Upsert into DB
  const payload = {
    igUserId,
    igUsername,
    igName,
    accessToken: longToken,
    tokenExpiresAt,
    profilePicUrl,
    connectedAt: new Date().toISOString(),
  };

  const existing = await db
    .select()
    .from(instagramIntegrations)
    .where(and(
      eq(instagramIntegrations.userId, userId),
      eq(instagramIntegrations.igUserId, igUserId)
    ))
    .limit(1);

  if (existing.length > 0) {
    await db.update(instagramIntegrations).set(payload).where(eq(instagramIntegrations.id, existing[0].id));
  } else {
    const anyExisting = await db
      .select()
      .from(instagramIntegrations)
      .where(eq(instagramIntegrations.userId, userId))
      .limit(1);

    if (anyExisting.length > 0) {
      await db.update(instagramIntegrations).set(payload).where(eq(instagramIntegrations.id, anyExisting[0].id));
    } else {
      await db.insert(instagramIntegrations).values({ userId, ...payload });
    }
  }

  dashboardUrl.searchParams.set('connected', 'instagram');
  return NextResponse.redirect(dashboardUrl);
}
