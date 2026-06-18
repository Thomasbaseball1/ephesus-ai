import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { voiceAgentAssignments, callRecords } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { syncCallsForUser } from '@/lib/sync-voice-calls';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = session.user.id;

  const [assignment] = await db
    .select()
    .from(voiceAgentAssignments)
    .where(and(
      eq(voiceAgentAssignments.userId, userId),
      eq(voiceAgentAssignments.isActive, true)
    ))
    .limit(1);

  if (!assignment) {
    return NextResponse.json({ assignment: null, calls: [] });
  }

  const { error } = await syncCallsForUser(userId);
  if (error) console.error('[voice-agent/calls GET] sync error:', error);

  const stored = await db
    .select()
    .from(callRecords)
    .where(eq(callRecords.userId, userId))
    .orderBy(desc(callRecords.createdAt));

  return NextResponse.json({ assignment, calls: stored, syncError: error || null });
}
