import { google } from 'googleapis';
import { db } from '@/db';
import { googleCalendarIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const GOOGLE_CALENDAR_SCOPES = [
  'openid',
  'email',
  'profile',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.calendarlist.readonly',
  'https://www.googleapis.com/auth/gmail.readonly',
];

export function getGoogleCalendarOAuthClient(origin: string) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET');
  }

  return new google.auth.OAuth2({
    clientId,
    clientSecret,
    redirectUri: `${origin}/api/integrations/google-calendar/callback`,
  });
}

export async function ensureFreshGoogleCalendarToken(integrationId: number) {
  const [integration] = await db
    .select()
    .from(googleCalendarIntegrations)
    .where(eq(googleCalendarIntegrations.id, integrationId))
    .limit(1);

  if (!integration) return null;

  const nowSec = Math.floor(Date.now() / 1000);
  if (integration.expiresAt > nowSec + 300) return integration;

  try {
    const oauth2Client = getGoogleCalendarOAuthClient(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    oauth2Client.setCredentials({
      access_token: integration.accessToken,
      refresh_token: integration.refreshToken,
      expiry_date: integration.expiresAt * 1000,
    });

    const { credentials } = await oauth2Client.refreshAccessToken();
    const accessToken = credentials.access_token;
    const expiresAt = credentials.expiry_date
      ? Math.floor(credentials.expiry_date / 1000)
      : nowSec + 3600;

    if (!accessToken) return null;

    await db
      .update(googleCalendarIntegrations)
      .set({
        accessToken,
        refreshToken: credentials.refresh_token || integration.refreshToken,
        expiresAt,
      })
      .where(eq(googleCalendarIntegrations.id, integration.id));

    return {
      ...integration,
      accessToken,
      refreshToken: credentials.refresh_token || integration.refreshToken,
      expiresAt,
    };
  } catch (error) {
    console.error('[google-calendar] Token refresh failed:', error);
    return null;
  }
}

export function getAuthenticatedCalendarClient(integration: {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}) {
  const oauth2Client = getGoogleCalendarOAuthClient(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
  oauth2Client.setCredentials({
    access_token: integration.accessToken,
    refresh_token: integration.refreshToken,
    expiry_date: integration.expiresAt * 1000,
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
}
