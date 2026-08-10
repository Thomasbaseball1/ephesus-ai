import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';
import { DemoExperience } from '@/components/DemoExperience';
import { LawnCareLeadConsole } from '@/components/LawnCareLeadConsole';
import { db } from '@/db';
import { lawnCareLeads } from '@/db/schema';
import { ensureLawnCareLeadTable } from '@/lib/lawn-care-leads';
import {
  ArrowRight,
  BellRing,
  CalendarDays,
  DatabaseZap,
  MonitorPlay,
  Route,
  ShieldCheck,
  Target,
  Wrench,
} from 'lucide-react';

const leadPipeline = [
  {
    title: 'Capture',
    text: 'Collect lawn care requests from website forms, email, or phone intake.',
    icon: DatabaseZap,
  },
  {
    title: 'Normalize',
    text: 'Turn every request into one lead record with customer, property, service, urgency, and source fields.',
    icon: Route,
  },
  {
    title: 'Score',
    text: 'Rank each lead against a lawn care Ideal Job Profile using service area, job type, route density, value, and urgency.',
    icon: Target,
  },
  {
    title: 'Act',
    text: 'Trigger the right next step: owner alert, CRM task, booking prompt, follow-up email, or phone handoff.',
    icon: BellRing,
  },
];

const minimumCredentials = [
  {
    label: 'Bare demo',
    value: 'None',
    detail: 'The section can run as a guided website demo with sample leads and browser state.',
  },
  {
    label: 'Live app core',
    value: 'Database + auth',
    detail: 'Turso database URL/token plus Better Auth URL/secret for real accounts and stored leads.',
  },
  {
    label: 'AI scoring',
    value: 'OpenAI API key',
    detail: 'Used to classify service type, explain the score, and draft recommended next actions.',
  },
  {
    label: 'Alerts',
    value: 'Resend API key',
    detail: 'Needed for owner email alerts, intake notifications, and follow-up email workflows.',
  },
  {
    label: 'Phone automation',
    value: 'Vapi keys',
    detail: 'Needed only if the lead scorer should place or receive AI calls.',
  },
  {
    label: 'Live inbox/calendar',
    value: 'Google / Microsoft OAuth',
    detail: 'Needed only for Gmail, Outlook, Google Calendar, and Outlook Calendar sync.',
  },
];

export default async function DashboardDemoPage() {
  await ensureLawnCareLeadTable();
  const latestLawnCareLeads = await db
    .select()
    .from(lawnCareLeads)
    .orderBy(desc(lawnCareLeads.createdAt))
    .limit(20);

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Give it a try"
        title="Give it a Try"
        description="Try the AI conversation preview and hosted business app demos from your client portal."
        icon={MonitorPlay}
        status="Interactive"
      />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <Link
          href="/dashboard/demo/salon-crm"
          className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:border-[#77ead6]/30 hover:bg-white/[0.08]"
        >
          <span className="mb-4 inline-grid h-10 w-10 place-items-center rounded-xl border border-[#77ead6]/20 bg-[#77ead6]/10 text-[#77ead6]">
            <CalendarDays className="h-5 w-5" />
          </span>
          <p className="dashboard-kicker">Hosted build demo</p>
          <h2 className="text-xl font-semibold text-white">Salon Biz CRM</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Open a working salon CRM with bookings, clients, email, reports, and calendar handoffs.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#77ead6]">
            Launch CRM demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          href="/dashboard/demo/trades-crm"
          className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:border-[#77ead6]/30 hover:bg-white/[0.08]"
        >
          <span className="mb-4 inline-grid h-10 w-10 place-items-center rounded-xl border border-[#77ead6]/20 bg-[#77ead6]/10 text-[#77ead6]">
            <Wrench className="h-5 w-5" />
          </span>
          <p className="dashboard-kicker">Hosted build demo</p>
          <h2 className="text-xl font-semibold text-white">HVAC + Plumbing CRM</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Open a field-service CRM with dispatch, customers, estimates, payments, phones, accounting sync, and team chat.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#77ead6]">
            Launch trades demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
          <span className="mb-4 inline-grid h-10 w-10 place-items-center rounded-xl border border-[#77ead6]/20 bg-[#77ead6]/10 text-[#77ead6]">
            <MonitorPlay className="h-5 w-5" />
          </span>
          <p className="dashboard-kicker">Conversation demo</p>
          <h2 className="text-xl font-semibold text-white">AI inquiry handler</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Generate a sample inbound conversation for any business description.
          </p>
        </div>

        <a
          href="#lawn-care-lead-intelligence"
          className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:border-[#77ead6]/30 hover:bg-white/[0.08]"
        >
          <span className="mb-4 inline-grid h-10 w-10 place-items-center rounded-xl border border-[#77ead6]/20 bg-[#77ead6]/10 text-[#77ead6]">
            <Target className="h-5 w-5" />
          </span>
          <p className="dashboard-kicker">Lead intelligence demo</p>
          <h2 className="text-xl font-semibold text-white">Lawn Care Lead Scoring</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            See how lawn care leads would be captured, normalized, scored, prioritized, and routed to the next action.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#77ead6]">
            View lead module <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </a>
      </section>

      <section id="lawn-care-lead-intelligence" className="scroll-mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 shadow-2xl shadow-slate-950/30">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="dashboard-kicker">Blueprint demo module</p>
                <h2 className="mt-2 max-w-2xl text-2xl font-semibold text-white">
                  Lawn Care Lead Intelligence
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  A focused MVP version of the technical deck: capture lawn care leads, standardize the request,
                  score it against the business&apos;s best-fit jobs, then recommend the next action before the owner loses response time.
                </p>
              </div>
              <a
                href="https://files-public.monday.com/use1/0ffa883f-6696-47ff-bdae-1f975fa98bb9/ephesus-ai-technical-deck.html#s1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
              >
                Source deck <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {leadPipeline.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="mb-3 inline-grid h-9 w-9 place-items-center rounded-xl border border-[#77ead6]/20 bg-[#77ead6]/10 text-[#77ead6]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-5">
              <LawnCareLeadConsole leads={latestLawnCareLeads} />
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-5 flex items-start gap-3">
              <span className="inline-grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="dashboard-kicker">Minimum credentials</p>
                <h3 className="mt-2 text-xl font-semibold text-white">What is required to make it live?</h3>
              </div>
            </div>

            <div className="space-y-3">
              {minimumCredentials.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <strong className="text-sm font-semibold text-white">{item.label}</strong>
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-[#77ead6]">
                      {item.value}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 px-4 py-6 shadow-2xl shadow-slate-950/30 sm:px-6 lg:px-8">
        <DemoExperience />
      </section>
    </div>
  );
}
