import { google } from 'googleapis';

// Parse the time slot string (e.g. "9:00 AM - 9:45 AM") into start/end Date objects
function parseTimeSlot(dateStr: string, timeSlot: string): { start: Date; end: Date } {
  const [startTime] = timeSlot.split(' - ');

  const parseTime = (time: string, baseDate: string): Date => {
    const [datePart] = [baseDate];
    const d = new Date(`${datePart}T00:00:00`);

    const match = time.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) throw new Error(`Invalid time format: ${time}`);

    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    d.setHours(hours, minutes, 0, 0);
    return d;
  };

  const start = parseTime(startTime.trim(), dateStr);
  // All slots are 45 minutes
  const end = new Date(start.getTime() + 45 * 60 * 1000);

  return { start, end };
}

export interface BookingData {
  name: string;
  email: string;
  company?: string | null;
  date: string; // "YYYY-MM-DD"
  timeSlot: string; // "9:00 AM - 9:45 AM"
  notes?: string | null;
}

export async function createGoogleCalendarEvent(booking: BookingData): Promise<string | null> {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

  if (!clientEmail || !privateKey) {
    console.warn('Google Calendar credentials not configured. Skipping calendar event creation.');
    return null;
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  const { start, end } = parseTimeSlot(booking.date, booking.timeSlot);

  const description = [
    `Consultation booked via Ephesus AI Solutions website.`,
    ``,
    `Client: ${booking.name}`,
    `Email: ${booking.email}`,
    booking.company ? `Company: ${booking.company}` : null,
    booking.notes ? `\nNotes:\n${booking.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const event = {
    summary: `Consultation: ${booking.name}${booking.company ? ` (${booking.company})` : ''}`,
    description,
    start: {
      dateTime: start.toISOString(),
      timeZone: 'America/New_York',
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: 'America/New_York',
    },
    attendees: [
      { email: booking.email, displayName: booking.name },
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 1 day before
        { method: 'popup', minutes: 30 },       // 30 min before
      ],
    },
    conferenceData: undefined, // Can add Google Meet link here if needed
  };

  const response = await calendar.events.insert({
    calendarId,
    requestBody: event,
    sendUpdates: 'all', // sends invite email to attendees
  });

  console.log(`Google Calendar event created: ${response.data.htmlLink}`);
  return response.data.id ?? null;
}
