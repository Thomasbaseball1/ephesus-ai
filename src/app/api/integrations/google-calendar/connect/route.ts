import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getGoogleCalendarOAuthClient, GOOGLE_CALENDAR_SCOPES } from '@/lib/google-calendar-oauth';

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.redirect(new URL('/login', req.url));

  try {
    const oauth2Client = getGoogleCalendarOAuthClient(req.nextUrl.origin);
    const redirectUri = `${req.nextUrl.origin}/api/integrations/google-calendar/callback`;
    const returnTo = req.nextUrl.searchParams.get('returnTo') || '/dashboard/integrations';
    const state = Buffer.from(
      JSON.stringify({ userId: session.user.id, redirectUri, returnTo })
    ).toString('base64url');

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent select_account',
      include_granted_scopes: true,
      scope: GOOGLE_CALENDAR_SCOPES,
      state,
    });

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('[Google Calendar connect] Server config error:', error);
    return NextResponse.redirect(new URL('/dashboard/integrations?error=google_calendar_not_configured', req.url));
  }
}
