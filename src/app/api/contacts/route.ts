import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { contacts } from '@/db/schema';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { 
          error: "Name is required and cannot be empty",
          code: "MISSING_REQUIRED_FIELDS" 
        },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { 
          error: "Email is required and cannot be empty",
          code: "MISSING_REQUIRED_FIELDS" 
        },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json(
        { 
          error: "Message is required and cannot be empty",
          code: "MISSING_REQUIRED_FIELDS" 
        },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedMessage = message.trim();
    const sanitizedCompany = company && typeof company === 'string' ? company.trim() : null;

    // Insert contact with auto-generated timestamp
    const newContact = await db.insert(contacts)
      .values({
        name: sanitizedName,
        email: sanitizedEmail,
        company: sanitizedCompany,
        message: sanitizedMessage,
        createdAt: new Date().toISOString()
      })
      .returning();

    // Send email notification (non-blocking)
    sendContactNotification(newContact[0]).catch(error => {
      console.error('Failed to send contact notification email:', error);
      // Don't fail the request if email fails
    });

    return NextResponse.json(newContact[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}