"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

const systemOptions = [
  "CRM",
  "Scheduling/calendar",
  "Phone system",
  "Email inbox",
  "Website chat",
  "Payment processing",
  "Accounting",
  "Marketing/email campaigns",
  "Field service/job management",
  "Spreadsheets/manual tracking",
];

const problemOptions = [
  "Missed calls",
  "Slow follow-up",
  "Leads not getting entered into a CRM",
  "Scheduling is manual or messy",
  "Customers ask the same questions repeatedly",
  "Email inbox is overloaded",
  "No clear lead tracking",
  "Quotes or estimates take too long",
  "Past leads are not being revived",
  "Staff is spending too much time on admin work",
];

const lostBusinessOptions = [
  "People call after hours and do not get answered",
  "New leads wait too long for a response",
  "Follow-up falls through after the first contact",
  "Customers cannot book easily",
  "No-shows or missed appointments",
  "Quotes are not sent fast enough",
  "Old customers are not being reactivated",
  "The team does not know which leads are hottest",
];

const automationOptions = [
  "Answer incoming calls",
  "Qualify new leads",
  "Book appointments",
  "Reply to common emails",
  "Route messages to the right person",
  "Send reminders",
  "Follow up with old leads",
  "Create CRM records",
  "Summarize calls and emails",
  "Report on missed opportunities",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  industry: string;
  teamSize: string;
  monthlyLeads: string;
  currentSystems: string[];
  biggestProblems: string[];
  lostBusinessSources: string[];
  automationGoals: string[];
  currentProcess: string;
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
  currentSystems: [],
  biggestProblems: [],
  lostBusinessSources: [],
  automationGoals: [],
  currentProcess: "",
  idealOutcome: "",
  urgency: "",
  budgetRange: "",
  notes: "",
};

function toggleList(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function CheckboxGrid({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-white">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-sm text-white/72 transition hover:border-[#77ead6]/30 hover:bg-white/[0.055]"
          >
            <Checkbox
              checked={value.includes(option)}
              onCheckedChange={() => onChange(toggleList(value, option))}
              className="mt-0.5 border-white/25 data-[state=checked]:border-[#77ead6] data-[state=checked]:bg-[#77ead6] data-[state=checked]:text-[#06211d]"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

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
      form.currentProcess,
      form.idealOutcome,
      form.urgency,
      form.currentSystems.length,
      form.biggestProblems.length,
      form.lostBusinessSources.length,
      form.automationGoals.length,
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
      toast.success("Questionnaire submitted. We will review it and follow up.");
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
        <h2 className="mt-5 text-2xl font-semibold text-white">Questionnaire received</h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-white/62">
          Thanks. Your answers were sent to the Ephesus AI team so we can identify the highest-value automation opportunities before the next conversation.
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
              <Label htmlFor="website">Website</Label>
              <Input id="website" value={form.website} onChange={(event) => setField("website", event.target.value)} placeholder="https://" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Input id="industry" value={form.industry} onChange={(event) => setField("industry", event.target.value)} required placeholder="HVAC, salon, law firm, clinic..." />
            </div>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 sm:p-6">
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Operations</p>
              <h2 className="mt-2 text-xl font-semibold text-white">How does the business run today?</h2>
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

          <CheckboxGrid label="What systems do you use right now?" options={systemOptions} value={form.currentSystems} onChange={(next) => setField("currentSystems", next)} />
        </Card>

        <Card className="border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Opportunity</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Where is business leaking?</h2>
          </div>
          <div className="space-y-6">
            <CheckboxGrid label="Biggest problems right now" options={problemOptions} value={form.biggestProblems} onChange={(next) => setField("biggestProblems", next)} />
            <CheckboxGrid label="What causes the most lost business?" options={lostBusinessOptions} value={form.lostBusinessSources} onChange={(next) => setField("lostBusinessSources", next)} />
            <CheckboxGrid label="What would you want AI to help with first?" options={automationOptions} value={form.automationGoals} onChange={(next) => setField("automationGoals", next)} />
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 sm:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Details</p>
            <h2 className="mt-2 text-xl font-semibold text-white">What should we understand before we talk?</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentProcess">How are calls, emails, chats, and new leads handled today? *</Label>
              <Textarea id="currentProcess" value={form.currentProcess} onChange={(event) => setField("currentProcess", event.target.value)} required rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idealOutcome">If AI worked perfectly for you, what would change? *</Label>
              <Textarea id="idealOutcome" value={form.idealOutcome} onChange={(event) => setField("idealOutcome", event.target.value)} required rows={4} />
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
              <Label htmlFor="notes">Anything else?</Label>
              <Textarea id="notes" value={form.notes} onChange={(event) => setField("notes", event.target.value)} rows={3} />
            </div>
          </div>
        </Card>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Card className="border-[#77ead6]/18 bg-[#071211]/90 p-5 shadow-2xl shadow-black/25">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Audit progress</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-[#77ead6]" style={{ width: `${completion}%` }} />
          </div>
          <p className="mt-3 text-sm text-white/56">{completion}% complete</p>
          <div className="mt-5 space-y-3 text-sm text-white/58">
            <p>This gives us enough context to spot missed revenue, manual work, and the first automation that would actually matter.</p>
            <p>Submissions go to the Ephesus AI team for review.</p>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-12 w-full gap-2 rounded-xl bg-[#77ead6] font-semibold text-[#06211d] hover:bg-[#9af3e3]"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            Submit questionnaire
          </Button>
        </Card>
      </aside>
    </form>
  );
}
