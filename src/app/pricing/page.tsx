"use client";

import { Check, ArrowRight, Calendar, PhoneCall, Mail, MessageSquare, RefreshCw, Database, BookOpen, Shield, Zap, Headphones } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CalendlyButton from "@/components/CalendlyButton";
import FadeIn from "@/components/FadeIn";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0D9488_0%,_transparent_60%)] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#2DD4BF_0%,_transparent_60%)] opacity-15" />
          <div className="container mx-auto px-6 relative text-center">
            <FadeIn delay={0} duration={500}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20 mb-6">
                <Calendar className="w-4 h-4 text-[#0D9488]" />
                <span>Custom Pricing — Built Around Your Business</span>
              </div>
            </FadeIn>
            <FadeIn delay={120} duration={600}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Simple,{" "}
                <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                  Value-Based Pricing
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={240} duration={600}>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Every business is different. We build a pricing plan around your inquiry volume, the channels you need, and your specific goals — no cookie-cutter packages.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Main CTA */}
        <section className="container mx-auto px-6 py-16">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center space-y-8 gradient-border hover:shadow-2xl transition-all duration-500">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow-lg shadow-[#0D9488]/30 animate-float">
              <Calendar className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Pricing Built Around{" "}
                <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                  Your ROI
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We scope your plan based on call volume, email load, website traffic, the size of your dormant lead list, and which channels matter most to your business.
              </p>
            </div>

            <div className="pt-2">
              <CalendlyButton>
                <Button size="lg" className="text-lg px-10 py-8 gap-3 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-xl shadow-[#0D9488]/25 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                  Schedule a Free Consultation
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </CalendlyButton>
              <p className="text-sm text-muted-foreground mt-4">30 minutes. No commitment. We'll walk through everything live.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border">
              {[
                { label: "Transparent", sub: "No hidden fees or unexpected charges" },
                { label: "ROI-Focused", sub: "Designed to pay for itself in saved leads" },
                { label: "Scalable", sub: "Adjusts as your business grows" },
              ].map(({ label, sub }) => (
                <div key={label} className="space-y-1">
                  <div className="text-xl font-bold bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">{label}</div>
                  <p className="text-sm text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* What's Covered — 4 services */}
        <section className="bg-secondary/30 py-20 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Your Full{" "}
                  <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                    AI Communications Suite
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  One plan covers every channel — inbound handling and outbound revival, all on autopilot.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: PhoneCall,
                    gradient: "from-[#0D9488] to-[#14B8A6]",
                    title: "AI Voice Receptionist",
                    desc: "24/7 call handling, intelligent routing, and appointment scheduling — no missed calls, ever.",
                  },
                  {
                    icon: Mail,
                    gradient: "from-[#2DD4BF] to-[#0D9488]",
                    title: "AI Email Automation",
                    desc: "Inbound email triage, AI-drafted responses, and smart escalation to your team when needed.",
                  },
                  {
                    icon: MessageSquare,
                    gradient: "from-[#14B8A6] to-[#5EEAD4]",
                    title: "AI Website Chatbot",
                    desc: "Engages visitors, answers questions, qualifies leads, and books calls — around the clock.",
                  },
                  {
                    icon: RefreshCw,
                    gradient: "from-[#2DD4BF] to-[#0F766E]",
                    title: "AI Lead Revival",
                    desc: "Re-engages your dormant contacts with AI-powered drip campaigns, win-backs, and behavioral triggers.",
                  },
                ].map(({ icon: Icon, gradient, title, desc }) => (
                  <Card key={title} className="p-6 space-y-4 gradient-border text-center">
                    <div className={`mx-auto w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                Everything{" "}
                <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">Included</span>
              </h2>
              <p className="text-lg text-muted-foreground">We handle every part of the setup — you just show up and run your business.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Full Implementation",
                  desc: "Complete setup and configuration of every AI channel — trained on your business, brand voice, services, and pricing.",
                },
                {
                  icon: Database,
                  title: "CRM Integration",
                  desc: "We sync directly with your CRM (HubSpot, Salesforce, Go High Level, etc.) to log every interaction and update contact records automatically.",
                },
                {
                  icon: Calendar,
                  title: "Calendar & Booking Sync",
                  desc: "Connected to your scheduling system so the AI books real appointments in real time — no double-booking, no manual follow-up.",
                },
                {
                  icon: Mail,
                  title: "Email & Website Hookup",
                  desc: "We connect your business inbox and embed your chatbot with one line of code. Works on Gmail, Outlook, Wix, Webflow, WordPress, and more.",
                },
                {
                  icon: BookOpen,
                  title: "Knowledge Base Training",
                  desc: "Your AI is trained on your FAQs, services, pricing, and policies — so it always speaks in your voice and gives accurate answers.",
                },
                {
                  icon: Zap,
                  title: "Ongoing AI Optimization",
                  desc: "Regular performance tuning and updates keep your AI improving over time as your business and customer needs evolve.",
                },
                {
                  icon: Shield,
                  title: "Secure & Private",
                  desc: "Your data stays yours. We only integrate with the systems you authorize — no scraping, no selling, no surprises.",
                },
                {
                  icon: Headphones,
                  title: "24/7 Monitoring & Support",
                  desc: "Round-the-clock system reliability with a dedicated support team available whenever you need us.",
                },
                {
                  icon: RefreshCw,
                  title: "Lead Revival Campaigns",
                  desc: "AI-powered drip sequences, win-back campaigns, and behavioral triggers that turn your dormant contact list into active revenue.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <Card key={title} className="p-6 space-y-4 gradient-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0D9488]/20 to-[#2DD4BF]/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#0D9488]" />
                    </div>
                    <h3 className="font-semibold">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How pricing works */}
        <section className="bg-secondary/30 py-20 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  How Pricing{" "}
                  <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">Works</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  No guessing. We walk through your business on a call and give you a clear number based on what you actually need.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: "01",
                    title: "We Learn Your Business",
                    desc: "On a 30-minute call we audit your current channels — call volume, email load, website traffic, and your lead list size.",
                  },
                  {
                    step: "02",
                    title: "We Scope Your Plan",
                    desc: "Based on what you need covered, we put together a flat-rate plan with no hidden fees and a clear ROI projection.",
                  },
                  {
                    step: "03",
                    title: "You Approve & We Launch",
                    desc: "Once you're happy with the plan, we handle the entire setup. Most businesses are live within 48 hours.",
                  },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="text-center space-y-3">
                    <div className="text-4xl font-black bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">{step}</div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A] py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2DD4BF_0%,_transparent_70%)] opacity-15" />
          <div className="container mx-auto px-6 relative">
            <Card className="max-w-4xl mx-auto p-12 text-center space-y-6 bg-white/5 border-white/10">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Ready to See What{" "}
                <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">It Would Cost?</span>
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Book a free call and we'll walk through your business, build the right plan, and give you a number — no pressure, no obligation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <CalendlyButton>
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg transition-all duration-300 cursor-pointer">
                    Book My Free Strategy Call
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </CalendlyButton>
                <Link href="/services">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 cursor-pointer bg-transparent">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
