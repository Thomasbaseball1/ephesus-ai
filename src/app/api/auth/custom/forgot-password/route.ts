import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { user as userTable, verification } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find user
    const [found] = await db
      .select({ id: userTable.id, name: userTable.name, email: userTable.email })
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1);

    // Always return success (don't reveal whether user exists)
    if (!found) {
      return NextResponse.json({ status: true });
    }

    // Generate reset token
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 hour

    // Store in verification table
    await db.insert(verification).values({
      id: crypto.randomUUID(),
      identifier: `reset-password:${token}`,
      value: found.id,
      expiresAt,
    });

    // Build reset URL (BETTER_AUTH_URL is the canonical base URL)
    const baseUrl = process.env.BETTER_AUTH_URL || req.nextUrl.origin;
    const resetUrl = `${baseUrl}/reset-password/${token}`;

    // Send email
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'support@ephesusai.com',
      to: found.email,
      subject: 'Reset your Ephesus AI password',
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color: #0D9488; font-size: 24px; margin-bottom: 8px;">Reset your password</h1>
          <p style="color: #64748b; margin-bottom: 24px;">
            Click the button below to reset your Ephesus AI portal password. This link expires in 1 hour.
          </p>
          <a href="${resetUrl}"
             style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #0D9488, #2DD4BF); color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
            Reset Password
          </a>
          <p style="color: #94a3b8; font-size: 14px; margin-top: 24px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ status: true });
  } catch (e) {
    console.error('[Custom forgot-password] Error:', e);
    return NextResponse.json({ status: true }); // Always return success for security
  }
}