import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { demoCrmServices, demoCrmTechnicians } from '@/db/schema';
import {
  DEMO_COMPANY,
  ensureDemoCrmCatalogSeeded,
  findService,
  respondToToolCalls,
  text,
  type ToolInput,
} from '@/lib/demo-crm';

async function loadCatalog() {
  await ensureDemoCrmCatalogSeeded();
  const [services, technicians] = await Promise.all([
    db.select().from(demoCrmServices).where(eq(demoCrmServices.company, DEMO_COMPANY)),
    db.select().from(demoCrmTechnicians).where(eq(demoCrmTechnicians.company, DEMO_COMPANY)),
  ]);
  return { services, technicians };
}

async function lookupService(args: ToolInput) {
  const { services, technicians } = await loadCatalog();
  const query = text(args.serviceName ?? args.service ?? args.name ?? args.serviceId ?? args.id);

  if (!query) {
    return {
      success: true,
      company: DEMO_COMPANY,
      services: services.map(s => ({ id: s.id, category: s.category, name: s.name, durationMinutes: s.durationMinutes, price: s.price })),
      technicians: technicians.map(t => ({ name: t.name, specialty: t.specialty })),
      message: `We offer ${services.length} services across HVAC, plumbing, and maintenance. Ask about a specific one for price and duration.`,
    };
  }

  const match = findService(query, services);
  if (!match) {
    return {
      success: false,
      message: `I couldn't find a service called "${query}". Available services: ${services.map(s => s.name).join(', ')}.`,
    };
  }

  return {
    success: true,
    service: { id: match.id, category: match.category, name: match.name, durationMinutes: match.durationMinutes, price: match.price },
    message: match.price > 0
      ? `${match.name} is ${match.durationMinutes} minutes and typically $${match.price}.`
      : `${match.name} is ${match.durationMinutes} minutes; pricing is quoted on site.`,
  };
}

export async function GET() {
  const { services, technicians } = await loadCatalog();
  return NextResponse.json({ company: DEMO_COMPANY, services, technicians });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({})) as Record<string, unknown>;
    const result = await respondToToolCalls(body, lookupService);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[demo-crm-services] POST failed:', error);
    return NextResponse.json({ success: false, error: 'Unable to look up services.' }, { status: 500 });
  }
}
