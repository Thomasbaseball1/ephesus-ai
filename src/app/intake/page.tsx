"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Building2, Mail, Users, Wrench, GitBranch, Phone, ClipboardList,
  Map, HelpCircle, AlertTriangle, BarChart3, FileText, CheckCircle, ChevronLeft, ChevronRight, Plus, Trash2
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Department {
  name: string;
  handles: string;
  services: string;
  primaryContact1: string;
  primaryContact2: string;
  backupContact1: string;
  backupContact2: string;
}

interface TechContact {
  role: string;
  name: string;
  email: string;
  phone: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface FormData {
  companyOverview: {
    companyName: string;
    industry: string;
    regionsServed: string;
    websiteUrl: string;
    primaryPhone: string;
    primaryEmail: string;
    allDepartmentsAllRegions: string;
    operationModel: string;
  };
  emailPlatform: {
    platform: string[];
    platformOther: string;
    emailDomains: string;
    hasApi: string;
    hasItAdmin: string;
    hasThirdPartyAccess: string;
    hasCrm: string;
    crmName: string;
    apiRestrictions: string;
  };
  departments: Department[];
  technicalContacts: TechContact[];
  routingCategories: {
    defaultCategories: string[];
    additionalCategory1: string;
    additionalCategory2: string;
    additionalCategory3: string;
    toRemoveOrRename: string;
  };
  callHandling: {
    liveTransfers: string;
    textNotification: string;
    emailNotification: string;
    takeMessage: string;
    scheduleCallback: string;
    notificationMethod: string;
    escalationSituations: string;
    blackoutHours: string;
    additionalNotes: string;
  };
  intakeRequirements: {
    wastePickupRequired: string;
    wastePickupOptional: string;
    consultingRequired: string;
    consultingOptional: string;
    billingRequired: string;
    billingOptional: string;
    complaintsRequired: string;
    complaintsOptional: string;
    salesRequired: string;
    salesOptional: string;
    generalRequired: string;
    generalOptional: string;
  };
  routingLogic: {
    vipClients: string;
    vipDetails: string;
    timeOfDayRules: string;
    geographicRules: string;
    languages: string;
    triggerKeywords: string;
    neverAutoHandled: string;
    otherRules: string;
  };
  faqs: FAQ[];
  faqMeta: {
    attachmentName: string;
    additionalNotes: string;
  };
  escalation: {
    complaintsRequiringEscalation: string;
    highPriorityClients: string;
    immediateCallSituations: string;
    afterHoursContactName: string;
    afterHoursContactPhone: string;
    otherScenarios: string;
  };
  tracking: {
    defaultFields: string[];
    customField1: string;
    customField2: string;
    customField3: string;
    reportingCadence: string;
    reportRecipients: string;
  };
  additionalNotes: {
    notes: string;
  };
}

const defaultDepartment = (): Department => ({
  name: "", handles: "", services: "",
  primaryContact1: "", primaryContact2: "",
  backupContact1: "", backupContact2: "",
});

const TECH_CONTACT_ROLES = [
  "Primary Technical Contact",
  "IT Administrator / Email Admin",
  "Project Manager / Coordinator",
  "Decision Maker / Executive Sponsor",
  "Additional Contact",
];

const DEFAULT_ROUTING_CATEGORIES = [
  "Waste Pickup Requests",
  "Consulting / Safety Services",
  "Billing & Payments",
  "Complaints / Issues",
  "General Inquiries",
  "Sales / New Leads",
  "Misdirected Calls / Emails",
  "Emergency / Escalation",
];

const DEFAULT_TRACKING_FIELDS = [
  "Timestamp", "Caller / Sender Name", "Email Address", "Phone Number",
  "Category", "Call / Email Summary", "Full Transcript", "Assigned Department",
  "Status", "Caller Sentiment", "Caller Intent", "Duration (seconds)",
  "Ended By (caller vs. AI)", "Routing Path Taken",
];

const STEPS = [
  { number: 1, label: "Company Overview", icon: Building2 },
  { number: 2, label: "Email Platform", icon: Mail },
  { number: 3, label: "Departments", icon: Users },
  { number: 4, label: "Tech Contacts", icon: Wrench },
  { number: 5, label: "Routing Categories", icon: GitBranch },
  { number: 6, label: "Call Handling", icon: Phone },
  { number: 7, label: "Intake Requirements", icon: ClipboardList },
  { number: 8, label: "Routing Logic", icon: Map },
  { number: 9, label: "FAQs", icon: HelpCircle },
  { number: 10, label: "Escalation", icon: AlertTriangle },
  { number: 11, label: "Tracking", icon: BarChart3 },
  { number: 12, label: "Additional Notes", icon: FileText },
];

const initialForm: FormData = {
  companyOverview: {
    companyName: "", industry: "", regionsServed: "", websiteUrl: "",
    primaryPhone: "", primaryEmail: "", allDepartmentsAllRegions: "", operationModel: "",
  },
  emailPlatform: {
    platform: [], platformOther: "", emailDomains: "",
    hasApi: "", hasItAdmin: "", hasThirdPartyAccess: "", hasCrm: "", crmName: "", apiRestrictions: "",
  },
  departments: [defaultDepartment(), defaultDepartment()],
  technicalContacts: TECH_CONTACT_ROLES.map(role => ({ role, name: "", email: "", phone: "" })),
  routingCategories: {
    defaultCategories: [...DEFAULT_ROUTING_CATEGORIES],
    additionalCategory1: "", additionalCategory2: "", additionalCategory3: "", toRemoveOrRename: "",
  },
  callHandling: {
    liveTransfers: "", textNotification: "", emailNotification: "",
    takeMessage: "", scheduleCallback: "", notificationMethod: "",
    escalationSituations: "", blackoutHours: "", additionalNotes: "",
  },
  intakeRequirements: {
    wastePickupRequired: "", wastePickupOptional: "",
    consultingRequired: "", consultingOptional: "",
    billingRequired: "", billingOptional: "",
    complaintsRequired: "", complaintsOptional: "",
    salesRequired: "", salesOptional: "",
    generalRequired: "", generalOptional: "",
  },
  routingLogic: {
    vipClients: "", vipDetails: "", timeOfDayRules: "", geographicRules: "",
    languages: "", triggerKeywords: "", neverAutoHandled: "", otherRules: "",
  },
  faqs: [{ question: "", answer: "" }, { question: "", answer: "" }, { question: "", answer: "" }],
  faqMeta: { attachmentName: "", additionalNotes: "" },
  escalation: {
    complaintsRequiringEscalation: "", highPriorityClients: "",
    immediateCallSituations: "", afterHoursContactName: "", afterHoursContactPhone: "", otherScenarios: "",
  },
  tracking: {
    defaultFields: [...DEFAULT_TRACKING_FIELDS],
    customField1: "", customField2: "", customField3: "",
    reportingCadence: "", reportRecipients: "",
  },
  additionalNotes: { notes: "" },
};

// ─── Helper sub-components ────────────────────────────────────────────────────

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function RadioYesNo({ value, onChange, name }: { value: string; onChange: (v: string) => void; name: string }) {
  return (
    <div className="flex gap-6">
      {["Yes", "No"].map(opt => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="accent-[#0D9488] w-4 h-4"
          />
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-4 pb-5 border-b border-border mb-6">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#0D9488]/20">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Step Components ──────────────────────────────────────────────────────────

function Step1({ data, onChange }: { data: FormData["companyOverview"]; onChange: (d: FormData["companyOverview"]) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [k]: e.target.value });
  return (
    <FieldGroup>
      <SectionHeader icon={Building2} title="Company Overview" subtitle="Provide a brief overview of your company and operational structure." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Company Name" required>
          <Input placeholder="Acme Corporation" value={data.companyName} onChange={set("companyName")} />
        </Field>
        <Field label="Industry / Sector">
          <Input placeholder="e.g. Environmental Services, Healthcare" value={data.industry} onChange={set("industry")} />
        </Field>
      </div>
      <Field label="Regions Served" hint="List all regions, states, or cities where you operate.">
        <Textarea placeholder="e.g. Northeast US, California, Texas..." value={data.regionsServed} onChange={set("regionsServed")} className="min-h-[80px]" />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Website URL">
          <Input placeholder="https://yourcompany.com" value={data.websiteUrl} onChange={set("websiteUrl")} />
        </Field>
        <Field label="Primary Business Phone">
          <Input placeholder="(555) 000-0000" type="tel" value={data.primaryPhone} onChange={set("primaryPhone")} />
        </Field>
      </div>
      <Field label="Primary Business Email">
        <Input placeholder="info@yourcompany.com" type="email" value={data.primaryEmail} onChange={set("primaryEmail")} />
      </Field>
      <Field label="Do all departments operate in all regions?">
        <RadioYesNo name="allDepts" value={data.allDepartmentsAllRegions} onChange={v => onChange({ ...data, allDepartmentsAllRegions: v })} />
        <Textarea placeholder="Explain if needed..." value={data.operationModel} onChange={set("operationModel")} className="min-h-[80px] mt-3" />
      </Field>
    </FieldGroup>
  );
}

function Step2({ data, onChange }: { data: FormData["emailPlatform"]; onChange: (d: FormData["emailPlatform"]) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [k]: e.target.value });
  const togglePlatform = (p: string) => {
    const platforms = data.platform.includes(p) ? data.platform.filter(x => x !== p) : [...data.platform, p];
    onChange({ ...data, platform: platforms });
  };
  const PLATFORMS = ["Microsoft Outlook / Office 365", "Google Workspace (Gmail)", "Other", "Not sure — we will need to confirm"];
  return (
    <FieldGroup>
      <SectionHeader icon={Mail} title="Email Platform & Technical Integration" subtitle="Helps us configure the AI email routing system for your infrastructure." />
      <Field label="Which email platform does your organization use?">
        <div className="space-y-2 mt-1">
          {PLATFORMS.map(p => (
            <label key={p} className="flex items-center gap-3 cursor-pointer">
              <Checkbox
                checked={data.platform.includes(p)}
                onCheckedChange={() => togglePlatform(p)}
                className="data-[state=checked]:bg-[#0D9488] data-[state=checked]:border-[#0D9488]"
              />
              <span className="text-sm">{p}</span>
            </label>
          ))}
        </div>
      </Field>
      {data.platform.includes("Other") && (
        <Field label="If Other, please specify">
          <Input placeholder="Specify platform..." value={data.platformOther} onChange={set("platformOther")} />
        </Field>
      )}
      <Field label="Primary email domain(s)" hint="e.g. @yourcompany.com">
        <Input placeholder="@yourcompany.com" value={data.emailDomains} onChange={set("emailDomains")} />
      </Field>
    </FieldGroup>
  );
}

function Step3({ data, onChange }: { data: Department[]; onChange: (d: Department[]) => void }) {
  const update = (i: number, k: keyof Department, v: string) => {
    const next = data.map((d, idx) => idx === i ? { ...d, [k]: v } : d);
    onChange(next);
  };
  const add = () => { if (data.length < 8) onChange([...data, defaultDepartment()]); };
  const remove = (i: number) => { if (data.length > 1) onChange(data.filter((_, idx) => idx !== i)); };
  return (
    <FieldGroup>
      <SectionHeader icon={Users} title="Departments & Organizational Structure" subtitle="Complete one block per department. Include all teams that may receive routed calls or emails." />
      {data.map((dept, i) => (
        <Card key={i} className="p-5 space-y-4 border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
              <span className="font-semibold text-sm">Department {i + 1}</span>
            </div>
            {data.length > 1 && (
              <Button variant="ghost" size="sm" onClick={() => remove(i)} className="text-red-400 hover:text-red-500 hover:bg-red-500/10 h-7 w-7 p-0">
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Department Name">
              <Input placeholder="e.g. Operations" value={dept.name} onChange={e => update(i, "name", e.target.value)} />
            </Field>
            <Field label="What does this dept. handle?">
              <Input placeholder="e.g. Waste pickups, scheduling" value={dept.handles} onChange={e => update(i, "handles", e.target.value)} />
            </Field>
          </div>
          <Field label="Services Provided">
            <Textarea placeholder="Describe services this department provides..." value={dept.services} onChange={e => update(i, "services", e.target.value)} className="min-h-[70px]" />
          </Field>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Primary Contact 1 (Name + Phone/Email)">
              <Input placeholder="Jane Smith — jane@company.com" value={dept.primaryContact1} onChange={e => update(i, "primaryContact1", e.target.value)} />
            </Field>
            <Field label="Primary Contact 2 (optional)">
              <Input placeholder="John Doe — (555) 000-0000" value={dept.primaryContact2} onChange={e => update(i, "primaryContact2", e.target.value)} />
            </Field>
            <Field label="Backup Contact 1 (Name + Phone/Email)">
              <Input placeholder="Backup name + contact" value={dept.backupContact1} onChange={e => update(i, "backupContact1", e.target.value)} />
            </Field>
            <Field label="Backup Contact 2 (optional)">
              <Input placeholder="Backup name + contact" value={dept.backupContact2} onChange={e => update(i, "backupContact2", e.target.value)} />
            </Field>
          </div>
        </Card>
      ))}
      {data.length < 8 && (
        <Button variant="outline" onClick={add} className="w-full gap-2 border-dashed border-[#0D9488]/50 text-[#0D9488] hover:bg-[#0D9488]/5">
          <Plus className="w-4 h-4" /> Add Department
        </Button>
      )}
    </FieldGroup>
  );
}

function Step4({ data, onChange }: { data: TechContact[]; onChange: (d: TechContact[]) => void }) {
  const update = (i: number, k: keyof TechContact, v: string) => {
    onChange(data.map((c, idx) => idx === i ? { ...c, [k]: v } : c));
  };
  return (
    <FieldGroup>
      <SectionHeader icon={Wrench} title="Technical Setup Contacts" subtitle="Provide contact details for individuals involved in configuration, testing, and onboarding." />
      <div className="space-y-4">
        {data.map((contact, i) => (
          <Card key={i} className="p-5">
            <p className="text-sm font-semibold text-[#0D9488] mb-4">{contact.role}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Full Name">
                <Input placeholder="Full name" value={contact.name} onChange={e => update(i, "name", e.target.value)} />
              </Field>
              <Field label="Email Address">
                <Input placeholder="email@company.com" type="email" value={contact.email} onChange={e => update(i, "email", e.target.value)} />
              </Field>
              <Field label="Phone Number">
                <Input placeholder="(555) 000-0000" type="tel" value={contact.phone} onChange={e => update(i, "phone", e.target.value)} />
              </Field>
            </div>
          </Card>
        ))}
      </div>
    </FieldGroup>
  );
}

function Step5({ data, onChange }: { data: FormData["routingCategories"]; onChange: (d: FormData["routingCategories"]) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [k]: e.target.value });
  const toggleCat = (cat: string) => {
    const cats = data.defaultCategories.includes(cat)
      ? data.defaultCategories.filter(c => c !== cat)
      : [...data.defaultCategories, cat];
    onChange({ ...data, defaultCategories: cats });
  };
  return (
    <FieldGroup>
      <SectionHeader icon={GitBranch} title="Call & Email Routing Categories" subtitle="These categories determine how the AI classifies and routes each inbound interaction." />
      <Field label="Default Categories — confirm or modify:">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {DEFAULT_ROUTING_CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-secondary/30 transition">
              <Checkbox
                checked={data.defaultCategories.includes(cat)}
                onCheckedChange={() => toggleCat(cat)}
                className="data-[state=checked]:bg-[#0D9488] data-[state=checked]:border-[#0D9488]"
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </Field>
      <div className="space-y-3">
        <Label className="text-sm font-medium">Additional or Modified Categories</Label>
        {(["additionalCategory1", "additionalCategory2", "additionalCategory3"] as const).map((k, i) => (
          <Input key={k} placeholder={`Additional category ${i + 1}`} value={data[k]} onChange={set(k)} />
        ))}
      </div>
      <Field label="Any categories to remove or rename?">
        <Textarea placeholder="List any you'd like renamed or removed..." value={data.toRemoveOrRename} onChange={set("toRemoveOrRename")} className="min-h-[80px]" />
      </Field>
    </FieldGroup>
  );
}

function Step6({ data, onChange }: { data: FormData["callHandling"]; onChange: (d: FormData["callHandling"]) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [k]: e.target.value });
  return (
    <FieldGroup>
      <SectionHeader icon={Phone} title="Call Handling Preferences" subtitle="Define how the AI should behave when handling and routing inbound calls." />
      <div className="rounded-xl bg-secondary/30 p-5 space-y-5">
        {[
          { key: "liveTransfers" as const, label: "Should the AI attempt live call transfers?" },
          { key: "textNotification" as const, label: "If no transfer, should the AI send a text notification to the relevant party?" },
          { key: "emailNotification" as const, label: "If no transfer, should the AI send an email notification?" },
          { key: "takeMessage" as const, label: "Should the AI take a message if no one is available?" },
          { key: "scheduleCallback" as const, label: "Should the AI offer to schedule a callback?" },
        ].map(({ key, label }) => (
          <div key={key} className="space-y-1.5">
            <Label className="text-sm">{label}</Label>
            <RadioYesNo name={key} value={data[key]} onChange={v => onChange({ ...data, [key]: v })} />
          </div>
        ))}
      </div>
      <Field label="Preferred notification method">
        <div className="flex gap-6 mt-1">
          {["Text", "Email", "Both"].map(opt => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="notificationMethod"
                value={opt}
                checked={data.notificationMethod === opt}
                onChange={() => onChange({ ...data, notificationMethod: opt })}
                className="accent-[#0D9488] w-4 h-4"
              />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </Field>
      <Field label="What situations require immediate escalation?" hint="e.g. safety issues, VIP clients, urgent complaints">
        <Textarea placeholder="Describe escalation triggers..." value={data.escalationSituations} onChange={set("escalationSituations")} className="min-h-[80px]" />
      </Field>
      <Field label="Any blackout hours or after-hours rules?">
        <Textarea placeholder="e.g. No transfers after 6pm, emergency line only on weekends..." value={data.blackoutHours} onChange={set("blackoutHours")} className="min-h-[80px]" />
      </Field>
      <Field label="Additional call handling notes">
        <Textarea placeholder="Any other preferences..." value={data.additionalNotes} onChange={set("additionalNotes")} className="min-h-[80px]" />
      </Field>
    </FieldGroup>
  );
}

function Step7({ data, onChange }: { data: FormData["intakeRequirements"]; onChange: (d: FormData["intakeRequirements"]) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ ...data, [k]: e.target.value });
  const CATEGORIES = [
    { label: "Waste Pickup Requests", reqKey: "wastePickupRequired" as const, optKey: "wastePickupOptional" as const, hint: "e.g. location, waste type, volume, urgency, preferred pickup date" },
    { label: "Consulting / Safety Services", reqKey: "consultingRequired" as const, optKey: "consultingOptional" as const, hint: "e.g. type of service needed, timeline, company name, project size" },
    { label: "Billing & Payments", reqKey: "billingRequired" as const, optKey: "billingOptional" as const, hint: "e.g. invoice number, account name, amount in dispute" },
    { label: "Complaints / Issues", reqKey: "complaintsRequired" as const, optKey: "complaintsOptional" as const, hint: "e.g. issue description, severity, date of incident, prior contact" },
    { label: "Sales / New Leads", reqKey: "salesRequired" as const, optKey: "salesOptional" as const, hint: "e.g. service interest, company size, timeline, estimated budget" },
    { label: "General Inquiries", reqKey: "generalRequired" as const, optKey: "generalOptional" as const, hint: "e.g. question topic, preferred response method" },
  ];
  return (
    <FieldGroup>
      <SectionHeader icon={ClipboardList} title="Intake Requirements" subtitle="For each request type, define what information the AI must collect before routing or responding." />
      {CATEGORIES.map(({ label, reqKey, optKey, hint }) => (
        <Card key={label} className="p-5 space-y-4">
          <p className="text-sm font-semibold text-[#0D9488]">{label}</p>
          <Field label="Required fields to collect" hint={hint}>
            <Textarea placeholder="List required fields..." value={data[reqKey]} onChange={set(reqKey)} className="min-h-[80px]" />
          </Field>
          <Field label="Optional / nice-to-have fields">
            <Textarea placeholder="List optional fields..." value={data[optKey]} onChange={set(optKey)} className="min-h-[60px]" />
          </Field>
        </Card>
      ))}
    </FieldGroup>
  );
}

function Step8({ data, onChange }: { data: FormData["routingLogic"]; onChange: (d: FormData["routingLogic"]) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [k]: e.target.value });
  return (
    <FieldGroup>
      <SectionHeader icon={Map} title="Routing Logic & Special Rules" subtitle="Describe any special routing rules beyond standard category-to-department mapping." />
      <Field label="Any VIP clients with priority routing?">
        <RadioYesNo name="vipClients" value={data.vipClients} onChange={v => onChange({ ...data, vipClients: v })} />
        {data.vipClients === "Yes" && (
          <Textarea placeholder="List VIP clients or criteria..." value={data.vipDetails} onChange={set("vipDetails")} className="min-h-[80px] mt-3" />
        )}
      </Field>
      <Field label="Routing rules by time of day / day of week?">
        <Textarea placeholder="e.g. After 6pm route to voicemail, weekends to on-call..." value={data.timeOfDayRules} onChange={set("timeOfDayRules")} className="min-h-[80px]" />
      </Field>
      <Field label="Any geographic routing rules?" hint="e.g. region-specific departments">
        <Textarea placeholder="e.g. East Coast calls go to Frederick office..." value={data.geographicRules} onChange={set("geographicRules")} className="min-h-[80px]" />
      </Field>
      <Field label="Languages to support beyond English?">
        <Input placeholder="e.g. Spanish, French..." value={data.languages} onChange={set("languages")} />
      </Field>
      <Field label="Any keywords that should trigger special routing?">
        <Textarea placeholder="e.g. 'emergency', 'urgent', 'spill'..." value={data.triggerKeywords} onChange={set("triggerKeywords")} className="min-h-[80px]" />
      </Field>
      <Field label="Any calls or emails that should never be auto-handled?">
        <Textarea placeholder="e.g. Legal threats, named executives..." value={data.neverAutoHandled} onChange={set("neverAutoHandled")} className="min-h-[80px]" />
      </Field>
      <Field label="Other special rules">
        <Textarea placeholder="Any additional routing logic..." value={data.otherRules} onChange={set("otherRules")} className="min-h-[80px]" />
      </Field>
    </FieldGroup>
  );
}

function Step9({ faqs, faqMeta, onFaqsChange, onMetaChange }: {
  faqs: FAQ[];
  faqMeta: FormData["faqMeta"];
  onFaqsChange: (f: FAQ[]) => void;
  onMetaChange: (m: FormData["faqMeta"]) => void;
}) {
  const update = (i: number, k: keyof FAQ, v: string) =>
    onFaqsChange(faqs.map((f, idx) => idx === i ? { ...f, [k]: v } : f));
  const add = () => { if (faqs.length < 20) onFaqsChange([...faqs, { question: "", answer: "" }]); };
  const remove = (i: number) => { if (faqs.length > 1) onFaqsChange(faqs.filter((_, idx) => idx !== i)); };
  return (
    <FieldGroup>
      <SectionHeader icon={HelpCircle} title="FAQs & Knowledge Base" subtitle="The more FAQs you provide, the more accurately your AI will respond without needing to transfer callers." />
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <Card key={i} className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wide">FAQ {i + 1}</span>
              {faqs.length > 1 && (
                <Button variant="ghost" size="sm" onClick={() => remove(i)} className="text-red-400 hover:text-red-500 hover:bg-red-500/10 h-7 w-7 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Field label="Question">
              <Input placeholder="e.g. What are your service hours?" value={faq.question} onChange={e => update(i, "question", e.target.value)} />
            </Field>
            <Field label="Answer">
              <Textarea placeholder="Provide the answer the AI should give..." value={faq.answer} onChange={e => update(i, "answer", e.target.value)} className="min-h-[80px]" />
            </Field>
          </Card>
        ))}
      </div>
      {faqs.length < 20 && (
        <Button variant="outline" onClick={add} className="w-full gap-2 border-dashed border-[#0D9488]/50 text-[#0D9488] hover:bg-[#0D9488]/5">
          <Plus className="w-4 h-4" /> Add FAQ
        </Button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Attachment name (if attaching separate FAQ doc)">
          <Input placeholder="e.g. FAQ_Document_v2.pdf" value={faqMeta.attachmentName} onChange={e => onMetaChange({ ...faqMeta, attachmentName: e.target.value })} />
        </Field>
      </div>
      <Field label="Additional notes on FAQ content">
        <Textarea placeholder="Any extra context about FAQs..." value={faqMeta.additionalNotes} onChange={e => onMetaChange({ ...faqMeta, additionalNotes: e.target.value })} className="min-h-[80px]" />
      </Field>
    </FieldGroup>
  );
}

function Step10({ data, onChange }: { data: FormData["escalation"]; onChange: (d: FormData["escalation"]) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [k]: e.target.value });
  return (
    <FieldGroup>
      <SectionHeader icon={AlertTriangle} title="Escalation Rules" subtitle="Define what qualifies as urgent so the AI knows when to loop in a human immediately." />
      <Field label="Complaints requiring escalation" hint="e.g. safety risk, regulatory issue, legal threat">
        <Textarea placeholder="Describe complaint types that require immediate human escalation..." value={data.complaintsRequiringEscalation} onChange={set("complaintsRequiringEscalation")} className="min-h-[80px]" />
      </Field>
      <Field label="High-priority client list or criteria" hint="e.g. accounts over $X, named clients, long-term customers">
        <Textarea placeholder="List VIP clients or define criteria..." value={data.highPriorityClients} onChange={set("highPriorityClients")} className="min-h-[80px]" />
      </Field>
      <Field label="Situations requiring immediate phone call" hint="e.g. emergency on-site, injury, major service failure">
        <Textarea placeholder="Describe situations that require an immediate call..." value={data.immediateCallSituations} onChange={set("immediateCallSituations")} className="min-h-[80px]" />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="After-hours escalation contact name">
          <Input placeholder="Full name" value={data.afterHoursContactName} onChange={set("afterHoursContactName")} />
        </Field>
        <Field label="After-hours escalation contact phone">
          <Input placeholder="(555) 000-0000" type="tel" value={data.afterHoursContactPhone} onChange={set("afterHoursContactPhone")} />
        </Field>
      </div>
      <Field label="Any other escalation scenarios">
        <Textarea placeholder="Any additional escalation rules..." value={data.otherScenarios} onChange={set("otherScenarios")} className="min-h-[80px]" />
      </Field>
    </FieldGroup>
  );
}

function Step11({ data, onChange }: { data: FormData["tracking"]; onChange: (d: FormData["tracking"]) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [k]: e.target.value });
  const toggleField = (f: string) => {
    const fields = data.defaultFields.includes(f) ? data.defaultFields.filter(x => x !== f) : [...data.defaultFields, f];
    onChange({ ...data, defaultFields: fields });
  };
  return (
    <FieldGroup>
      <SectionHeader icon={BarChart3} title="Tracking & Reporting Requirements" subtitle="Confirm which fields to track for every interaction and how reports should be delivered." />
      <Field label="Default Tracking Fields — confirm or modify:">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {DEFAULT_TRACKING_FIELDS.map(f => (
            <label key={f} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-secondary/30 transition">
              <Checkbox
                checked={data.defaultFields.includes(f)}
                onCheckedChange={() => toggleField(f)}
                className="data-[state=checked]:bg-[#0D9488] data-[state=checked]:border-[#0D9488]"
              />
              <span className="text-sm">{f}</span>
            </label>
          ))}
        </div>
      </Field>
      <div className="space-y-3">
        <Label className="text-sm font-medium">Additional Fields to Track</Label>
        {(["customField1", "customField2", "customField3"] as const).map((k, i) => (
          <Input key={k} placeholder={`Custom field ${i + 1}`} value={data[k]} onChange={set(k)} />
        ))}
      </div>
      <Field label="Reporting cadence preference" hint="e.g. daily summary email, weekly report, real-time dashboard">
        <Input placeholder="e.g. Weekly email summary every Monday" value={data.reportingCadence} onChange={set("reportingCadence")} />
      </Field>
      <Field label="Who should receive reports? (Name + email)">
        <Textarea placeholder="e.g. Jane Smith — jane@company.com" value={data.reportRecipients} onChange={set("reportRecipients")} className="min-h-[80px]" />
      </Field>
    </FieldGroup>
  );
}

function Step12({ data, onChange }: { data: FormData["additionalNotes"]; onChange: (d: FormData["additionalNotes"]) => void }) {
  return (
    <FieldGroup>
      <SectionHeader icon={FileText} title="Additional Notes & Special Instructions" subtitle="Include anything unique about your workflow, tone preferences, or special instructions." />
      <Field label="Additional context, tone guidelines, special workflows, or other notes:">
        <Textarea
          placeholder="Use this space to share anything else we should know — company culture, communication tone, unique workflows, seasonal changes, etc."
          value={data.notes}
          onChange={e => onChange({ ...data, notes: e.target.value })}
          className="min-h-[240px]"
        />
      </Field>
    </FieldGroup>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function IntakePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const TOTAL = STEPS.length;

  const setSection = <K extends keyof FormData>(key: K) => (val: FormData[K]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const validate = () => {
    if (currentStep === 1 && !form.companyOverview.companyName.trim()) {
      setError("Company name is required to continue.");
      return false;
    }
    setError("");
    return true;
  };

  const next = () => {
    if (!validate()) return;
    if (currentStep < TOTAL) setCurrentStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    setError("");
    if (currentStep > 1) setCurrentStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: form.companyOverview.companyName,
          contactEmail: form.companyOverview.primaryEmail,
          data: form,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Submission failed");
      }
      setSubmitted(true);
      toast.success("Intake form submitted successfully!");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed. Please try again.");
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPct = Math.round(((currentStep - 1) / TOTAL) * 100);

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="marketing-page flex-1 pt-24 flex items-center justify-center">
          <div className="container mx-auto px-6 py-20 max-w-lg text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow-2xl shadow-[#0D9488]/30">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Form Submitted!</h1>
            <p className="text-muted-foreground leading-relaxed">
              Thank you, <strong>{form.companyOverview.companyName}</strong>. Your intake form has been received. The Ephesus AI team will review your responses and reach out shortly to begin configuration.
            </p>
            <div className="bg-secondary/30 rounded-xl p-5 text-sm text-muted-foreground space-y-2 text-left">
              <p className="font-semibold text-foreground">Next Steps:</p>
              <p>1. We'll configure your AI receptionist and test during off hours</p>
              <p>2. A tailored demo environment will be built based on your responses</p>
              <p>3. We'll schedule a testing and refinement session with your team</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="marketing-page flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden py-14 bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0D9488_0%,_transparent_60%)] opacity-20" />
          <div className="container mx-auto px-6 relative text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow-2xl shadow-[#0D9488]/40 mb-5">
              <ClipboardList className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Client{" "}
              <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                Intake Form
              </span>
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-sm">
              AI Voice Receptionist & Email Routing System — Configuration Questionnaire
            </p>
            <p className="text-white/40 text-xs mt-1">Prepared by Ephesus AI Solutions &nbsp;·&nbsp; Confidential</p>
          </div>
        </section>

        {/* Progress bar */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                Step {currentStep} of {TOTAL} — <span className="text-foreground">{STEPS[currentStep - 1].label}</span>
              </span>
              <span className="text-xs text-muted-foreground">{progressPct}% complete</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
          {/* Step pills — scrollable */}
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-1 px-6 pb-3 min-w-max mx-auto justify-center">
              {STEPS.map(step => {
                const Icon = step.icon;
                const isActive = step.number === currentStep;
                const isDone = step.number < currentStep;
                return (
                  <button
                    key={step.number}
                    onClick={() => { if (isDone) { setCurrentStep(step.number); window.scrollTo({ top: 0, behavior: "smooth" }); } }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition whitespace-nowrap ${
                      isActive ? "bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] text-white shadow" :
                      isDone ? "bg-[#0D9488]/15 text-[#0D9488] cursor-pointer hover:bg-[#0D9488]/25" :
                      "bg-secondary text-muted-foreground cursor-default"
                    }`}
                  >
                    {isDone ? <CheckCircle className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                    {step.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form body */}
        <section className="container mx-auto px-6 py-10 max-w-3xl">
          <Card className="p-6 md:p-10 gradient-border">
            {currentStep === 1 && <Step1 data={form.companyOverview} onChange={setSection("companyOverview")} />}
            {currentStep === 2 && <Step2 data={form.emailPlatform} onChange={setSection("emailPlatform")} />}
            {currentStep === 3 && <Step3 data={form.departments} onChange={setSection("departments")} />}
            {currentStep === 4 && <Step4 data={form.technicalContacts} onChange={setSection("technicalContacts")} />}
            {currentStep === 5 && <Step5 data={form.routingCategories} onChange={setSection("routingCategories")} />}
            {currentStep === 6 && <Step6 data={form.callHandling} onChange={setSection("callHandling")} />}
            {currentStep === 7 && <Step7 data={form.intakeRequirements} onChange={setSection("intakeRequirements")} />}
            {currentStep === 8 && <Step8 data={form.routingLogic} onChange={setSection("routingLogic")} />}
            {currentStep === 9 && (
              <Step9
                faqs={form.faqs}
                faqMeta={form.faqMeta}
                onFaqsChange={setSection("faqs")}
                onMetaChange={setSection("faqMeta")}
              />
            )}
            {currentStep === 10 && <Step10 data={form.escalation} onChange={setSection("escalation")} />}
            {currentStep === 11 && <Step11 data={form.tracking} onChange={setSection("tracking")} />}
            {currentStep === 12 && <Step12 data={form.additionalNotes} onChange={setSection("additionalNotes")} />}

            {error && (
              <p className="mt-4 text-sm text-red-500 bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={back}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>

              <span className="text-xs text-muted-foreground">{currentStep} / {TOTAL}</span>

              {currentStep < TOTAL ? (
                <Button
                  onClick={next}
                  className="gap-2 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="gap-2 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25"
                >
                  {isSubmitting ? "Submitting..." : "Submit Form"}
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </Card>

          <p className="text-center text-xs text-muted-foreground/50 mt-6">
            Partial answers are welcome — the Ephesus AI team will follow up on any gaps during onboarding.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
