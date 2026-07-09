import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { outlookIntegrations } from '@/db/schema';
import { ensureFreshToken } from '@/lib/outlook-refresh';

interface SalonAppointmentPayload {
  appointment: {
    client: string;
    email?: string;
    phone?: string;
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
  if (!body?.appointment) {
    return NextResponse.json({ error: 'Missing appointment details' }, { status: 400 });
  }

  const [integration] = await db
    .select()
    .from(outlookIntegrations)
    .where(eq(outlookIntegrations.userId, session.user.id))
    .limit(1);

  if (!integration) return NextResponse.json({ error: 'Outlook connection not found' }, { status: 404 });
  if (!(integration.scopes || '').includes('Calendars.ReadWrite')) {
    return NextResponse.json({ error: 'Reconnect Outlook to grant calendar access' }, { status: 403 });
  }

  const fresh = await ensureFreshToken(integration.id);
  if (!fresh) return NextResponse.json({ error: 'Outlook authorization expired' }, { status: 401 });

  const [freshIntegration] = await db
    .select()
    .from(outlookIntegrations)
    .where(eq(outlookIntegrations.id, integration.id))
    .limit(1);

  if (!freshIntegration) {
    return NextResponse.json({ error: 'Outlook connection not found after refresh' }, { status: 404 });
  }

  const { appointment } = body;
  const { start, end } = appointmentDateTime(appointment.date, appointment.start, appointment.duration);
  const bodyText = [
    'Created from the Ephesus Salon Biz CRM demo.',
    '',
    `Client: ${appointment.client}`,
    appointment.email ? `Email: ${appointment.email}` : null,
    appointment.phone ? `Phone: ${appointment.phone}` : null,
    `Service: ${appointment.service}`,
    `Stylist: ${appointment.stylist}`,
    `Status: ${appointment.status}`,
    appointment.notes ? `Notes: ${appointment.notes}` : null,
  ].filter(Boolean).join('\n');

  const res = await fetch('https://graph.microsoft.com/v1.0/me/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${freshIntegration.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject: `${appointment.client} - ${appointment.service}`,
      body: {
        contentType: 'text',
        content: bodyText,
      },
      start: {
        dateTime: start.toISOString(),
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: 'America/New_York',
      },
      location: {
        displayName: 'Salon',
      },
      attendees: appointment.email ? [{
        emailAddress: {
          address: appointment.email,
          name: appointment.client,
        },
        type: 'required',
      }] : [],
      isReminderOn: true,
      reminderMinutesBeforeStart: 60,
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('[salon-crm] Failed to create Outlook event:', data);
    return NextResponse.json({ error: 'Failed to create Outlook event' }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    eventId: data.id,
    htmlLink: data.webLink,
  });
}
