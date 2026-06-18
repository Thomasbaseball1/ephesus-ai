import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { outlookIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

const ADMIN_EMAIL = 'tmore.haller@yahoo.com';

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  const res = await fetch(
    `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID || 'common'}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.MICROSOFT_CLIENT_ID!,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: 'https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/Mail.Send https://graph.microsoft.com/Mail.ReadWrite offline_access',
      }),
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token || null;
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const integrationId = Number(id);

  const [integration] = await db
    .select()
    .from(outlookIntegrations)
    .where(eq(outlookIntegrations.id, integrationId))
    .limit(1);

  if (!integration) {
    return NextResponse.json({ error: 'Integration not found' }, { status: 404 });
  }

  // Get a fresh access token
  let accessToken = integration.accessToken;
  const isExpired = integration.expiresAt < Math.floor(Date.now() / 1000);
  if (isExpired) {
    const refreshed = await refreshAccessToken(integration.refreshToken);
    if (!refreshed) {
      return NextResponse.json({ error: 'Access token expired and refresh failed. Client must reconnect Outlook.' }, { status: 400 });
    }
    accessToken = refreshed;
  }

  // Notification URL — must be publicly accessible HTTPS
  const baseUrl = process.env.BETTER_AUTH_URL || 'https://ephesusai.com';
  const notificationUrl = `${baseUrl}/api/integrations/outlook/notify`;

  // Expiry: max 3 days for mail subscriptions
  const expiry = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

  // Cancel existing subscription if any
  if (integration.graphSubscriptionId) {
    await fetch(`https://graph.microsoft.com/v1.0/subscriptions/${integration.graphSubscriptionId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    }).catch(() => {}); // ignore errors — subscription may already be expired
  }

  // Create new Graph subscription
  const subRes = await fetch('https://graph.microsoft.com/v1.0/subscriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      changeType: 'created',
      notificationUrl,
      resource: "/me/mailFolders('Inbox')/messages",
      expirationDateTime: expiry,
      clientState: `ephesus-${integration.userId}`,
    }),
  });

  if (!subRes.ok) {
    const err = await subRes.text();
    console.error('[Subscribe] Graph subscription failed:', err);
    return NextResponse.json({ error: `Graph subscription failed: ${err}` }, { status: 500 });
  }

  const sub = await subRes.json();

  await db
    .update(outlookIntegrations)
    .set({
      graphSubscriptionId: sub.id,
      graphSubscriptionExpiry: sub.expirationDateTime,
      ...(isExpired ? { accessToken, expiresAt: Math.floor(Date.now() / 1000) + 3600 } : {}),
    })
    .where(eq(outlookIntegrations.id, integrationId));

  return NextResponse.json({ success: true, subscriptionId: sub.id, expiresAt: sub.expirationDateTime });
}
