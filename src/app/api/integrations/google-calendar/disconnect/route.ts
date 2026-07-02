import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { and, eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { googleCalendarIntegrations } from '@/db/schema';

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const integrationId = Number(body.integrationId);
  if (!integrationId) return NextResponse.json({ error: 'Missing integrationId' }, { status: 400 });

  await db
    .delete(googleCalendarIntegrations)
    .where(and(
      eq(googleCalendarIntegrations.id, integrationId),
      eq(googleCalendarIntegrations.userId, session.user.id)
    ));

  return NextResponse.json({ ok: true });
}
