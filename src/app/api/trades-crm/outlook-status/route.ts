import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { outlookIntegrations } from '@/db/schema';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ connected: false }, { status: 401 });

  const [integration] = await db
    .select({
      id: outlookIntegrations.id,
      email: outlookIntegrations.email,
      displayName: outlookIntegrations.displayName,
      scopes: outlookIntegrations.scopes,
      expiresAt: outlookIntegrations.expiresAt,
    })
    .from(outlookIntegrations)
    .where(eq(outlookIntegrations.userId, session.user.id))
    .limit(1);

  if (!integration) return NextResponse.json({ connected: false });

  const scopes = integration.scopes || '';
  return NextResponse.json({
    connected: true,
    integration: {
      ...integration,
      expired: integration.expiresAt <= Math.floor(Date.now() / 1000),
      calendarReady: scopes.includes('Calendars.ReadWrite'),
    },
  });
}
