/** Server-side — uses OpenAI to analyze a call transcript and extract structured intelligence */

interface CallAnalysis {
  callerIntent: string;
  callType: 'new_lead' | 'existing_customer' | 'support' | 'spam' | 'other';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed';
  leadScore: number; // 1–10
  buyerReadiness: 'low' | 'medium' | 'high';
  primaryTopic: string;
  secondaryTopics: string[];
  keyEntities: {
    person_names: string[];
    company_names: string[];
    phone_numbers: string[];
    emails: string[];
    locations: string[];
    dates: string[];
  };
  objections: string[];
  infoGathered: string[];
  infoMissing: string[];
  nextBestAction: string;
  followUpSms: string;
  followUpEmailSubject: string;
  followUpEmailBody: string;
  managerAlert: string;
  automationIdeas: string[];
}

const SYSTEM_PROMPT = `You are an expert sales and customer service analyst. Given a call transcript, extract structured intelligence for the CRM. Respond ONLY with a valid JSON object matching the exact schema below — no markdown, no explanation, no extra text.

Schema:
{
  "callerIntent": "string — concise description of what the caller wanted",
  "callType": "new_lead | existing_customer | support | spam | other",
  "urgency": "low | medium | high | critical",
  "sentiment": "positive | neutral | negative | mixed",
  "leadScore": 1–10 integer (10 = highly likely to convert),
  "buyerReadiness": "low | medium | high",
  "primaryTopic": "string — main subject discussed",
  "secondaryTopics": ["array", "of", "other", "topics"],
  "keyEntities": {
    "person_names": [],
    "company_names": [],
    "phone_numbers": [],
    "emails": [],
    "locations": [],
    "dates": []
  },
  "objections": ["any objections or concerns raised"],
  "infoGathered": ["key pieces of info successfully captured during call"],
  "infoMissing": ["important info not captured that should have been"],
  "nextBestAction": "string — recommended immediate follow-up action",
  "followUpSms": "string — ready-to-send SMS follow-up message (1–2 sentences, friendly)",
  "followUpEmailSubject": "string — email subject line",
  "followUpEmailBody": "string — full professional email body",
  "managerAlert": "string — one sentence flagging anything a manager should know, or 'No action required.' if nothing notable",
  "automationIdeas": ["list of automation or workflow improvements suggested by this call"]
}`;

export async function analyzeCallTranscript(
  transcript: string,
  summary?: string | null,
  businessName?: string | null
): Promise<CallAnalysis | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    console.warn('[analyze-call] OPENAI_API_KEY not set, skipping analysis');
    return null;
  }

  // Normalize the business name: strip generic suffixes like "Voice Receptionist"
  // so we get just "Ephesus AI" from "Ephesus AI Voice Receptionist"
  const normalizedBiz = businessName
    ? businessName.replace(/\s*(voice\s+receptionist|receptionist|assistant|ai\s+agent|bot)$/i, '').trim()
    : null;

  const businessContext = normalizedBiz
    ? `\n\nIMPORTANT: The AI assistant on this call works for "${normalizedBiz}". Always refer to this business by that exact name in your output — do NOT use any name the AI may have said incorrectly during the call (e.g. mispronunciations, aliases, or test names).`
    : '';

  const userContent = [
    summary ? `Call Summary: ${summary}` : '',
    `Transcript:\n${transcript}`,
  ].filter(Boolean).join('\n\n');

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        temperature: 0,
        max_tokens: 1500,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT + businessContext },
          { role: 'user', content: userContent },
        ],
      }),
    });

    if (!res.ok) {
      console.error('[analyze-call] OpenAI error:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content?.trim();
    if (!raw) return null;

    // Strip markdown code fences if present
    const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    return JSON.parse(cleaned) as CallAnalysis;
  } catch (e) {
    console.error('[analyze-call] Failed:', e);
    return null;
  }
}
