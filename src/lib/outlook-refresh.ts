import { db } from '@/db';
import { outlookIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

/** Refresh the access token for a given integration row if it's expired or expiring soon.
 *  Returns true if the token is valid (either was fresh or was refreshed successfully).
 *  Returns false if the refresh token itself is invalid/revoked — user must reconnect. */
export async function ensureFreshToken(integrationId: string): Promise<boolean> {
  const [row] = await db
    .select()
    .from(outlookIntegrations)
    .where(eq(outlookIntegrations.id, integrationId))
    .limit(1);

  if (!row) return false;

  // If the token is still valid for at least 5 minutes, nothing to do
  const nowSec = Math.floor(Date.now() / 1000);
  if (row.expiresAt > nowSec + 300) return true;

  // Attempt refresh
  const clientId = process.env.MICROSOFT_CLIENT_ID!;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET!;
  const tenant = process.env.MICROSOFT_TENANT_ID || 'common';

  if (!clientId || !clientSecret || !row.refreshToken) return false;

  try {
    const res = await fetch(
      `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: row.refreshToken,
          grant_type: 'refresh_token',
          scope: 'openid email profile Mail.Read Mail.Send Mail.ReadWrite offline_access',
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('[outlook-refresh] Token refresh failed:', err);
      return false;
    }

    const tokens = await res.json();
    const { access_token, refresh_token, expires_in } = tokens;

    if (!access_token) return false;

    await db
      .update(outlookIntegrations)
      .set({
        accessToken: access_token,
        ...(refresh_token ? { refreshToken: refresh_token } : {}),
        expiresAt: nowSec + (expires_in ?? 3600),
      })
      .where(eq(outlookIntegrations.id, integrationId));

    return true;
  } catch (e) {
    console.error('[outlook-refresh] Unexpected error:', e);
    return false;
  }
}
