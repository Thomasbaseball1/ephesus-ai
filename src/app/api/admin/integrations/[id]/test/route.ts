import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { outlookIntegrations, user as userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

const ADMIN_EMAIL = 'tmore.haller@yahoo.com';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { id } = await params;

  const [integration] = await db
    .select({
      n8nWebhookUrl: outlookIntegrations.n8nWebhookUrl,
      outlookEmail: outlookIntegrations.email,
      userId: outlookIntegrations.userId,
      userName: userTable.name,
      companyName: userTable.companyName,
    })
    .from(outlookIntegrations)
    .leftJoin(userTable, eq(outlookIntegrations.userId, userTable.id))
    .where(eq(outlookIntegrations.id, Number(id)))
    .limit(1);

  if (!integration?.n8nWebhookUrl) {
    return NextResponse.json({ error: 'No N8N webhook URL configured' }, { status: 400 });
  }

  const testPayload = {
    type: 'test',
    timestamp: new Date().toISOString(),
    client: {
      userId: integration.userId,
      name: integration.userName,
      company: integration.companyName,
      outlookEmail: integration.outlookEmail,
    },
    email: {
      id: 'test-email-id',
      subject: 'Test email from Ephesus AI',
      from: { name: 'Test Sender', address: 'test@example.com' },
      receivedAt: new Date().toISOString(),
      bodyPreview: 'This is a test payload sent from the Ephesus AI admin panel to verify your N8N webhook is working correctly.',
      isRead: false,
    },
  };

  const n8nRes = await fetch(integration.n8nWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testPayload),
  });

  if (!n8nRes.ok) {
    return NextResponse.json({ error: `N8N returned ${n8nRes.status}` }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
