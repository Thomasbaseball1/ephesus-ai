import Link from 'next/link';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';
import { VapiDemo } from '@/components/VapiDemo';
import { ArrowUpRight, Wrench } from 'lucide-react';

export default function DashboardTradesCrmDemoPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Interactive build demo"
        title="HVAC + Plumbing CRM"
        description="Explore a hosted field-service CRM demo with dispatch, customers, estimates, payments, accounting sync, phone intake, and team chat."
        icon={Wrench}
        status="Hosted"
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <p className="text-sm text-slate-300">
          Demo changes are saved in this browser only, so you can create jobs, test customer autofill, generate estimates, record payments, and reset freely.
        </p>
        <Link
          href="/trades-crm-demo/index.html?v=20260704-no-marketing"
          target="_blank"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/15 px-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
        >
          Open full screen <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-slate-950/30 sm:p-6">
        <VapiDemo />
      </section>

      <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950 shadow-2xl shadow-slate-950/30">
        <iframe
          title="HVAC and plumbing CRM interactive demo"
          src="/trades-crm-demo/index.html?v=20260704-no-marketing"
          className="h-[820px] w-full border-0"
        />
      </section>
    </div>
  );
}
