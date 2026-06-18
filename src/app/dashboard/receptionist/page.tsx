import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { voiceAgentAssignments, callRecords } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { ReceptionistClient } from '@/components/ReceptionistClient';
import { Phone, Activity } from 'lucide-react';

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
    <div className="space-y-8">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl p-6 md:p-7"
        style={{
          background: 'linear-gradient(135deg, rgba(13,148,136,0.12) 0%, rgba(45,212,191,0.05) 50%, rgba(6,13,24,0.8) 100%)',
          border: '1px solid rgba(13,148,136,0.2)',
          boxShadow: '0 0 40px rgba(13,148,136,0.07)',
        }}>
        <div className="absolute top-0 right-0 w-64 h-48 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(45,212,191,0.1) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        <div className="relative flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0D9488, #2DD4BF)', boxShadow: '0 0 20px rgba(13,148,136,0.4)' }}>
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-2xl md:text-3xl font-bold text-white">AI Receptionist</h1>
              {assignment && (
                <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: '#10b981' }}>
                  <Activity className="w-2.5 h-2.5" />
                  Active
                </span>
              )}
            </div>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Live call activity, AI intelligence, and performance metrics for your AI-powered phone system.
            </p>
          </div>
        </div>
      </div>

      <ReceptionistClient
        assignment={assignment ?? null}
        initialCalls={calls}
      />
    </div>
  );
}
