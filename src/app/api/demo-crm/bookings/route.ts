import { NextRequest, NextResponse } from 'next/server';
import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { bookings } from '@/db/schema';

const DEMO_COMPANY = 'Ephesus Demo Trades CRM';
const DEMO_STATUS = 'demo-crm-booking';
const DEFAULT_SERVICE = 'AC diagnostic';
const DEFAULT_TECHNICIAN = 'Ramos';
const DEFAULT_DURATION = 90;

type DemoBookingInput = Record<string, unknown>;
type DemoBooking = typeof bookings.$inferSelect;

function text(value: unknown, fallback = '') {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return fallback;
}

function todayIso() {
  const date = new Date();
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

function normalizeDate(value: unknown) {
  const raw = text(value);
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const parsed = raw ? new Date(raw) : null;
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString().slice(0, 10) : todayIso();
}

function normalizeTime(value: unknown) {
  const raw = text(value, '09:00');
  const match = raw.match(/^(\d{1,2})(?::?(\d{2}))?\s*(am|pm)?$/i);
  if (!match) return '09:00';

  let hour = Number(match[1]);
  const minute = Number(match[2] || '00');
  const meridiem = match[3]?.toLowerCase();

  if (meridiem === 'pm' && hour < 12) hour += 12;
  if (meridiem === 'am' && hour === 12) hour = 0;
  if (hour > 23 || minute > 59) return '09:00';

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function numberValue(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseToolArguments(raw: unknown): DemoBookingInput {
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed as DemoBookingInput : {};
    } catch {
      return {};
    }
  }
  return raw && typeof raw === 'object' ? raw as DemoBookingInput : {};
}

function toolCallsFrom(body: Record<string, unknown>) {
  const message = body.message as Record<string, unknown> | undefined;
  const calls = message?.toolCalls ?? body.toolCalls;
  return Array.isArray(calls) ? calls as Array<Record<string, unknown>> : [];
}

function metadataFrom(notes: string | null) {
  try {
    const parsed = JSON.parse(notes || '{}');
    return parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

function minutes(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  return (hour || 0) * 60 + (minute || 0);
}

function overlaps(startA: string, durationA: number, startB: string, durationB: number) {
  const aStart = minutes(startA);
  const bStart = minutes(startB);
  return aStart < bStart + durationB && bStart < aStart + durationA;
}

function normalizeInput(input: DemoBookingInput) {
  const service = text(input.service ?? input.jobType ?? input.job_type, DEFAULT_SERVICE);
  const start = normalizeTime(input.start ?? input.time ?? input.timeSlot ?? input.time_slot);
  const duration = numberValue(input.duration ?? input.durationMinutes ?? input.duration_minutes, DEFAULT_DURATION);
  const notes = text(input.notes ?? input.issue ?? input.reason);

  return {
    name: text(input.name ?? input.customer ?? input.customerName ?? input.customer_name, 'Phone Demo Customer'),
    email: text(input.email, 'phone-demo@example.com').toLowerCase(),
    phone: text(input.phone ?? input.phoneNumber ?? input.phone_number),
    date: normalizeDate(input.date ?? input.appointmentDate ?? input.appointment_date),
    start,
    duration,
    service,
    technician: text(input.technician ?? input.tech, DEFAULT_TECHNICIAN),
    price: numberValue(input.price, 0),
    notes,
    source: text(input.source, 'vapi-phone-demo'),
  };
}

async function findDemoBookings(date: string) {
  return db
    .select()
    .from(bookings)
    .where(and(eq(bookings.company, DEMO_COMPANY), eq(bookings.status, DEMO_STATUS), eq(bookings.date, date)));
}

async function createDemoBooking(input: DemoBookingInput) {
  const normalized = normalizeInput(input);
  const existing = await findDemoBookings(normalized.date);
  const conflict = existing.find(booking => {
    const meta = metadataFrom(booking.notes);
    const technician = text(meta.technician, DEFAULT_TECHNICIAN);
    const start = normalizeTime(meta.start ?? booking.timeSlot);
    const duration = numberValue(meta.duration, DEFAULT_DURATION);
    return technician === normalized.technician && overlaps(normalized.start, normalized.duration, start, duration);
  });

  if (conflict) {
    return { conflict, normalized, booking: null };
  }

  const metadata = {
    source: normalized.source,
    service: normalized.service,
    jobType: normalized.service,
    technician: normalized.technician,
    start: normalized.start,
    duration: normalized.duration,
    phone: normalized.phone,
    price: normalized.price,
    notes: normalized.notes,
    createdBy: 'demo-crm-booking-bridge',
  };

  const [booking] = await db.insert(bookings).values({
    name: normalized.name,
    email: normalized.email,
    company: DEMO_COMPANY,
    date: normalized.date,
    timeSlot: normalized.start,
    notes: JSON.stringify(metadata),
    status: DEMO_STATUS,
    createdAt: new Date().toISOString(),
  }).returning();

  return { conflict: null, normalized, booking };
}

function vapiResult(toolCallId: unknown, payload: Record<string, unknown>) {
  return { toolCallId: text(toolCallId, 'demo-booking'), result: payload };
}

export async function GET() {
  const rows = await db
    .select()
    .from(bookings)
    .where(and(eq(bookings.company, DEMO_COMPANY), eq(bookings.status, DEMO_STATUS)))
    .orderBy(desc(bookings.createdAt))
    .limit(100);

  return NextResponse.json({ bookings: rows, company: DEMO_COMPANY });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({})) as Record<string, unknown>;
    const toolCalls = toolCallsFrom(body);

    if (toolCalls.length > 0) {
      const results = await Promise.all(toolCalls.map(async call => {
        const fn = call.function as Record<string, unknown> | undefined;
        const args = parseToolArguments(fn?.arguments ?? call.arguments ?? {});
        const { booking, conflict, normalized } = await createDemoBooking(args);

        if (conflict) {
          return vapiResult(call.id, {
            success: false,
            conflict: true,
            message: `${normalized.technician} already has a demo job around ${normalized.start} on ${normalized.date}. Ask for another time or technician.`,
            existingBookingId: conflict.id,
          });
        }

        return vapiResult(call.id, {
          success: true,
          bookingId: (booking as DemoBooking).id,
          date: (booking as DemoBooking).date,
          timeSlot: (booking as DemoBooking).timeSlot,
          message: `Booked ${normalized.name} for ${normalized.service} on ${normalized.date} at ${normalized.start}.`,
        });
      }));

      return NextResponse.json({ results });
    }

    const { booking, conflict, normalized } = await createDemoBooking(body);
    if (conflict) {
      return NextResponse.json({
        success: false,
        conflict: true,
        message: `${normalized.technician} already has a demo job around ${normalized.start} on ${normalized.date}.`,
        existingBookingId: conflict.id,
      }, { status: 409 });
    }

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error('[demo-crm-bookings] POST failed:', error);
    return NextResponse.json({ success: false, error: 'Unable to create demo booking.' }, { status: 500 });
  }
}
