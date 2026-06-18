import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '@/lib/admin-auth';
import { db } from '@/db';
import { outlookIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authorization = await authorizeAdminRequest(req.headers);
  if (!authorization.ok) return authorization.response;

  const { id } = await params;
  const { n8nWebhookUrl } = await req.json();

  await db
    .update(outlookIntegrations)
    .set({ n8nWebhookUrl: n8nWebhookUrl || null })
    .where(eq(outlookIntegrations.id, Number(id)));

  return NextResponse.json({ success: true });
}
