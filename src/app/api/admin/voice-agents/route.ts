import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '@/lib/admin-auth';
import { listAssistants } from '@/lib/vapi';

export async function GET(req: NextRequest) {
  const authorization = await authorizeAdminRequest(req.headers);
  if (!authorization.ok) return authorization.response;

  try {
    const assistants = await listAssistants();
    return NextResponse.json(assistants);
  } catch (e) {
    console.error('[admin/voice-agents] Error:', e);
    return NextResponse.json({ error: 'Failed to fetch assistants' }, { status: 500 });
  }
}
