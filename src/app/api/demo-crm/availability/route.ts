import { NextRequest, NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';
import { db } from '@/db';
import { bookings, demoCrmServices, demoCrmTechnicians } from '@/db/schema';
import {
  BUSINESS_HOURS,
  DEFAULT_DURATION,
  DEMO_COMPANY,
  DEMO_STATUS,
  SLOT_STEP_MINUTES,
  ensureDemoCrmCatalogSeeded,
  findService,
  metadataFrom,
  minutes,
  normalizeDate,
  normalizeTime,
  numberValue,
  overlaps,
  respondToToolCalls,
  text,
  type ToolInput,
} from '@/lib/demo-crm';

function minutesToTime(total: number) {
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

async function bookedRangesFor(date: string, technician?: string) {
  const rows = await db
    .select()
    .from(bookings)
    .where(and(eq(bookings.company, DEMO_COMPANY), eq(bookings.status, DEMO_STATUS), eq(bookings.date, date)));

  return rows
    .map(booking => {
      const meta = metadataFrom(booking.notes);
      return {
        technician: text(meta.technician, ''),
        start: normalizeTime(meta.start ?? booking.timeSlot),
        duration: numberValue(meta.duration, DEFAULT_DURATION),
      };
    })
    .filter(range => !technician || range.technician === technician);
}

function openSlots(duration: number, booked: Array<{ start: string; duration: number }>) {
  const slots: string[] = [];
  for (
    let start = BUSINESS_HOURS.startMinutes;
    start + duration <= BUSINESS_HOURS.endMinutes;
    start += SLOT_STEP_MINUTES
  ) {
    const startTime = minutesToTime(start);
    const conflict = booked.some(range => overlaps(startTime, duration, range.start, range.duration));
    if (!conflict) slots.push(startTime);
  }
  return slots;
}

async function checkAvailability(args: ToolInput) {
  await ensureDemoCrmCatalogSeeded();

  const date = normalizeDate(args.date ?? args.appointmentDate ?? args.appointment_date);
  const technician = text(args.technician ?? args.staffName ?? args.tech);
  const requestedStart = text(args.start ?? args.time ?? args.timeSlot);

  let duration = numberValue(args.duration ?? args.durationMinutes, 0);
  if (!duration) {
    const serviceQuery = text(args.serviceName ?? args.service ?? args.serviceId);
    if (serviceQuery) {
      const services = await db.select().from(demoCrmServices).where(eq(demoCrmServices.company, DEMO_COMPANY));
      const match = findService(serviceQuery, services);
      duration = match?.durationMinutes ?? DEFAULT_DURATION;
    } else {
      duration = DEFAULT_DURATION;
    }
  }

  const technicians = technician
    ? [{ name: technician }]
    : await db.select({ name: demoCrmTechnicians.name }).from(demoCrmTechnicians).where(eq(demoCrmTechnicians.company, DEMO_COMPANY));

  const perTechnician = await Promise.all(technicians.map(async tech => {
    const booked = await bookedRangesFor(date, tech.name);
    return { technician: tech.name, openSlots: openSlots(duration, booked) };
  }));

  if (requestedStart) {
    const normalizedStart = normalizeTime(requestedStart);
    const available = perTechnician.filter(t => t.openSlots.includes(normalizedStart));
    return {
      success: true,
      date,
      requestedStart: normalizedStart,
      isAvailable: available.length > 0,
      availableTechnicians: available.map(t => t.technician),
      message: available.length > 0
        ? `${available.map(t => t.technician).join(' or ')} can do ${normalizedStart} on ${date}.`
        : `Nobody is free at ${normalizedStart} on ${date}. Try another time.`,
    };
  }

  const withOpenings = perTechnician.filter(t => t.openSlots.length > 0);
  return {
    success: true,
    date,
    durationMinutes: duration,
    technicians: withOpenings,
    message: withOpenings.length > 0
      ? withOpenings.map(t => `${t.technician}: ${t.openSlots.slice(0, 4).join(', ')}${t.openSlots.length > 4 ? '...' : ''}`).join(' | ')
      : `Nobody has openings on ${date} for that duration. Try another day.`,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({})) as Record<string, unknown>;
    const result = await respondToToolCalls(body, checkAvailability);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[demo-crm-availability] POST failed:', error);
    return NextResponse.json({ success: false, error: 'Unable to check availability.' }, { status: 500 });
  }
}
