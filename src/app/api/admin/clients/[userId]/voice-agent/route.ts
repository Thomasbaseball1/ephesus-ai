import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '@/lib/admin-auth';
import { db } from '@/db';
import { voiceAgentAssignments } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { getAssistant } from '@/lib/vapi';

// GET — fetch assignments for a client
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const authorization = await authorizeAdminRequest(req.headers);
  if (!authorization.ok) return authorization.response;

  const { userId } = await params;
  const assignments = await db
    .select()
    .from(voiceAgentAssignments)
    .where(eq(voiceAgentAssignments.userId, userId));

  return NextResponse.json(assignments);
}

// POST — assign an assistant to a client
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const authorization = await authorizeAdminRequest(req.headers);
  if (!authorization.ok) return authorization.response;
  const { session } = authorization;

  const { userId } = await params;
  const body = await req.json();
  const { assistantId, label, assistantName } = body;

  if (!assistantId) {
    return NextResponse.json({ error: 'assistantId is required' }, { status: 400 });
  }

  // Deactivate any existing active assignment for this user first
  await db
    .update(voiceAgentAssignments)
    .set({ isActive: false })
    .where(and(
      eq(voiceAgentAssignments.userId, userId),
      eq(voiceAgentAssignments.isActive, true)
    ));

  // Try to get the assistant name from Vapi if not provided
  let resolvedName = assistantName || null;
  if (!resolvedName) {
    try {
      const assistant = await getAssistant(assistantId);
      resolvedName = assistant.name || assistantId;
    } catch {
      resolvedName = assistantId;
    }
  }

  const [inserted] = await db
    .insert(voiceAgentAssignments)
    .values({
      userId,
      assistantId,
      assistantName: resolvedName,
      label: label || resolvedName || 'AI Receptionist',
      isActive: true,
      assignedAt: new Date().toISOString(),
      assignedBy: session.user.email,
    })
    .returning();

  return NextResponse.json(inserted);
}

// DELETE — deactivate an assignment
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const authorization = await authorizeAdminRequest(req.headers);
  if (!authorization.ok) return authorization.response;

  const { userId } = await params;
  const { assignmentId } = await req.json();

  await db
    .update(voiceAgentAssignments)
    .set({ isActive: false })
    .where(and(
      eq(voiceAgentAssignments.id, assignmentId),
      eq(voiceAgentAssignments.userId, userId)
    ));

  return NextResponse.json({ success: true });
}
