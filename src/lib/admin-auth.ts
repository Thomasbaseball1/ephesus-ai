import 'server-only';

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { isAdminEmail } from '@/lib/admin-access';

type AdminSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

type AdminAuthorization =
  | { ok: true; session: AdminSession }
  | { ok: false; response: NextResponse };

export async function authorizeAdminRequest(requestHeaders: Headers): Promise<AdminAuthorization> {
  const session = await auth.api.getSession({ headers: requestHeaders });

  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Authentication required' }, { status: 401 }),
    };
  }

  if (!isAdminEmail(session.user.email)) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Admin access required' }, { status: 403 }),
    };
  }

  return { ok: true, session };
}
