"use client";

import Link from "next/link";
import { ArrowRight, Brain, Zap, MessageSquare, ClipboardList, PhoneCall, Mail, Shield, CheckCircle, Sparkles, RefreshCw, TrendingUp, Instagram, Users, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyButton from "@/components/CalendlyButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VapiDemo } from "@/components/VapiDemo";
import LiveCounter from "@/components/LiveCounter";
import ServiceShowcase from "@/components/ServiceShowcase";
import FadeIn from "@/components/FadeIn";
import HeroControlRoom from "@/components/HeroControlRoom";
import DigitalLoomBackground from "@/components/ui/digital-loom-background";
import Script from "next/script";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ephesus AI Solutions",
    "url": typeof window !== "undefined" ? window.location.origin : "https://ephesusai.com",
    "logo": "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ChatGPT-Image-Oct-25-2025-05_00_48-PM-1-1762568231296.png",
    "description": "Ephesus AI handles every inbound inquiry your business receives — phone calls, emails, and website chats — with intelligent AI automation.",
    "foundingDate": "2024",
    "serviceType": ["AI Voice Receptionist", "AI Email Automation", "AI Website Chatbot", "Instagram AI Suite", "AI Lead Revival"],
    "areaServed": "Worldwide",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": "English"
    },
    "offers": [
      {
        "@type": "Service",
        "name": "AI Voice Receptionist",
        "description": "24/7 intelligent voice assistant that handles calls, answers questions, and schedules appointments."
      },
      {
        "@type": "Service",
        "name": "AI Email Automation",
        "description": "Automated AI responses to inbound emails — triaged, answered, and routed intelligently."
      },
      {
        "@type": "Service",
        "name": "AI Website Chatbot",
        "description": "Intelligent AI chatbot that engages website visitors, captures leads, and provides instant support."
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main className="home-main flex-1">

        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/[0.08]">
          <DigitalLoomBackground className="hero-shell min-h-[780px] bg-[#050909]" threadCount={24}>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_38%,rgba(48,182,159,0.16),transparent_33%),radial-gradient(circle_at_18%_18%,rgba(94,234,212,0.07),transparent_28%)]" />
            <div className="pointer-events-none absolute inset-0 hero-grid-mask" />
            <div className="relative mx-auto grid min-h-[780px] max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-20 pt-32 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-8 lg:pt-28">
              <div className="max-w-3xl space-y-8">
                <FadeIn delay={0} duration={500}>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#5eead4]/20 bg-[#5eead4]/[0.07] px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#9af3e3] backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#77ead6] shadow-[0_0_12px_rgba(119,234,214,0.9)]" />
                    <span>AI-Powered Communications Suite</span>
                  </div>
                </FadeIn>

                <FadeIn delay={100} duration={650}>
                  <h1 className="max-w-[760px] text-[clamp(3.5rem,7vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.065em] text-white">
                    Every Inquiry.
                    <br />
                    <span className="text-white/46">Every Channel.</span>
                    <br />
                    <span className="font-display font-normal italic tracking-[-0.035em] text-[#8ff5e3]">Handled.</span>
                  </h1>
                </FadeIn>

                <FadeIn delay={200} duration={650}>
                  <p className="max-w-xl text-lg leading-8 text-white/58 md:text-xl">
                    Ephesus AI is your all-in-one communications suite. We handle every inbound inquiry and revive your dormant leads &mdash; so your pipeline never goes cold and no opportunity slips through.
                  </p>
                </FadeIn>

                <FadeIn delay={300} duration={650}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <CalendlyButton>
                      <Button size="lg" className="group h-12 cursor-pointer gap-2 rounded-xl bg-[#77ead6] px-6 text-sm font-semibold text-[#05211c] shadow-[0_14px_40px_rgba(94,234,212,0.16)] transition-colors duration-200 hover:bg-[#9af3e3]">
                        Schedule a Consultation
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CalendlyButton>
                    <Link href="/demo">
                      <Button size="lg" className="group h-12 cursor-pointer gap-2 rounded-xl border border-white/12 bg-white/[0.035] px-6 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/[0.08]">
                        <Sparkles className="w-4 h-4 text-[#8ff5e3]" />
                        Try Live AI Demo
                      </Button>
                    </Link>
                  </div>
                </FadeIn>

                <FadeIn delay={380} duration={650}>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.08] pt-6 text-xs text-white/42">
                    {["Handles inbound 24/7", "Revives dormant leads", "No complex integrations"].map((item) => (
                      <span key={item} className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-[#66d8c4]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={260} duration={800} translateY={24} className="relative">
                <div className="pointer-events-none absolute -inset-8 rounded-full bg-[#1ec5a5]/10 blur-3xl" />
                <HeroControlRoom />
              </FadeIn>
            </div>
          </DigitalLoomBackground>
        </section>

        {/* 5 Channels Strip */}
        <section className="channel-rail border-b border-white/[0.08] bg-[#070b0b] py-5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-4">
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-white/28 xl:block">One suite / five channels</span>
              {[
                { icon: PhoneCall, label: "AI Voice Receptionist" },
                { icon: Mail, label: "AI Email Automation" },
                { icon: MessageSquare, label: "AI Website Chatbot" },
                { icon: Instagram, label: "Instagram AI Suite" },
                { icon: RefreshCw, label: "AI Lead Revival" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-white/55 transition-colors duration-200 hover:text-white">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.035]">
                    <Icon className="h-3.5 w-3.5 text-[#77ead6]" />
                  </div>
                  <span className="text-xs font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pain Point Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-400/15 bg-rose-400/[0.055] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-300/80">
                  Wake-Up Call
                </div>
                <h2 className="mb-5 text-4xl font-medium md:text-6xl">
                  Your Business Is Losing Money{" "}
                  <span className="font-display font-normal italic text-[#8ff5e3]">
                    Right Now
                  </span>
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl leading-7">Every unanswered call, slow email reply, and ignored website visitor is a customer choosing your competitor instead.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                {[
                  {
                    stat: "85%",
                    context: "of customers",
                    sub: "won't call back after a missed first call",
                    from: "#0D9488",
                    to: "#14B8A6",
                  },
                  {
                    stat: "90%",
                    context: "of leads expect",
                    sub: "a reply within 10 minutes — or they move on",
                    from: "#14B8A6",
                    to: "#2DD4BF",
                  },
                  {
                    stat: "53%",
                    context: "of site visitors",
                    sub: "leave if they don't get an instant response",
                    from: "#2DD4BF",
                    to: "#0D9488",
                  },
                ].map(({ stat, context, sub, from, to }) => (
                  <div key={stat + context}
                    className="premium-card group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1"
                    style={{
                      border: `1px solid ${from}30`,
                      boxShadow: `0 0 0 0 ${from}00`,
                    }}
                  >
                    {/* Glow orb */}
                    <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-35"
                      style={{ background: `radial-gradient(circle, ${from}, ${to})` }} />
                    {/* Top accent bar */}
                    <div className="w-8 h-0.5 rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${from}, ${to})` }} />
                    {/* Stat */}
                    <div className="mb-1 text-6xl font-medium tracking-[-0.06em] text-white">
                      {stat}
                    </div>
                    <div className="text-sm font-semibold text-foreground/80 mb-2">{context}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{sub}</p>
                  </div>
                ))}
              </div>

              <Card className="dark-panel space-y-5 rounded-3xl p-8 text-center md:p-12">
                <div className="text-4xl font-medium text-white md:text-5xl">
                  The fix?{" "}
                  <span className="font-display font-normal italic text-[#8ff5e3]">
                    AI that never sleeps.
                  </span>
                </div>
                <p className="text-white/60 max-w-xl mx-auto">
                  Ephesus AI responds to every call, email, and chat — in under 2 seconds — 24 hours a day, 7 days a week. No hiring. No training. No missed leads.
                </p>
                <div className="pt-2">
                  <CalendlyButton>
                    <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25 transition-all duration-300 cursor-pointer">
                      Stop Losing Leads — Talk to Us
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CalendlyButton>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Live Counter */}
        <LiveCounter />

        {/* Services Showcase */}
        <section className="container mx-auto px-6 py-24 md:py-36">
          <div className="text-center mb-16">
            <div className="mb-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#77ead6]/70">The complete communications layer</div>
            <h2 className="mb-5 text-4xl font-medium md:text-6xl">
              One Suite.{" "}
              <span className="font-display font-normal italic text-[#8ff5e3]">
                Five Solutions.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
              We handle every inbound inquiry, automate your social DMs, and revive your dormant pipeline — so nothing slips through the cracks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                href: "/services/ai-voice-receptionist",
                icon: PhoneCall,
                gradient: "from-[#0D9488] to-[#14B8A6]",
                title: "AI Voice Receptionist",
                desc: "Your phone never goes unanswered. Our AI handles inbound calls 24/7 — routing, scheduling, and responding naturally.",
                delay: "0s",
              },
              {
                href: "/services/ai-email-automation",
                icon: Mail,
                gradient: "from-[#2DD4BF] to-[#0D9488]",
                title: "AI Email Automation",
                desc: "Connect your business email and let AI triage, respond to, and route every inbound message automatically.",
                delay: "0.1s",
              },
              {
                href: "/services/ai-website-chatbot",
                icon: MessageSquare,
                gradient: "from-[#14B8A6] to-[#5EEAD4]",
                title: "AI Website Chatbot",
                desc: "Embed a smart AI chat on your website that captures leads, answers questions, and converts visitors around the clock.",
                delay: "0.2s",
              },
              {
                href: "/services/instagram-dm-automation",
                icon: Instagram,
                gradient: "from-[#E1306C] to-[#833AB4]",
                title: "Instagram AI Suite",
                desc: "A full automation suite for Instagram — DM management, follower outreach, auto posting, comment replies, lead capture, and analytics. All on autopilot.",
                delay: "0.3s",
                badge: "New",
              },
              {
                href: "/services/ai-lead-revival",
                icon: RefreshCw,
                gradient: "from-[#2DD4BF] to-[#0F766E]",
                title: "AI Lead Revival",
                desc: "Re-engage dormant contacts with AI-powered drip campaigns, win-back sequences, and behavioral triggers that convert cold leads into sales.",
                delay: "0.4s",
              },
            ].map(({ href, icon: Icon, gradient, title, desc, delay, badge }) => (
              <Link href={href} key={title}>
                <Card className="premium-card group relative h-full cursor-pointer space-y-5 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: delay }}>
                  {badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'linear-gradient(135deg, rgba(225,48,108,0.2), rgba(131,58,180,0.2))', border: '1px solid rgba(225,48,108,0.4)', color: '#f472b6' }}>
                      {badge}
                    </span>
                  )}
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg shadow-black/20`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-[-0.025em] text-white transition-colors duration-200 group-hover:text-[#8ff5e3]">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  <div className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-[#77ead6]">
                    Learn more
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Interactive Service Showcase */}
        <ServiceShowcase />

        {/* How It Works */}
        <section className="dark-panel relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0D9488_0%,_transparent_70%)] opacity-10" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-medium text-white md:text-6xl">
                Simple to{" "}
                <span className="font-display font-normal italic text-[#8ff5e3]">
                  Get Started
                </span>
              </h2>
              <p className="text-white/60 mt-4 max-w-xl mx-auto">No complex tech stack. Just connect your email or website and you're live.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { step: "01", title: "Connect Your Channels", desc: "Share your business email or website URL. That's all we need to get started." },
                { step: "02", title: "We Configure Your AI", desc: "We train your AI on your business, services, tone, and how you want inquiries handled." },
                { step: "03", title: "Go Live & Let AI Work", desc: "Your AI starts responding to every inbound inquiry instantly — 24/7, on autopilot." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="premium-card space-y-4 rounded-3xl p-7 text-left">
                  <div className="text-sm font-bold tracking-[0.18em] text-[#77ead6]">{step}</div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Voice Demo */}
        <section className="relative overflow-hidden border-y border-white/[0.07] bg-[#090d0c] py-24 md:py-32">
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#0D9488]/20 to-[#2DD4BF]/20 text-foreground text-sm font-medium backdrop-blur-sm border border-[#0D9488]/20">
                  <PhoneCall className="w-4 h-4 text-[#0D9488]" />
                  <span>Try It Live</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Experience Our{" "}
                  <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                    AI Voice Assistant
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Click below to start a live conversation with our AI receptionist — see how naturally it handles real inquiries.
                </p>
              </div>
              <VapiDemo />
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="container mx-auto px-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Why Choose{" "}
                  <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                    Ephesus AI
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  We're not just software — we configure, launch, and optimize your AI communications suite end to end.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Brain, title: "Expert Setup & Configuration", desc: "Our team handles everything — no technical skills required on your end.", delay: "0.3s" },
                    { icon: Shield, title: "Secure & Private", desc: "Your data stays yours. We only integrate with channels you authorize.", delay: "0.4s" },
                    { icon: Zap, title: "Proven Results", desc: "Businesses using Ephesus AI see faster response times, more leads captured, and lower operational costs.", delay: "0.5s" },
                  ].map(({ icon: Icon, title, desc, delay }) => (
                    <div key={title} className="flex gap-4 group hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: delay }}>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Performance Dashboard graphic */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#134E4A] border border-[#0D9488]/20 shadow-2xl p-6 space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                    </span>
                    <span className="text-xs font-semibold text-white/60 uppercase tracking-widest">System Status — Live</span>
                  </div>
                  <span className="text-[10px] text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">All Systems Operational</span>
                </div>

                {/* Top metrics row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Uptime", value: "99.9%", sub: "last 12 months", color: "text-[#2DD4BF]" },
                    { label: "Avg Response", value: "< 2s", sub: "across all channels", color: "text-[#0D9488]" },
                    { label: "Coverage", value: "24 / 7", sub: "365 days a year", color: "text-[#5EEAD4]" },
                  ].map(({ label, value, sub, color }) => (
                    <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <div className={`text-lg font-bold ${color}`}>{value}</div>
                      <div className="text-[10px] text-white/60 font-medium mt-0.5">{label}</div>
                      <div className="text-[9px] text-white/30 mt-0.5 leading-tight">{sub}</div>
                    </div>
                  ))}
                </div>

                {/* Activity bars */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-white/50 font-medium">Inquiries Handled — Past 7 Days</span>
                    <span className="text-xs text-[#2DD4BF] font-semibold">↑ 18%</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[55, 72, 61, 88, 76, 94, 100].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-[#0D9488] to-[#2DD4BF] opacity-80 hover:opacity-100 transition-opacity"
                        style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                      <span key={d} className="flex-1 text-center text-[9px] text-white/30">{d}</span>
                    ))}
                  </div>
                </div>

                {/* Channel breakdown */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2.5">
                  <span className="text-xs text-white/50 font-medium">Channel Coverage</span>
                  {[
                    { label: "Voice Calls", pct: 100, color: "from-[#0D9488] to-[#14B8A6]" },
                    { label: "Email Inbox", pct: 100, color: "from-[#2DD4BF] to-[#0D9488]" },
                    { label: "Website Chat", pct: 100, color: "from-[#14B8A6] to-[#5EEAD4]" },
                    { label: "Instagram DMs", pct: 100, color: "from-[#E1306C] to-[#833AB4]" },
                    { label: "Lead Revival", pct: 100, color: "from-[#2DD4BF] to-[#0F766E]" },
                  ].map(({ label, pct, color }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-[11px] text-white/50 w-24 flex-shrink-0">{label}</span>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] text-[#2DD4BF] font-semibold w-8 text-right">{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Revival Teaser */}
        <section className="border-y border-white/[0.07] bg-[#090d0c] py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/20 text-[#2DD4BF] text-xs font-semibold uppercase tracking-wider">
                  <RefreshCw className="w-3 h-3" />
                  New: AI Lead Revival
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Your Old Leads Are{" "}
                  <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">
                    Worth More Than You Think.
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Most businesses sit on hundreds of dormant contacts who already expressed interest. Instead of spending more on ads, let AI re-engage them with personalized campaigns that run 24/7 — and convert cold leads into real revenue.
                </p>
                <ul className="space-y-3">
                  {[
                    "Automated multi-touch email drip sequences",
                    "Behavioral triggers fire when leads re-engage",
                    "AI scores and prioritizes your hottest prospects",
                    "Win-back campaigns for past customers",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services/ai-lead-revival">
                  <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] hover:opacity-90 text-white shadow-lg transition-all duration-300 cursor-pointer mt-2">
                    See How It Works
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "3–5×", label: "Higher conversion vs. cold outreach", icon: TrendingUp },
                  { stat: "80%", label: "Of sales need 5+ follow-ups", icon: Mail },
                  { stat: "44%", label: "Of reps quit after just 1 follow-up", icon: RefreshCw },
                  { stat: "0", label: "Manual work required from your team", icon: Zap },
                ].map(({ stat, label, icon: Icon }) => (
                  <div key={stat} className="p-5 rounded-2xl border bg-background shadow-sm text-center space-y-2 hover:shadow-md transition-shadow">
                    <Icon className="w-5 h-5 text-[#2DD4BF] mx-auto" />
                    <div className="text-2xl font-black bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">{stat}</div>
                    <p className="text-xs text-muted-foreground leading-snug">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Instagram AI Suite Teaser */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#E1306C_0%,_transparent_60%)] opacity-5" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Mock Suite Dashboard UI */}
              <div className="relative order-2 md:order-1">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                  style={{ background: 'linear-gradient(135deg, #1a0a12 0%, #120818 100%)' }}>
                  {/* Header */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10"
                    style={{ background: 'rgba(225,48,108,0.08)' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Instagram AI Suite</div>
                      <div className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>All automations active · live</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] text-green-400">Running</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    {/* Live activity feed */}
                    {[
                      { icon: Users, label: "@alexrivera followed → welcome DM sent", time: "just now", color: '#E1306C' },
                      { icon: MessageSquare, label: "Incoming DM from @sarah_j → AI replied", time: "2m ago", color: '#833AB4' },
                      { icon: Heart, label: "Story reaction from @mike → follow-up sent", time: "5m ago", color: '#F56040' },
                      { icon: TrendingUp, label: "Post published: optimal time detected", time: "1h ago", color: '#FCAF45' },
                    ].map(({ icon: Icon, label, time, color }) => (
                      <div key={label} className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
                        <span style={{ color: 'rgba(255,255,255,0.65)' }} className="flex-1 truncate">{label}</span>
                        <span style={{ color: 'rgba(255,255,255,0.25)' }} className="flex-shrink-0">{time}</span>
                      </div>
                    ))}

                    {/* Stats row */}
                    <div className="grid grid-cols-4 gap-2 pt-1">
                      {[
                        { label: "DMs Today", val: "47" },
                        { label: "Reply Rate", val: "34%" },
                        { label: "Posts Queued", val: "8" },
                        { label: "Leads", val: "12" },
                      ].map(({ label, val }) => (
                        <div key={label} className="text-center p-2 rounded-xl"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                          <div className="text-sm font-black" style={{ background: 'linear-gradient(135deg, #E1306C, #833AB4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{val}</div>
                          <div className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Copy */}
              <div className="space-y-6 order-1 md:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                  style={{ background: 'rgba(225,48,108,0.1)', border: '1px solid rgba(225,48,108,0.25)', color: '#f472b6' }}>
                  <Instagram className="w-3 h-3" />
                  New: Instagram AI Suite
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Your Entire Instagram.{" "}
                  <span style={{ background: 'linear-gradient(135deg, #E1306C, #833AB4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Run by AI.
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Not just DMs — a full automation suite. Ephesus AI manages your Instagram from end to end: DMs, follower outreach, auto posting, comment replies, lead capture, and analytics. All running 24/7 in the background.
                </p>
                <ul className="space-y-3">
                  {[
                    "Auto-respond to every DM instantly",
                    "Welcome new followers with personalized outreach",
                    "Schedule and publish posts, reels & stories",
                    "Reply to comments and story reactions",
                    "Capture and qualify leads — sync to your CRM",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#E1306C' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/services/instagram-dm-automation">
                  <Button size="lg" className="gap-2 group text-white shadow-lg transition-all duration-300 cursor-pointer mt-2"
                    style={{ background: 'linear-gradient(135deg, #E1306C, #833AB4)' }}>
                    See the Full Suite
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Connect & We Handle It */}
        <section className="dark-panel relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#0D9488_0%,_transparent_60%)] opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#2DD4BF_0%,_transparent_60%)] opacity-10" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3 h-3 text-[#2DD4BF]" />
                  How It Works
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  You Connect.{" "}
                  <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                    We Handle Everything Else.
                  </span>
                </h2>
                <p className="text-white/60 mt-4 max-w-2xl mx-auto text-lg">
                  No technical setup on your end. No steep learning curve. Just connect your accounts through our portal, tell us how you want your AI to sound — and we take it from there.
                </p>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                  {
                    n: "01",
                    title: "Connect Your Accounts",
                    desc: "Link your email, Instagram, or website through the Ephesus AI client portal — a few clicks, no code required.",
                    color: "from-[#0D9488] to-[#14B8A6]",
                  },
                  {
                    n: "02",
                    title: "Tailor It to Your Business",
                    desc: "Tell us your brand voice, your services, how you want inquiries handled, and what your customers ask most. We train the AI around you.",
                    color: "from-[#14B8A6] to-[#2DD4BF]",
                  },
                  {
                    n: "03",
                    title: "Go Live — We Run It",
                    desc: "Your AI goes live across every connected channel. We monitor, optimize, and keep it sharp as your business evolves.",
                    color: "from-[#2DD4BF] to-[#0D9488]",
                  },
                ].map(({ n, title, desc, color }) => (
                  <div key={n} className="relative rounded-2xl p-6 flex flex-col gap-4"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-white font-black text-sm">{n}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              {/* Tailoring callout */}
              <div className="rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)' }}>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Built Around{" "}
                    <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">Your Business</span>
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Every business is different — and your AI should reflect that. We configure it around your specific services, tone, FAQs, pricing, and how you want conversations handled. The result is an AI that sounds like <em>you</em>, not a generic chatbot.
                  </p>
                  <CalendlyButton>
                    <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg transition-all duration-300 cursor-pointer">
                      Get Your AI Configured
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CalendlyButton>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Brand voice & tone", desc: "Formal, casual, friendly — whatever fits your brand." },
                    { label: "Your services & pricing", desc: "AI knows what you offer and can quote and explain it." },
                    { label: "Custom escalation rules", desc: "Decide exactly when to hand off to a human." },
                    { label: "Ongoing optimization", desc: "We refine the AI as your business and customer patterns change." },
                  ].map(({ label, desc }) => (
                    <div key={label} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-[#2DD4BF] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm font-semibold text-white">{label}</span>
                        <span className="text-sm text-white/45"> — {desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="dark-panel relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2DD4BF_0%,_transparent_70%)] opacity-15" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Ready to Never Miss{" "}
                <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                  an Inquiry Again?
                </span>
              </h2>
              <p className="text-lg text-white/70">
                Schedule a free consultation and we'll show you exactly how Ephesus AI fits your business.
              </p>
              <CalendlyButton>
                <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25 hover:shadow-xl transition-all duration-300 cursor-pointer text-base px-8">
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CalendlyButton>
            </div>
          </div>
        </section>

        {/* Survey CTA */}
        <section className="container mx-auto px-6 py-24 md:py-32">
          <Card className="premium-card mx-auto max-w-4xl space-y-6 rounded-3xl p-8 text-center md:p-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow-lg animate-float">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Help Us{" "}
              <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">Improve</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your feedback helps us build better AI solutions. Take our quick survey and share your thoughts.
            </p>
            <Link href="/surveys">
              <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg transition-all duration-300 cursor-pointer">
                Take Survey
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </Card>
        </section>

      </main>
      <Footer />
    </div>
  );
}
