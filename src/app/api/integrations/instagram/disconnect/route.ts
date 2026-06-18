import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { instagramIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await db
    .delete(instagramIntegrations)
    .where(eq(instagramIntegrations.userId, session.user.id));

  return NextResponse.redirect(new URL('/dashboard/integrations?disconnected=instagram', req.url));
}
