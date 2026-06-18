"use client";

import Link from "next/link";
import {
  ArrowRight, Mail, Zap, TrendingUp, Target, RefreshCw, Clock,
  BarChart3, Users, CheckCircle, Sparkles, MessageSquare, Bell, Filter
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyButton from "@/components/CalendlyButton";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AILeadRevivalPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-36 bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#2DD4BF_0%,_transparent_60%)] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#0D9488_0%,_transparent_60%)] opacity-15" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <FadeIn delay={0} duration={500}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20">
                  <RefreshCw className="w-4 h-4 text-[#2DD4BF]" />
                  <span>AI Lead Revival</span>
                </div>
              </FadeIn>

              <FadeIn delay={120} duration={600}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                  Your Old Leads Are{" "}
                  <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">
                    Sitting on Money.
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={240} duration={600}>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  80% of sales require 5+ follow-ups — yet most businesses stop after one. Ephesus AI automatically re-engages your dormant leads with personalized campaigns and turns cold contacts into paying customers.
                </p>
              </FadeIn>

              <FadeIn delay={360} duration={600}>
                <div className="flex flex-wrap gap-3 justify-center text-sm text-white/60">
                  {["Reactivates cold leads", "AI-personalized sequences", "Runs 24/7 on autopilot"].map((item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[#2DD4BF]" />
                      {item}
                    </span>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={480} duration={600}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <CalendlyButton>
                    <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] hover:opacity-90 text-white shadow-lg shadow-[#2DD4BF]/25 hover:shadow-xl transition-all duration-300 cursor-pointer text-base px-8">
                      Start Reviving Leads
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CalendlyButton>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-y border-border bg-secondary/20 py-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
              {[
                { stat: "80%", label: "of sales need 5+ follow-ups" },
                { stat: "44%", label: "of reps give up after 1 follow-up" },
                { stat: "3–5×", label: "cheaper to re-engage old leads vs. new" },
                { stat: "29%", label: "average open rate for AI-personalized emails" },
              ].map(({ stat, label }) => (
                <div key={stat} className="space-y-1">
                  <div className="text-3xl font-black bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">{stat}</div>
                  <p className="text-xs text-muted-foreground leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold uppercase tracking-wider mb-4">
                The Leak in Your Pipeline
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                You Already Have the Leads.{" "}
                <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">
                  You're Just Not Working Them.
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Most businesses have hundreds — sometimes thousands — of contacts who showed interest but never converted. They're not lost. They just need the right message at the right time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  emoji: "😴",
                  headline: "Dormant Contacts",
                  sub: "Leads who filled out a form, called once, or visited your site — but never heard back consistently.",
                  color: "from-[#0D9488]/10 to-[#14B8A6]/10",
                  border: "border-[#0D9488]/20",
                },
                {
                  emoji: "🗑️",
                  headline: "Forgotten Follow-Ups",
                  sub: "Prospects who said 'not right now' 3 months ago — and your team never circled back.",
                  color: "from-[#14B8A6]/10 to-[#2DD4BF]/10",
                  border: "border-[#14B8A6]/20",
                },
                {
                  emoji: "💸",
                  headline: "Lost Revenue",
                  sub: "Every un-nurtured lead is money left on the table — and it cost you to acquire them in the first place.",
                  color: "from-[#2DD4BF]/10 to-[#0D9488]/10",
                  border: "border-[#2DD4BF]/20",
                },
              ].map(({ emoji, headline, sub, color, border }) => (
                <Card key={headline} className={`p-6 bg-gradient-to-br ${color} border ${border} space-y-3 text-center hover:scale-105 transition-transform duration-300`}>
                  <div className="text-4xl">{emoji}</div>
                  <div className="text-xl font-black">{headline}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{sub}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A] py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2DD4BF_0%,_transparent_70%)] opacity-10" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                How We{" "}
                <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">
                  Revive Your Pipeline
                </span>
              </h2>
              <p className="text-white/60 mt-4 max-w-xl mx-auto">AI-powered outreach that feels personal, runs automatically, and gets responses.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Mail,
                  title: "AI Email Drip Campaigns",
                  desc: "Multi-touch email sequences that automatically go out over days or weeks. Each email is personalized based on the lead's history, industry, and behavior.",
                },
                {
                  icon: Target,
                  title: "Lead Scoring & Prioritization",
                  desc: "Our AI ranks your dormant leads by how likely they are to convert — so your team focuses energy on the hottest opportunities first.",
                },
                {
                  icon: Bell,
                  title: "Behavioral Trigger Sequences",
                  desc: "If a lead opens an email, clicks a link, or revisits your website, AI automatically sends a timely follow-up while their interest is peaked.",
                },
                {
                  icon: RefreshCw,
                  title: "Win-Back Campaigns",
                  desc: "Targeted sequences for past customers who went quiet. Re-ignite the relationship with the right offer at the right moment.",
                },
                {
                  icon: Filter,
                  title: "Smart Segmentation",
                  desc: "AI groups your leads by industry, deal size, time since last contact, and more — so every message is relevant and timely.",
                },
                {
                  icon: MessageSquare,
                  title: "Multi-Channel Follow-Up",
                  desc: "Coordinate email, SMS, and voicemail drops in a single automated sequence — covering every touchpoint without manual effort.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <Card key={title} className="p-6 bg-white/5 border-white/10 space-y-4 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2DD4BF] to-[#0D9488] flex items-center justify-center">
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
        <section className="py-20 md:py-32 container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold">
                From Cold List to{" "}
                <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">
                  Closed Deal
                </span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Four simple steps to turn your dormant pipeline into a revenue engine.</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "Upload Your Lead List",
                  desc: "Share your existing CRM export, spreadsheet, or contact database. Even a messy list is fine — we clean and segment it for you.",
                  icon: Users,
                },
                {
                  step: "02",
                  title: "AI Builds Personalized Sequences",
                  desc: "We train the AI on your business, services, tone of voice, and target audience. It then crafts personalized email sequences tailored to each lead segment.",
                  icon: Sparkles,
                },
                {
                  step: "03",
                  title: "Campaigns Launch Automatically",
                  desc: "Emails go out on a smart schedule — spaced to avoid spam filters, timed for peak open rates, and triggered by lead behavior in real time.",
                  icon: Zap,
                },
                {
                  step: "04",
                  title: "Hot Leads Land in Your Inbox",
                  desc: "When a lead replies or clicks through, you're notified instantly. AI can even qualify them further before handing off to your sales team.",
                  icon: TrendingUp,
                },
              ].map(({ step, title, desc, icon: Icon }, i) => (
                <div key={step} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#0D9488] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-xs font-black text-[#2DD4BF] uppercase tracking-widest mb-1">Step {step}</div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results / Benefits */}
        <section className="bg-gray-50 dark:bg-secondary/20 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-bold">
                  What You Can Expect
                </h2>
                <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Businesses using AI lead revival campaigns consistently see these outcomes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: TrendingUp,
                    title: "More Revenue From Existing Contacts",
                    desc: "Re-engaging a lead who already knows your brand converts at 3–5× higher rates than cold outreach. It's your fastest path to new revenue.",
                  },
                  {
                    icon: Clock,
                    title: "Zero Manual Follow-Up Work",
                    desc: "Your team doesn't write a single email. Every follow-up, every sequence, every reply gets handled automatically until a lead is sales-ready.",
                  },
                  {
                    icon: BarChart3,
                    title: "Full Visibility Into What's Working",
                    desc: "Track open rates, click rates, reply rates, and conversions. Know exactly which messages and segments are performing best.",
                  },
                  {
                    icon: Target,
                    title: "Qualified Leads, Not Just Clicks",
                    desc: "AI pre-qualifies respondents with follow-up questions before routing them to your sales team — so you only talk to serious buyers.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 p-6 rounded-2xl border bg-background hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#0D9488] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A] py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2DD4BF_0%,_transparent_70%)] opacity-15" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Stop Leaving Money{" "}
                <span className="bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] bg-clip-text text-transparent">
                  in Your Old Lead List
                </span>
              </h2>
              <p className="text-lg text-white/70">
                You've already paid to acquire those leads. Let AI turn them into customers — automatically, around the clock, without adding headcount.
              </p>
              <CalendlyButton>
                <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#2DD4BF] to-[#0D9488] hover:opacity-90 text-white shadow-lg shadow-[#2DD4BF]/25 hover:shadow-xl transition-all duration-300 cursor-pointer text-base px-8">
                  Revive My Leads Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CalendlyButton>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
