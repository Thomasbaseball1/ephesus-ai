import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { name, companyName, phone } = body;

  await db.update(user).set({
    name: name?.trim() || session.user.name,
    companyName: companyName?.trim() || null,
    phone: phone?.trim() || null,
    updatedAt: new Date(),
  }).where(eq(user.id, session.user.id));

  return NextResponse.json({ success: true });
}
