import type { Metadata } from "next";
import { ClipboardList, MessageSquare, PhoneCall, Workflow } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AiOpportunityAuditForm from "@/components/AiOpportunityAuditForm";

export const metadata: Metadata = {
  title: "AI Opportunity Audit | Ephesus AI Solutions",
  description: "Answer a quick business questionnaire so Ephesus AI can identify where automation can save time, capture missed leads, and reduce lost business.",
};

export default function AiOpportunityAuditPage() {
  return (
    <div className="marketing-page min-h-screen">
      <Header />
      <main className="pt-28">
        <section className="px-6 pb-16 pt-10 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.55fr)] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#77ead6]/20 bg-[#77ead6]/[0.07] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#9af3e3]">
                  <ClipboardList className="h-4 w-4" />
                  AI opportunity audit
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl font-medium leading-[1.02] tracking-[-0.055em] text-white md:text-6xl">
                  Find the places your business is losing time, leads, and revenue.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
                  Answer a few focused questions about your current systems, bottlenecks, and missed opportunities. We will use it to map the best first AI automation for your business.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { icon: PhoneCall, label: "Missed calls", text: "Where inquiries fall through after hours or during busy days." },
                  { icon: MessageSquare, label: "Slow follow-up", text: "Where leads wait too long for answers, quotes, or next steps." },
                  { icon: Workflow, label: "Manual work", text: "Where your team repeats tasks AI could handle consistently." },
                ].map(({ icon: Icon, label, text }) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <Icon className="h-5 w-5 text-[#77ead6]" />
                    <h2 className="mt-3 text-sm font-semibold text-white">{label}</h2>
                    <p className="mt-1 text-sm leading-6 text-white/45">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <AiOpportunityAuditForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
