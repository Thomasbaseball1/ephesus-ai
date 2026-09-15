"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  industry: string;
  teamSize: string;
  monthlyLeads: string;
  toolsOverview: string;
  systemsOverview: string;
  biggestProblems: string;
  automationGoals: string;
  idealOutcome: string;
  urgency: string;
  budgetRange: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  industry: "",
  teamSize: "",
  monthlyLeads: "",
  toolsOverview: "",
  systemsOverview: "",
  biggestProblems: "",
  automationGoals: "",
  idealOutcome: "",
  urgency: "",
  budgetRange: "",
  notes: "",
};

export default function AiOpportunityAuditForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const completion = useMemo(() => {
    const fields = [
      form.name,
      form.email,
      form.company,
      form.industry,
      form.teamSize,
      form.monthlyLeads,
      form.toolsOverview,
      form.systemsOverview,
      form.biggestProblems,
      form.automationGoals,
      form.idealOutcome,
      form.urgency,
    ];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

  function setField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/ai-opportunity-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to submit questionnaire");

      setSubmitted(true);
      setForm(initialState);
      toast.success("Audit submitted. We emailed you a copy and will follow up.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit questionnaire");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Card className="border-[#77ead6]/20 bg-[#77ead6]/[0.06] p-8 text-center shadow-2xl shadow-black/20">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#77ead6]" />
        <h2 className="mt-5 text-2xl font-semibold text-white">Audit received</h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-white/62">
          Thanks. Your answers were sent to the Ephesus AI team, and a confirmation email is on its way to your inbox.
        </p>
        <Button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 bg-[#77ead6] text-[#06211d] hover:bg-[#9af3e3]"
        >
          Submit another response
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-5">
        <Card className="border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Contact</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Who should we follow up with?</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" value={form.name} onChange={(event) => setField("name", event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={form.email} onChange={(event) => setField("email", event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(event) => setField("phone", event.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input id="company" value={form.company} onChange={(event) => setField("company", event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Input id="industry" value={form.industry} onChange={(event) => setField("industry", event.target.value)} required placeholder="HVAC, salon, law firm, clinic..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" value={form.website} onChange={(event) => setField("website", event.target.value)} placeholder="https://" />
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 sm:p-6">
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Operations</p>
              <h2 className="mt-2 text-xl font-semibold text-white">What are you using now?</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Team size *</Label>
                <Select value={form.teamSize} onValueChange={(value) => setField("teamSize", value)}>
                  <SelectTrigger className="w-full border-white/12 bg-white/[0.035]"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3">1-3</SelectItem>
                    <SelectItem value="4-10">4-10</SelectItem>
                    <SelectItem value="11-25">11-25</SelectItem>
                    <SelectItem value="26-75">26-75</SelectItem>
                    <SelectItem value="76+">76+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Monthly leads *</Label>
                <Select value={form.monthlyLeads} onValueChange={(value) => setField("monthlyLeads", value)}>
                  <SelectTrigger className="w-full border-white/12 bg-white/[0.035]"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-25">0-25</SelectItem>
                    <SelectItem value="26-100">26-100</SelectItem>
                    <SelectItem value="101-300">101-300</SelectItem>
                    <SelectItem value="301-1000">301-1000</SelectItem>
                    <SelectItem value="1000+">1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="toolsOverview">What software or tools do you use today? *</Label>
              <Textarea
                id="toolsOverview"
                value={form.toolsOverview}
                onChange={(event) => setField("toolsOverview", event.target.value)}
                required
                rows={3}
                placeholder="Example: Jobber, ServiceTitan, Housecall Pro, QuickBooks, Outlook, Gmail, spreadsheets, phone system, text reminders..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemsOverview">How do those systems work together right now? *</Label>
              <Textarea
                id="systemsOverview"
                value={form.systemsOverview}
                onChange={(event) => setField("systemsOverview", event.target.value)}
                required
                rows={4}
                placeholder="Example: Website leads come in by email, someone copies them into Jobber, invoices go through QuickBooks, and follow-up is mostly manual."
              />
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Opportunity</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Where is business leaking?</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="biggestProblems">What problems are costing you the most business? *</Label>
              <Textarea
                id="biggestProblems"
                value={form.biggestProblems}
                onChange={(event) => setField("biggestProblems", event.target.value)}
                required
                rows={4}
                placeholder="Example: missed calls, slow follow-up, no-shows, quotes going out late, old leads not getting touched, customers waiting too long..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="automationGoals">What would you want AI to help with first? *</Label>
              <Textarea
                id="automationGoals"
                value={form.automationGoals}
                onChange={(event) => setField("automationGoals", event.target.value)}
                required
                rows={3}
                placeholder="Example: answer calls, book appointments, reply to common emails, update the CRM, send reminders, follow up with leads..."
              />
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Goal</p>
            <h2 className="mt-2 text-xl font-semibold text-white">What should change first?</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="idealOutcome">If AI worked perfectly for you, what would change? *</Label>
              <Textarea
                id="idealOutcome"
                value={form.idealOutcome}
                onChange={(event) => setField("idealOutcome", event.target.value)}
                required
                rows={4}
                placeholder="Example: Every call gets answered, leads get booked into Jobber, customers get reminders, and owners only see the exceptions."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>How urgent is this?</Label>
                <Select value={form.urgency} onValueChange={(value) => setField("urgency", value)}>
                  <SelectTrigger className="w-full border-white/12 bg-white/[0.035]"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Just exploring">Just exploring</SelectItem>
                    <SelectItem value="This quarter">This quarter</SelectItem>
                    <SelectItem value="This month">This month</SelectItem>
                    <SelectItem value="ASAP">ASAP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Budget range</Label>
                <Select value={form.budgetRange} onValueChange={(value) => setField("budgetRange", value)}>
                  <SelectTrigger className="w-full border-white/12 bg-white/[0.035]"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not sure yet">Not sure yet</SelectItem>
                    <SelectItem value="Under $500/mo">Under $500/mo</SelectItem>
                    <SelectItem value="$500-$1,500/mo">$500-$1,500/mo</SelectItem>
                    <SelectItem value="$1,500-$5,000/mo">$1,500-$5,000/mo</SelectItem>
                    <SelectItem value="$5,000+/mo">$5,000+/mo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Anything else we should know?</Label>
              <Textarea id="notes" value={form.notes} onChange={(event) => setField("notes", event.target.value)} rows={3} placeholder="Optional: mention current bottlenecks, must-have integrations, or what feels most urgent." />
            </div>
          </div>
        </Card>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Card className="border-[#77ead6]/18 bg-[#071211]/90 p-5 shadow-2xl shadow-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Quick audit</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#77ead6]" style={{ width: `${completion}%` }} />
          </div>
          <p className="mt-3 text-sm text-white/56">{completion}% complete</p>
          <div className="mt-5 space-y-3 text-sm text-white/58">
            <p>This gives us enough context to spot missed revenue, manual work, and the first automation that would actually matter.</p>
            <p>You will receive a copy by email after submitting.</p>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-12 w-full gap-2 rounded-xl bg-[#77ead6] font-semibold text-[#06211d] hover:bg-[#9af3e3]"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Submit audit
          </Button>
        </Card>
      </aside>
    </form>
  );
}
