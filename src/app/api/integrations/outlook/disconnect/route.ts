import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { outlookIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await db
    .delete(outlookIntegrations)
    .where(eq(outlookIntegrations.userId, session.user.id));

  return NextResponse.json({ success: true });
}
