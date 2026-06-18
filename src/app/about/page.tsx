"use client";

import {
  Brain, Zap, Target, Users, ArrowRight, CheckCircle,
  PhoneCall, Mail, MessageSquare, RefreshCw, Shield, TrendingUp
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGradient from "@/components/CursorGradient";
import CalendlyButton from "@/components/CalendlyButton";
import { Card } from "@/components/ui/card";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <CursorGradient />
      <Header />

      <main className="flex-1 pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-36 bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0D9488_0%,_transparent_60%)] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#2DD4BF_0%,_transparent_60%)] opacity-15" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <FadeIn delay={0} duration={500}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#2DD4BF]" />
                  Our Story
                </div>
              </FadeIn>
              <FadeIn delay={120} duration={600}>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                  We Built the AI{" "}
                  <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                    We Wished Existed.
                  </span>
                </h1>
              </FadeIn>
              <FadeIn delay={240} duration={600}>
                <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  Ephesus AI was built out of a simple frustration: businesses were losing customers not because their product was bad, but because no one picked up the phone. We set out to fix that — and ended up building a full AI communications suite that handles every channel, 24/7.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* The problem we solve — stat strip */}
        <section className="border-y border-border bg-secondary/20 py-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[
                { stat: "85%", label: "of customers won't call back after a missed call" },
                { stat: "90%", label: "expect a reply within 10 minutes" },
                { stat: "53%", label: "of visitors leave if chat doesn't respond instantly" },
                { stat: "80%", label: "of sales require 5+ follow-ups to close" },
              ].map(({ stat, label }) => (
                <div key={stat} className="space-y-1">
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">{stat}</div>
                  <p className="text-xs text-muted-foreground leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-semibold uppercase tracking-wider">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">
                No Inquiry{" "}
                <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                  Left Behind.
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every unanswered call, slow email reply, and ignored chat is a customer who chose a competitor. Our mission is simple: make sure that never happens to your business again.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We don't sell software you have to figure out yourself. We configure, launch, and run your entire AI communications suite — trained on your business, speaking in your voice, working 24 hours a day.
              </p>
              <ul className="space-y-3">
                {[
                  "Every call answered in under 2 seconds",
                  "Every email replied to intelligently and instantly",
                  "Every website visitor engaged the moment they land",
                  "Every dormant lead re-engaged automatically",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Graphic: what we handle */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: PhoneCall, label: "AI Voice Receptionist", stat: "24/7", sub: "call answering", color: "from-[#0D9488] to-[#14B8A6]" },
                { icon: Mail, label: "AI Email Automation", stat: "< 2s", sub: "response time", color: "from-[#2DD4BF] to-[#0D9488]" },
                { icon: MessageSquare, label: "AI Website Chatbot", stat: "100%", sub: "visitor coverage", color: "from-[#14B8A6] to-[#5EEAD4]" },
                { icon: RefreshCw, label: "AI Lead Revival", stat: "3–5×", sub: "higher conversion", color: "from-[#2DD4BF] to-[#0F766E]" },
              ].map(({ icon: Icon, label, stat, sub, color }) => (
                <div key={label} className="p-5 rounded-2xl border bg-background shadow-sm hover:shadow-md transition-shadow space-y-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{stat}</div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{label}</div>
                    <div className="text-xs text-muted-foreground">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why we're different */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A] py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0D9488_0%,_transparent_70%)] opacity-10" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  We're Not Just a{" "}
                  <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                    Software Tool.
                  </span>
                </h2>
                <p className="text-white/60 max-w-xl mx-auto">
                  Most AI tools hand you a product and leave you to figure it out. We're different — we're a done-for-you service.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Zap,
                    title: "We Handle Setup End-to-End",
                    desc: "We integrate with your email, phone, website, CRM, and calendar. You approve the plan — we handle every technical detail.",
                  },
                  {
                    icon: Brain,
                    title: "Trained on Your Business",
                    desc: "Your AI learns your services, pricing, tone, and policies. It answers like someone who actually works at your company.",
                  },
                  {
                    icon: TrendingUp,
                    title: "We Optimize Continuously",
                    desc: "We monitor performance, tune responses, and update your AI as your business evolves — so it keeps improving over time.",
                  },
                  {
                    icon: Shield,
                    title: "Secure & Private",
                    desc: "Your data stays yours. We only integrate with systems you authorize — no data selling, no third-party sharing.",
                  },
                  {
                    icon: Target,
                    title: "ROI-First Approach",
                    desc: "We price based on the value we deliver. If our AI isn't generating measurable results for your business, we want to know about it.",
                  },
                  {
                    icon: Users,
                    title: "Real People Behind It",
                    desc: "You always have a direct line to our team. We're a small, focused crew that treats every client like a long-term partner.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <Card key={title} className="p-6 bg-white/5 border-white/10 space-y-3 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-white">{title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 md:py-28 container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                The Team Behind{" "}
                <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                  Ephesus AI
                </span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A small, specialized team obsessed with one thing: making sure your business never misses an opportunity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {[
                {
                  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Thomas-Haller-24-1-1761786871892.jpg?width=8000&height=8000&resize=contain",
                  name: "Thomas Haller",
                  role: "Director of AI Strategy & Innovation",
                  bio: "Thomas leads the technical build and AI configuration for every client. He specializes in designing automation systems that feel natural, respond intelligently, and scale without breaking.",
                },
                {
                  src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/sreid-1761788596375.jpeg?width=8000&height=8000&resize=contain",
                  name: "Samuel Reid",
                  role: "Director of Growth & Client Success",
                  bio: "Samuel owns client relationships from day one — strategy, onboarding, and ongoing results. He makes sure every business gets a setup that actually moves the needle, not just one that technically works.",
                },
              ].map(({ src, name, role, bio }) => (
                <Card key={name} className="p-8 gradient-border hover:shadow-2xl transition-all duration-500 group">
                  <div className="flex items-start gap-5">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ring-2 ring-[#0D9488]/30 group-hover:ring-[#0D9488]/60 transition-all duration-300">
                      <img src={src} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:bg-gradient-to-r group-hover:from-[#0D9488] group-hover:to-[#2DD4BF] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {name}
                      </h3>
                      <p className="text-sm text-[#0D9488] font-medium mt-0.5">{role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-5">{bio}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A] py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2DD4BF_0%,_transparent_70%)] opacity-15" />
          <div className="container mx-auto px-6 relative text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to Work{" "}
              <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                Together?
              </span>
            </h2>
            <p className="text-xl text-white/70">
              Book a free 30-minute call and we'll walk through exactly how Ephesus AI would work for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <CalendlyButton>
                <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25 transition-all duration-300 cursor-pointer">
                  Book a Free Strategy Call
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CalendlyButton>
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 cursor-pointer bg-transparent">
                  See Our Services
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
