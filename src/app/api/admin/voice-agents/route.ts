import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { listAssistants } from '@/lib/vapi';

const ADMIN_EMAILS = new Set([
  'tmore.haller@yahoo.com',
  'thaller@algobull.ai',
  'sreid@algobull.ai',
  'deenwest@gmail.com',
]);

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !ADMIN_EMAILS.has(session.user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const assistants = await listAssistants();
    return NextResponse.json(assistants);
  } catch (e) {
    console.error('[admin/voice-agents] Error:', e);
    return NextResponse.json({ error: 'Failed to fetch assistants' }, { status: 500 });
  }
}
