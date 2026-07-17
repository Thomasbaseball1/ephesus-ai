import { db } from '@/db';
import { demoCrmServices, demoCrmTechnicians } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Shared helpers for the demo CRM Vapi tool bridge (services, availability,
// bookings). Kept in one place so all three tools parse Vapi's tool-call
// envelope and normalize dates/times the same way.

export const DEMO_COMPANY = 'Ephesus Demo Trades CRM';
export const DEMO_STATUS = 'demo-crm-booking';
export const DEFAULT_SERVICE = 'AC diagnostic';
export const DEFAULT_TECHNICIAN = 'Ramos';
export const DEFAULT_DURATION = 90;
export const BUSINESS_HOURS = { startMinutes: 8 * 60, endMinutes: 17 * 60 };
export const SLOT_STEP_MINUTES = 30;

// Mirrors public/trades-crm-demo/main.js so the phone bridge and the visual
// CRM demo always describe the same catalog.
export const DEMO_SERVICES = [
  { category: 'HVAC', name: 'AC diagnostic', durationMinutes: 90, price: 149 },
  { category: 'HVAC', name: 'No-cool emergency', durationMinutes: 120, price: 225 },
  { category: 'HVAC', name: 'Seasonal tune-up', durationMinutes: 75, price: 129 },
  { category: 'HVAC', name: 'Mini-split service', durationMinutes: 120, price: 245 },
  { category: 'HVAC', name: 'Furnace repair', durationMinutes: 120, price: 195 },
  { category: 'HVAC', name: 'System replacement estimate', durationMinutes: 90, price: 0 },
  { category: 'Plumbing', name: 'Leak inspection', durationMinutes: 90, price: 175 },
  { category: 'Plumbing', name: 'Water heater repair', durationMinutes: 120, price: 225 },
  { category: 'Plumbing', name: 'Drain cleaning', durationMinutes: 90, price: 189 },
  { category: 'Plumbing', name: 'Sewer camera inspection', durationMinutes: 120, price: 299 },
  { category: 'Plumbing', name: 'Fixture install', durationMinutes: 150, price: 349 },
  { category: 'Plumbing', name: 'Emergency shutoff / flood call', durationMinutes: 120, price: 275 },
  { category: 'Maintenance', name: 'Membership visit', durationMinutes: 90, price: 0 },
  { category: 'Maintenance', name: 'Filter and safety check', durationMinutes: 60, price: 89 },
  { category: 'Sales', name: 'Comfort advisor estimate', durationMinutes: 120, price: 0 },
  { category: 'Custom', name: 'Custom work order', durationMinutes: 90, price: 0 },
] as const;

export const DEMO_TECHNICIANS = [
  { name: 'Ramos', specialty: 'HVAC' },
  { name: 'Keisha', specialty: 'Plumbing' },
  { name: 'Dawson', specialty: 'Plumbing' },
  { name: 'Priya', specialty: 'HVAC' },
] as const;

// Mirrors public/salon-crm-demo/app.js's seedEmployees/seedAppointments so
// the phone bridge and the visual Salon Biz CRM demo describe the same
// stylists and services.
export const SALON_COMPANY = 'Ephesus Demo Salon CRM';
export const SALON_STATUS = 'demo-crm-booking';
export const SALON_DEFAULT_SERVICE = 'Gloss and style';
export const SALON_DEFAULT_TECHNICIAN = 'Jules';
export const SALON_DEFAULT_DURATION = 60;

export const SALON_SERVICES = [
  { category: 'Styling', name: 'Gloss and style', durationMinutes: 60, price: 85 },
  { category: 'Styling', name: 'Bridal styling', durationMinutes: 120, price: 225 },
  { category: 'Color', name: 'Root touch-up', durationMinutes: 90, price: 110 },
  { category: 'Color', name: 'Balayage', durationMinutes: 120, price: 195 },
  { category: 'Color', name: 'Blonding', durationMinutes: 90, price: 175 },
  { category: 'Color', name: 'Balayage consult', durationMinutes: 45, price: 0 },
  { category: 'Cuts', name: 'Cut and blowout', durationMinutes: 60, price: 75 },
  { category: 'Cuts', name: 'Texture treatment', durationMinutes: 90, price: 130 },
  { category: 'Treatments', name: 'Deep conditioning treatment', durationMinutes: 45, price: 55 },
] as const;

export const SALON_TECHNICIANS = [
  { name: 'Jules', specialty: 'Gloss, color, bridal styling' },
  { name: 'Amara', specialty: 'Balayage, blonding, consults' },
  { name: 'Kenji', specialty: 'Cuts, blowouts, texture' },
  { name: 'Sasha', specialty: 'Color consults, treatments' },
] as const;

const seededCompanies = new Set<string>();

/** Idempotently seeds a demo catalog on first use for the given company.
 * `db:push` only applies schema (DDL), so data seeding happens lazily here
 * instead of a separate migration step the deploy pipeline would need to
 * remember to run. */
export async function ensureCatalogSeeded(
  company: string,
  services: ReadonlyArray<{ category: string; name: string; durationMinutes: number; price: number }>,
  technicians: ReadonlyArray<{ name: string; specialty: string }>
) {
  if (seededCompanies.has(company)) return;

  const existing = await db.select({ id: demoCrmServices.id }).from(demoCrmServices).where(eq(demoCrmServices.company, company)).limit(1);
  if (existing.length === 0) {
    await db.insert(demoCrmServices).values(
      services.map(service => ({ company, ...service }))
    );
  }

  const existingTechs = await db.select({ id: demoCrmTechnicians.id }).from(demoCrmTechnicians).where(eq(demoCrmTechnicians.company, company)).limit(1);
  if (existingTechs.length === 0) {
    await db.insert(demoCrmTechnicians).values(
      technicians.map(tech => ({ company, ...tech }))
    );
  }

  seededCompanies.add(company);
}

export async function ensureDemoCrmCatalogSeeded() {
  return ensureCatalogSeeded(DEMO_COMPANY, DEMO_SERVICES, DEMO_TECHNICIANS);
}

export async function ensureSalonCatalogSeeded() {
  return ensureCatalogSeeded(SALON_COMPANY, SALON_SERVICES, SALON_TECHNICIANS);
}

export type ToolInput = Record<string, unknown>;

export function text(value: unknown, fallback = '') {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return fallback;
}

export function todayIso() {
  const date = new Date();
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return offsetDate.toISOString().slice(0, 10);
}

export function normalizeDate(value: unknown) {
  const raw = text(value);
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const parsed = raw ? new Date(raw) : null;
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString().slice(0, 10) : todayIso();
}

export function normalizeTime(value: unknown, fallback = '09:00') {
  const raw = text(value, fallback);
  const match = raw.match(/^(\d{1,2})(?::?(\d{2}))?\s*(am|pm)?$/i);
  if (!match) return fallback;

  let hour = Number(match[1]);
  const minute = Number(match[2] || '00');
  const meridiem = match[3]?.toLowerCase();

  if (meridiem === 'pm' && hour < 12) hour += 12;
  if (meridiem === 'am' && hour === 12) hour = 0;
  if (hour > 23 || minute > 59) return fallback;

  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function numberValue(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function parseToolArguments(raw: unknown): ToolInput {
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed as ToolInput : {};
    } catch {
      return {};
    }
  }
  return raw && typeof raw === 'object' ? raw as ToolInput : {};
}

export function toolCallsFrom(body: Record<string, unknown>) {
  const message = body.message as Record<string, unknown> | undefined;
  const calls = message?.toolCalls ?? body.toolCalls;
  return Array.isArray(calls) ? calls as Array<Record<string, unknown>> : [];
}

export function metadataFrom(notes: string | null) {
  try {
    const parsed = JSON.parse(notes || '{}');
    return parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
}

export function minutes(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  return (hour || 0) * 60 + (minute || 0);
}

export function overlaps(startA: string, durationA: number, startB: string, durationB: number) {
  const aStart = minutes(startA);
  const bStart = minutes(startB);
  return aStart < bStart + durationB && bStart < aStart + durationA;
}

export function vapiResult(toolCallId: unknown, payload: Record<string, unknown>) {
  return { toolCallId: text(toolCallId, 'demo-tool'), result: payload };
}

/** Runs `handler` once per Vapi tool call in the request, or once for a
 * plain JSON body when no tool-call envelope is present (lets the same
 * route be curl-tested directly). */
export async function respondToToolCalls(
  body: Record<string, unknown>,
  handler: (args: ToolInput) => Promise<Record<string, unknown>>
) {
  const toolCalls = toolCallsFrom(body);

  if (toolCalls.length > 0) {
    const results = await Promise.all(toolCalls.map(async call => {
      const fn = call.function as Record<string, unknown> | undefined;
      const args = parseToolArguments(fn?.arguments ?? call.arguments ?? {});
      const payload = await handler(args);
      return vapiResult(call.id, payload);
    }));
    return { results };
  }

  return handler(body);
}

export function findService(nameOrId: unknown, services: Array<typeof demoCrmServices.$inferSelect>) {
  const raw = text(nameOrId).toLowerCase();
  if (!raw) return undefined;
  const byId = Number(raw);
  if (Number.isFinite(byId) && Number.isInteger(byId)) {
    const match = services.find(service => service.id === byId);
    if (match) return match;
  }
  return services.find(service => service.name.toLowerCase() === raw)
    ?? services.find(service => service.name.toLowerCase().includes(raw));
}
