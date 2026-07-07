import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { eq } from 'drizzle-orm';
import { google } from 'googleapis';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { googleCalendarIntegrations, outlookIntegrations } from '@/db/schema';
import {
  ensureFreshGoogleCalendarToken,
  getGoogleCalendarOAuthClient,
} from '@/lib/google-calendar-oauth';
import { ensureFreshToken } from '@/lib/outlook-refresh';

type CrmEmail = {
  id: string;
  provider: 'gmail' | 'outlook';
  account: string;
  from: string;
  subject: string;
  time: string;
  body: string;
  linked: string;
  action: string;
  receivedAt?: string;
};

function header(headers: Array<{ name?: string | null; value?: string | null }> | undefined, name: string) {
  return headers?.find(item => item.name?.toLowerCase() === name.toLowerCase())?.value || '';
}

function htmlToText(value = '') {
  return value
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeBase64Url(value = '') {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(normalized, 'base64').toString('utf8');
}

function gmailBody(payload: any): string {
  if (!payload) return '';
  if (payload.body?.data) return htmlToText(decodeBase64Url(payload.body.data));

  const parts = Array.isArray(payload.parts) ? payload.parts : [];
  const plain = parts.find((part: any) => part.mimeType === 'text/plain' && part.body?.data);
  if (plain) return htmlToText(decodeBase64Url(plain.body.data));

  const html = parts.find((part: any) => part.mimeType === 'text/html' && part.body?.data);
  if (html) return htmlToText(decodeBase64Url(html.body.data));

  for (const part of parts) {
    const nested = gmailBody(part);
    if (nested) return nested;
  }

  return '';
}

function timeLabel(value?: string) {
  if (!value) return 'Recent';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

async function readGmailMessages(userId: string): Promise<CrmEmail[]> {
  const integrations = await db
    .select()
    .from(googleCalendarIntegrations)
    .where(eq(googleCalendarIntegrations.userId, userId));

  const messages = await Promise.all(integrations.map(async integration => {
    if (!(integration.scopes || '').includes('gmail.readonly')) return [];

    const fresh = await ensureFreshGoogleCalendarToken(integration.id);
    if (!fresh) return [];

    const oauth2Client = getGoogleCalendarOAuthClient(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
    oauth2Client.setCredentials({
      access_token: fresh.accessToken,
      refresh_token: fresh.refreshToken,
      expiry_date: fresh.expiresAt * 1000,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const list = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 10,
      q: 'newer_than:30d',
    });

    const ids = list.data.messages || [];
    const rows = await Promise.all(ids.map(async item => {
      const message = await gmail.users.messages.get({
        userId: 'me',
        id: item.id || '',
        format: 'full',
        metadataHeaders: ['From', 'Subject', 'Date'],
      });

      const payload = message.data.payload;
      const receivedAt = header(payload?.headers, 'Date');
      const subject = header(payload?.headers, 'Subject') || '(No subject)';
      const from = header(payload?.headers, 'From') || integration.email;
      const body = gmailBody(payload) || message.data.snippet || '';

      return {
        id: `gmail-${integration.id}-${message.data.id}`,
        provider: 'gmail' as const,
        account: integration.email,
        from,
        subject,
        time: timeLabel(receivedAt),
        body,
        linked: 'Live Gmail message',
        action: 'Review the message, match it to a customer, then open the schedule if it needs a job.',
        receivedAt: receivedAt ? new Date(receivedAt).toISOString() : undefined,
      };
    }));

    return rows;
  }));

  return messages.flat();
}

async function readOutlookMessages(userId: string): Promise<CrmEmail[]> {
  const integrations = await db
    .select()
    .from(outlookIntegrations)
    .where(eq(outlookIntegrations.userId, userId));

  const messages = await Promise.all(integrations.map(async integration => {
    const fresh = await ensureFreshToken(integration.id);
    if (!fresh) return [];

    const [freshIntegration] = await db
      .select()
      .from(outlookIntegrations)
      .where(eq(outlookIntegrations.id, integration.id))
      .limit(1);

    if (!freshIntegration) return [];

    const params = new URLSearchParams({
      '$top': '10',
      '$select': 'id,subject,from,receivedDateTime,bodyPreview,webLink',
      '$orderby': 'receivedDateTime desc',
    });

    const response = await fetch(`https://graph.microsoft.com/v1.0/me/messages?${params}`, {
      headers: {
        Authorization: `Bearer ${freshIntegration.accessToken}`,
        Prefer: 'outlook.body-content-type="text"',
      },
    });

    if (!response.ok) {
      console.error('[trades-crm] Outlook inbox read failed:', await response.text());
      return [];
    }

    const data = await response.json();
    const rows = Array.isArray(data.value) ? data.value : [];
    return rows.map((message: any) => ({
      id: `outlook-${integration.id}-${message.id}`,
      provider: 'outlook' as const,
      account: integration.email,
      from: message.from?.emailAddress?.name || message.from?.emailAddress?.address || integration.email,
      subject: message.subject || '(No subject)',
      time: timeLabel(message.receivedDateTime),
      body: message.bodyPreview || '',
      linked: 'Live Outlook message',
      action: 'Review the message, match it to a customer, then open the schedule if it needs a job.',
      receivedAt: message.receivedDateTime,
    }));
  }));

  return messages.flat();
}

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ connected: false, emails: [] }, { status: 401 });

  try {
    const [gmail, outlook] = await Promise.all([
      readGmailMessages(session.user.id),
      readOutlookMessages(session.user.id),
    ]);

    const emails = [...gmail, ...outlook]
      .sort((a, b) => new Date(b.receivedAt || 0).getTime() - new Date(a.receivedAt || 0).getTime())
      .slice(0, 20);

    return NextResponse.json({
      connected: gmail.length > 0 || outlook.length > 0,
      counts: { gmail: gmail.length, outlook: outlook.length },
      emails,
    });
  } catch (error) {
    console.error('[trades-crm] Failed to read live inbox:', error);
    return NextResponse.json({ error: 'Failed to read live inbox' }, { status: 500 });
  }
}
