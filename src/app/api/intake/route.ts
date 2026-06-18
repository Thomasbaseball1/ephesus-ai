import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { intakeSubmissions, user } from '@/db/schema';
import { sendIntakeNotification } from '@/lib/email';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, contactEmail, data } = body;

    if (!companyName || typeof companyName !== 'string' || companyName.trim() === '') {
      return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
    }

    // Check if user is logged in
    const session = await auth.api.getSession({ headers: request.headers });

    const record = await db.insert(intakeSubmissions).values({
      companyName: companyName.trim(),
      contactEmail: contactEmail?.trim() || null,
      userId: session?.user?.id || null,
      data: JSON.stringify(data),
      createdAt: new Date().toISOString(),
    }).returning();

    // Mark intake as completed for logged-in user
    if (session?.user?.id) {
      await db.update(user)
        .set({ intakeCompleted: true, updatedAt: new Date() })
        .where(eq(user.id, session.user.id));
    }

    sendIntakeNotification(companyName.trim(), contactEmail?.trim() || '', data).catch(err => {
      console.error('Failed to send intake email:', err);
    });

    return NextResponse.json(record[0], { status: 201 });
  } catch (error) {
    console.error('Intake POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
