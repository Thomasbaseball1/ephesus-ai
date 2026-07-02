import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { and, eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { googleCalendarIntegrations } from '@/db/schema';
import {
  ensureFreshGoogleCalendarToken,
  getAuthenticatedCalendarClient,
} from '@/lib/google-calendar-oauth';

interface SalonAppointmentPayload {
  integrationId: number;
  calendarId: string;
  appointment: {
    client: string;
    email?: string;
    service: string;
    stylist: string;
    date: string;
    start: string;
    duration: number;
    status: string;
    notes?: string;
  };
}

function appointmentDateTime(date: string, time: string, durationMinutes = 60) {
  const [hour, minute] = time.split(':').map(Number);
  const start = new Date(`${date}T00:00:00`);
  start.setHours(hour, minute, 0, 0);
  const end = new Date(start.getTime() + Number(durationMinutes || 60) * 60_000);
  return { start, end };
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = (await req.json().catch(() => null)) as SalonAppointmentPayload | null;
  if (!body?.integrationId || !body.calendarId || !body.appointment) {
    return NextResponse.json({ error: 'Missing calendar or appointment details' }, { status: 400 });
  }

  const [integration] = await db
    .select()
    .from(googleCalendarIntegrations)
    .where(and(
      eq(googleCalendarIntegrations.id, Number(body.integrationId)),
      eq(googleCalendarIntegrations.userId, session.user.id)
    ))
    .limit(1);

  if (!integration) return NextResponse.json({ error: 'Google Calendar connection not found' }, { status: 404 });

  const fresh = await ensureFreshGoogleCalendarToken(integration.id);
  if (!fresh) return NextResponse.json({ error: 'Google Calendar authorization expired' }, { status: 401 });

  const { appointment } = body;
  const { start, end } = appointmentDateTime(appointment.date, appointment.start, appointment.duration);
  const description = [
    'Created from the Ephesus Salon Biz CRM demo.',
    '',
    `Client: ${appointment.client}`,
    appointment.email ? `Email: ${appointment.email}` : null,
    `Service: ${appointment.service}`,
    `Stylist: ${appointment.stylist}`,
    `Status: ${appointment.status}`,
    appointment.notes ? `Notes: ${appointment.notes}` : null,
  ].filter(Boolean).join('\n');

  try {
    const calendar = getAuthenticatedCalendarClient(fresh);
    const event = await calendar.events.insert({
      calendarId: body.calendarId,
      sendUpdates: appointment.email ? 'all' : 'none',
      requestBody: {
        summary: `${appointment.client} - ${appointment.service}`,
        description,
        location: 'Salon',
        start: {
          dateTime: start.toISOString(),
          timeZone: 'America/New_York',
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: 'America/New_York',
        },
        attendees: appointment.email ? [{ email: appointment.email, displayName: appointment.client }] : undefined,
        reminders: {
          useDefault: true,
        },
      },
    });

    return NextResponse.json({
      ok: true,
      eventId: event.data.id,
      htmlLink: event.data.htmlLink,
    });
  } catch (error) {
    console.error('[salon-crm] Failed to create Google Calendar event:', error);
    return NextResponse.json({ error: 'Failed to create Google Calendar event' }, { status: 500 });
  }
}
