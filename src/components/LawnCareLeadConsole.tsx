'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Send, Star, Zap } from 'lucide-react';

type LawnCareLeadRow = {
  id: number;
  source: string;
  customerName: string;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  serviceType: string;
  recurring: boolean;
  urgency: string;
  score: number;
  scoreLabel: string;
  scoreReasons: string;
  nextBestAction: string;
  status: string;
  createdAt: string;
};

function parseReasons(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.slice(0, 4).map(String) : [];
  } catch {
    return [];
  }
}

function scoreColor(score: number) {
  if (score >= 78) return 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100';
  if (score >= 58) return 'border-[#77ead6]/25 bg-[#77ead6]/10 text-[#a7fff0]';
  if (score >= 38) return 'border-amber-300/25 bg-amber-300/10 text-amber-100';
  return 'border-white/15 bg-white/[0.06] text-slate-300';
}

export function LawnCareLeadConsole({ leads }: { leads: LawnCareLeadRow[] }) {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const latestLead = leads[0];

  async function sendTestLead() {
    setStatus('sending');
    const response = await fetch('/api/lawn-care/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'dashboard-demo',
        externalId: `demo-${Date.now()}`,
        customerName: 'Maya Thompson',
        email: 'maya@example.com',
        phone: '(555) 017-4428',
        address: '1840 Hartland Parkway',
        city: 'Lexington',
        state: 'KY',
        zip: '40515',
        serviceType: 'Recurring Mowing',
        propertyType: 'Residential',
        recurring: true,
        urgency: 'this week',
        budget: 180,
        preferredDate: new Date().toISOString().slice(0, 10),
        preferredTimeWindow: 'Morning',
        message: 'Need weekly mowing and edging. Would like to start this week if there is a route nearby.',
      }),
    });

    if (!response.ok) {
      setStatus('error');
      return;
    }

    setStatus('sent');
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#77ead6]/15 bg-[#77ead6]/[0.06] p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="dashboard-kicker">Live intake endpoint</p>
            <p className="mt-2 font-mono text-xs text-[#a7fff0]">POST /api/lawn-care/leads</p>
          </div>
          <button
            type="button"
            onClick={sendTestLead}
            disabled={status === 'sending'}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#77ead6]/25 bg-[#77ead6]/10 px-3 text-sm font-semibold text-[#a7fff0] transition hover:bg-[#77ead6]/15 disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send test lead
          </button>
        </div>
        {status === 'sent' && (
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-100">
            <CheckCircle2 className="h-4 w-4" /> Lead received, scored, and stored.
          </p>
        )}
        {status === 'error' && <p className="mt-3 text-sm text-red-200">The test lead could not be received.</p>}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="dashboard-kicker">Captured</p>
          <strong className="mt-2 block text-3xl text-white">{leads.length}</strong>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="dashboard-kicker">Hot leads</p>
          <strong className="mt-2 block text-3xl text-white">{leads.filter((lead) => lead.score >= 78).length}</strong>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="dashboard-kicker">Avg score</p>
          <strong className="mt-2 block text-3xl text-white">
            {leads.length ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length) : 0}
          </strong>
        </div>
      </div>

      {latestLead && (
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="dashboard-kicker">Latest scored lead</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{latestLead.customerName}</h3>
              <p className="mt-1 text-sm text-slate-400">
                {latestLead.serviceType} {latestLead.city ? `in ${latestLead.city}${latestLead.state ? `, ${latestLead.state}` : ''}` : ''}
              </p>
            </div>
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${scoreColor(latestLead.score)}`}>
              <Star className="h-4 w-4" /> {latestLead.score} {latestLead.scoreLabel}
            </span>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-xl border border-white/10 bg-black/15 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Score reasons</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {parseReasons(latestLead.scoreReasons).map((reason) => (
                  <li key={reason} className="flex gap-2">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[#77ead6]" /> {reason}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/15 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Next action</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{latestLead.nextBestAction}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#77ead6]">
                Ready for CRM task, quote, call, or booking handoff <ArrowRight className="h-4 w-4" />
              </p>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
