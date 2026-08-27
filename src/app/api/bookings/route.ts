import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq, like, or, and, ne } from 'drizzle-orm';
import { sendBookingNotification } from '@/lib/email';
import { createGoogleCalendarEvent, isGoogleCalendarConfigured, isGoogleCalendarSlotAvailable } from '@/lib/google-calendar';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single record fetch by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { error: 'Valid ID is required', code: 'INVALID_ID' },
          { status: 400 }
        );
      }

      const booking = await db
        .select()
        .from(bookings)
        .where(eq(bookings.id, parseInt(id)))
        .limit(1);

      if (booking.length === 0) {
        return NextResponse.json(
          { error: 'Booking not found', code: 'NOT_FOUND' },
          { status: 404 }
        );
      }

      return NextResponse.json(booking[0], { status: 200 });
    }

    // List with pagination, search, and filters
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const date = searchParams.get('date');

    // Build filter conditions
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          like(bookings.name, `%${search}%`),
          like(bookings.email, `%${search}%`),
          like(bookings.company, `%${search}%`)
        )
      );
    }

    if (status) {
      conditions.push(eq(bookings.status, status));
    }

    if (date) {
      conditions.push(eq(bookings.date, date));
    }

    const results = conditions.length > 0
      ? await db.select().from(bookings).where(and(...conditions)).limit(limit).offset(offset)
      : await db.select().from(bookings).limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, date, timeSlot, notes, status } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string', code: 'MISSING_NAME' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { error: 'Email is required and must be a non-empty string', code: 'MISSING_EMAIL' },
        { status: 400 }
      );
    }

    if (!date || typeof date !== 'string' || date.trim() === '') {
      return NextResponse.json(
        { error: 'Date is required and must be a non-empty string', code: 'MISSING_DATE' },
        { status: 400 }
      );
    }

    if (!timeSlot || typeof timeSlot !== 'string' || timeSlot.trim() === '') {
      return NextResponse.json(
        { error: 'Time slot is required and must be a non-empty string', code: 'MISSING_TIME_SLOT' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company ? company.trim() : null,
      date: date.trim(),
      timeSlot: timeSlot.trim(),
      notes: notes ? notes.trim() : null,
      status: status ? status.trim() : 'pending',
      createdAt: new Date().toISOString(),
    };

    const existingBookings = await db
      .select({ id: bookings.id })
      .from(bookings)
      .where(and(
        eq(bookings.date, sanitizedData.date),
        eq(bookings.timeSlot, sanitizedData.timeSlot),
        ne(bookings.status, 'cancelled')
      ))
      .limit(1);

    if (existingBookings.length > 0) {
      return NextResponse.json(
        { error: 'That consultation time is already booked. Please choose another slot.', code: 'TIME_SLOT_UNAVAILABLE' },
        { status: 409 }
      );
    }

    const googleCalendarConfigured = isGoogleCalendarConfigured();
    const googleSlotAvailable = await isGoogleCalendarSlotAvailable(sanitizedData.date, sanitizedData.timeSlot);

    if (!googleSlotAvailable) {
      return NextResponse.json(
        { error: 'That time is already busy on Google Calendar. Please choose another slot.', code: 'GOOGLE_CALENDAR_BUSY' },
        { status: 409 }
      );
    }

    let googleCalendarEventId: string | null = null;
    if (googleCalendarConfigured) {
      googleCalendarEventId = await createGoogleCalendarEvent({
        name: sanitizedData.name,
        email: sanitizedData.email,
        company: sanitizedData.company,
        date: sanitizedData.date,
        timeSlot: sanitizedData.timeSlot,
        notes: sanitizedData.notes,
      });
    }

    // Insert booking
    const newBooking = await db
      .insert(bookings)
      .values(sanitizedData)
      .returning();

    // Send email notification (non-blocking)
    sendBookingNotification(newBooking[0]).catch(error => {
      console.error('Failed to send booking notification email:', error);
    });

    return NextResponse.json(
      {
        ...newBooking[0],
        googleCalendar: {
          configured: googleCalendarConfigured,
          eventCreated: Boolean(googleCalendarEventId),
          eventId: googleCalendarEventId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
