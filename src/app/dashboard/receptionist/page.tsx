import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { voiceAgentAssignments, callRecords } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { ReceptionistClient } from '@/components/ReceptionistClient';
import { Phone } from 'lucide-react';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';

export default async function ReceptionistPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const userId = session.user.id;

  const [assignment] = await db
    .select()
    .from(voiceAgentAssignments)
    .where(and(
      eq(voiceAgentAssignments.userId, userId),
      eq(voiceAgentAssignments.isActive, true)
    ))
    .limit(1);

  // Read what's already in the DB — sync happens client-side on mount
  const calls = assignment
    ? await db
        .select()
        .from(callRecords)
        .where(eq(callRecords.userId, userId))
        .orderBy(desc(callRecords.createdAt))
        .limit(500)
    : [];

  return (
    <div className="dashboard-route space-y-6">
      <DashboardPageHeader
        eyebrow="Live communications"
        title="AI Receptionist"
        description="Call activity, conversation intelligence, and performance signals for your AI-powered phone system."
        icon={Phone}
        status={assignment ? 'Live' : 'Awaiting setup'}
      />

      <ReceptionistClient
        assignment={assignment ?? null}
        initialCalls={calls}
      />
    </div>
  );
}
