import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { outlookIntegrations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  const dashboardUrl = new URL('/dashboard/integrations', req.url);

  if (error) {
    console.error('[Outlook callback] Microsoft OAuth error:', error, errorDescription);
    dashboardUrl.searchParams.set('error', 'microsoft_auth_failed');
    return NextResponse.redirect(dashboardUrl);
  }

  if (!code || !state) {
    console.error('[Outlook callback] Missing code or state');
    dashboardUrl.searchParams.set('error', 'missing_params');
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
    console.error('[Outlook callback] Invalid state:', e);
    dashboardUrl.searchParams.set('error', 'invalid_state');
    return NextResponse.redirect(dashboardUrl);
  }

  const clientId = process.env.MICROSOFT_CLIENT_ID!;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET!;
  const tenant = process.env.MICROSOFT_TENANT_ID || 'common';

  if (!clientId || !clientSecret) {
    console.error('[Outlook callback] Missing MICROSOFT_CLIENT_ID or MICROSOFT_CLIENT_SECRET env vars');
    dashboardUrl.searchParams.set('error', 'server_config');
    return NextResponse.redirect(dashboardUrl);
  }

  // Exchange code for tokens
  console.log('[Outlook callback] Exchanging code for tokens, redirectUri:', redirectUri);
  const tokenRes = await fetch(
    `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    }
  );

  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    console.error('[Outlook callback] Token exchange failed:', err);
    dashboardUrl.searchParams.set('error', 'token_exchange_failed');
    return NextResponse.redirect(dashboardUrl);
  }

  const tokens = await tokenRes.json();
  const { access_token, refresh_token, expires_in } = tokens;

  if (!access_token || !refresh_token) {
    console.error('[Outlook callback] Missing tokens in response:', Object.keys(tokens));
    dashboardUrl.searchParams.set('error', 'token_exchange_failed');
    return NextResponse.redirect(dashboardUrl);
  }

  const expiresAt = Math.floor(Date.now() / 1000) + expires_in;

  // Decode the ID token (JWT) to get profile info — no extra API call needed
  const idToken: string = tokens.id_token;
  if (!idToken) {
    console.error('[Outlook callback] No id_token in response');
    dashboardUrl.searchParams.set('error', 'token_exchange_failed');
    return NextResponse.redirect(dashboardUrl);
  }

  let microsoftUserId: string;
  let email: string;
  let displayName: string;
  try {
    const payload = JSON.parse(
      Buffer.from(idToken.split('.')[1], 'base64url').toString()
    );
    microsoftUserId = payload.oid || payload.sub;
    email = payload.email || payload.preferred_username || payload.upn || '';
    displayName = payload.name || '';
    console.log('[Outlook callback] ID token decoded:', { microsoftUserId, email, displayName });
  } catch (e) {
    console.error('[Outlook callback] Failed to decode id_token:', e);
    dashboardUrl.searchParams.set('error', 'profile_fetch_failed');
    return NextResponse.redirect(dashboardUrl);
  }

  console.log('[Outlook callback] Connected:', email, displayName);

  // Upsert
  const existing = await db
    .select()
    .from(outlookIntegrations)
    .where(and(
      eq(outlookIntegrations.userId, userId),
      eq(outlookIntegrations.microsoftUserId, microsoftUserId)
    ))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(outlookIntegrations)
      .set({
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt,
        displayName,
        connectedAt: new Date().toISOString(),
        scopes: 'Mail.Read,Mail.Send,Mail.ReadWrite,Calendars.ReadWrite',
      })
      .where(eq(outlookIntegrations.id, existing[0].id));
  } else {
    await db.insert(outlookIntegrations).values({
      userId,
      microsoftUserId,
      email,
      displayName,
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt,
      scopes: 'Mail.Read,Mail.Send,Mail.ReadWrite,Calendars.ReadWrite',
      connectedAt: new Date().toISOString(),
    });
  }

  dashboardUrl.searchParams.set('connected', 'outlook');
  return NextResponse.redirect(dashboardUrl);
}
