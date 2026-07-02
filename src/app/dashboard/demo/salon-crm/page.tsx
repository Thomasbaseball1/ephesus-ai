import Link from 'next/link';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';
import { ArrowUpRight, CalendarDays } from 'lucide-react';

export default function DashboardSalonCrmDemoPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Interactive build demo"
        title="Salon Biz CRM"
        description="Explore a hosted salon CRM demo with scheduling, clients, email, reports, and calendar handoff tools."
        icon={CalendarDays}
        status="Hosted"
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <p className="text-sm text-slate-300">
          Demo changes are saved in this browser only, so you can create, edit, import, export, and reset freely.
        </p>
        <Link
          href="/salon-crm-demo/index.html"
          target="_blank"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
        >
          Open full screen <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/30">
        <iframe
          title="Salon Biz CRM interactive demo"
          src="/salon-crm-demo/index.html"
          className="h-[820px] w-full border-0"
        />
      </section>
    </div>
  );
}
