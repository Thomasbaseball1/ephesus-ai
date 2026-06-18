import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { outlookIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

const ADMIN_EMAIL = 'tmore.haller@yahoo.com';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;
  const { n8nWebhookUrl } = await req.json();

  await db
    .update(outlookIntegrations)
    .set({ n8nWebhookUrl: n8nWebhookUrl || null })
    .where(eq(outlookIntegrations.id, Number(id)));

  return NextResponse.json({ success: true });
}
