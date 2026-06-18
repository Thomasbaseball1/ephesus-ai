"use client";

import Link from "next/link";
import { ArrowRight, Mail, CheckCircle, Zap, Clock, Shield, TrendingUp, Users, Inbox, Filter, Reply, Bell, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyButton from "@/components/CalendlyButton";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AIEmailAutomationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-36 bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#2DD4BF_0%,_transparent_60%)] opacity-25" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#0D9488_0%,_transparent_60%)] opacity-20" />
          <div className="container mx-auto px-6 relative text-center">
            <FadeIn delay={0} duration={500}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
                <span>AI Email Automation</span>
              </div>
            </FadeIn>
            <FadeIn delay={80} duration={500}>
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#0D9488] flex items-center justify-center shadow-2xl shadow-[#2DD4BF]/40 mb-8 animate-float">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </FadeIn>
            <FadeIn delay={160} duration={600}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Your Inbox,{" "}
                <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">
                  Handled Automatically
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={280} duration={600}>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
                Connect your business email and let Ephesus AI triage, respond to, and route every inbound message — instantly, intelligently, 24/7.
              </p>
            </FadeIn>
            <FadeIn delay={400} duration={600}>
              <CalendlyButton>
                <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] hover:opacity-90 text-white shadow-lg shadow-[#2DD4BF]/30 transition-all duration-300 cursor-pointer text-base px-8">
                  Schedule a Consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CalendlyButton>
            </FadeIn>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-secondary/20 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { stat: "< 2s", label: "Average response time" },
                { stat: "80%", label: "Of routine emails resolved by AI" },
                { stat: "24/7", label: "Always watching your inbox" },
                { stat: "30%", label: "Reduction in support costs" },
              ].map(({ stat, label }) => (
                <div key={stat} className="space-y-1">
                  <div className="text-3xl font-black bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">{stat}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What It Does */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What AI Email Automation{" "}
              <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">Does For You</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every inbound email is read, understood, and acted on — without you lifting a finger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Inbox,
                gradient: "from-[#2DD4BF] to-[#0D9488]",
                title: "Instant Email Reading",
                desc: "AI reads and understands every inbound email the moment it arrives — categorizing intent, urgency, and context automatically.",
              },
              {
                icon: Reply,
                gradient: "from-[#0D9488] to-[#14B8A6]",
                title: "Automated Responses",
                desc: "Routine inquiries — pricing questions, FAQs, appointment requests — are answered instantly with personalized, brand-consistent replies.",
              },
              {
                icon: Filter,
                gradient: "from-[#2DD4BF] to-[#0D9488]",
                title: "Smart Triage",
                desc: "AI sorts and prioritizes your inbox automatically — urgent issues get flagged, spam gets filtered, and everything is organized.",
              },
              {
                icon: Bell,
                gradient: "from-[#0D9488] to-[#14B8A6]",
                title: "Escalation & Routing",
                desc: "Complex or sensitive emails are automatically routed to the right person on your team with full context included.",
              },
              {
                icon: Clock,
                gradient: "from-[#2DD4BF] to-[#0D9488]",
                title: "24/7 Coverage",
                desc: "Your AI never sleeps. Emails received at 2am get a thoughtful response before your customer wakes up.",
              },
              {
                icon: TrendingUp,
                gradient: "from-[#0D9488] to-[#14B8A6]",
                title: "Performance Analytics",
                desc: "Track response times, resolution rates, and email volume trends — so you always know how your communications are performing.",
              },
            ].map(({ icon: Icon, gradient, title, desc }, i) => (
              <Card key={title} className="p-6 space-y-4 gradient-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Business Benefits */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A] py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#2DD4BF_0%,_transparent_60%)] opacity-15" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Why Businesses{" "}
                <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">
                  Love Email AI
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Never Lose a Lead Again",
                  desc: "Slow email responses cost sales. AI responds to every inquiry within seconds — keeping prospects engaged before they move on.",
                },
                {
                  icon: Users,
                  title: "Free Up Your Team",
                  desc: "Stop burning hours on repetitive emails. Your team handles the important stuff while AI takes care of the routine.",
                },
                {
                  icon: Shield,
                  title: "Consistent Brand Voice",
                  desc: "Every response is on-brand, professional, and accurate — no more off-message replies from tired staff.",
                },
                {
                  icon: TrendingUp,
                  title: "Scale Without Hiring",
                  desc: "Handle 10x the email volume without adding headcount. AI scales instantly as your business grows.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <Card key={title} className="p-6 bg-white/5 border-white/10 space-y-3 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2DD4BF] to-[#0D9488] flex items-center justify-center shadow">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple to{" "}
              <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">Set Up</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              No technical skills required. We handle the entire setup for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Share Your Email", desc: "Give us access to your business inbox — Outlook, Gmail, or any provider." },
              { step: "02", title: "We Train the AI", desc: "We configure your AI on your business, products, tone, and how you want emails handled." },
              { step: "03", title: "Go Live", desc: "Your AI starts responding to inbound emails — instantly and automatically." },
              { step: "04", title: "Review & Refine", desc: "Monitor performance, review responses, and we continuously improve the AI over time." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center space-y-3">
                <div className="text-4xl font-black bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">{step}</div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who It's For */}
        <section className="bg-secondary/30 py-20 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Works for{" "}
                <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">Any Industry</span>
              </h2>
              <p className="text-muted-foreground">If your business receives inbound emails, Ephesus AI Email handles them.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {["Healthcare & Medical", "Real Estate", "Legal Services", "Retail & E-commerce", "Restaurants", "Barber & Salons", "Financial Services", "Consulting Firms", "Property Management", "Fitness & Wellness"].map((industry) => (
                <span key={industry} className="px-4 py-2 rounded-full bg-gradient-to-r from-[#2DD4BF]/10 to-[#0D9488]/10 border border-[#2DD4BF]/20 text-sm font-medium">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Everything{" "}
                <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">Included</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "AI email reading & understanding",
                "Automated response drafting & sending",
                "Smart inbox triage & prioritization",
                "Escalation to human team when needed",
                "Spam & irrelevant email filtering",
                "Custom AI training on your business",
                "Multi-inbox support",
                "Performance dashboard & analytics",
                "Ongoing AI optimization",
                "Dedicated support from Ephesus AI team",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                  <CheckCircle className="w-5 h-5 text-[#2DD4BF] flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A] py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2DD4BF_0%,_transparent_70%)] opacity-15" />
          <div className="container mx-auto px-6 relative text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Automate{" "}
              <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">
                Your Inbox?
              </span>
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Schedule a free consultation and we'll show you how AI email automation works for your specific business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalendlyButton>
                <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] hover:opacity-90 text-white shadow-lg shadow-[#2DD4BF]/30 transition-all duration-300 cursor-pointer text-base px-8">
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CalendlyButton>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 cursor-pointer text-base px-8 bg-transparent">
                  Explore Other Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
