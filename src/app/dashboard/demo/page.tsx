import Link from 'next/link';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';
import { DemoExperience } from '@/components/DemoExperience';
import { ArrowRight, CalendarDays, MonitorPlay } from 'lucide-react';

export default function DashboardDemoPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Give it a try"
        title="Give it a Try"
        description="Try the AI conversation preview and hosted business app demos from your client portal."
        icon={MonitorPlay}
        status="Interactive"
      />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
      </section>

      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 px-4 py-6 shadow-2xl shadow-slate-950/30 sm:px-6 lg:px-8">
        <DemoExperience />
      </section>
    </div>
  );
}
