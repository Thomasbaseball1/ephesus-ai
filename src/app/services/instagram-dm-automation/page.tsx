"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, CheckCircle, Sparkles, Zap, MessageSquare,
  Users, BarChart3, Bell, Instagram, Heart, Repeat2, AtSign,
  Bot, ChevronDown, Calendar, Image, TrendingUp, Shield, Hash, Star
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyButton from "@/components/CalendlyButton";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const IG_GRADIENT = "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)";
const IG_TEXT = "linear-gradient(135deg, #E1306C, #833AB4)";

/* ─── DM Demo ─── */
type DMMsg = { from: "user" | "ai"; text: string; delay: number };

const SCRIPT: DMMsg[] = [
  { from: "user", text: "Hey, just followed you! What do you guys do exactly?", delay: 800 },
  { from: "ai",   text: "Hey! 👋 So glad you found us. We build AI systems that handle your business communications automatically — phone calls, emails, Instagram DMs, website chat, all of it.", delay: 2200 },
  { from: "ai",   text: "Basically, you connect your accounts and we make sure nothing ever slips through the cracks — 24/7, no extra staff needed.", delay: 4000 },
  { from: "user", text: "Wait so this message is from an AI right now? 😂", delay: 6200 },
  { from: "ai",   text: "Ha — yes, actually! This is exactly what we do. You just got a real-time demo without even asking for one 😄", delay: 7800 },
  { from: "ai",   text: "Want to see how it could work for your business? I can get you set up with a free consultation.", delay: 9400 },
  { from: "user", text: "Ok that's actually pretty impressive. Yes let's do it!", delay: 11200 },
  { from: "ai",   text: "Perfect! I'll send you the booking link now 🚀 Our team usually gets back within a few hours to confirm.", delay: 12600 },
];

function DMDemo() {
  const [messages, setMessages] = useState<DMMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const runDemo = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setMessages([]);
    setTyping(false);
    setDone(false);
    setStarted(true);

    SCRIPT.forEach((msg, i) => {
      if (msg.from === "ai") {
        const t1 = setTimeout(() => setTyping(true), msg.delay - 1200);
        const t2 = setTimeout(() => {
          setTyping(false);
          setMessages((prev) => [...prev, msg]);
          if (i === SCRIPT.length - 1) setDone(true);
        }, msg.delay);
        timersRef.current.push(t1, t2);
      } else {
        const t = setTimeout(() => setMessages((prev) => [...prev, msg]), msg.delay);
        timersRef.current.push(t);
      }
    });
  };

  useEffect(() => () => timersRef.current.forEach(clearTimeout), []);

  return (
    <div className="relative max-w-sm mx-auto">
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white/10"
        style={{ background: '#000', minHeight: 580 }}>
        <div className="flex items-center justify-between px-6 pt-3 pb-1">
          <span className="text-[10px] text-white/70 font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            {[3,2,1].map(b => <div key={b} className="w-1 rounded-sm bg-white/70" style={{ height: b * 4 }} />)}
            <div className="ml-1 w-3.5 h-2 rounded-sm border border-white/70 relative">
              <div className="absolute inset-0.5 right-auto w-2/3 bg-white/70 rounded-sm" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10"
          style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
          <button className="text-white/60 mr-1"><ArrowRight className="w-4 h-4 rotate-180" /></button>
          <div className="relative">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: IG_GRADIENT }}>E</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-black" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white">ephesusai</div>
            <div className="text-[10px] text-green-400">Active now</div>
          </div>
        </div>
        <div ref={scrollRef} className="px-3 py-4 space-y-2 overflow-y-auto" style={{ height: 380, background: '#000' }}>
          {started && (
            <div className="flex justify-center mb-3" style={{ animation: 'igFadeUp 0.4s ease forwards' }}>
              <span className="text-[10px] text-white/40 bg-white/5 px-3 py-1 rounded-full">@alexrivera started following you</span>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-end gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              style={{ animation: 'igFadeUp 0.35s ease forwards' }}>
              {msg.from === "ai" && (
                <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white mb-0.5"
                  style={{ background: IG_GRADIENT }}>E</div>
              )}
              <div className={`max-w-[72%] px-3 py-2 text-[13px] leading-snug ${msg.from === "user" ? "rounded-3xl rounded-br-md" : "rounded-3xl rounded-bl-md"} text-white`}
                style={{ background: msg.from === "user" ? 'linear-gradient(135deg, #E1306C, #833AB4)' : 'rgba(255,255,255,0.12)' }}>
                {msg.text}
              </div>
              {msg.from === "user" && (
                <div className="w-6 h-6 rounded-full flex-shrink-0 bg-white/20 flex items-center justify-center text-[9px] font-bold text-white mb-0.5">A</div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex items-end gap-2" style={{ animation: 'igFadeUp 0.3s ease forwards' }}>
              <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: IG_GRADIENT }}>E</div>
              <div className="px-4 py-3 rounded-3xl rounded-bl-md" style={{ background: 'rgba(255,255,255,0.12)' }}>
                <div className="flex items-center gap-1">
                  {[0,150,300].map((d) => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {done && (
            <div className="flex justify-center pt-2" style={{ animation: 'igFadeUp 0.4s ease forwards' }}>
              <span className="text-[10px] px-3 py-1 rounded-full flex items-center gap-1.5"
                style={{ background: 'rgba(225,48,108,0.15)', border: '1px solid rgba(225,48,108,0.3)', color: '#f472b6' }}>
                <CheckCircle className="w-3 h-3" /> Powered by Ephesus AI
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 px-3 py-2 border-t border-white/10" style={{ background: '#000' }}>
          <div className="flex-1 bg-white/10 rounded-full px-4 py-2 text-[12px] text-white/30">Message…</div>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: IG_GRADIENT }}>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30 scale-75"
        style={{ background: 'radial-gradient(ellipse, #E1306C 0%, #833AB4 50%, transparent 70%)' }} />
      <div className="mt-8 text-center">
        <button onClick={runDemo}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
          style={{ background: IG_TEXT, boxShadow: done ? '0 0 24px rgba(225,48,108,0.4)' : 'none' }}>
          <Sparkles className="w-4 h-4" />
          {!started ? "Watch the AI in Action" : done ? "Replay Demo" : "Running…"}
        </button>
      </div>
    </div>
  );
}

/* ─── Automation Pillars ─── */
const PILLARS = [
  {
    icon: MessageSquare,
    title: "DM Management",
    color: "from-[#E1306C] to-[#F56040]",
    desc: "AI handles every incoming DM — answering questions, sharing links, qualifying leads, and booking calls without you touching a thing.",
    features: [
      "Instant replies to incoming messages",
      "Intent detection — routes by topic",
      "FAQ automation and link delivery",
      "Seamless handoff to your team",
    ],
  },
  {
    icon: Users,
    title: "Follower Automation",
    color: "from-[#833AB4] to-[#E1306C]",
    desc: "The moment someone follows you, a personalized welcome DM fires automatically. Turn passive followers into active conversations.",
    features: [
      "Instant new-follower welcome DMs",
      "Multi-step follow-up sequences",
      "Personalized by niche or source",
      "Lead capture inside the DM thread",
    ],
  },
  {
    icon: Image,
    title: "Auto Posting & Scheduling",
    color: "from-[#F56040] to-[#FCAF45]",
    desc: "Plan your content calendar once. AI schedules and publishes your posts, reels, and stories at optimal times for maximum reach.",
    features: [
      "Schedule posts, reels & stories",
      "AI-suggested optimal posting times",
      "Auto-caption generation from media",
      "Content calendar management",
    ],
  },
  {
    icon: Heart,
    title: "Comment & Engagement AI",
    color: "from-[#E1306C] to-[#833AB4]",
    desc: "Never leave a comment unanswered. AI monitors your posts and stories, replies to comments, and surfaces high-value interactions.",
    features: [
      "Auto-reply to post comments",
      "Story reaction follow-up DMs",
      "Keyword-triggered responses",
      "Spam and negativity filtering",
    ],
  },
  {
    icon: Hash,
    title: "Hashtag & Content Strategy",
    color: "from-[#FCAF45] to-[#E1306C]",
    desc: "AI analyzes your niche, suggests trending hashtags, and helps you build a content strategy that drives organic follower growth.",
    features: [
      "AI-generated hashtag sets per post",
      "Competitor and niche analysis",
      "Content theme suggestions",
      "Engagement rate optimization tips",
    ],
  },
  {
    icon: Repeat2,
    title: "Re-Engagement Campaigns",
    color: "from-[#833AB4] to-[#405DE6]",
    desc: "Got followers who went cold? AI identifies dormant followers and re-engages them with timely, relevant messages that bring them back.",
    features: [
      "Segment followers by activity",
      "Automated win-back DM sequences",
      "Behavioral trigger campaigns",
      "Conversion tracking per sequence",
    ],
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reporting",
    color: "from-[#405DE6] to-[#833AB4]",
    desc: "Track what's working across every automation. See follower growth, DM reply rates, conversions, and engagement — all in one place.",
    features: [
      "Follower growth tracking",
      "DM open and reply rates",
      "Lead conversion attribution",
      "Weekly performance summaries",
    ],
  },
  {
    icon: AtSign,
    title: "Lead Capture & CRM Sync",
    color: "from-[#E1306C] to-[#405DE6]",
    desc: "AI qualifies leads inside the DM and syncs them directly to your CRM, n8n workflow, or team inbox — zero manual data entry.",
    features: [
      "In-DM qualifying questions",
      "Auto-sync to CRM or Notion",
      "n8n workflow integration",
      "Lead scoring and prioritization",
    ],
  },
];

/* ─── Pillar Card ─── */
function PillarCard({ icon: Icon, title, color, desc, features }: typeof PILLARS[0]) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl p-6 space-y-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(225,48,108,0.12)' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <ChevronDown className={`w-4 h-4 text-white/30 mt-1 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </div>
      <div>
        <h3 className="font-semibold text-white mb-1">{title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
      </div>
      {open && (
        <ul className="space-y-1.5 pt-1 border-t border-white/5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#E1306C' }} />
              {f}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ─── Page ─── */
export default function InstagramAutomationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <style>{`
        @keyframes igFadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Header />

      <main className="flex-1 pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-36"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1a0a12 50%, #0F172A 100%)' }}>
          <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(ellipse at top right, #E1306C 0%, transparent 55%)' }} />
          <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(ellipse at bottom left, #833AB4 0%, transparent 55%)' }} />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <FadeIn delay={0} duration={500}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20">
                  <Instagram className="w-4 h-4" style={{ color: '#E1306C' }} />
                  <span>Instagram AI Suite</span>
                </div>
              </FadeIn>

              <FadeIn delay={120} duration={600}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                  Your Entire Instagram.{" "}
                  <span style={{ background: IG_TEXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Run by AI.
                  </span>
                </h1>
              </FadeIn>

              <FadeIn delay={240} duration={600}>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  Ephesus AI is a full Instagram automation suite — managing your DMs, welcoming new followers, scheduling and publishing content, replying to comments, re-engaging cold audiences, and turning every interaction into real pipeline. 24/7, on autopilot.
                </p>
              </FadeIn>

              <FadeIn delay={360} duration={600}>
                <div className="flex flex-wrap gap-3 justify-center text-sm text-white/60">
                  {["DM management", "Auto posting", "Follower automation", "Comment replies", "Lead capture", "Analytics"].map((item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" style={{ color: '#E1306C' }} />
                      {item}
                    </span>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={480} duration={600}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <CalendlyButton>
                    <Button size="lg" className="gap-2 group text-white shadow-lg hover:opacity-90 transition-all duration-300 cursor-pointer text-base px-8"
                      style={{ background: IG_TEXT, boxShadow: '0 8px 32px rgba(225,48,108,0.3)' }}>
                      Get the Full Suite
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CalendlyButton>
                  <a href="#demo">
                    <Button size="lg" className="gap-2 group border border-white/30 text-white hover:bg-white/10 cursor-pointer text-base px-8 bg-white/5 backdrop-blur-sm">
                      <Sparkles className="w-4 h-4" style={{ color: '#E1306C' }} />
                      See a Live Demo
                      <ChevronDown className="w-4 h-4 text-white/40 group-hover:translate-y-0.5 transition-transform" />
                    </Button>
                  </a>
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
                { stat: "1B+", label: "Instagram active users worldwide" },
                { stat: "68%", label: "of people DM brands to learn more" },
                { stat: "8×", label: "more engagement than other platforms" },
                { stat: "24/7", label: "automated coverage, zero staff needed" },
              ].map(({ stat, label }) => (
                <div key={stat} className="space-y-1">
                  <div className="text-3xl font-black" style={{ background: IG_TEXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat}</div>
                  <p className="text-xs text-muted-foreground leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included — 8 Pillars */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5"
                style={{ background: 'rgba(225,48,108,0.1)', border: '1px solid rgba(225,48,108,0.25)', color: '#f472b6' }}>
                The Full Suite
              </div>
              <h2 className="text-3xl md:text-5xl font-bold">
                Everything Automated.{" "}
                <span style={{ background: IG_TEXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Nothing Manual.
                </span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Eight automation pillars working together to grow, engage, and monetize your Instagram presence — all running in the background while you focus on your business.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {PILLARS.map((p) => <PillarCard key={p.title} {...p} />)}
            </div>
            <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.3)' }}>Click any card to see what&apos;s included</p>
          </div>
        </section>

        {/* Live Demo Section */}
        <section id="demo" className="py-20 md:py-32 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1a0a12 60%, #0F172A 100%)' }}>
          <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(ellipse at center, #E1306C 0%, transparent 65%)' }} />
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20 mb-5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live Demo
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Watch the AI{" "}
                <span style={{ background: IG_TEXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Work in Real Time
                </span>
              </h2>
              <p className="text-white/55 mt-4 max-w-xl mx-auto">
                Hit the button and watch Ephesus AI automatically engage a new follower — exactly how it works on your account.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <DMDemo />
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">What just happened</h3>
                {[
                  { step: "1", title: "New follower detected", desc: "The moment @alexrivera followed, the workflow fired automatically — no human involved." },
                  { step: "2", title: "AI opened the conversation", desc: "A personalized opener sent within seconds — tailored to your brand voice, not a copy-paste template." },
                  { step: "3", title: "AI handled the back-and-forth", desc: "Every reply understood in context — answering questions, building rapport, driving toward a call." },
                  { step: "4", title: "Lead converted inside the DM", desc: "From \"just following\" to booking a consultation — entirely automated, zero effort from your team." },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white"
                      style={{ background: IG_TEXT }}>{step}</div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-0.5">{title}</p>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2">
                  <CalendlyButton>
                    <Button className="gap-2 group text-white hover:opacity-90 transition-all duration-300 cursor-pointer"
                      style={{ background: IG_TEXT }}>
                      Set This Up For My Business
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CalendlyButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-bold">
                Built for Businesses That{" "}
                <span style={{ background: IG_TEXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Live on Instagram
                </span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Whether you&apos;re a creator, agency, brand, or local business — the suite adapts to how you grow.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Star,
                  title: "Creators & Influencers",
                  items: ["Auto-DM brand partnership inquiries", "Welcome new followers with your offer", "Schedule content while you create", "Capture sponsorship leads in DMs"],
                },
                {
                  icon: TrendingUp,
                  title: "Brands & E-Commerce",
                  items: ["Answer product questions instantly", "Promote launches via DM campaigns", "Re-engage past customers", "Drive traffic to product links"],
                },
                {
                  icon: Users,
                  title: "Agencies & Service Biz",
                  items: ["Book discovery calls via DM", "Qualify inbound leads automatically", "Nurture followers into clients", "Manage multiple accounts at scale"],
                },
              ].map(({ icon: Icon, title, items }) => (
                <Card key={title} className="p-6 space-y-4 hover:shadow-lg transition-shadow" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(225,48,108,0.12)' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: IG_TEXT }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#E1306C' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-32 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1a0a12 50%, #0F172A 100%)' }}>
          <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(ellipse at center, #E1306C 0%, transparent 70%)' }} />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                  Live in{" "}
                  <span style={{ background: IG_TEXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Four Steps.
                  </span>
                </h2>
                <p className="mt-4 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>Connect once. We configure and run everything from there.</p>
              </div>
              <div className="space-y-6">
                {[
                  { step: "01", icon: Instagram, title: "Connect Your Instagram Account", desc: "Log into the Ephesus AI client portal and connect your Instagram Business or Creator account in a few clicks. No technical setup required on your end." },
                  { step: "02", icon: Bot, title: "We Configure Your AI", desc: "Our team trains the AI on your brand voice, offers, tone, and how you want every automation to behave. You review and approve before anything goes live." },
                  { step: "03", icon: Zap, title: "Pick Your Automations", desc: "Choose which pillars to activate — DM management, follower outreach, auto posting, comment replies, or the full suite. We build and test every workflow." },
                  { step: "04", icon: BarChart3, title: "Go Live — We Run It All", desc: "Your AI handles Instagram 24/7. You get weekly performance reports, and hot leads or replies that need your attention are flagged directly to you." },
                ].map(({ step, title, desc, icon: Icon }) => (
                  <div key={step} className="flex gap-6 items-start group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                      style={{ background: IG_TEXT }}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: '#E1306C' }}>Step {step}</div>
                      <h3 className="text-xl font-bold text-white mb-1.5">{title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Automate */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-5xl font-bold">
                  Why Automate Your{" "}
                  <span style={{ background: IG_TEXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Entire Instagram?
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Bell, title: "Never Miss a Message or Comment", desc: "Every DM and comment gets an instant response — whether it's 2pm or 2am. Your audience always feels heard." },
                  { icon: Users, title: "Turn Every Follower Into a Lead", desc: "Most followers never reach out on their own. Automated outreach starts conversations before your competitors even know they followed." },
                  { icon: Calendar, title: "Post Consistently Without the Grind", desc: "Content fatigue is real. AI schedules and publishes your content calendar so your presence stays strong without the daily manual effort." },
                  { icon: Shield, title: "Sound Like You, Not a Bot", desc: "We train the AI on your specific brand voice and tone. Every message feels personal and authentic — not templated or robotic." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 p-6 rounded-2xl border bg-background hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: IG_TEXT }}>
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
        <section className="py-20 md:py-32 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1a0a12 50%, #0F172A 100%)' }}>
          <div className="absolute inset-0 opacity-15" style={{ background: 'radial-gradient(ellipse at center, #E1306C 0%, transparent 70%)' }} />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Ready to Put Your{" "}
                <span style={{ background: IG_TEXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Entire Instagram on Autopilot?
                </span>
              </h2>
              <p className="text-lg text-white/70">
                Connect your account in the client portal and we&apos;ll configure your full suite — DMs, posting, engagement, lead capture, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CalendlyButton>
                  <Button size="lg" className="gap-2 group text-white hover:opacity-90 shadow-lg transition-all duration-300 cursor-pointer text-base px-8"
                    style={{ background: IG_TEXT, boxShadow: '0 8px 32px rgba(225,48,108,0.3)' }}>
                    Book a Free Consultation
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CalendlyButton>
                <Link href="/login">
                  <Button size="lg" className="gap-2 border border-white/30 text-white hover:bg-white/10 cursor-pointer text-base px-8 bg-white/5 backdrop-blur-sm">
                    Connect Your Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
