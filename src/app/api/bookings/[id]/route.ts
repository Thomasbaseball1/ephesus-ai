import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          error: 'Valid booking ID is required',
          code: 'INVALID_ID',
        },
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
        {
          error: 'Booking not found',
          code: 'BOOKING_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(booking[0], { status: 200 });
  } catch (error: any) {
    console.error('GET booking error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + error.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          error: 'Valid booking ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    const requestBody = await request.json();

    if ('id' in requestBody) {
      return NextResponse.json(
        {
          error: 'ID cannot be updated',
          code: 'ID_UPDATE_NOT_ALLOWED',
        },
        { status: 400 }
      );
    }

    if ('createdAt' in requestBody || 'created_at' in requestBody) {
      return NextResponse.json(
        {
          error: 'Created date cannot be updated',
          code: 'CREATED_AT_UPDATE_NOT_ALLOWED',
        },
        { status: 400 }
      );
    }

    const existingBooking = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, parseInt(id)))
      .limit(1);

    if (existingBooking.length === 0) {
      return NextResponse.json(
        {
          error: 'Booking not found',
          code: 'BOOKING_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    const updates: any = {};

    if (requestBody.name !== undefined) {
      if (!requestBody.name || typeof requestBody.name !== 'string') {
        return NextResponse.json(
          {
            error: 'Name must be a valid string',
            code: 'INVALID_NAME',
          },
          { status: 400 }
        );
      }
      updates.name = requestBody.name.trim();
    }

    if (requestBody.email !== undefined) {
      if (!requestBody.email || typeof requestBody.email !== 'string') {
        return NextResponse.json(
          {
            error: 'Email must be a valid string',
            code: 'INVALID_EMAIL',
          },
          { status: 400 }
        );
      }
      updates.email = requestBody.email.toLowerCase().trim();
    }

    if (requestBody.company !== undefined) {
      updates.company = requestBody.company ? requestBody.company.trim() : null;
    }

    if (requestBody.date !== undefined) {
      if (!requestBody.date || typeof requestBody.date !== 'string') {
        return NextResponse.json(
          {
            error: 'Date must be a valid string',
            code: 'INVALID_DATE',
          },
          { status: 400 }
        );
      }
      updates.date = requestBody.date.trim();
    }

    if (requestBody.timeSlot !== undefined) {
      if (!requestBody.timeSlot || typeof requestBody.timeSlot !== 'string') {
        return NextResponse.json(
          {
            error: 'Time slot must be a valid string',
            code: 'INVALID_TIME_SLOT',
          },
          { status: 400 }
        );
      }
      updates.timeSlot = requestBody.timeSlot.trim();
    }

    if (requestBody.notes !== undefined) {
      updates.notes = requestBody.notes ? requestBody.notes.trim() : null;
    }

    if (requestBody.status !== undefined) {
      const validStatuses = ['pending', 'confirmed', 'cancelled'];
      if (!validStatuses.includes(requestBody.status)) {
        return NextResponse.json(
          {
            error: 'Status must be one of: pending, confirmed, cancelled',
            code: 'INVALID_STATUS',
          },
          { status: 400 }
        );
      }
      updates.status = requestBody.status;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        {
          error: 'No valid fields to update',
          code: 'NO_UPDATES',
        },
        { status: 400 }
      );
    }

    const updatedBooking = await db
      .update(bookings)
      .set(updates)
      .where(eq(bookings.id, parseInt(id)))
      .returning();

    if (updatedBooking.length === 0) {
      return NextResponse.json(
        {
          error: 'Booking not found',
          code: 'BOOKING_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBooking[0], { status: 200 });
  } catch (error: any) {
    console.error('PATCH booking error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          error: 'Valid booking ID is required',
          code: 'INVALID_ID',
        },
        { status: 400 }
      );
    }

    const existingBooking = await db
      .select()
      .from(bookings)
      .where(eq(bookings.id, parseInt(id)))
      .limit(1);

    if (existingBooking.length === 0) {
      return NextResponse.json(
        {
          error: 'Booking not found',
          code: 'BOOKING_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    const deletedBooking = await db
      .delete(bookings)
      .where(eq(bookings.id, parseInt(id)))
      .returning();

    if (deletedBooking.length === 0) {
      return NextResponse.json(
        {
          error: 'Booking not found',
          code: 'BOOKING_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Booking deleted successfully',
        booking: deletedBooking[0],
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('DELETE booking error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error: ' + error.message,
      },
      { status: 500 }
    );
  }
}