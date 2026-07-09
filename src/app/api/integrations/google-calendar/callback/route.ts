import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { googleCalendarIntegrations } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { getGoogleCalendarOAuthClient } from '@/lib/google-calendar-oauth';

interface GoogleProfile {
  id: string;
  email: string;
  name?: string;
}

function safeDashboardReturnTo(value?: string) {
  if (!value || !value.startsWith('/dashboard')) return '/dashboard/integrations';
  if (value.startsWith('//')) return '/dashboard/integrations';
  return value;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  const fallbackUrl = new URL('/dashboard/integrations', req.url);

  if (error) {
    console.error('[Google Calendar callback] OAuth error:', error, errorDescription);
    fallbackUrl.searchParams.set('error', 'google_calendar_auth_failed');
    return NextResponse.redirect(fallbackUrl);
  }

  if (!code || !state) {
    fallbackUrl.searchParams.set('error', 'missing_params');
    return NextResponse.redirect(fallbackUrl);
  }

  let decodedState: { userId: string; redirectUri: string; returnTo: string };
  try {
    decodedState = JSON.parse(Buffer.from(state, 'base64url').toString());
    if (!decodedState.userId || !decodedState.redirectUri) throw new Error('Missing state fields');
  } catch (stateError) {
    console.error('[Google Calendar callback] Invalid state:', stateError);
    fallbackUrl.searchParams.set('error', 'invalid_state');
    return NextResponse.redirect(fallbackUrl);
  }

  const redirectTarget = new URL(safeDashboardReturnTo(decodedState.returnTo), req.url);

  try {
    const oauth2Client = getGoogleCalendarOAuthClient(req.nextUrl.origin);
    const { tokens } = await oauth2Client.getToken({
      code,
      redirect_uri: decodedState.redirectUri,
    });

    if (!tokens.access_token) {
      redirectTarget.searchParams.set('error', 'google_calendar_token_failed');
      return NextResponse.redirect(redirectTarget);
    }

    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    if (!profileRes.ok) {
      redirectTarget.searchParams.set('error', 'google_calendar_profile_failed');
      return NextResponse.redirect(redirectTarget);
    }

    const profile = (await profileRes.json()) as GoogleProfile;
    const expiresAt = tokens.expiry_date
      ? Math.floor(tokens.expiry_date / 1000)
      : Math.floor(Date.now() / 1000) + 3600;

    const existing = await db
      .select()
      .from(googleCalendarIntegrations)
      .where(and(
        eq(googleCalendarIntegrations.userId, decodedState.userId),
        eq(googleCalendarIntegrations.googleUserId, profile.id)
      ))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(googleCalendarIntegrations)
        .set({
          email: profile.email,
          displayName: profile.name || '',
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token || existing[0].refreshToken,
          expiresAt,
          scopes: tokens.scope || '',
          connectedAt: new Date().toISOString(),
        })
        .where(eq(googleCalendarIntegrations.id, existing[0].id));
    } else {
      if (!tokens.refresh_token) {
        redirectTarget.searchParams.set('error', 'google_calendar_refresh_missing');
        return NextResponse.redirect(redirectTarget);
      }

      await db.insert(googleCalendarIntegrations).values({
        userId: decodedState.userId,
        googleUserId: profile.id,
        email: profile.email,
        displayName: profile.name || '',
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt,
        scopes: tokens.scope || '',
        connectedAt: new Date().toISOString(),
      });
    }

    redirectTarget.searchParams.set('connected', 'google-calendar');
    return NextResponse.redirect(redirectTarget);
  } catch (callbackError) {
    console.error('[Google Calendar callback] Failed:', callbackError);
    redirectTarget.searchParams.set('error', 'google_calendar_token_failed');
    return NextResponse.redirect(redirectTarget);
  }
}
