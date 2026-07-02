import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { googleCalendarIntegrations } from '@/db/schema';
import {
  ensureFreshGoogleCalendarToken,
  getAuthenticatedCalendarClient,
} from '@/lib/google-calendar-oauth';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ connected: false, integrations: [] }, { status: 401 });

  const integrations = await db
    .select()
    .from(googleCalendarIntegrations)
    .where(eq(googleCalendarIntegrations.userId, session.user.id));

  const result = await Promise.all(
    integrations.map(async integration => {
      const fresh = await ensureFreshGoogleCalendarToken(integration.id);
      if (!fresh) {
        return {
          id: integration.id,
          email: integration.email,
          displayName: integration.displayName,
          expired: true,
          calendars: [],
        };
      }

      try {
        const calendar = getAuthenticatedCalendarClient(fresh);
        const calendars = await calendar.calendarList.list({
          minAccessRole: 'writer',
          showHidden: false,
        });

        return {
          id: fresh.id,
          email: fresh.email,
          displayName: fresh.displayName,
          expired: false,
          calendars: (calendars.data.items || []).map(item => ({
            id: item.id,
            summary: item.summary,
            primary: item.primary,
            accessRole: item.accessRole,
          })),
        };
      } catch (error) {
        console.error('[salon-crm] Failed to list Google calendars:', error);
        return {
          id: fresh.id,
          email: fresh.email,
          displayName: fresh.displayName,
          expired: true,
          calendars: [],
        };
      }
    })
  );

  return NextResponse.json({ connected: result.length > 0, integrations: result });
}
