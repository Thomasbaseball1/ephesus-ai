"use client";

import Link from "next/link";
import { ArrowRight, Code, CheckCircle, TrendingUp, Zap, Layers, Smartphone, Cloud, Lock, Sparkles, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGradient from "@/components/CursorGradient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CustomDevelopmentPage() {
  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <CursorGradient />
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-[#388087]/10 via-transparent to-[#6FB3B8]/10 animate-pulse-slow" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Link href="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Services
              </Link>
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg animate-float">
                <Code className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Custom <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Development</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Bespoke AI solutions tailored precisely to your unique business challenges and opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 gradient-border hover:shadow-2xl transition-all duration-500">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Built for Your Business, Not Someone Else's</h2>
                <p className="text-muted-foreground text-lg">
                  Off-the-shelf solutions often fall short of addressing your specific needs. Our Custom Development services create AI-powered applications and systems designed exclusively for your workflows, challenges, and goals. From concept to deployment, we build technology that fits your business like a glove.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">100%</div>
                    <p className="text-sm text-muted-foreground">Tailored to Your Needs</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">3.5× ROI</div>
                    <p className="text-sm text-muted-foreground">On digital spend for AI adopters</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">50%</div>
                    <p className="text-sm text-muted-foreground">Higher EBIT growth</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-secondary/30 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6FB3B8]/5 via-transparent to-[#388087]/5" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Real-World <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Use Cases</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Custom solutions that solve unique business problems across industries
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  AI-Powered Recommendation Engines
                </h3>
                <p className="text-muted-foreground">
                  Build personalized recommendation systems that understand customer preferences and suggest relevant products, content, or services.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Increase average order value by 45%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Improve customer engagement and retention</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Drive repeat purchases through personalization</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Intelligent Mobile Applications
                </h3>
                <p className="text-muted-foreground">
                  Develop mobile apps with embedded AI capabilities like voice recognition, image processing, and predictive features tailored to your industry.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Deliver seamless user experiences</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Enable offline AI capabilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Differentiate your brand with innovation</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Custom API & Integration Platforms
                </h3>
                <p className="text-muted-foreground">
                  Create intelligent APIs that connect disparate systems, automate data flows, and enable AI-enhanced integrations across your technology stack.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Unify fragmented systems seamlessly</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Enable real-time data synchronization</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Scale integrations as you grow</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8 space-y-4 gradient-border hover:shadow-xl hover:scale-105 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold group-hover:bg-gradient-to-r group-hover:from-[#388087] group-hover:to-[#6FB3B8] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  Enterprise AI Dashboards
                </h3>
                <p className="text-muted-foreground">
                  Design comprehensive dashboards that aggregate data from multiple sources and provide AI-powered insights for executive decision-making.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Consolidate business intelligence in one place</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Get actionable recommendations automatically</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#388087]" />
                    <span>Enable data-driven leadership</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Business Benefits Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Strengthen Your <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Business Processes</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Custom solutions deliver unique advantages that generic software simply can't match
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Perfect Fit</h3>
                <p className="text-muted-foreground">
                  Solutions built specifically for your workflows, processes, and business rules—no compromises or workarounds required.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Competitive Edge</h3>
                <p className="text-muted-foreground">
                  Proprietary technology that competitors can't replicate, creating sustainable differentiation in your market.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Scalability</h3>
                <p className="text-muted-foreground">
                  Architecture designed to grow with your business, supporting increased users, data volumes, and functionality over time.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Full Control</h3>
                <p className="text-muted-foreground">
                  Own your intellectual property and control every aspect of your solution, from features to security to deployment.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Seamless Integration</h3>
                <p className="text-muted-foreground">
                  Connect effortlessly with existing systems, databases, and tools without forcing process changes or data migrations.
                </p>
              </div>

              <div className="space-y-4 group hover:translate-y-[-8px] transition-transform duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Innovation Enabler</h3>
                <p className="text-muted-foreground">
                  Implement cutting-edge ideas and unique features that would be impossible with off-the-shelf software.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary/30 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#388087]/10 via-transparent to-[#6FB3B8]/10" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">
                Ready to Build <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Your Solution?</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Let's discuss your unique needs and create a custom AI solution that gives you a lasting competitive advantage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="cursor-pointer">
                  <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#388087] to-[#6FB3B8] hover:from-[#2d6b72] hover:to-[#5a9fa4] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    Schedule a Consultation
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}