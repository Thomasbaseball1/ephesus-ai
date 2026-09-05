import { NextRequest, NextResponse } from 'next/server';
import { and, eq, ne } from 'drizzle-orm';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { getBusyGoogleCalendarSlots, isGoogleCalendarConfigured } from '@/lib/google-calendar';

const TIME_SLOTS = [
  '9:00 AM - 9:45 AM',
  '10:00 AM - 10:45 AM',
  '11:00 AM - 11:45 AM',
  '12:00 PM - 12:45 PM',
  '1:00 PM - 1:45 PM',
  '2:00 PM - 2:45 PM',
  '3:00 PM - 3:45 PM',
  '4:00 PM - 4:45 PM',
  '5:00 PM - 5:45 PM',
];

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get('date')?.trim();
    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    const bookedRows = await db
      .select({ timeSlot: bookings.timeSlot })
      .from(bookings)
      .where(and(eq(bookings.date, date), ne(bookings.status, 'cancelled')));

    const databaseBusySlots = bookedRows.map((row) => row.timeSlot);
    let googleBusySlots: string[] = [];
    let googleCalendarWarning: string | null = null;

    try {
      googleBusySlots = await getBusyGoogleCalendarSlots(date, TIME_SLOTS);
    } catch (error) {
      googleCalendarWarning = 'Google Calendar availability could not be checked. Showing CRM-booked slots only.';
      console.error('[booking-availability] Google Calendar check failed:', error);
    }

    const busySlots = Array.from(new Set([...databaseBusySlots, ...googleBusySlots]));

    return NextResponse.json({
      date,
      timeSlots: TIME_SLOTS.map((slot) => ({
        slot,
        available: !busySlots.includes(slot),
      })),
      busySlots,
      googleCalendarConfigured: isGoogleCalendarConfigured(),
      googleCalendarWarning,
    });
  } catch (error) {
    console.error('[booking-availability] GET failed:', error);
    return NextResponse.json({ error: 'Unable to load booking availability' }, { status: 500 });
  }
}
