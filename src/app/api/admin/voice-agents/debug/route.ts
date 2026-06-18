import { NextRequest, NextResponse } from 'next/server';
import { authorizeAdminRequest } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const authorization = await authorizeAdminRequest(req.headers);
  if (!authorization.ok) return authorization.response;

  const assistantId = req.nextUrl.searchParams.get('assistantId');
  if (!assistantId) return NextResponse.json({ error: 'assistantId required' }, { status: 400 });

  const key = process.env.VAPI_PRIVATE_KEY;
  if (!key) return NextResponse.json({ error: 'VAPI_PRIVATE_KEY not set' }, { status: 500 });

  // Fetch raw calls from Vapi
  const params = new URLSearchParams({ assistantId, limit: '5' });
  const res = await fetch(`https://api.vapi.ai/call?${params}`, {
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
  });

  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = text; }

  const sample = Array.isArray(data) ? data[0] : data;
  // Show the keys and phone-related fields specifically
  const phoneFields = sample ? {
    phoneNumber: sample.phoneNumber,
    customer: sample.customer,
    to: sample.to,
    from: sample.from,
    durationSeconds: sample.durationSeconds,
    durationMinutes: sample.durationMinutes,
    startedAt: sample.startedAt,
    endedAt: sample.endedAt,
    variableValues: sample.variableValues,
    assistantOverrides: sample.assistantOverrides,
    topLevelKeys: Object.keys(sample),
    // Simulate the calledNumber resolution
    resolvedCalledNumber:
      sample.variableValues?.phoneNumber?.number ||
      sample.phoneNumber?.number ||
      sample.phoneNumber?.twilioPhoneNumber ||
      sample.to ||
      null,
  } : null;
  return NextResponse.json({ status: res.status, callCount: Array.isArray(data) ? data.length : 'not-array', phoneFields, sample });
}
