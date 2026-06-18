'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  Building2, Mail, Users, Wrench, GitBranch, Phone, ClipboardList,
  Map, HelpCircle, AlertTriangle, BarChart3, FileText, CheckCircle,
  ChevronLeft, ChevronRight, Plus, Trash2, X,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Department {
  name: string; handles: string; services: string;
  primaryContact1: string; primaryContact2: string;
  backupContact1: string; backupContact2: string;
}
interface TechContact { role: string; name: string; email: string; phone: string; }
interface FAQ { question: string; answer: string; }

interface FormData {
  companyOverview: { companyName: string; industry: string; regionsServed: string; websiteUrl: string; primaryPhone: string; primaryEmail: string; allDepartmentsAllRegions: string; operationModel: string; };
  emailPlatform: { platform: string[]; platformOther: string; emailDomains: string; hasApi: string; hasItAdmin: string; hasThirdPartyAccess: string; hasCrm: string; crmName: string; apiRestrictions: string; };
  departments: Department[];
  technicalContacts: TechContact[];
  routingCategories: { defaultCategories: string[]; additionalCategory1: string; additionalCategory2: string; additionalCategory3: string; toRemoveOrRename: string; };
  callHandling: { liveTransfers: string; textNotification: string; emailNotification: string; takeMessage: string; scheduleCallback: string; notificationMethod: string; escalationSituations: string; blackoutHours: string; additionalNotes: string; };
  intakeRequirements: { wastePickupRequired: string; wastePickupOptional: string; consultingRequired: string; consultingOptional: string; billingRequired: string; billingOptional: string; complaintsRequired: string; complaintsOptional: string; salesRequired: string; salesOptional: string; generalRequired: string; generalOptional: string; };
  routingLogic: { vipClients: string; vipDetails: string; timeOfDayRules: string; geographicRules: string; languages: string; triggerKeywords: string; neverAutoHandled: string; otherRules: string; };
  faqs: FAQ[];
  faqMeta: { attachmentName: string; additionalNotes: string; };
  escalation: { complaintsRequiringEscalation: string; highPriorityClients: string; immediateCallSituations: string; afterHoursContactName: string; afterHoursContactPhone: string; otherScenarios: string; };
  tracking: { defaultFields: string[]; customField1: string; customField2: string; customField3: string; reportingCadence: string; reportRecipients: string; };
  additionalNotes: { notes: string; };
}

const defaultDept = (): Department => ({ name: '', handles: '', services: '', primaryContact1: '', primaryContact2: '', backupContact1: '', backupContact2: '' });

const TECH_ROLES = ['Primary Technical Contact', 'IT Administrator / Email Admin', 'Project Manager / Coordinator', 'Decision Maker / Executive Sponsor', 'Additional Contact'];

const DEFAULT_ROUTING_CATS = ['Waste Pickup Requests', 'Consulting / Safety Services', 'Billing & Payments', 'Complaints / Issues', 'General Inquiries', 'Sales / New Leads', 'Misdirected Calls / Emails', 'Emergency / Escalation'];

const DEFAULT_TRACKING = ['Timestamp', 'Caller / Sender Name', 'Email Address', 'Phone Number', 'Category', 'Call / Email Summary', 'Full Transcript', 'Assigned Department', 'Status', 'Caller Sentiment', 'Caller Intent', 'Duration (seconds)', 'Ended By (caller vs. AI)', 'Routing Path Taken'];

const STEPS = [
  { number: 1, label: 'Company Overview', icon: Building2 },
  { number: 2, label: 'Email Platform', icon: Mail },
  { number: 3, label: 'Departments', icon: Users },
  { number: 4, label: 'Tech Contacts', icon: Wrench },
  { number: 5, label: 'Routing Categories', icon: GitBranch },
  { number: 6, label: 'Call Handling', icon: Phone },
  { number: 7, label: 'Intake Requirements', icon: ClipboardList },
  { number: 8, label: 'Routing Logic', icon: Map },
  { number: 9, label: 'FAQs', icon: HelpCircle },
  { number: 10, label: 'Escalation', icon: AlertTriangle },
  { number: 11, label: 'Tracking', icon: BarChart3 },
  { number: 12, label: 'Additional Notes', icon: FileText },
];

const initialForm: FormData = {
  companyOverview: { companyName: '', industry: '', regionsServed: '', websiteUrl: '', primaryPhone: '', primaryEmail: '', allDepartmentsAllRegions: '', operationModel: '' },
  emailPlatform: { platform: [], platformOther: '', emailDomains: '', hasApi: '', hasItAdmin: '', hasThirdPartyAccess: '', hasCrm: '', crmName: '', apiRestrictions: '' },
  departments: [defaultDept(), defaultDept()],
  technicalContacts: TECH_ROLES.map(role => ({ role, name: '', email: '', phone: '' })),
  routingCategories: { defaultCategories: [...DEFAULT_ROUTING_CATS], additionalCategory1: '', additionalCategory2: '', additionalCategory3: '', toRemoveOrRename: '' },
  callHandling: { liveTransfers: '', textNotification: '', emailNotification: '', takeMessage: '', scheduleCallback: '', notificationMethod: '', escalationSituations: '', blackoutHours: '', additionalNotes: '' },
  intakeRequirements: { wastePickupRequired: '', wastePickupOptional: '', consultingRequired: '', consultingOptional: '', billingRequired: '', billingOptional: '', complaintsRequired: '', complaintsOptional: '', salesRequired: '', salesOptional: '', generalRequired: '', generalOptional: '' },
  routingLogic: { vipClients: '', vipDetails: '', timeOfDayRules: '', geographicRules: '', languages: '', triggerKeywords: '', neverAutoHandled: '', otherRules: '' },
  faqs: [{ question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }],
  faqMeta: { attachmentName: '', additionalNotes: '' },
  escalation: { complaintsRequiringEscalation: '', highPriorityClients: '', immediateCallSituations: '', afterHoursContactName: '', afterHoursContactPhone: '', otherScenarios: '' },
  tracking: { defaultFields: [...DEFAULT_TRACKING], customField1: '', customField2: '', customField3: '', reportingCadence: '', reportRecipients: '' },
  additionalNotes: { notes: '' },
};

// ── Shared sub-components ─────────────────────────────────────────────────────

function FG({ children }: { children: React.ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}

function F({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}{required && <span className="text-red-500 ml-1">*</span>}</Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function YesNo({ value, onChange, name }: { value: string; onChange: (v: string) => void; name: string }) {
  return (
    <div className="flex gap-6">
      {['Yes', 'No'].map(opt => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name={name} value={opt} checked={value === opt} onChange={() => onChange(opt)} className="accent-[#0D9488] w-4 h-4" />
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function SH({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle?: string }) {
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

// ── Steps ─────────────────────────────────────────────────────────────────────

function Step1({ data, onChange }: { data: FormData['companyOverview']; onChange: (d: FormData['companyOverview']) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...data, [k]: e.target.value });
  return (
    <FG>
      <SH icon={Building2} title="Company Overview" subtitle="Provide a brief overview of your company and operational structure." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <F label="Company Name" required><Input placeholder="Acme Corporation" value={data.companyName} onChange={set('companyName')} /></F>
        <F label="Industry / Sector"><Input placeholder="e.g. Environmental Services, Healthcare" value={data.industry} onChange={set('industry')} /></F>
      </div>
      <F label="Regions Served" hint="List all regions, states, or cities where you operate."><Textarea placeholder="e.g. Northeast US, California, Texas..." value={data.regionsServed} onChange={set('regionsServed')} className="min-h-[80px]" /></F>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <F label="Website URL"><Input placeholder="https://yourcompany.com" value={data.websiteUrl} onChange={set('websiteUrl')} /></F>
        <F label="Primary Business Phone"><Input placeholder="(555) 000-0000" type="tel" value={data.primaryPhone} onChange={set('primaryPhone')} /></F>
      </div>
      <F label="Primary Business Email"><Input placeholder="info@yourcompany.com" type="email" value={data.primaryEmail} onChange={set('primaryEmail')} /></F>
      <F label="Do all departments operate in all regions?">
        <YesNo name="allDepts" value={data.allDepartmentsAllRegions} onChange={v => onChange({ ...data, allDepartmentsAllRegions: v })} />
        <Textarea placeholder="Explain if needed..." value={data.operationModel} onChange={set('operationModel')} className="min-h-[80px] mt-3" />
      </F>
    </FG>
  );
}

function Step2({ data, onChange }: { data: FormData['emailPlatform']; onChange: (d: FormData['emailPlatform']) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...data, [k]: e.target.value });
  const toggle = (p: string) => { const arr = data.platform.includes(p) ? data.platform.filter(x => x !== p) : [...data.platform, p]; onChange({ ...data, platform: arr }); };
  const PLATS = ['Microsoft Outlook / Office 365', 'Google Workspace (Gmail)', 'Other', 'Not sure — we will need to confirm'];
  return (
    <FG>
      <SH icon={Mail} title="Email Platform & Technical Integration" subtitle="Helps us configure the AI email routing system for your infrastructure." />
      <F label="Which email platform does your organization use?">
        <div className="space-y-2 mt-1">
          {PLATS.map(p => (
            <label key={p} className="flex items-center gap-3 cursor-pointer">
              <Checkbox checked={data.platform.includes(p)} onCheckedChange={() => toggle(p)} className="data-[state=checked]:bg-[#0D9488] data-[state=checked]:border-[#0D9488]" />
              <span className="text-sm">{p}</span>
            </label>
          ))}
        </div>
      </F>
      {data.platform.includes('Other') && <F label="If Other, please specify"><Input placeholder="Specify platform..." value={data.platformOther} onChange={set('platformOther')} /></F>}
      <F label="Primary email domain(s)" hint="e.g. @yourcompany.com"><Input placeholder="@yourcompany.com" value={data.emailDomains} onChange={set('emailDomains')} /></F>
    </FG>
  );
}

function Step3({ data, onChange }: { data: Department[]; onChange: (d: Department[]) => void }) {
  const upd = (i: number, k: keyof Department, v: string) => onChange(data.map((d, idx) => idx === i ? { ...d, [k]: v } : d));
  return (
    <FG>
      <SH icon={Users} title="Departments & Organizational Structure" subtitle="Complete one block per department." />
      {data.map((dept, i) => (
        <Card key={i} className="p-5 space-y-4 border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
              <span className="font-semibold text-sm">Department {i + 1}</span>
            </div>
            {data.length > 1 && <Button variant="ghost" size="sm" onClick={() => onChange(data.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-500 hover:bg-red-500/10 h-7 w-7 p-0"><Trash2 className="w-4 h-4" /></Button>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <F label="Department Name"><Input placeholder="e.g. Operations" value={dept.name} onChange={e => upd(i, 'name', e.target.value)} /></F>
            <F label="What does this dept. handle?"><Input placeholder="e.g. Waste pickups, scheduling" value={dept.handles} onChange={e => upd(i, 'handles', e.target.value)} /></F>
          </div>
          <F label="Services Provided"><Textarea placeholder="Describe services..." value={dept.services} onChange={e => upd(i, 'services', e.target.value)} className="min-h-[70px]" /></F>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <F label="Primary Contact 1"><Input placeholder="Jane Smith — jane@co.com" value={dept.primaryContact1} onChange={e => upd(i, 'primaryContact1', e.target.value)} /></F>
            <F label="Primary Contact 2 (optional)"><Input placeholder="John Doe — (555) 000-0000" value={dept.primaryContact2} onChange={e => upd(i, 'primaryContact2', e.target.value)} /></F>
            <F label="Backup Contact 1"><Input placeholder="Backup name + contact" value={dept.backupContact1} onChange={e => upd(i, 'backupContact1', e.target.value)} /></F>
            <F label="Backup Contact 2 (optional)"><Input placeholder="Backup name + contact" value={dept.backupContact2} onChange={e => upd(i, 'backupContact2', e.target.value)} /></F>
          </div>
        </Card>
      ))}
      {data.length < 8 && <Button variant="outline" onClick={() => onChange([...data, defaultDept()])} className="w-full gap-2 border-dashed border-[#0D9488]/50 text-[#0D9488] hover:bg-[#0D9488]/5"><Plus className="w-4 h-4" /> Add Department</Button>}
    </FG>
  );
}

function Step4({ data, onChange }: { data: TechContact[]; onChange: (d: TechContact[]) => void }) {
  const upd = (i: number, k: keyof TechContact, v: string) => onChange(data.map((c, idx) => idx === i ? { ...c, [k]: v } : c));
  return (
    <FG>
      <SH icon={Wrench} title="Technical Setup Contacts" subtitle="Provide contact details for individuals involved in configuration and onboarding." />
      {data.map((c, i) => (
        <Card key={i} className="p-5">
          <p className="text-sm font-semibold text-[#0D9488] mb-4">{c.role}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <F label="Full Name"><Input placeholder="Full name" value={c.name} onChange={e => upd(i, 'name', e.target.value)} /></F>
            <F label="Email Address"><Input placeholder="email@co.com" type="email" value={c.email} onChange={e => upd(i, 'email', e.target.value)} /></F>
            <F label="Phone Number"><Input placeholder="(555) 000-0000" type="tel" value={c.phone} onChange={e => upd(i, 'phone', e.target.value)} /></F>
          </div>
        </Card>
      ))}
    </FG>
  );
}

function Step5({ data, onChange }: { data: FormData['routingCategories']; onChange: (d: FormData['routingCategories']) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...data, [k]: e.target.value });
  const toggle = (cat: string) => { const arr = data.defaultCategories.includes(cat) ? data.defaultCategories.filter(c => c !== cat) : [...data.defaultCategories, cat]; onChange({ ...data, defaultCategories: arr }); };
  return (
    <FG>
      <SH icon={GitBranch} title="Call & Email Routing Categories" subtitle="Confirm or modify the default categories the AI uses to classify inbound interactions." />
      <F label="Default Categories:">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {DEFAULT_ROUTING_CATS.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-secondary/30 transition">
              <Checkbox checked={data.defaultCategories.includes(cat)} onCheckedChange={() => toggle(cat)} className="data-[state=checked]:bg-[#0D9488] data-[state=checked]:border-[#0D9488]" />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </F>
      <div className="space-y-3">
        <Label className="text-sm font-medium">Additional Categories</Label>
        {(['additionalCategory1', 'additionalCategory2', 'additionalCategory3'] as const).map((k, i) => (
          <Input key={k} placeholder={`Additional category ${i + 1}`} value={data[k]} onChange={set(k)} />
        ))}
      </div>
      <F label="Any categories to remove or rename?"><Textarea placeholder="List any to rename or remove..." value={data.toRemoveOrRename} onChange={set('toRemoveOrRename')} className="min-h-[80px]" /></F>
    </FG>
  );
}

function Step6({ data, onChange }: { data: FormData['callHandling']; onChange: (d: FormData['callHandling']) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...data, [k]: e.target.value });
  return (
    <FG>
      <SH icon={Phone} title="Call Handling Preferences" subtitle="Define how the AI should behave when handling and routing inbound calls." />
      <div className="rounded-xl bg-secondary/30 p-5 space-y-5">
        {[
          { key: 'liveTransfers' as const, label: 'Should the AI attempt live call transfers?' },
          { key: 'textNotification' as const, label: 'If no transfer, should the AI send a text notification?' },
          { key: 'emailNotification' as const, label: 'If no transfer, should the AI send an email notification?' },
          { key: 'takeMessage' as const, label: 'Should the AI take a message if no one is available?' },
          { key: 'scheduleCallback' as const, label: 'Should the AI offer to schedule a callback?' },
        ].map(({ key, label }) => (
          <div key={key} className="space-y-1.5">
            <Label className="text-sm">{label}</Label>
            <YesNo name={key} value={data[key]} onChange={v => onChange({ ...data, [key]: v })} />
          </div>
        ))}
      </div>
      <F label="Preferred notification method">
        <div className="flex gap-6 mt-1">
          {['Text', 'Email', 'Both'].map(opt => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="notifMethod" value={opt} checked={data.notificationMethod === opt} onChange={() => onChange({ ...data, notificationMethod: opt })} className="accent-[#0D9488] w-4 h-4" />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
      </F>
      <F label="What situations require immediate escalation?" hint="e.g. safety issues, VIP clients"><Textarea placeholder="Describe escalation triggers..." value={data.escalationSituations} onChange={set('escalationSituations')} className="min-h-[80px]" /></F>
      <F label="Any blackout hours or after-hours rules?"><Textarea placeholder="e.g. No transfers after 6pm..." value={data.blackoutHours} onChange={set('blackoutHours')} className="min-h-[80px]" /></F>
      <F label="Additional call handling notes"><Textarea placeholder="Any other preferences..." value={data.additionalNotes} onChange={set('additionalNotes')} className="min-h-[80px]" /></F>
    </FG>
  );
}

function Step7({ data, onChange }: { data: FormData['intakeRequirements']; onChange: (d: FormData['intakeRequirements']) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange({ ...data, [k]: e.target.value });
  const CATS = [
    { label: 'Waste Pickup Requests', req: 'wastePickupRequired' as const, opt: 'wastePickupOptional' as const },
    { label: 'Consulting / Safety Services', req: 'consultingRequired' as const, opt: 'consultingOptional' as const },
    { label: 'Billing & Payments', req: 'billingRequired' as const, opt: 'billingOptional' as const },
    { label: 'Complaints / Issues', req: 'complaintsRequired' as const, opt: 'complaintsOptional' as const },
    { label: 'Sales / New Leads', req: 'salesRequired' as const, opt: 'salesOptional' as const },
    { label: 'General Inquiries', req: 'generalRequired' as const, opt: 'generalOptional' as const },
  ];
  return (
    <FG>
      <SH icon={ClipboardList} title="Intake Requirements" subtitle="For each request type, define what info the AI must collect before routing." />
      {CATS.map(({ label, req, opt }) => (
        <Card key={label} className="p-5 space-y-4">
          <p className="text-sm font-semibold text-[#0D9488]">{label}</p>
          <F label="Required fields to collect"><Textarea placeholder="List required fields..." value={data[req]} onChange={set(req)} className="min-h-[80px]" /></F>
          <F label="Optional / nice-to-have fields"><Textarea placeholder="List optional fields..." value={data[opt]} onChange={set(opt)} className="min-h-[60px]" /></F>
        </Card>
      ))}
    </FG>
  );
}

function Step8({ data, onChange }: { data: FormData['routingLogic']; onChange: (d: FormData['routingLogic']) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...data, [k]: e.target.value });
  return (
    <FG>
      <SH icon={Map} title="Routing Logic & Special Rules" subtitle="Describe any special routing rules beyond standard category-to-department mapping." />
      <F label="Any VIP clients with priority routing?">
        <YesNo name="vipClients" value={data.vipClients} onChange={v => onChange({ ...data, vipClients: v })} />
        {data.vipClients === 'Yes' && <Textarea placeholder="List VIP clients or criteria..." value={data.vipDetails} onChange={set('vipDetails')} className="min-h-[80px] mt-3" />}
      </F>
      <F label="Routing rules by time of day / day of week?"><Textarea placeholder="e.g. After 6pm route to voicemail..." value={data.timeOfDayRules} onChange={set('timeOfDayRules')} className="min-h-[80px]" /></F>
      <F label="Any geographic routing rules?"><Textarea placeholder="e.g. East Coast calls go to Frederick office..." value={data.geographicRules} onChange={set('geographicRules')} className="min-h-[80px]" /></F>
      <F label="Languages to support beyond English?"><Input placeholder="e.g. Spanish, French..." value={data.languages} onChange={set('languages')} /></F>
      <F label="Keywords that should trigger special routing?"><Textarea placeholder="e.g. 'emergency', 'urgent', 'spill'..." value={data.triggerKeywords} onChange={set('triggerKeywords')} className="min-h-[80px]" /></F>
      <F label="Calls or emails that should never be auto-handled?"><Textarea placeholder="e.g. Legal threats, named executives..." value={data.neverAutoHandled} onChange={set('neverAutoHandled')} className="min-h-[80px]" /></F>
      <F label="Other special rules"><Textarea placeholder="Any additional routing logic..." value={data.otherRules} onChange={set('otherRules')} className="min-h-[80px]" /></F>
    </FG>
  );
}

function Step9({ faqs, faqMeta, onFaqsChange, onMetaChange }: { faqs: FAQ[]; faqMeta: FormData['faqMeta']; onFaqsChange: (f: FAQ[]) => void; onMetaChange: (m: FormData['faqMeta']) => void; }) {
  const upd = (i: number, k: keyof FAQ, v: string) => onFaqsChange(faqs.map((f, idx) => idx === i ? { ...f, [k]: v } : f));
  return (
    <FG>
      <SH icon={HelpCircle} title="FAQs & Knowledge Base" subtitle="The more FAQs you provide, the more accurately your AI will respond." />
      {faqs.map((faq, i) => (
        <Card key={i} className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0D9488] uppercase tracking-wide">FAQ {i + 1}</span>
            {faqs.length > 1 && <Button variant="ghost" size="sm" onClick={() => onFaqsChange(faqs.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-500 hover:bg-red-500/10 h-7 w-7 p-0"><Trash2 className="w-4 h-4" /></Button>}
          </div>
          <F label="Question"><Input placeholder="e.g. What are your service hours?" value={faq.question} onChange={e => upd(i, 'question', e.target.value)} /></F>
          <F label="Answer"><Textarea placeholder="Provide the answer the AI should give..." value={faq.answer} onChange={e => upd(i, 'answer', e.target.value)} className="min-h-[80px]" /></F>
        </Card>
      ))}
      {faqs.length < 20 && <Button variant="outline" onClick={() => onFaqsChange([...faqs, { question: '', answer: '' }])} className="w-full gap-2 border-dashed border-[#0D9488]/50 text-[#0D9488] hover:bg-[#0D9488]/5"><Plus className="w-4 h-4" /> Add FAQ</Button>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <F label="Attachment name (if attaching separate FAQ doc)"><Input placeholder="e.g. FAQ_Document_v2.pdf" value={faqMeta.attachmentName} onChange={e => onMetaChange({ ...faqMeta, attachmentName: e.target.value })} /></F>
      </div>
      <F label="Additional notes on FAQ content"><Textarea placeholder="Any extra context..." value={faqMeta.additionalNotes} onChange={e => onMetaChange({ ...faqMeta, additionalNotes: e.target.value })} className="min-h-[80px]" /></F>
    </FG>
  );
}

function Step10({ data, onChange }: { data: FormData['escalation']; onChange: (d: FormData['escalation']) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...data, [k]: e.target.value });
  return (
    <FG>
      <SH icon={AlertTriangle} title="Escalation Rules" subtitle="Define what qualifies as urgent so the AI knows when to loop in a human." />
      <F label="Complaints requiring escalation" hint="e.g. safety risk, regulatory issue, legal threat"><Textarea placeholder="Describe complaint types that require human escalation..." value={data.complaintsRequiringEscalation} onChange={set('complaintsRequiringEscalation')} className="min-h-[80px]" /></F>
      <F label="High-priority client list or criteria"><Textarea placeholder="List VIP clients or criteria..." value={data.highPriorityClients} onChange={set('highPriorityClients')} className="min-h-[80px]" /></F>
      <F label="Situations requiring immediate phone call"><Textarea placeholder="Describe situations that require an immediate call..." value={data.immediateCallSituations} onChange={set('immediateCallSituations')} className="min-h-[80px]" /></F>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <F label="After-hours escalation contact name"><Input placeholder="Full name" value={data.afterHoursContactName} onChange={set('afterHoursContactName')} /></F>
        <F label="After-hours escalation contact phone"><Input placeholder="(555) 000-0000" type="tel" value={data.afterHoursContactPhone} onChange={set('afterHoursContactPhone')} /></F>
      </div>
      <F label="Any other escalation scenarios"><Textarea placeholder="Any additional escalation rules..." value={data.otherScenarios} onChange={set('otherScenarios')} className="min-h-[80px]" /></F>
    </FG>
  );
}

function Step11({ data, onChange }: { data: FormData['tracking']; onChange: (d: FormData['tracking']) => void }) {
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...data, [k]: e.target.value });
  const toggle = (f: string) => { const arr = data.defaultFields.includes(f) ? data.defaultFields.filter(x => x !== f) : [...data.defaultFields, f]; onChange({ ...data, defaultFields: arr }); };
  return (
    <FG>
      <SH icon={BarChart3} title="Tracking & Reporting Requirements" subtitle="Confirm which fields to track and how reports should be delivered." />
      <F label="Default Tracking Fields:">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          {DEFAULT_TRACKING.map(f => (
            <label key={f} className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-secondary/30 transition">
              <Checkbox checked={data.defaultFields.includes(f)} onCheckedChange={() => toggle(f)} className="data-[state=checked]:bg-[#0D9488] data-[state=checked]:border-[#0D9488]" />
              <span className="text-sm">{f}</span>
            </label>
          ))}
        </div>
      </F>
      <div className="space-y-3">
        <Label className="text-sm font-medium">Additional Fields to Track</Label>
        {(['customField1', 'customField2', 'customField3'] as const).map((k, i) => <Input key={k} placeholder={`Custom field ${i + 1}`} value={data[k]} onChange={set(k)} />)}
      </div>
      <F label="Reporting cadence preference"><Input placeholder="e.g. Weekly email summary every Monday" value={data.reportingCadence} onChange={set('reportingCadence')} /></F>
      <F label="Who should receive reports? (Name + email)"><Textarea placeholder="e.g. Jane Smith — jane@company.com" value={data.reportRecipients} onChange={set('reportRecipients')} className="min-h-[80px]" /></F>
    </FG>
  );
}

function Step12({ data, onChange }: { data: FormData['additionalNotes']; onChange: (d: FormData['additionalNotes']) => void }) {
  return (
    <FG>
      <SH icon={FileText} title="Additional Notes & Special Instructions" subtitle="Include anything unique about your workflow, tone preferences, or special instructions." />
      <F label="Additional context, tone guidelines, special workflows, or other notes:">
        <Textarea placeholder="Use this space to share anything else we should know..." value={data.notes} onChange={e => onChange({ ...data, notes: e.target.value })} className="min-h-[240px]" />
      </F>
    </FG>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

interface Props {
  onClose?: () => void;
  onSubmitSuccess?: () => void;
}

export function DashboardIntakeForm({ onClose, onSubmitSuccess }: Props) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const TOTAL = STEPS.length;
  const pct = Math.round(((step - 1) / TOTAL) * 100);

  // Slide-down entrance animation
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const sec = <K extends keyof FormData>(key: K) => (val: FormData[K]) => setForm(prev => ({ ...prev, [key]: val }));

  const next = () => {
    if (step === 1 && !form.companyOverview.companyName.trim()) {
      setError('Company name is required to continue.');
      return;
    }
    setError('');
    setStep(s => Math.min(s + 1, TOTAL));
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const back = () => {
    setError('');
    setStep(s => Math.max(s - 1, 1));
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: form.companyOverview.companyName,
          contactEmail: form.companyOverview.primaryEmail,
          data: form,
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Submission failed');
      }
      setSubmitted(true);
      toast.success('Intake form submitted successfully!');
      onSubmitSuccess?.();
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Submission failed. Please try again.');
      toast.error('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-16px)',
        transition: 'opacity 400ms ease, transform 400ms ease',
      }}
    >
      {submitted ? (
        <Card className="p-8 gradient-border text-center space-y-5">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow-2xl shadow-[#0D9488]/30">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Form Submitted!</h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
            Thank you, <strong>{form.companyOverview.companyName}</strong>. Your intake form has been received.
            The Ephesus AI team will review your responses and reach out shortly to begin configuration.
          </p>
          <div className="bg-secondary/30 rounded-xl p-4 text-sm text-muted-foreground space-y-1.5 text-left max-w-md mx-auto">
            <p className="font-semibold text-foreground">Next Steps:</p>
            <p>1. We&apos;ll configure your AI receptionist and test during off hours</p>
            <p>2. A tailored demo environment will be built based on your responses</p>
            <p>3. We&apos;ll schedule a testing and refinement session with your team</p>
          </div>
        </Card>
      ) : (
        <Card className="gradient-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow">
                <ClipboardList className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Client Intake Form</h2>
                <p className="text-xs text-muted-foreground">Step {step} of {TOTAL} — {STEPS[step - 1].label}</p>
              </div>
            </div>
            {onClose && (
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" aria-label="Close form">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div className="px-6 py-3 border-b border-border bg-secondary/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">{pct}% complete</span>
              <div className="flex gap-1 overflow-x-auto no-scrollbar max-w-[60%]">
                {STEPS.map(s => {
                  const Icon = s.icon;
                  const active = s.number === step;
                  const done = s.number < step;
                  return (
                    <button
                      key={s.number}
                      onClick={() => { if (done) { setStep(s.number); containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }}
                      title={s.label}
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${active ? 'bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] shadow' : done ? 'bg-[#0D9488]/20 text-[#0D9488] cursor-pointer hover:bg-[#0D9488]/30' : 'bg-secondary text-muted-foreground'}`}
                    >
                      {done ? <CheckCircle className="w-3 h-3" /> : <Icon className="w-3 h-3 text-current" />}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          {/* Form body */}
          <div className="p-6 md:p-8">
            {step === 1 && <Step1 data={form.companyOverview} onChange={sec('companyOverview')} />}
            {step === 2 && <Step2 data={form.emailPlatform} onChange={sec('emailPlatform')} />}
            {step === 3 && <Step3 data={form.departments} onChange={sec('departments')} />}
            {step === 4 && <Step4 data={form.technicalContacts} onChange={sec('technicalContacts')} />}
            {step === 5 && <Step5 data={form.routingCategories} onChange={sec('routingCategories')} />}
            {step === 6 && <Step6 data={form.callHandling} onChange={sec('callHandling')} />}
            {step === 7 && <Step7 data={form.intakeRequirements} onChange={sec('intakeRequirements')} />}
            {step === 8 && <Step8 data={form.routingLogic} onChange={sec('routingLogic')} />}
            {step === 9 && <Step9 faqs={form.faqs} faqMeta={form.faqMeta} onFaqsChange={sec('faqs')} onMetaChange={sec('faqMeta')} />}
            {step === 10 && <Step10 data={form.escalation} onChange={sec('escalation')} />}
            {step === 11 && <Step11 data={form.tracking} onChange={sec('tracking')} />}
            {step === 12 && <Step12 data={form.additionalNotes} onChange={sec('additionalNotes')} />}

            {error && (
              <p className="mt-4 text-sm text-red-500 bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={back} disabled={step === 1} className="gap-2">
                <ChevronLeft className="w-4 h-4" /> Back
              </Button>
              <span className="text-xs text-muted-foreground">{step} / {TOTAL}</span>
              {step < TOTAL ? (
                <Button onClick={next} className="gap-2 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25">
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={submit} disabled={submitting} className="gap-2 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25">
                  {submitting ? 'Submitting...' : 'Submit Form'}
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
