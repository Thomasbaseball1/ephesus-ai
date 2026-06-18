"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare, CheckCircle, Clock, Users, TrendingUp, Zap, Target, Globe, Bot, BarChart3, ShieldCheck, Headphones, MousePointerClick } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGradient from "@/components/CursorGradient";
import CalendlyButton from "@/components/CalendlyButton";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AIWebsiteChatbotPage() {
  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <CursorGradient />
      <Header />
      
      <main className="marketing-page flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-[#388087]/10 via-transparent to-[#6FB3B8]/10 animate-pulse-slow" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <FadeIn delay={0} duration={400}>
                <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back to Services
                </Link>
              </FadeIn>
              <FadeIn delay={80} duration={500}>
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg animate-float">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
              </FadeIn>
              <FadeIn delay={180} duration={600}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  AI Website <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Chatbot</span>
                </h1>
              </FadeIn>
              <FadeIn delay={300} duration={600}>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Turn every website visitor into a potential customer. Our AI chatbot engages, qualifies, and converts visitors 24/7 with intelligent, human-like conversations.
                </p>
              </FadeIn>
              <FadeIn delay={420} duration={600}>
                <CalendlyButton>
                  <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#388087] to-[#6FB3B8] hover:from-[#2d6b72] hover:to-[#5a9fa4] text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                    Schedule Consultation
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CalendlyButton>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 gradient-border hover:shadow-2xl transition-all duration-500">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Your Smartest Team Member, Online 24/7</h2>
                <p className="text-muted-foreground text-lg">
                  Most website visitors leave without taking action. Our AI chatbot changes that by instantly engaging every visitor with personalized, intelligent conversations. It answers questions, recommends products or services, captures contact information, and books appointments — all without any human intervention.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">24/7</div>
                    <p className="text-sm text-muted-foreground">Always Online</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">3x</div>
                    <p className="text-sm text-muted-foreground">More Leads Captured</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">&lt;1s</div>
                    <p className="text-sm text-muted-foreground">Response Time</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* AI Impact Stats Section */}
        <section className="border-y border-border bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4F4F51]/5 via-transparent to-[#388087]/5" />
          <div className="container mx-auto px-6 py-16 relative">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Chatbot-Powered <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Results</span>
              </h2>
              <p className="text-muted-foreground">How AI chatbots are transforming business websites</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
              <div className="animate-scale-in">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">67%</div>
                <div className="text-muted-foreground">Of consumers have used a chatbot for support</div>
              </div>
              <div className="animate-scale-in">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">35%</div>
                <div className="text-muted-foreground">Increase in lead generation</div>
              </div>
              <div className="animate-scale-in">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">80%</div>
                <div className="text-muted-foreground">Of routine questions resolved instantly</div>
              </div>
              <div className="animate-scale-in">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">30%</div>
                <div className="text-muted-foreground">Reduction in support costs</div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="bg-secondary/30 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6FB3B8]/5 via-transparent to-[#388087]/5" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Features</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to convert website visitors into customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Intelligent Conversations
                </h3>
                <p className="text-muted-foreground">
                  Powered by advanced AI that understands context, remembers conversation history, and provides relevant, helpful responses.
                </p>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <MousePointerClick className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Lead Capture & Qualification
                </h3>
                <p className="text-muted-foreground">
                  Automatically collects visitor information, qualifies leads based on your criteria, and sends them directly to your team.
                </p>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Instant Customer Support
                </h3>
                <p className="text-muted-foreground">
                  Resolves common questions instantly, reducing support tickets and freeing your team for complex issues.
                </p>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Brand-Trained AI
                </h3>
                <p className="text-muted-foreground">
                  Trained on your specific business information, products, services, and brand voice for accurate, on-brand responses.
                </p>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Analytics & Insights
                </h3>
                <p className="text-muted-foreground">
                  Track visitor engagement, common questions, conversion rates, and chatbot performance to continuously optimize.
                </p>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Easy Integration
                </h3>
                <p className="text-muted-foreground">
                  Drops into any website with a simple code snippet. Works with WordPress, Shopify, Wix, custom sites, and more.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How Businesses Benefit */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How AI Chatbots <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Benefit Your Business</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real advantages that impact your revenue and customer experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-3 gradient-border hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold">Never Lose a Lead Again</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Engage visitors the moment they land on your site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Capture contact info and qualify leads automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Follow up with visitors who are about to leave</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 gradient-border hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold">Reduce Support Costs</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Handle 80% of common questions without human agents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Free your team to focus on high-value tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Scale support without hiring additional staff</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 gradient-border hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold">Improve Customer Experience</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Instant responses — no waiting for email replies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Personalized recommendations based on visitor behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Consistent, accurate information every time</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 gradient-border hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold">Boost Conversions & Sales</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Guide visitors through your sales funnel with smart prompts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Answer product/service questions that remove buying hesitation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Book appointments and demos directly in the chat</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Business Benefits Section */}
        <section className="bg-secondary/30 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#388087]/5 via-transparent to-[#6FB3B8]/5" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Every Business Needs an <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">AI Chatbot</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Stay ahead of the competition with always-on intelligent engagement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Available Around the Clock</h3>
                <p className="text-muted-foreground">
                  Your chatbot works nights, weekends, and holidays — capturing leads and helping customers when your team is offline.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Personalized Engagement</h3>
                <p className="text-muted-foreground">
                  Tailors responses based on the page a visitor is on, their behavior, and their specific questions for a custom experience.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Higher Conversion Rates</h3>
                <p className="text-muted-foreground">
                  Websites with AI chatbots see significantly higher conversion rates by engaging visitors at the right moment.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Instant ROI</h3>
                <p className="text-muted-foreground">
                  Start capturing more leads and reducing support costs from day one with minimal setup required.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Works With Any Industry</h3>
                <p className="text-muted-foreground">
                  From healthcare to real estate, retail to legal — AI chatbots adapt to any business and customer base.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Scales Effortlessly</h3>
                <p className="text-muted-foreground">
                  Handle 1 visitor or 10,000 simultaneously — no additional staffing or infrastructure needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Add an <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">AI Chatbot</span> to Your Website?
            </h2>
            <p className="text-lg text-muted-foreground">
              Schedule a consultation to see how an AI chatbot can transform your website into a lead-generating machine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CalendlyButton>
                <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#388087] to-[#6FB3B8] hover:from-[#2d6b72] hover:to-[#5a9fa4] text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CalendlyButton>
              <Link href="/services" className="cursor-pointer">
                <Button size="lg" variant="outline" className="gradient-border">
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
