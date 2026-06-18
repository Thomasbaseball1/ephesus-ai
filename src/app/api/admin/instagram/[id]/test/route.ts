import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '@/lib/admin-auth';
import { db } from '@/db';
import { instagramIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authorization = await authorizeAdminRequest(req.headers);
  if (!authorization.ok) return authorization.response;

  const { id } = await params;
  const integrationId = parseInt(id);
  if (isNaN(integrationId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const [integration] = await db
    .select()
    .from(instagramIntegrations)
    .where(eq(instagramIntegrations.id, integrationId))
    .limit(1);

  if (!integration) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!integration.n8nWebhookUrl) return NextResponse.json({ error: 'No webhook URL configured' }, { status: 400 });

  // Send a test payload that mirrors what a real new-follower event looks like
  const testPayload = {
    event: 'new_follower',
    test: true,
    follower: {
      igUserId: 'test_user_123456',
      username: 'test_follower',
      name: 'Test Follower',
      profileUrl: 'https://www.instagram.com/test_follower',
    },
    account: {
      igUserId: integration.igUserId,
      username: integration.igUsername,
      name: integration.igName,
      accessToken: integration.accessToken,
    },
    timestamp: new Date().toISOString(),
  };

  const res = await fetch(integration.n8nWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testPayload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('[Instagram test webhook] n8n responded:', res.status, text);
    return NextResponse.json({ error: `n8n returned ${res.status}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
