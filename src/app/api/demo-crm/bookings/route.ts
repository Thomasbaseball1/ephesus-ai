import { NextRequest, NextResponse } from 'next/server';
import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import {
  DEMO_COMPANY,
  DEMO_STATUS,
  DEFAULT_SERVICE,
  DEFAULT_TECHNICIAN,
  DEFAULT_DURATION,
  text,
  normalizeDate,
  normalizeTime,
  numberValue,
  metadataFrom,
  overlaps,
  respondToToolCalls,
  type ToolInput,
} from '@/lib/demo-crm';

type DemoBooking = typeof bookings.$inferSelect;

function normalizeInput(input: ToolInput) {
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

async function createDemoBooking(input: ToolInput) {
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

async function bookOne(args: ToolInput) {
  const { booking, conflict, normalized } = await createDemoBooking(args);

  if (conflict) {
    return {
      success: false,
      conflict: true,
      message: `${normalized.technician} already has a demo job around ${normalized.start} on ${normalized.date}. Ask for another time or technician.`,
      existingBookingId: conflict.id,
    };
  }

  return {
    success: true,
    bookingId: (booking as DemoBooking).id,
    date: (booking as DemoBooking).date,
    timeSlot: (booking as DemoBooking).timeSlot,
    message: `Booked ${normalized.name} for ${normalized.service} on ${normalized.date} at ${normalized.start}.`,
  };
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
    const result = await respondToToolCalls(body, bookOne);

    if ('results' in result) {
      return NextResponse.json(result);
    }

    const single = result as Awaited<ReturnType<typeof bookOne>>;
    return NextResponse.json(single, { status: single.success ? 201 : 409 });
  } catch (error) {
    console.error('[demo-crm-bookings] POST failed:', error);
    return NextResponse.json({ success: false, error: 'Unable to create demo booking.' }, { status: 500 });
  }
}
