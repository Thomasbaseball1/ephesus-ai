import { sql } from 'drizzle-orm';
import { db } from '@/db';

export type LawnCareLeadInput = {
  source?: unknown;
  externalId?: unknown;
  name?: unknown;
  customerName?: unknown;
  email?: unknown;
  phone?: unknown;
  address?: unknown;
  city?: unknown;
  state?: unknown;
  zip?: unknown;
  serviceType?: unknown;
  service?: unknown;
  propertyType?: unknown;
  recurring?: unknown;
  urgency?: unknown;
  budget?: unknown;
  budgetCents?: unknown;
  preferredDate?: unknown;
  preferredTimeWindow?: unknown;
  message?: unknown;
  notes?: unknown;
};

export type NormalizedLawnCareLead = {
  source: string;
  externalId: string | null;
  customerName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  serviceType: string;
  propertyType: string | null;
  recurring: boolean;
  urgency: 'low' | 'normal' | 'high' | 'emergency';
  budgetCents: number | null;
  preferredDate: string | null;
  preferredTimeWindow: string | null;
  message: string;
  normalizedSummary: string;
  score: number;
  scoreLabel: 'Hot' | 'Warm' | 'Needs review' | 'Low fit';
  scoreReasons: string[];
  nextBestAction: string;
};

const serviceValues: Record<string, number> = {
  'recurring mowing': 24,
  'weekly mowing': 24,
  'biweekly mowing': 22,
  'spring cleanup': 18,
  'fall cleanup': 18,
  'mulch installation': 18,
  'landscape installation': 22,
  'aeration': 14,
  'fertilization': 14,
  'weed control': 12,
  'leaf removal': 12,
  'snow removal': 10,
};

const highFitZips = new Set(['40502', '40503', '40504', '40505', '40508', '40509', '40513', '40514', '40515', '40517']);

function asText(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function asMoneyCents(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.round(value > 10000 ? value : value * 100);
  }
  if (typeof value !== 'string') return null;
  const parsed = Number(value.replace(/[$,\s]/g, ''));
  if (!Number.isFinite(parsed)) return null;
  return Math.round(parsed > 10000 ? parsed : parsed * 100);
}

function asBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value > 0;
  if (typeof value !== 'string') return false;
  return ['true', 'yes', 'y', '1', 'recurring', 'weekly', 'biweekly', 'monthly'].includes(value.trim().toLowerCase());
}

function normalizeUrgency(value: unknown, message: string): NormalizedLawnCareLead['urgency'] {
  const text = `${asText(value) ?? ''} ${message}`.toLowerCase();
  if (/\b(emergency|asap|today|urgent|immediately|same day)\b/.test(text)) return 'emergency';
  if (/\b(this week|soon|rush|deadline|before friday|tomorrow)\b/.test(text)) return 'high';
  if (/\b(flexible|whenever|no rush|next month)\b/.test(text)) return 'low';
  return 'normal';
}

function inferServiceType(input: LawnCareLeadInput, message: string): string {
  const explicit = asText(input.serviceType) ?? asText(input.service);
  if (explicit) return explicit;

  const haystack = message.toLowerCase();
  const match = Object.keys(serviceValues).find((service) => haystack.includes(service));
  if (match) return match.replace(/\b\w/g, (letter) => letter.toUpperCase());
  if (haystack.includes('mow') || haystack.includes('grass')) return 'Recurring Mowing';
  if (haystack.includes('cleanup') || haystack.includes('clean up')) return 'Spring Cleanup';
  if (haystack.includes('mulch')) return 'Mulch Installation';
  if (haystack.includes('landscape')) return 'Landscape Installation';
  return 'General Lawn Care';
}

function scoreLead(lead: Omit<NormalizedLawnCareLead, 'score' | 'scoreLabel' | 'scoreReasons' | 'nextBestAction'>) {
  let score = 30;
  const reasons: string[] = [];
  const serviceKey = lead.serviceType.toLowerCase();
  const serviceValue = Object.entries(serviceValues).find(([key]) => serviceKey.includes(key))?.[1] ?? 8;

  score += serviceValue;
  reasons.push(`${lead.serviceType} fit added ${serviceValue} points`);

  if (lead.recurring || /weekly|biweekly|monthly|recurring/.test(serviceKey)) {
    score += 18;
    reasons.push('Recurring work increases lifetime value');
  }

  if (lead.urgency === 'emergency') {
    score += 14;
    reasons.push('Urgent request needs immediate response');
  } else if (lead.urgency === 'high') {
    score += 9;
    reasons.push('High timing intent');
  } else if (lead.urgency === 'low') {
    score -= 4;
    reasons.push('Flexible timing lowers urgency');
  }

  if (lead.zip && highFitZips.has(lead.zip)) {
    score += 12;
    reasons.push('Address is inside the preferred service area');
  } else if (lead.city && /lexington|nicholasville|versailles|georgetown/i.test(lead.city)) {
    score += 8;
    reasons.push('City is within the demo route market');
  } else if (lead.city || lead.zip) {
    score += 3;
    reasons.push('Location is available for route review');
  }

  if (lead.budgetCents && lead.budgetCents >= 75000) {
    score += 10;
    reasons.push('Budget indicates a larger job');
  } else if (lead.budgetCents && lead.budgetCents >= 25000) {
    score += 5;
    reasons.push('Budget is workable for a standard crew visit');
  }

  if (lead.phone) {
    score += 4;
    reasons.push('Phone number captured for fast follow-up');
  }
  if (lead.email) {
    score += 3;
    reasons.push('Email captured for quote and nurture sequence');
  }

  score = Math.max(1, Math.min(100, score));

  const scoreLabel: NormalizedLawnCareLead['scoreLabel'] =
    score >= 78 ? 'Hot' : score >= 58 ? 'Warm' : score >= 38 ? 'Needs review' : 'Low fit';
  const nextBestAction =
    score >= 78
      ? 'Call now, confirm property details, and offer the nearest crew opening.'
      : score >= 58
        ? 'Send quote request follow-up and propose two available appointment windows.'
        : score >= 38
          ? 'Ask for missing property details before assigning a crew.'
          : 'Add to nurture list unless the customer provides stronger timing or route fit.';

  return { score, scoreLabel, scoreReasons: reasons, nextBestAction };
}

export function normalizeLawnCareLead(input: LawnCareLeadInput): NormalizedLawnCareLead {
  const message = asText(input.message) ?? asText(input.notes) ?? 'No message provided.';
  const serviceType = inferServiceType(input, message);
  const customerName = asText(input.customerName) ?? asText(input.name);
  if (!customerName) {
    throw new Error('customerName or name is required');
  }

  const base = {
    source: asText(input.source) ?? 'manual',
    externalId: asText(input.externalId),
    customerName,
    email: asText(input.email)?.toLowerCase() ?? null,
    phone: asText(input.phone),
    address: asText(input.address),
    city: asText(input.city),
    state: asText(input.state),
    zip: asText(input.zip),
    serviceType,
    propertyType: asText(input.propertyType),
    recurring: asBoolean(input.recurring) || /weekly|biweekly|monthly|recurring/i.test(serviceType),
    urgency: normalizeUrgency(input.urgency, message),
    budgetCents: asMoneyCents(input.budgetCents) ?? asMoneyCents(input.budget),
    preferredDate: asText(input.preferredDate),
    preferredTimeWindow: asText(input.preferredTimeWindow),
    message,
    normalizedSummary: `${customerName} requested ${serviceType}${asText(input.city) ? ` in ${asText(input.city)}` : ''}. ${message}`,
  };

  return { ...base, ...scoreLead(base) };
}

export async function ensureLawnCareLeadTable() {
  await db.run(sql`
    CREATE TABLE IF NOT EXISTS lawn_care_leads (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      source text NOT NULL DEFAULT 'manual',
      external_id text,
      customer_name text NOT NULL,
      email text,
      phone text,
      address text,
      city text,
      state text,
      zip text,
      service_type text NOT NULL,
      property_type text,
      recurring integer NOT NULL DEFAULT 0,
      urgency text NOT NULL DEFAULT 'normal',
      budget_cents integer,
      preferred_date text,
      preferred_time_window text,
      message text NOT NULL,
      normalized_summary text NOT NULL,
      score integer NOT NULL,
      score_label text NOT NULL,
      score_reasons text NOT NULL,
      next_best_action text NOT NULL,
      status text NOT NULL DEFAULT 'new',
      raw_payload text NOT NULL,
      created_at text NOT NULL,
      updated_at text NOT NULL
    )
  `);
}
