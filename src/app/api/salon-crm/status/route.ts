import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    app: 'GlossDesk CRM',
    mode: 'ephesus-hosted-demo',
    calendarHandoffs: ['google-calendar-link', 'outlook-calendar-link', 'ics-export', 'ics-import'],
    realSyncRequires: ['Google OAuth client', 'Microsoft Entra app registration', 'Calendar API permissions'],
  });
}
