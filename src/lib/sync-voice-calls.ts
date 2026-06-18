import { db } from '@/db';
import { voiceAgentAssignments, callRecords, user, intakeSubmissions } from '@/db/schema';
import { eq, and, isNull, desc } from 'drizzle-orm';
import { listCallsForAssistant, VapiCall } from '@/lib/vapi';
import { analyzeCallTranscript } from '@/lib/analyze-call';

function mapCallToRecord(call: VapiCall, userId: string, assignmentId: number) {
  const customer = call.customer;
  const artifact = call.artifact;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw = call as any;

  // Calculate duration from timestamps if Vapi doesn't return durationSeconds directly
  let durationSeconds = call.durationSeconds ?? null;
  if (!durationSeconds && call.startedAt && call.endedAt) {
    const diff = Math.round(
      (new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime()) / 1000
    );
    if (diff > 0) durationSeconds = diff;
  }

  // Extract called number — Vapi doesn't always return phoneNumber.number directly.
  // For SIP calls, it's buried in phoneCallProviderDetails.sip.headers.to as "<sip:+1XXXXXXXXXX@...>"
  const sipToHeader: string | undefined = raw.phoneCallProviderDetails?.sip?.headers?.to;
  const sipToMatch = sipToHeader?.match(/sip:(\+?[\d]+)@/);
  const calledNumber =
    call.variableValues?.phoneNumber?.number ||
    call.phoneNumber?.number ||
    raw.phoneNumber?.twilioPhoneNumber ||
    raw.phoneNumber?.vonagePhoneNumber ||
    (sipToMatch ? sipToMatch[1] : null) ||
    raw.to ||
    null;

  return {
    id: call.id,
    userId,
    assistantId: call.assistantId || '',
    assignmentId,
    createdAt: call.createdAt || null,
    updatedAt: call.updatedAt || null,
    startedAt: call.startedAt || null,
    endedAt: call.endedAt || null,
    queuedAt: call.queuedAt || null,
    durationSeconds,
    durationMinutes: durationSeconds != null ? String((durationSeconds / 60).toFixed(2)) : null,
    status: call.status || null,
    endedReason: call.endedReason || null,
    type: call.type || null,
    callerPhoneNumber: customer?.number || raw.from || null,
    calledNumber,
    transcript: call.transcript || artifact?.transcript || null,
    summary: call.summary || null,
    structuredData: call.structuredData ? JSON.stringify(call.structuredData) : null,
    successEvaluation: call.successEvaluation || null,
    successEvaluationReason: call.successEvaluationReason || null,
    recordingUrl: call.recordingUrl || artifact?.recording?.mono?.url || null,
    stereoRecordingUrl: call.stereoRecordingUrl || artifact?.recording?.stereo?.url || null,
    videoRecordingUrl: call.videoRecordingUrl || artifact?.video?.url || null,
    artifactMessages: artifact?.messages ? JSON.stringify(artifact.messages) : null,
    costBreakdown: call.costBreakdown ? JSON.stringify(call.costBreakdown) : null,
    totalCost: call.cost != null ? String(call.cost) : null,
    messages: call.messages ? JSON.stringify(call.messages) : null,
    toolCalls: call.toolCalls ? JSON.stringify(call.toolCalls) : null,
    analysis: call.analysis ? JSON.stringify(call.analysis) : null,
    metadata: call.metadata ? JSON.stringify(call.metadata) : null,
    forwardedPhoneNumber: call.forwardedPhoneNumber || null,
    transferDestination: call.destination?.number || null,
    rawPayload: JSON.stringify(call),
  };
}

/** Syncs all calls for a user's active assignments from Vapi into the DB.
 *  Returns the number of records upserted. */
export async function syncCallsForUser(userId: string): Promise<{ synced: number; error?: string }> {
  const assignments = await db
    .select()
    .from(voiceAgentAssignments)
    .where(and(
      eq(voiceAgentAssignments.userId, userId),
      eq(voiceAgentAssignments.isActive, true)
    ));

  if (assignments.length === 0) return { synced: 0 };

  let synced = 0;

  for (const assignment of assignments) {
    try {
      // Always fetch all calls (no lastSyncedAt filter) to catch anything missed
      const calls = await listCallsForAssistant(assignment.assistantId, 1000);

      for (const call of calls) {
        try {
          const record = mapCallToRecord(call, userId, assignment.id);
          await db
            .insert(callRecords)
            .values(record)
            .onConflictDoUpdate({
              target: callRecords.id,
              set: {
                updatedAt: record.updatedAt,
                endedAt: record.endedAt,
                durationSeconds: record.durationSeconds,
                durationMinutes: record.durationMinutes,
                status: record.status,
                endedReason: record.endedReason,
                transcript: record.transcript,
                summary: record.summary,
                structuredData: record.structuredData,
                successEvaluation: record.successEvaluation,
                successEvaluationReason: record.successEvaluationReason,
                recordingUrl: record.recordingUrl,
                stereoRecordingUrl: record.stereoRecordingUrl,
                artifactMessages: record.artifactMessages,
                costBreakdown: record.costBreakdown,
                totalCost: record.totalCost,
                messages: record.messages,
                toolCalls: record.toolCalls,
                analysis: record.analysis,
                metadata: record.metadata,
                callerPhoneNumber: record.callerPhoneNumber,
                calledNumber: record.calledNumber,
                forwardedPhoneNumber: record.forwardedPhoneNumber,
                transferDestination: record.transferDestination,
                rawPayload: record.rawPayload,
              },
            });
          synced++;
        } catch (insertErr) {
          console.error(`[sync-voice-calls] Failed to upsert call ${call.id}:`, insertErr);
        }
      }

      await db
        .update(voiceAgentAssignments)
        .set({ lastSyncedAt: new Date().toISOString() })
        .where(eq(voiceAgentAssignments.id, assignment.id));

    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`[sync-voice-calls] Error syncing assistant ${assignment.assistantId}:`, msg);
      return { synced, error: msg };
    }
  }

  // Resolve the client's actual business name for accurate AI analysis:
  // 1. user.companyName (set during signup or profile)
  // 2. most recent intake submission companyName
  // 3. assignment label (generic fallback)
  let businessName: string | null = null;

  const [userRow] = await db
    .select({ companyName: user.companyName })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  if (userRow?.companyName) {
    businessName = userRow.companyName;
  } else {
    const [latestIntake] = await db
      .select({ companyName: intakeSubmissions.companyName })
      .from(intakeSubmissions)
      .where(eq(intakeSubmissions.userId, userId))
      .orderBy(desc(intakeSubmissions.id))
      .limit(1);
    businessName = latestIntake?.companyName || assignments[0]?.label || assignments[0]?.assistantName || null;
  }

  await analyzeUnprocessedCalls(userId, businessName);

  return { synced };
}

/** Runs AI analysis on stored calls that have a transcript but no aiAnalyzedAt timestamp. */
async function analyzeUnprocessedCalls(userId: string, businessName: string | null) {
  const unanalyzed = await db
    .select({
      id: callRecords.id,
      transcript: callRecords.transcript,
      summary: callRecords.summary,
    })
    .from(callRecords)
    .where(
      and(
        eq(callRecords.userId, userId),
        isNull(callRecords.aiAnalyzedAt)
      )
    );

  for (const row of unanalyzed) {
    if (!row.transcript) continue; // skip calls with no transcript
    try {
      const analysis = await analyzeCallTranscript(row.transcript, row.summary, businessName);
      if (!analysis) continue;

      await db
        .update(callRecords)
        .set({
          aiAnalyzedAt: new Date().toISOString(),
          callerIntent: analysis.callerIntent,
          callType: analysis.callType,
          urgency: analysis.urgency,
          sentiment: analysis.sentiment,
          leadScore: analysis.leadScore,
          buyerReadiness: analysis.buyerReadiness,
          primaryTopic: analysis.primaryTopic,
          secondaryTopics: JSON.stringify(analysis.secondaryTopics),
          keyEntities: JSON.stringify(analysis.keyEntities),
          objections: JSON.stringify(analysis.objections),
          infoGathered: JSON.stringify(analysis.infoGathered),
          infoMissing: JSON.stringify(analysis.infoMissing),
          nextBestAction: analysis.nextBestAction,
          followUpSms: analysis.followUpSms,
          followUpEmailSubject: analysis.followUpEmailSubject,
          followUpEmailBody: analysis.followUpEmailBody,
          managerAlert: analysis.managerAlert,
          automationIdeas: JSON.stringify(analysis.automationIdeas),
        })
        .where(eq(callRecords.id, row.id));
    } catch (e) {
      console.error(`[sync-voice-calls] AI analysis failed for call ${row.id}:`, e);
    }
  }
}
