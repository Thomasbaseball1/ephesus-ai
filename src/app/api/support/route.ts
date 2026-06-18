import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const SUPPORT_EMAIL = process.env.RESEND_TO_EMAIL || 'support@ephesusai.com';

export async function POST(req: NextRequest) {
  try {
    const { subject, message, userEmail, userName } = await req.json();

    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Subject and message are required.' }, { status: 400 });
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@ephesusai.com',
      to: SUPPORT_EMAIL,
      replyTo: userEmail,
      subject: `[Client Support] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0D9488;">New Support Message</h2>
          <p><strong>From:</strong> ${userName} (${userEmail})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Support email error:', err);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
