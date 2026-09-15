import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle,
  Database,
  FileCheck2,
  Mic2,
  PhoneCall,
  Radar,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  Upload,
  Workflow,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGradient from "@/components/CursorGradient";
import CalendlyButton from "@/components/CalendlyButton";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const launchInputs = [
  "Target market and ideal customer profile",
  "Approved prospect list or source of leads",
  "Offer, hook, and reason for calling",
  "Qualification questions and disqualifiers",
  "Calendar, CRM, or handoff destination",
  "Calling number, Vapi account, and assistant settings",
  "Compliance rules, consent posture, and do-not-call process",
];

const workflow = [
  {
    icon: Upload,
    title: "Import leads",
    copy: "Upload a segmented B2B list with company, contact, phone, notes, source, and any consent or opt-out status.",
  },
  {
    icon: Mic2,
    title: "Vapi places the call",
    copy: "The assistant uses your script, qualification logic, objection handling, and call goal for each prospect.",
  },
  {
    icon: Route,
    title: "Qualify or route",
    copy: "Interested prospects can be booked, transferred, tagged for follow-up, or routed to a human closer.",
  },
  {
    icon: BarChart3,
    title: "Track outcomes",
    copy: "Every call result, transcript, summary, disposition, and next action can be pushed into your CRM.",
  },
];

const buildPhases = [
  "Campaign strategy and compliance review",
  "Assistant prompt, voice, tools, and guardrails",
  "Lead list import and call scheduling rules",
  "CRM/calendar handoff and outcome tracking",
  "Test calls, QA, launch, and iteration",
];

export default function OutboundB2BColdCallerPage() {
  return (
    <div className="flex min-h-screen flex-col pb-20 md:pb-0">
      <CursorGradient />
      <Header />

      <main className="marketing-page flex-1">
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(119,234,214,0.14),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(45,212,191,0.1),transparent_30%)]" />
          <div className="container relative mx-auto px-6">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center">
              <div className="space-y-7">
                <FadeIn delay={0} duration={400}>
                  <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Back to Services
                  </Link>
                </FadeIn>
                <FadeIn delay={90} duration={500}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#77ead6]/25 bg-[#77ead6]/10 px-4 py-2 text-sm font-medium text-[#9af3e3]">
                    <PhoneCall className="h-4 w-4" />
                    Vapi outbound calling
                  </div>
                </FadeIn>
                <FadeIn delay={160} duration={600}>
                  <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                    Outbound B2B cold caller that qualifies leads and books meetings
                  </h1>
                </FadeIn>
                <FadeIn delay={250} duration={600}>
                  <p className="max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                    A Vapi-powered calling system for targeted B2B campaigns. It calls approved prospect lists, follows your sales logic, handles objections, captures outcomes, and routes real opportunities to your team.
                  </p>
                </FadeIn>
                <FadeIn delay={330} duration={600}>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <CalendlyButton>
                      <Button size="lg" className="gap-2 bg-[#77ead6] font-semibold text-[#06211d] hover:bg-[#9af3e3]">
                        Plan the caller
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CalendlyButton>
                    <Link href="/ai-opportunity-audit">
                      <Button size="lg" variant="outline" className="border-[#77ead6]/25">
                        Fill out the AI audit
                      </Button>
                    </Link>
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={180} duration={650}>
                <Card className="border-white/10 bg-[#071211]/90 p-5 shadow-2xl shadow-black/30">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <div className="mb-5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Campaign cockpit</p>
                        <h2 className="mt-2 text-xl font-semibold text-white">Outbound pipeline</h2>
                      </div>
                      <span className="rounded-full bg-[#77ead6]/12 px-3 py-1 text-xs font-medium text-[#9af3e3]">Ready to dial</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        ["Lead list", "1,240 prospects loaded"],
                        ["Assistant", "B2B qualification script"],
                        ["Goal", "Book discovery call"],
                        ["Handoff", "Calendar + CRM update"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                          <span className="text-sm text-white/55">{label}</span>
                          <span className="text-sm font-medium text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                      {[
                        ["Calls", "312"],
                        ["Qualified", "41"],
                        ["Meetings", "18"],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-xl border border-[#77ead6]/15 bg-[#77ead6]/[0.055] p-3">
                          <div className="text-xl font-bold text-[#9af3e3]">{value}</div>
                          <div className="mt-1 text-xs text-white/50">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.08] bg-secondary/25 py-18 md:py-24">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">How it works</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">A controlled outbound calling workflow</h2>
              <p className="mt-4 text-muted-foreground">
                The system should feel less like blasting calls and more like a disciplined sales development process with clear rules, tracking, and human handoff.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
              {workflow.map(({ icon: Icon, title, copy }) => (
                <Card key={title} className="border-white/10 bg-white/[0.045] p-6">
                  <Icon className="h-7 w-7 text-[#77ead6]" />
                  <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#77ead6]/10 text-[#77ead6]">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold md:text-4xl">What we need to build it</h2>
              <p className="text-muted-foreground">
                To make this work well, we need the sales rules before the phone ever rings. The clearer the target, offer, and handoff path, the better the assistant performs.
              </p>
              <p className="text-sm leading-6 text-white/45">
                Important: outbound calling needs a compliant lead source, opt-out handling, and a review of applicable calling rules for the campaign. This page is product planning, not legal advice.
              </p>
            </div>
            <Card className="border-white/10 bg-white/[0.045] p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                {launchInputs.map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/70">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#77ead6]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="bg-[#050807] py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77ead6]/75">Vapi setup</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Minimum credentials and components</h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Vapi API key",
                  copy: "Used server-side only to create calls, read call results, and receive webhook events.",
                },
                {
                  icon: PhoneCall,
                  title: "Outbound-capable phone number",
                  copy: "A real imported number or telephony provider number. Vapi's free number is not for outbound or international calling.",
                },
                {
                  icon: Target,
                  title: "Assistant ID",
                  copy: "The saved Vapi assistant that contains the voice, model, prompt, tools, and conversation rules.",
                },
                {
                  icon: Database,
                  title: "Lead source",
                  copy: "CSV, CRM, Airtable, Google Sheet, HubSpot, Salesforce, GoHighLevel, or another approved source.",
                },
                {
                  icon: CalendarClock,
                  title: "Booking or handoff destination",
                  copy: "Calendar, CRM owner, sales inbox, Slack, SMS, or live transfer path for qualified opportunities.",
                },
                {
                  icon: FileCheck2,
                  title: "Webhook endpoint",
                  copy: "Receives call started, ended, transcript, summary, outcome, and qualification data back into the app.",
                },
              ].map(({ icon: Icon, title, copy }) => (
                <Card key={title} className="border-white/10 bg-white/[0.045] p-6">
                  <Icon className="h-7 w-7 text-[#77ead6]" />
                  <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <Card className="border-white/10 bg-white/[0.045] p-7">
              <Radar className="h-8 w-8 text-[#77ead6]" />
              <h2 className="mt-5 text-2xl font-bold">Campaign controls</h2>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {[
                  "Daily call caps and calling windows",
                  "Retry logic for no answers and voicemails",
                  "Do-not-call and opt-out suppression",
                  "Disposition tags like interested, not now, bad number, no answer, booked",
                  "Human review queue before scaling volume",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#77ead6]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-white/10 bg-white/[0.045] p-7">
              <Workflow className="h-8 w-8 text-[#77ead6]" />
              <h2 className="mt-5 text-2xl font-bold">Build phases</h2>
              <div className="mt-6 space-y-3">
                {buildPhases.map((phase, index) => (
                  <div key={phase} className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#77ead6]/10 text-sm font-semibold text-[#9af3e3]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-white/72">{phase}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section className="container mx-auto px-6 pb-24">
          <Card className="mx-auto max-w-4xl border-[#77ead6]/18 bg-[#77ead6]/[0.06] p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to map the outbound caller?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              The next step is deciding the target list, offer, script boundaries, CRM handoff, and compliance rules. Once those are clear, Vapi can handle the call execution layer.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CalendlyButton>
                <Button size="lg" className="gap-2 bg-[#77ead6] font-semibold text-[#06211d] hover:bg-[#9af3e3]">
                  Schedule build session
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CalendlyButton>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-[#77ead6]/25">
                  Ask a question
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
