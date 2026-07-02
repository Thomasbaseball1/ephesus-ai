import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Sparkles } from 'lucide-react';

export default function AdminSalonCrmDemoPage() {
  return (
    <div className="admin-console space-y-6 lg:space-y-8">
      <section className="admin-hero">
        <div className="admin-hero__grid" aria-hidden="true" />
        <div className="admin-hero__copy">
          <p className="admin-kicker"><Sparkles /> Hosted build demo</p>
          <h1>Salon Biz CRM, <em>ready to demo.</em></h1>
          <p>
            Use the interactive CRM as a live proof-of-concept for salon scheduling, client records, email workflows, and calendar handoffs.
          </p>
          <div className="admin-hero__signals">
            <span><CalendarDays /> Static app hosted inside Ephesus</span>
          </div>
        </div>
        <div className="admin-hero__summary">
          <div className="admin-hero__summary-top"><span>Demo mode</span><i /> Browser-local</div>
          <strong>CRM</strong>
          <p>interactive salon operations workspace</p>
          <div className="admin-hero__summary-line">
            <span>Storage</span><b>local demo data</b>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <p className="text-sm text-slate-300">
          Create bookings, edit clients, test email panels, export .ics files, and reset the demo without touching production data.
        </p>
        <Link href="/salon-crm-demo/index.html" target="_blank" className="admin-action-button inline-flex items-center justify-center">
          Open full screen <ArrowUpRight />
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
