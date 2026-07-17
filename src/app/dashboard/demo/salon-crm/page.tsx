import Link from 'next/link';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';
import { ArrowUpRight, CalendarDays } from 'lucide-react';

function integrationMessage(params: { connected?: string; error?: string }) {
  if (params.connected === 'google-calendar') return { tone: 'success', text: 'Google Calendar and Gmail connected. Refresh the CRM integration or email tab to load live data.' };
  if (params.connected === 'outlook') return { tone: 'success', text: 'Outlook connected. Refresh the CRM integration or email tab to load live data.' };
  if (params.error) return { tone: 'error', text: 'Connection did not complete. Please reconnect from the CRM Integrations tab or the dashboard Integrations page.' };
  return null;
}

export default async function DashboardSalonCrmDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ connected?: string; error?: string }>;
}) {
  const params = await searchParams;
  const message = integrationMessage(params);

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Interactive build demo"
        title="Salon Biz CRM"
        description="Explore a hosted salon CRM demo with scheduling, clients, employees, time-off blocking, payments, migration tools, and calendar handoff."
        icon={CalendarDays}
        status="Hosted"
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <p className="text-sm text-slate-300">
          Demo changes are saved in this browser only, so you can create, edit, import, export, and reset freely. Appointments booked by calling the AI receptionist load in automatically at the top of the schedule.
        </p>
        <Link
          href="/salon-crm-demo/index.html?v=20260717-phone-bookings"
          target="_blank"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
        >
          Open full screen <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {message && (
        <div className={`rounded-2xl border px-4 py-3 text-sm ${message.tone === 'success' ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200' : 'border-red-400/20 bg-red-400/10 text-red-200'}`}>
          {message.text}
        </div>
      )}

      <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/30">
        <iframe
          title="Salon Biz CRM interactive demo"
          src="/salon-crm-demo/index.html?v=20260717-phone-bookings"
          className="h-[820px] w-full border-0"
        />
      </section>
    </div>
  );
}
