import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { instagramIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Meta sends a GET request to verify the webhook endpoint during setup.
// It passes hub.verify_token (must match INSTAGRAM_WEBHOOK_VERIFY_TOKEN env var)
// and hub.challenge (which we echo back to confirm ownership).
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const mode      = searchParams.get('hub.mode');
  const token     = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN;
  if (mode === 'subscribe' && token === verifyToken && challenge) {
    console.log('[Instagram webhook] Verified by Meta');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// Meta sends POST requests for each subscribed event.
// We listen for `follow` changes on the `instagram` object.
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  console.log('[Instagram webhook] Received:', JSON.stringify(body));

  // Instagram webhook payload structure:
  // { object: 'instagram', entry: [{ id: <ig_user_id>, changes: [{ field: 'follows', value: { ... } }] }] }
  if (body.object !== 'instagram') {
    return NextResponse.json({ ok: true }); // ignore non-instagram events
  }

  const entries = (body.entry as Array<{
    id: string;
    changes?: Array<{ field: string; value: Record<string, unknown> }>;
  }>) || [];

  for (const entry of entries) {
    const igUserId = entry.id;
    const changes = entry.changes || [];

    for (const change of changes) {
      if (change.field !== 'follows') continue;

      // Look up which client owns this IG account
      const [integration] = await db
        .select()
        .from(instagramIntegrations)
        .where(eq(instagramIntegrations.igUserId, igUserId))
        .limit(1);

      if (!integration) {
        console.warn('[Instagram webhook] No integration found for igUserId:', igUserId);
        continue;
      }

      if (!integration.n8nWebhookUrl) {
        console.warn('[Instagram webhook] No n8n webhook URL for integration:', integration.id);
        continue;
      }

      // Forward to n8n with follower data + account access token
      const payload = {
        event: 'new_follower',
        follower: change.value, // contains follower's IG user ID from Meta
        account: {
          igUserId: integration.igUserId,
          username: integration.igUsername,
          name: integration.igName,
          accessToken: integration.accessToken,
        },
        timestamp: new Date().toISOString(),
      };

      fetch(integration.n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(err => console.error('[Instagram webhook] Failed to call n8n:', err));
    }
  }

  // Meta expects a 200 quickly — fire-and-forget the n8n calls above
  return NextResponse.json({ ok: true });
}
