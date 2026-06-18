/** Server-side Vapi API client — never import this in client components */

const BASE = 'https://api.vapi.ai';

function headers() {
  const key = process.env.VAPI_PRIVATE_KEY;
  if (!key) throw new Error('VAPI_PRIVATE_KEY env var is not set');
  return {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  };
}

// ── Assistants ────────────────────────────────────────────────────────────────

export interface VapiAssistant {
  id: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
  model?: { provider?: string; model?: string };
  voice?: { provider?: string; voiceId?: string };
  firstMessage?: string;
  instructions?: string;
  phoneNumbers?: { number: string }[];
}

export async function listAssistants(): Promise<VapiAssistant[]> {
  const res = await fetch(`${BASE}/assistant`, { headers: headers() });
  if (!res.ok) throw new Error(`Vapi listAssistants failed: ${res.status} ${await res.text()}`);
  return res.json();
}

export async function getAssistant(id: string): Promise<VapiAssistant> {
  const res = await fetch(`${BASE}/assistant/${id}`, { headers: headers() });
  if (!res.ok) throw new Error(`Vapi getAssistant failed: ${res.status}`);
  return res.json();
}

// ── Calls ─────────────────────────────────────────────────────────────────────

export interface VapiCall {
  id: string;
  assistantId?: string;
  type?: string;
  status?: string;
  endedReason?: string;
  createdAt?: string;
  updatedAt?: string;
  startedAt?: string;
  endedAt?: string;
  queuedAt?: string;
  durationSeconds?: number;
  durationMinutes?: number;
  transcript?: string;
  summary?: string;
  structuredData?: Record<string, unknown>;
  successEvaluation?: string;
  successEvaluationReason?: string;
  recordingUrl?: string;
  stereoRecordingUrl?: string;
  videoRecordingUrl?: string;
  messages?: unknown[];
  toolCalls?: unknown[];
  analysis?: Record<string, unknown>;
  costBreakdown?: Record<string, unknown>;
  cost?: number;
  metadata?: Record<string, unknown>;
  artifact?: {
    messages?: unknown[];
    messagesOpenAIFormatted?: unknown[];
    recording?: { mono?: { url?: string }; stereo?: { url?: string } };
    video?: { url?: string };
    transcript?: string;
  };
  customer?: {
    number?: string;
    name?: string;
    extension?: string;
  };
  phoneNumber?: {
    number?: string;
    id?: string;
  };
  destination?: {
    type?: string;
    number?: string;
    message?: string;
    description?: string;
  };
  forwardedPhoneNumber?: string;
  transport?: Record<string, unknown>;
  webCallUrl?: string;
  variableValues?: {
    phoneNumber?: {
      number?: string;
      id?: string;
      name?: string;
    };
    [key: string]: unknown;
  };
}

export async function listCallsForAssistant(
  assistantId: string,
  limit = 1000,
  createdAfter?: string
): Promise<VapiCall[]> {
  const params = new URLSearchParams({
    assistantId,
    limit: String(limit),
  });
  if (createdAfter) params.set('createdAtGt', createdAfter);

  const res = await fetch(`${BASE}/call?${params}`, { headers: headers() });
  if (!res.ok) throw new Error(`Vapi listCalls failed: ${res.status} ${await res.text()}`);

  const data = await res.json();

  // Vapi may return a plain array OR a paginated object { results: [...] }
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  if (data && Array.isArray(data.calls)) return data.calls;

  console.warn('[vapi] Unexpected listCalls response shape:', JSON.stringify(data).slice(0, 200));
  return [];
}

export async function getCall(callId: string): Promise<VapiCall> {
  const res = await fetch(`${BASE}/call/${callId}`, { headers: headers() });
  if (!res.ok) throw new Error(`Vapi getCall failed: ${res.status}`);
  return res.json();
}
