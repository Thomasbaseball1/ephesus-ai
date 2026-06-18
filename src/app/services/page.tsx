"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall, Mail, MessageSquare, CheckCircle, Sparkles, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyButton from "@/components/CalendlyButton";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const services = [
  {
    href: "/services/ai-voice-receptionist",
    icon: PhoneCall,
    gradient: "from-[#0D9488] to-[#14B8A6]",
    badgeColor: "bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20",
    badge: "Phone",
    title: "AI Voice Receptionist",
    desc: "Your phone lines handled 24/7. Our AI answers calls, routes inquiries, schedules appointments, and responds naturally — just like a real receptionist, without the overhead.",
    highlights: ["24/7 call answering", "Appointment scheduling", "Intelligent call routing", "Natural conversations"],
  },
  {
    href: "/services/ai-email-automation",
    icon: Mail,
    gradient: "from-[#2DD4BF] to-[#0D9488]",
    badgeColor: "bg-[#2DD4BF]/10 text-[#2DD4BF] border-[#2DD4BF]/20",
    badge: "Email",
    title: "AI Email Automation",
    desc: "Connect your business email and let AI handle every inbound message. Triage, respond, and route emails automatically — so your inbox is always under control.",
    highlights: ["Instant AI responses", "Smart email triage", "Auto-routing & escalation", "Works with your existing email"],
  },
  {
    href: "/services/ai-website-chatbot",
    icon: MessageSquare,
    gradient: "from-[#14B8A6] to-[#5EEAD4]",
    badgeColor: "bg-[#14B8A6]/10 text-[#14B8A6] border-[#14B8A6]/20",
    badge: "Website",
    title: "AI Website Chatbot",
    desc: "Embed an intelligent AI chat on your website. It engages visitors, answers questions, captures leads, and provides instant support — converting browsers into buyers.",
    highlights: ["Lead capture & qualification", "Instant visitor support", "Brand-trained AI", "Easy website embed"],
  },
  {
    href: "/services/ai-lead-revival",
    icon: RefreshCw,
    gradient: "from-[#2DD4BF] to-[#0F766E]",
    badgeColor: "bg-[#2DD4BF]/10 text-[#2DD4BF] border-[#2DD4BF]/20",
    badge: "Outbound",
    title: "AI Lead Revival",
    desc: "Turn your dormant contact list into active revenue. AI-powered drip campaigns, win-back sequences, and behavioral triggers re-engage cold leads and convert them into customers.",
    highlights: ["Automated email drip campaigns", "Behavioral trigger sequences", "Lead scoring & prioritization", "Win-back & re-engagement"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="marketing-page flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0D9488_0%,_transparent_60%)] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#2DD4BF_0%,_transparent_60%)] opacity-15" />
          <div className="container mx-auto px-6 relative text-center">
            <FadeIn delay={0} duration={500}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 text-[#0D9488]" />
                <span>Full-Suite AI Communications</span>
              </div>
            </FadeIn>
            <FadeIn delay={120} duration={600}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Every Channel.{" "}
                <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                  One Platform.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={240} duration={600}>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Ephesus AI handles all your inbound inquiries and revives your dormant leads — phone, email, website chat, and outbound campaigns — all on autopilot.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-6 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map(({ href, icon: Icon, gradient, badgeColor, badge, title, desc, highlights }, i) => (
              <Card
                key={title}
                className="p-8 space-y-6 gradient-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${badgeColor}`}>{badge}</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>

                <ul className="space-y-2 flex-1">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <Link href={href}>
                  <Button variant="outline" className="w-full gap-2 group cursor-pointer border-[#0D9488]/30 hover:border-[#0D9488] hover:text-[#0D9488] transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* How Simple It Is */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A] py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0D9488_0%,_transparent_70%)] opacity-10" />
          <div className="container mx-auto px-6 relative text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Integrates With What You Already Have
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-12">
              We connect directly to the tools your business already runs on. No ripping out your stack — we slot in on top of it.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Mail,
                  title: "Business Email",
                  desc: "Connect any inbox — Gmail, Outlook, or custom domain. We handle every inbound message automatically.",
                },
                {
                  icon: MessageSquare,
                  title: "Your Website",
                  desc: "One line of code embeds your AI chatbot. Works on any site builder — Wix, Webflow, WordPress, custom.",
                },
                {
                  icon: PhoneCall,
                  title: "Phone System",
                  desc: "We provision or forward to an AI phone line that handles calls, routes inquiries, and books appointments.",
                },
                {
                  icon: RefreshCw,
                  title: "CRM",
                  desc: "We sync with your CRM (HubSpot, Salesforce, Go High Level, etc.) to log interactions and update contact records automatically.",
                },
                {
                  icon: CheckCircle,
                  title: "Calendar & Scheduling",
                  desc: "Connect Google Calendar, Calendly, or your booking system so the AI can schedule appointments in real time.",
                },
                {
                  icon: Sparkles,
                  title: "Your Knowledge Base",
                  desc: "Share your FAQs, pricing, services, and policies. We train the AI on your business so it speaks in your voice.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <Card key={title} className="p-6 bg-white/5 border-white/10 text-left space-y-3">
                  <Icon className="w-6 h-6 text-[#0D9488]" />
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="text-sm text-white/60">{desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 py-20 md:py-32 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Get{" "}
            <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
              Started?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Schedule a free consultation and we'll walk you through the right setup for your business.
          </p>
          <CalendlyButton>
            <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25 transition-all duration-300 cursor-pointer text-base px-8">
              Schedule Consultation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </CalendlyButton>
        </section>

      </main>
      <Footer />
    </div>
  );
}
