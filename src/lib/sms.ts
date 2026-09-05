type BookingSmsData = {
  name: string;
  email: string;
  company?: string | null;
  date: string;
  timeSlot: string;
  notes?: string | null;
};

const DEFAULT_BOOKING_SMS_TO = '+15714657846';

function normalizePhoneNumber(value: string) {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return value.startsWith('+') ? value : `+${digits}`;
}

export async function sendBookingSmsNotification(booking: BookingSmsData) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = normalizePhoneNumber(process.env.BOOKING_SMS_TO || DEFAULT_BOOKING_SMS_TO);

  if (!accountSid || !authToken || !from) {
    console.warn('Twilio credentials not configured. Skipping booking SMS notification.');
    return { success: false, skipped: true };
  }

  const body = [
    `New Ephesus booking: ${booking.name}`,
    booking.company ? `Company: ${booking.company}` : null,
    `${booking.date} at ${booking.timeSlot}`,
    `Email: ${booking.email}`,
    booking.notes ? `Notes: ${booking.notes.slice(0, 120)}` : null,
  ].filter(Boolean).join('\n');

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      To: to,
      From: from,
      Body: body,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio SMS failed: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  return { success: true, skipped: false, sid: result.sid as string | undefined };
}
