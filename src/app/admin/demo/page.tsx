import Link from 'next/link';
import { DemoExperience } from '@/components/DemoExperience';
import { ArrowRight, CalendarDays, MonitorPlay, Sparkles } from 'lucide-react';

export default function AdminDemoPage() {
  return (
    <div className="admin-console space-y-6 lg:space-y-8">
      <section className="admin-hero">
        <div className="admin-hero__grid" aria-hidden="true" />
        <div className="admin-hero__copy">
          <p className="admin-kicker"><Sparkles /> Demo workspace</p>
          <h1>Preview the client-facing <em>AI conversation.</em></h1>
          <p>
            Run sample business scenarios from inside the admin console before sharing the experience with a client.
          </p>
          <div className="admin-hero__signals">
            <span><MonitorPlay /> Portal demo enabled</span>
          </div>
        </div>
        <div className="admin-hero__summary">
          <div className="admin-hero__summary-top"><span>Demo status</span><i /> Interactive</div>
          <strong>Live</strong>
          <p>conversation generator connected to the demo API</p>
          <div className="admin-hero__summary-line">
            <span>Audience</span><b>Admin + client</b>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Link
          href="/admin/demo/salon-crm"
          className="group rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:border-[#77ead6]/30 hover:bg-white/[0.08]"
        >
          <span className="mb-4 inline-grid h-10 w-10 place-items-center rounded-xl border border-[#77ead6]/20 bg-[#77ead6]/10 text-[#77ead6]">
            <CalendarDays className="h-5 w-5" />
          </span>
          <p className="admin-kicker">Hosted build demo</p>
          <h2 className="text-xl font-semibold text-white">Salon Biz CRM</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Demo a working salon operations app with schedule editing, CRM records, email, reports, and calendar exports.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#77ead6]">
            Launch CRM demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
          <span className="mb-4 inline-grid h-10 w-10 place-items-center rounded-xl border border-[#77ead6]/20 bg-[#77ead6]/10 text-[#77ead6]">
            <MonitorPlay className="h-5 w-5" />
          </span>
          <p className="admin-kicker">Conversation demo</p>
          <h2 className="text-xl font-semibold text-white">AI inquiry handler</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Generate a sample business conversation from inside the admin demo workspace.
          </p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 px-4 py-6 shadow-2xl shadow-slate-950/30 sm:px-6 lg:px-8">
        <DemoExperience />
      </section>
    </div>
  );
}
