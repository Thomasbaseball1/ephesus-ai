import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq, like, or, and } from 'drizzle-orm';
import { sendBookingNotification } from '@/lib/email';
import { createGoogleCalendarEvent } from '@/lib/google-calendar';

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

    let query = db.select().from(bookings);

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

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.limit(limit).offset(offset);

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

    // Insert booking
    const newBooking = await db
      .insert(bookings)
      .values(sanitizedData)
      .returning();

    // Send email notification (non-blocking)
    sendBookingNotification(newBooking[0]).catch(error => {
      console.error('Failed to send booking notification email:', error);
    });

    // Create Google Calendar event (non-blocking)
    createGoogleCalendarEvent({
      name: sanitizedData.name,
      email: sanitizedData.email,
      company: sanitizedData.company,
      date: sanitizedData.date,
      timeSlot: sanitizedData.timeSlot,
      notes: sanitizedData.notes,
    }).catch(error => {
      console.error('Failed to create Google Calendar event:', error);
    });

    return NextResponse.json(newBooking[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}