import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { syncCallsForUser } from '@/lib/sync-voice-calls';

const ADMIN_EMAILS = new Set([
  'tmore.haller@yahoo.com',
  'thaller@algobull.ai',
  'sreid@algobull.ai',
  'deenwest@gmail.com',
]);

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || !ADMIN_EMAILS.has(session.user.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { userId } = await params;
  const result = await syncCallsForUser(userId);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ synced: result.synced });
}
