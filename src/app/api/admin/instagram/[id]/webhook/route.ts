import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { instagramIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // TODO: add admin role check when roles are implemented
  const { id } = await params;
  const integrationId = parseInt(id);
  if (isNaN(integrationId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const body = await req.json();
  const n8nWebhookUrl = typeof body.n8nWebhookUrl === 'string' ? body.n8nWebhookUrl.trim() : '';

  await db
    .update(instagramIntegrations)
    .set({ n8nWebhookUrl: n8nWebhookUrl || null })
    .where(eq(instagramIntegrations.id, integrationId));

  return NextResponse.json({ ok: true });
}
