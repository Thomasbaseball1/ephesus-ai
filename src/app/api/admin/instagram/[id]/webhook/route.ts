import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '@/lib/admin-auth';
import { db } from '@/db';
import { instagramIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authorization = await authorizeAdminRequest(req.headers);
  if (!authorization.ok) return authorization.response;
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
