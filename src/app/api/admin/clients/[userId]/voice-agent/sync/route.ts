import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '@/lib/admin-auth';
import { syncCallsForUser } from '@/lib/sync-voice-calls';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const authorization = await authorizeAdminRequest(req.headers);
  if (!authorization.ok) return authorization.response;

  const { userId } = await params;
  const result = await syncCallsForUser(userId);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ synced: result.synced });
}
