"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Download,
  FileText,
  Info,
  PhoneCall,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type Lead = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  notes: string;
};

type CampaignDraft = {
  campaignName: string;
  assistantId: string;
  phoneNumberId: string;
  callGoal: string;
  callingWindow: string;
  dailyCap: string;
  retryPlan: string;
  webhookUrl: string;
  leadText: string;
  leads: Lead[];
};

const STORAGE_KEY = "ephesus-outbound-caller-draft";

const sampleLeadText = `name,company,phone,email,notes
John Smith,Smith HVAC,5714657846,john@example.com,Ask about missed-call automation
Sarah Jones,Jones Plumbing,7035551212,sarah@example.com,Uses Jobber and wants more booked estimates`;

const blankDraft: CampaignDraft = {
  campaignName: "B2B discovery campaign",
  assistantId: "",
  phoneNumberId: "",
  callGoal: "Qualify the prospect and book a discovery call if there is interest.",
  callingWindow: "Monday-Friday, 9:00 AM-5:00 PM local time",
  dailyCap: "50",
  retryPlan: "Retry no-answer leads once after 2 business days. Do not retry opt-outs.",
  webhookUrl: "",
  leadText: sampleLeadText,
  leads: [],
};

function splitCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;

  for (const char of line) {
    if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values.map((value) => value.replace(/^"|"$/g, ""));
}

function parseLeads(text: string): Lead[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) return [];

  const firstLine = splitCsvLine(lines[0]).map((item) => item.toLowerCase());
  const hasHeader = firstLine.some((item) => ["name", "firstname", "first name", "company", "phone"].includes(item));
  const rows = hasHeader ? lines.slice(1) : lines;
  const header = hasHeader ? firstLine : ["name", "company", "phone", "email", "notes"];

  const getValue = (row: string[], names: string[]) => {
    const index = header.findIndex((item) => names.includes(item));
    return index >= 0 ? row[index] || "" : "";
  };

  return rows
    .map((line, index) => {
      const row = splitCsvLine(line);
      const firstName = getValue(row, ["firstname", "first name", "first"]);
      const lastName = getValue(row, ["lastname", "last name", "last"]);
      const combinedName = getValue(row, ["name", "full name", "fullname"]) || `${firstName} ${lastName}`.trim();
      const fallback = {
        name: row[0] || "",
        company: row[1] || "",
        phone: row[2] || "",
        email: row[3] || "",
        notes: row.slice(4).join(", "),
      };

      return {
        id: `${Date.now()}-${index}-${row.join("-")}`,
        name: combinedName || fallback.name,
        company: getValue(row, ["company", "business", "account"]) || fallback.company,
        phone: getValue(row, ["phone", "phone number", "mobile", "number"]) || fallback.phone,
        email: getValue(row, ["email", "email address"]) || fallback.email,
        notes: getValue(row, ["notes", "note", "context"]) || fallback.notes,
      };
    })
    .filter((lead) => lead.name || lead.phone || lead.company);
}

function toCsv(leads: Lead[]) {
  const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`;
  return [
    "name,company,phone,email,notes",
    ...leads.map((lead) => [lead.name, lead.company, lead.phone, lead.email, lead.notes].map(escapeCell).join(",")),
  ].join("\n");
}

export default function OutboundCallerSetup() {
  const [draft, setDraft] = useState<CampaignDraft>(blankDraft);
  const [manualLead, setManualLead] = useState<Omit<Lead, "id">>({
    name: "",
    company: "",
    phone: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    const webhookUrl = `${window.location.origin}/api/vapi/outbound/webhook`;

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CampaignDraft;
        setDraft({ ...blankDraft, ...parsed, webhookUrl: parsed.webhookUrl || webhookUrl });
        return;
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setDraft((current) => ({ ...current, webhookUrl }));
  }, []);

  const parsedLeads = useMemo(() => parseLeads(draft.leadText), [draft.leadText]);
  const activeLeads = draft.leads.length ? draft.leads : parsedLeads;
  const validPhoneCount = activeLeads.filter((lead) => lead.phone.replace(/\D/g, "").length >= 10).length;
  const setupReady = Boolean(draft.assistantId && draft.phoneNumberId && validPhoneCount > 0);

  function updateDraft<K extends keyof CampaignDraft>(field: K, value: CampaignDraft[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function importParsedLeads() {
    updateDraft("leads", parsedLeads);
    toast.success(`${parsedLeads.length} leads loaded into the campaign draft.`);
  }

  async function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setDraft((current) => ({ ...current, leadText: text, leads: parseLeads(text) }));
    toast.success(`Loaded ${file.name}`);
  }

  function addManualLead() {
    if (!manualLead.name && !manualLead.phone && !manualLead.company) {
      toast.error("Add at least a name, company, or phone number.");
      return;
    }

    setDraft((current) => ({
      ...current,
      leads: [{ id: `${Date.now()}`, ...manualLead }, ...current.leads],
    }));
    setManualLead({ name: "", company: "", phone: "", email: "", notes: "" });
  }

  function removeLead(id: string) {
    setDraft((current) => ({ ...current, leads: current.leads.filter((lead) => lead.id !== id) }));
  }

  function saveDraft() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    toast.success("Outbound caller setup saved in this browser.");
  }

  function downloadCsv() {
    const blob = new Blob([toCsv(activeLeads)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "outbound-caller-leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <section className="dashboard-command-hero">
        <div className="dashboard-command-hero__mesh" aria-hidden="true" />
        <div className="dashboard-command-hero__copy">
          <p className="dashboard-kicker"><PhoneCall /> Outbound caller setup</p>
          <h1 className="dashboard-display">
            Load leads, prepare Vapi, then launch with the server runner.
          </h1>
          <p>
            This is where names and phone numbers go. Paste a CSV, upload a CSV file, or add leads manually. The Vapi API key stays server-side; this page stores the campaign draft and the non-secret Vapi IDs.
          </p>
          <div className="dashboard-command-hero__actions">
            <Button onClick={saveDraft} className="dashboard-primary-action border-0">
              Save setup <Save />
            </Button>
            <Button onClick={downloadCsv} variant="outline" className="dashboard-secondary-action border-white/10 bg-transparent">
              Export leads <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="dashboard-readiness-card">
          <div className="dashboard-readiness-card__topline">
            <span>Launch readiness</span>
            <span className="dashboard-operational"><i /> Draft mode</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <strong className="text-2xl text-white">{activeLeads.length}</strong>
              <p className="mt-1 text-xs text-white/45">loaded leads</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <strong className="text-2xl text-white">{validPhoneCount}</strong>
              <p className="mt-1 text-xs text-white/45">callable numbers</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <strong className="text-2xl text-white">{setupReady ? "Ready" : "Setup"}</strong>
              <p className="mt-1 text-xs text-white/45">Vapi status</p>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-[#77ead6]/15 bg-[#77ead6]/[0.055] p-4 text-sm text-white/65">
            <Info className="mb-3 h-5 w-5 text-[#77ead6]" />
            Calls are not sent from this browser page. The next build step is a protected API route that reads this campaign and calls Vapi from the server.
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="dashboard-kicker">Step 1</p>
              <h2 className="text-2xl font-semibold text-white">Load names and phone numbers</h2>
              <p className="mt-2 text-sm text-white/50">Use columns like name, company, phone, email, notes.</p>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 hover:bg-white/[0.07]">
              <Upload className="h-4 w-4" />
              Upload CSV
              <input type="file" accept=".csv,text/csv" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          <Textarea
            value={draft.leadText}
            onChange={(event) => updateDraft("leadText", event.target.value)}
            rows={10}
            className="font-mono text-sm"
            placeholder={sampleLeadText}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={importParsedLeads} disabled={!parsedLeads.length} className="gap-2 bg-[#77ead6] text-[#06211d] hover:bg-[#9af3e3]">
              Load pasted leads <ArrowRight className="h-4 w-4" />
            </Button>
            <span className="text-sm text-white/45">{parsedLeads.length} rows detected from pasted text</span>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <div className="mb-5">
            <p className="dashboard-kicker">Step 2</p>
            <h2 className="text-2xl font-semibold text-white">Add a lead manually</h2>
            <p className="mt-2 text-sm text-white/50">Good for testing before loading a larger list.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name"><Input value={manualLead.name} onChange={(event) => setManualLead((lead) => ({ ...lead, name: event.target.value }))} /></Field>
            <Field label="Company"><Input value={manualLead.company} onChange={(event) => setManualLead((lead) => ({ ...lead, company: event.target.value }))} /></Field>
            <Field label="Phone"><Input value={manualLead.phone} onChange={(event) => setManualLead((lead) => ({ ...lead, phone: event.target.value }))} /></Field>
            <Field label="Email"><Input value={manualLead.email} onChange={(event) => setManualLead((lead) => ({ ...lead, email: event.target.value }))} /></Field>
            <div className="sm:col-span-2">
              <Field label="Notes">
                <Textarea value={manualLead.notes} onChange={(event) => setManualLead((lead) => ({ ...lead, notes: event.target.value }))} rows={3} />
              </Field>
            </div>
          </div>
          <Button onClick={addManualLead} className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            Add lead
          </Button>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <div className="mb-5">
            <p className="dashboard-kicker">Step 3</p>
            <h2 className="text-2xl font-semibold text-white">Vapi campaign settings</h2>
            <p className="mt-2 text-sm text-white/50">The secret Vapi API key belongs in the server environment, not this page.</p>
          </div>
          <div className="space-y-4">
            <Field label="Campaign name">
              <Input value={draft.campaignName} onChange={(event) => updateDraft("campaignName", event.target.value)} />
            </Field>
            <Field label="Vapi assistant ID">
              <Input value={draft.assistantId} onChange={(event) => updateDraft("assistantId", event.target.value)} placeholder="asst_..." />
            </Field>
            <Field label="Vapi outbound phone number ID">
              <Input value={draft.phoneNumberId} onChange={(event) => updateDraft("phoneNumberId", event.target.value)} placeholder="pn_..." />
            </Field>
            <Field label="Webhook URL to add in Vapi">
              <Input value={draft.webhookUrl} onChange={(event) => updateDraft("webhookUrl", event.target.value)} />
            </Field>
          </div>
        </Card>

        <Card className="border-white/10 bg-white/[0.045] p-5 sm:p-6">
          <div className="mb-5">
            <p className="dashboard-kicker">Step 4</p>
            <h2 className="text-2xl font-semibold text-white">Calling rules</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Daily call cap">
              <Input value={draft.dailyCap} onChange={(event) => updateDraft("dailyCap", event.target.value)} />
            </Field>
            <Field label="Calling window">
              <Input value={draft.callingWindow} onChange={(event) => updateDraft("callingWindow", event.target.value)} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Call goal">
                <Textarea value={draft.callGoal} onChange={(event) => updateDraft("callGoal", event.target.value)} rows={3} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Retry and opt-out rules">
                <Textarea value={draft.retryPlan} onChange={(event) => updateDraft("retryPlan", event.target.value)} rows={3} />
              </Field>
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.07] p-4 text-sm text-amber-100/75">
            Confirm TCPA/DNC/consent rules before dialing. Keep opt-outs suppressed and avoid calling outside approved windows.
          </div>
        </Card>
      </section>

      <Card className="border-white/10 bg-white/[0.045] p-5 sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="dashboard-kicker">Loaded list</p>
            <h2 className="text-2xl font-semibold text-white">Leads ready for the outbound caller</h2>
          </div>
          <Button onClick={saveDraft} className="gap-2 bg-[#77ead6] text-[#06211d] hover:bg-[#9af3e3]">
            <Save className="h-4 w-4" />
            Save campaign draft
          </Button>
        </div>
        {activeLeads.length ? (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="max-h-[28rem] overflow-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="sticky top-0 bg-[#0b1110] text-xs uppercase tracking-[0.12em] text-white/45">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Notes</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {activeLeads.map((lead) => (
                    <tr key={lead.id} className="bg-white/[0.025] text-white/70">
                      <td className="px-4 py-3 font-medium text-white">{lead.name || "Unnamed"}</td>
                      <td className="px-4 py-3">{lead.company}</td>
                      <td className="px-4 py-3">{lead.phone}</td>
                      <td className="px-4 py-3">{lead.email}</td>
                      <td className="px-4 py-3">{lead.notes}</td>
                      <td className="px-4 py-3 text-right">
                        {draft.leads.length > 0 && (
                          <button onClick={() => removeLead(lead.id)} className="rounded-lg p-2 text-white/45 hover:bg-white/10 hover:text-white" aria-label={`Remove ${lead.name || "lead"}`}>
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-white/50">
            <FileText className="mx-auto mb-3 h-8 w-8 text-white/30" />
            No leads loaded yet.
          </div>
        )}

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            "Add VAPI_API_KEY to the server environment.",
            "Build the protected API route that creates Vapi outbound calls.",
            "Connect webhook results to CRM records, transcripts, and campaign reporting.",
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#77ead6]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
