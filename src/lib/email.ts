import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFICATION_EMAILS = [
  'tmore.haller@yahoo.com',
  'deenwest@gmail.com'
];

interface BookingNotificationData {
  name: string;
  email: string;
  company?: string | null;
  date: string;
  timeSlot: string;
  notes?: string | null;
  status: string;
  createdAt: string;
}

interface ContactNotificationData {
  name: string;
  email: string;
  company?: string | null;
  message: string;
  createdAt: string;
}

export async function sendBookingNotification(booking: BookingNotificationData) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #388087 0%, #6FB3B8 100%); padding: 30px 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">New Booking Received</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px;">You have received a new consultation booking:</p>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Name:</strong>
                          <p style="margin: 5px 0 0 0; color: #333333; font-size: 15px;">${booking.name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Email:</strong>
                          <p style="margin: 5px 0 0 0; color: #333333; font-size: 15px;">
                            <a href="mailto:${booking.email}" style="color: #388087; text-decoration: none;">${booking.email}</a>
                          </p>
                        </td>
                      </tr>
                      ${booking.company ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Company:</strong>
                          <p style="margin: 5px 0 0 0; color: #333333; font-size: 15px;">${booking.company}</p>
                        </td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Date:</strong>
                          <p style="margin: 5px 0 0 0; color: #333333; font-size: 15px;">${booking.date}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Time Slot:</strong>
                          <p style="margin: 5px 0 0 0; color: #333333; font-size: 15px;">${booking.timeSlot}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Status:</strong>
                          <p style="margin: 5px 0 0 0; color: #333333; font-size: 15px; text-transform: capitalize;">${booking.status}</p>
                        </td>
                      </tr>
                      ${booking.notes ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Notes:</strong>
                          <p style="margin: 5px 0 0 0; color: #333333; font-size: 15px; white-space: pre-wrap;">${booking.notes}</p>
                        </td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 12px 0;">
                          <strong style="color: #388087; font-size: 14px;">Received:</strong>
                          <p style="margin: 5px 0 0 0; color: #666666; font-size: 14px;">${new Date(booking.createdAt).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9f9f9; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
                    <p style="margin: 0; color: #666666; font-size: 12px;">Ephesus AI Solutions - Automated Notification</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const results = await Promise.allSettled(
      NOTIFICATION_EMAILS.map(email =>
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'support@ephesusai.com',
          to: email,
          subject: `New Booking: ${booking.name} - ${booking.date} at ${booking.timeSlot}`,
          html: htmlContent,
          replyTo: booking.email,
        })
      )
    );

    const failures = results.filter(r => r.status === 'rejected');
    if (failures.length > 0) {
      console.error('Some notification emails failed:', failures);
    }

    return {
      success: failures.length === 0,
      sent: results.filter(r => r.status === 'fulfilled').length,
      failed: failures.length,
    };
  } catch (error) {
    console.error('Failed to send booking notification:', error);
    throw error;
  }
}

export async function sendIntakeNotification(companyName: string, contactEmail: string, data: Record<string, unknown>) {
  const formatSection = (title: string, fields: Record<string, unknown>) => {
    const rows = Object.entries(fields)
      .filter(([, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => {
        const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
        const value = typeof v === 'object' ? `<pre style="margin:0;white-space:pre-wrap">${JSON.stringify(v, null, 2)}</pre>` : String(v);
        return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;width:40%;vertical-align:top;color:#555;font-size:13px;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e5e5;color:#111;font-size:13px;">${value}</td></tr>`;
      }).join('');
    if (!rows) return '';
    return `<h3 style="margin:24px 0 8px;color:#0D9488;font-size:15px;border-bottom:2px solid #0D9488;padding-bottom:4px;">${title}</h3><table width="100%" style="border-collapse:collapse;margin-bottom:8px;">${rows}</table>`;
  };

  const s = data as Record<string, Record<string, unknown>>;

  const htmlContent = `
    <!DOCTYPE html><html><head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:20px;">
        <tr><td align="center">
          <table width="660" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
            <tr><td style="background:linear-gradient(135deg,#0D9488 0%,#2DD4BF 100%);padding:28px 40px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:22px;font-weight:bold;">New Client Intake Submission</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">${companyName}${contactEmail ? ` — ${contactEmail}` : ''}</p>
            </td></tr>
            <tr><td style="padding:32px 40px;">
              ${formatSection('01 — Company Overview', s.companyOverview || {})}
              ${formatSection('02 — Email Platform & Technical Integration', s.emailPlatform || {})}
              ${formatSection('03 — Departments & Org Structure', { departments: s.departments })}
              ${formatSection('04 — Technical Setup Contacts', { contacts: s.technicalContacts })}
              ${formatSection('05 — Routing Categories', s.routingCategories || {})}
              ${formatSection('06 — Call Handling Preferences', s.callHandling || {})}
              ${formatSection('07 — Intake Requirements', s.intakeRequirements || {})}
              ${formatSection('08 — Routing Logic & Special Rules', s.routingLogic || {})}
              ${formatSection('09 — FAQs & Knowledge Base', { faqs: s.faqs, attachmentName: (s.faqMeta as Record<string,unknown>)?.attachmentName, additionalNotes: (s.faqMeta as Record<string,unknown>)?.additionalNotes })}
              ${formatSection('10 — Escalation Rules', s.escalation || {})}
              ${formatSection('11 — Tracking & Reporting', s.tracking || {})}
              ${formatSection('12 — Additional Notes', s.additionalNotes || {})}
            </td></tr>
            <tr><td style="background:#f9f9f9;padding:16px 40px;text-align:center;border-top:1px solid #e5e5e5;">
              <p style="margin:0;color:#888;font-size:12px;">Ephesus AI Solutions — Client Intake Notification</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </body></html>
  `;

  try {
    const results = await Promise.allSettled(
      NOTIFICATION_EMAILS.map(email =>
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'support@ephesusai.com',
          to: email,
          subject: `New Client Intake: ${companyName}`,
          html: htmlContent,
          replyTo: contactEmail || undefined,
        })
      )
    );
    const failures = results.filter(r => r.status === 'rejected');
    if (failures.length > 0) console.error('Some intake notification emails failed:', failures);
    return { success: failures.length === 0 };
  } catch (error) {
    console.error('Failed to send intake notification:', error);
    throw error;
  }
}

export async function sendContactNotification(contact: ContactNotificationData) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #388087 0%, #6FB3B8 100%); padding: 30px 40px; text-align: center;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">New Contact Message</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px;">You have received a new contact form submission:</p>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Name:</strong>
                          <p style="margin: 5px 0 0 0; color: #333333; font-size: 15px;">${contact.name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Email:</strong>
                          <p style="margin: 5px 0 0 0; color: #333333; font-size: 15px;">
                            <a href="mailto:${contact.email}" style="color: #388087; text-decoration: none;">${contact.email}</a>
                          </p>
                        </td>
                      </tr>
                      ${contact.company ? `
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Company:</strong>
                          <p style="margin: 5px 0 0 0; color: #333333; font-size: 15px;">${contact.company}</p>
                        </td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                          <strong style="color: #388087; font-size: 14px;">Message:</strong>
                          <div style="margin: 10px 0 0 0; padding: 15px; background-color: #f9f9f9; border-radius: 6px; border-left: 3px solid #388087;">
                            <p style="margin: 0; color: #333333; font-size: 15px; white-space: pre-wrap; line-height: 1.6;">${contact.message}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0;">
                          <strong style="color: #388087; font-size: 14px;">Received:</strong>
                          <p style="margin: 5px 0 0 0; color: #666666; font-size: 14px;">${new Date(contact.createdAt).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f9f9f9; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
                    <p style="margin: 0; color: #666666; font-size: 12px;">Ephesus AI Solutions - Automated Notification</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  try {
    const results = await Promise.allSettled(
      NOTIFICATION_EMAILS.map(email =>
        resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'support@ephesusai.com',
          to: email,
          subject: `New Contact: ${contact.name}${contact.company ? ` from ${contact.company}` : ''}`,
          html: htmlContent,
          replyTo: contact.email,
        })
      )
    );

    const failures = results.filter(r => r.status === 'rejected');
    if (failures.length > 0) {
      console.error('Some notification emails failed:', failures);
    }

    return {
      success: failures.length === 0,
      sent: results.filter(r => r.status === 'fulfilled').length,
      failed: failures.length,
    };
  } catch (error) {
    console.error('Failed to send contact notification:', error);
    throw error;
  }
}