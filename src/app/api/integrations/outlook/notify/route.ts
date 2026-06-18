import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { outlookIntegrations, user as userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Microsoft sends a validation challenge when you first create a subscription
// Must respond with the validationToken as plain text
export async function GET(req: NextRequest) {
  const validationToken = req.nextUrl.searchParams.get('validationToken');
  if (validationToken) {
    return new NextResponse(validationToken, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
  return new NextResponse('OK', { status: 200 });
}

export async function POST(req: NextRequest) {
  // Microsoft also sends validationToken via query param on POST during setup
  const validationToken = req.nextUrl.searchParams.get('validationToken');
  if (validationToken) {
    return new NextResponse(validationToken, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  let body: { value?: Array<{ subscriptionId: string; clientState: string; resourceData?: { id: string } }> };
  try {
    body = await req.json();
  } catch {
    return new NextResponse('Bad request', { status: 400 });
  }

  const notifications = body.value || [];

  for (const notification of notifications) {
    const { subscriptionId, clientState } = notification;

    // Verify clientState starts with our prefix
    if (!clientState?.startsWith('ephesus-')) {
      console.warn('[Notify] Unknown clientState:', clientState);
      continue;
    }

    try {
      // Look up the integration by subscriptionId
      const [integration] = await db
        .select({
          id: outlookIntegrations.id,
          userId: outlookIntegrations.userId,
          accessToken: outlookIntegrations.accessToken,
          refreshToken: outlookIntegrations.refreshToken,
          expiresAt: outlookIntegrations.expiresAt,
          n8nWebhookUrl: outlookIntegrations.n8nWebhookUrl,
          outlookEmail: outlookIntegrations.email,
          userName: userTable.name,
          companyName: userTable.companyName,
        })
        .from(outlookIntegrations)
        .leftJoin(userTable, eq(outlookIntegrations.userId, userTable.id))
        .where(eq(outlookIntegrations.graphSubscriptionId, subscriptionId))
        .limit(1);

      if (!integration) {
        console.warn('[Notify] No integration found for subscriptionId:', subscriptionId);
        continue;
      }

      if (!integration.n8nWebhookUrl) {
        console.log('[Notify] No N8N webhook configured for user:', integration.userId);
        continue;
      }

      // Get a valid access token
      let accessToken = integration.accessToken;
      if (integration.expiresAt < Math.floor(Date.now() / 1000)) {
        const refreshed = await refreshToken(integration.refreshToken);
        if (!refreshed) {
          console.error('[Notify] Token refresh failed for user:', integration.userId);
          continue;
        }
        accessToken = refreshed;
        await db
          .update(outlookIntegrations)
          .set({ accessToken, expiresAt: Math.floor(Date.now() / 1000) + 3600 })
          .where(eq(outlookIntegrations.id, integration.id));
      }

      // Fetch the actual email from Graph API
      const messageId = notification.resourceData?.id;
      let emailData: Record<string, unknown> = { id: messageId };

      if (messageId) {
        const msgRes = await fetch(
          `https://graph.microsoft.com/v1.0/me/messages/${messageId}?$select=id,subject,from,receivedDateTime,bodyPreview,body,isRead,toRecipients,ccRecipients`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (msgRes.ok) {
          emailData = await msgRes.json();
        }
      }

      // Forward to N8N
      const payload = {
        type: 'new_email',
        timestamp: new Date().toISOString(),
        client: {
          userId: integration.userId,
          name: integration.userName,
          company: integration.companyName,
          outlookEmail: integration.outlookEmail,
        },
        email: {
          id: emailData.id,
          subject: emailData.subject,
          from: emailData.from,
          receivedAt: emailData.receivedDateTime,
          bodyPreview: emailData.bodyPreview,
          body: (emailData.body as { content?: string })?.content,
          isRead: emailData.isRead,
          to: emailData.toRecipients,
          cc: emailData.ccRecipients,
        },
      };

      const n8nRes = await fetch(integration.n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!n8nRes.ok) {
        console.error('[Notify] N8N webhook failed:', n8nRes.status, await n8nRes.text());
      } else {
        console.log('[Notify] Email forwarded to N8N for user:', integration.userId);
      }
    } catch (err) {
      console.error('[Notify] Error processing notification:', err);
    }
  }

  // Always return 202 to Microsoft so it doesn't retry
  return new NextResponse(null, { status: 202 });
}

async function refreshToken(refreshTokenValue: string): Promise<string | null> {
  const res = await fetch(
    `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID || 'common'}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.MICROSOFT_CLIENT_ID!,
        client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
        refresh_token: refreshTokenValue,
        grant_type: 'refresh_token',
        scope: 'https://graph.microsoft.com/Mail.Read https://graph.microsoft.com/Mail.Send https://graph.microsoft.com/Mail.ReadWrite offline_access',
      }),
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token || null;
}
