import { NextRequest, NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { db } from '@/db';
import { lawnCareLeads } from '@/db/schema';
import { ensureLawnCareLeadTable, normalizeLawnCareLead } from '@/lib/lawn-care-leads';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Lead-Webhook-Secret',
    },
  });
}

function isAuthorized(request: NextRequest) {
  const secret = process.env.LAWN_CARE_LEAD_WEBHOOK_SECRET;
  if (!secret) return true;

  const bearer = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  const headerSecret = request.headers.get('x-lead-webhook-secret')?.trim();
  return bearer === secret || headerSecret === secret;
}

export async function GET() {
  try {
    await ensureLawnCareLeadTable();
    const leads = await db
      .select()
      .from(lawnCareLeads)
      .orderBy(desc(lawnCareLeads.createdAt))
      .limit(50);

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('[lawn-care-leads] GET failed:', error);
    return NextResponse.json({ error: 'Unable to load lawn care leads' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized lead source' }, { status: 401 });
    }

    const body = await request.json();
    const normalized = normalizeLawnCareLead(body);
    const now = new Date().toISOString();

    await ensureLawnCareLeadTable();
    const [lead] = await db
      .insert(lawnCareLeads)
      .values({
        ...normalized,
        scoreReasons: JSON.stringify(normalized.scoreReasons),
        rawPayload: JSON.stringify(body),
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(
      {
        lead,
        decision: {
          score: normalized.score,
          label: normalized.scoreLabel,
          reasons: normalized.scoreReasons,
          nextBestAction: normalized.nextBestAction,
        },
      },
      {
        status: 201,
        headers: { 'Access-Control-Allow-Origin': '*' },
      },
    );
  } catch (error) {
    console.error('[lawn-care-leads] POST failed:', error);
    const message = error instanceof Error ? error.message : 'Unable to receive lead';
    return NextResponse.json({ error: message }, { status: message.includes('required') ? 400 : 500 });
  }
}
