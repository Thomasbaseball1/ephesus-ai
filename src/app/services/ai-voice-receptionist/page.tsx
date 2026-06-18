"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall, CheckCircle, Clock, MessageSquare, Calendar, Users, TrendingUp, Zap, Target, Globe, Headphones, Database, Scissors, UtensilsCrossed } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGradient from "@/components/CursorGradient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VapiDemo } from "@/components/VapiDemo";
import FadeIn from "@/components/FadeIn";

export default function AIVoiceReceptionistPage() {
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
                  <PhoneCall className="w-10 h-10 text-white" />
                </div>
              </FadeIn>
              <FadeIn delay={180} duration={600}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  AI Voice <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Receptionist & Website Chatbot</span>
                </h1>
              </FadeIn>
              <FadeIn delay={300} duration={600}>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Never miss a call or website visitor again. Our AI-powered voice receptionist and website chatbot handle customer interactions 24/7 with human-like conversation and intelligence.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Live Demo Section */}
        <section className="border-y border-border bg-gradient-to-br from-[#388087]/10 via-secondary/30 to-[#6FB3B8]/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#388087]/5 via-transparent to-[#6FB3B8]/5" />
          <div className="container mx-auto px-6 py-20 relative">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#388087] to-[#6FB3B8] text-white text-sm font-medium shadow-lg">
                  <PhoneCall className="w-4 h-4" />
                  Try It Live
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Experience Our <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">AI Voice Assistant</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  See how our AI receptionist handles calls with natural conversation. Click below to start a live demo call and experience it yourself.
                </p>
              </div>
              
              <VapiDemo />
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 gradient-border hover:shadow-2xl transition-all duration-500">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Always Available, Always Professional</h2>
                <p className="text-muted-foreground text-lg">
                  Our AI Voice Receptionist Agent transforms how you handle incoming calls. Using advanced natural language processing and voice recognition, it understands customer needs, answers questions, schedules appointments, and routes calls—all while maintaining a professional, personable tone that represents your brand perfectly.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">24/7</div>
                    <p className="text-sm text-muted-foreground">Availability</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">20%</div>
                    <p className="text-sm text-muted-foreground">Revenue Improvement Through Better Lead Conversion</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">&lt;2s</div>
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
                AI-Powered <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Results</span>
              </h2>
              <p className="text-muted-foreground">Measurable impact on your business operations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
              <div className="animate-scale-in">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">~4 hrs/week</div>
                <div className="text-muted-foreground">Time saved per worker</div>
              </div>
              <div className="animate-scale-in">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">37%</div>
                <div className="text-muted-foreground">Revenue growth with AI in marketing/sales/product</div>
              </div>
              <div className="animate-scale-in">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">3.5× ROI</div>
                <div className="text-muted-foreground">On digital spend for AI adopters</div>
              </div>
              <div className="animate-scale-in">
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">50%</div>
                <div className="text-muted-foreground">Higher EBIT growth</div>
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
                Everything you need to deliver exceptional phone experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Natural Conversations
                </h3>
                <p className="text-muted-foreground">
                  Human-like dialogue that understands context, sentiment, and intent to provide helpful, conversational responses.
                </p>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Appointment Scheduling
                </h3>
                <p className="text-muted-foreground">
                  Automatically book, reschedule, and confirm appointments based on your calendar availability and business rules.
                </p>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Intelligent Call Routing
                </h3>
                <p className="text-muted-foreground">
                  Route calls to the right department or person based on caller intent, history, and priority level.
                </p>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  CRM Integration
                </h3>
                <p className="text-muted-foreground">
                  Seamlessly integrate with your existing CRM to log calls, update records, and access customer information in real-time.
                </p>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Custom Voice & Personality
                </h3>
                <p className="text-muted-foreground">
                  Customize the voice, tone, and personality to match your brand identity and create consistent experiences.
                </p>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Analytics & Insights
                </h3>
                <p className="text-muted-foreground">
                  Track call volumes, sentiment, common questions, and performance metrics to optimize your service.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Perfect For <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Every Industry</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI receptionist adapts to your specific business needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-3 gradient-border hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold">Healthcare & Medical</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Schedule patient appointments and send reminders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Answer common health questions and provide information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Handle prescription refill requests</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 gradient-border hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold">Real Estate</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Qualify leads and schedule property viewings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Provide property details and availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Connect buyers with the right agent</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 gradient-border hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold">Legal Services</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Screen potential clients and book consultations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Provide practice area information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Handle urgent call escalation</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 gradient-border hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold">Retail & E-commerce</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Answer product questions and check inventory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Process orders and handle returns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Provide store hours and location information</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 gradient-border hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold">Barber Shops</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Book haircut appointments and manage walk-ins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Answer questions about services and pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Send appointment reminders to reduce no-shows</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 space-y-3 gradient-border hover:shadow-xl transition-all duration-300">
                <h3 className="text-lg font-semibold">Restaurants</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Take reservations and manage table availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Answer menu questions and dietary restrictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#388087] mt-0.5 flex-shrink-0" />
                    <span>Provide hours, location, and special event information</span>
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
                Transform Your <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Customer Service</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Measurable benefits that impact your bottom line
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Zero Wait Times</h3>
                <p className="text-muted-foreground">
                  Answer every call instantly, eliminating hold times and improving customer satisfaction dramatically.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Consistent Quality</h3>
                <p className="text-muted-foreground">
                  Deliver the same high-quality experience on every call, regardless of time, volume, or complexity.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Increased Conversions</h3>
                <p className="text-muted-foreground">
                  Never miss a sales opportunity with immediate response to inquiries and seamless appointment booking.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Reduced Costs</h3>
                <p className="text-muted-foreground">
                  Cut staffing costs by up to 80% while handling higher call volumes than traditional receptionists.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Staff Focus</h3>
                <p className="text-muted-foreground">
                  Free your team from routine calls to focus on high-value activities that drive business growth.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Scalable Solution</h3>
                <p className="text-muted-foreground">
                  Handle 1 call or 1,000 simultaneously without additional infrastructure or hiring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Upgrade Your <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Phone Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Transform how you handle calls with AI that never sleeps, never takes breaks, and always represents your brand professionally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="cursor-pointer">
                <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#388087] to-[#6FB3B8] hover:from-[#2d6b72] hover:to-[#5a9fa4] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started Today
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
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
