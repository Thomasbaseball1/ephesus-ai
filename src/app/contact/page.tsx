"use client";

import { useState } from "react";
import { Mail, Phone, Send, ArrowRight, ClipboardList, Calendar, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGradient from "@/components/CursorGradient";
import CalendlyButton from "@/components/CalendlyButton";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Failed to send message. Please try again.");
        return;
      }

      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <CursorGradient />
      <Header />
      
      <main className="marketing-page flex-1">

        {/* Schedule a Consultation — top section */}
        <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0D9488_0%,_transparent_60%)] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#2DD4BF_0%,_transparent_60%)] opacity-15" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <FadeIn delay={0} duration={500}>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm border border-white/20 mb-5">
                    <Calendar className="w-4 h-4 text-[#0D9488]" />
                    <span>Free Consultation</span>
                  </div>
                </FadeIn>
                <FadeIn delay={120} duration={600}>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Book a{" "}
                    <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                      Free Strategy Call
                    </span>
                  </h1>
                </FadeIn>
                <FadeIn delay={240} duration={600}>
                  <p className="text-lg text-white/70 max-w-2xl mx-auto">
                    In 30 minutes, we'll walk through your business, identify where AI can make the biggest impact, and show you exactly what Ephesus AI would look like for your team.
                  </p>
                </FadeIn>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* What to expect */}
                <div className="space-y-4">
                  <p className="text-white/60 text-sm uppercase tracking-widest font-semibold">What we'll cover</p>
                  <ul className="space-y-3">
                    {[
                      "A full audit of your current inbound channels",
                      "Where leads are slipping through the cracks",
                      "Which AI services fit your business best",
                      "Pricing, timeline, and what setup looks like",
                      "Live demo of AI handling real scenarios",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-white/40 text-xs mt-4">No sales pressure. No commitment required. Just a real conversation.</p>
                </div>

                {/* CTA card */}
                <Card className="p-8 bg-white/5 border-white/10 text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center mx-auto shadow-xl">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Schedule Your Call</h3>
                    <p className="text-white/50 text-sm">Pick a time that works for you — we'll do the rest.</p>
                  </div>
                  <div className="space-y-2 text-sm text-white/50">
                    <div className="flex items-center justify-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#0D9488]" /> 30 minutes</div>
                    <div className="flex items-center justify-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#0D9488]" /> Video or phone — your choice</div>
                    <div className="flex items-center justify-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-[#0D9488]" /> Completely free</div>
                  </div>
                  <CalendlyButton>
                    <Button size="lg" className="w-full gap-2 group bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25 hover:shadow-xl transition-all duration-300 cursor-pointer">
                      Book My Free Call
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CalendlyButton>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#388087]/10 via-transparent to-[#6FB3B8]/10 animate-pulse-slow" style={{ height: "140%" }} />

          <div className="container mx-auto px-6 py-16 md:py-24 relative">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Or Send Us a <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">Message</span>
              </h2>
              <p className="text-muted-foreground">
                Prefer to write it out? Fill in the form below and we'll get back to you within one business day.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
              {/* Contact Form */}
              <Card className="lg:col-span-2 p-8 gradient-border">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="Your Company Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      placeholder="Tell us about your project or inquiry..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full gap-2 group bg-gradient-to-r from-[#388087] to-[#6FB3B8] hover:from-[#2d6b72] hover:to-[#5a9fa4] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="p-6 space-y-6 gradient-border h-fit">
                  <h3 className="text-xl font-semibold">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Email</p>
                        <p className="text-sm text-muted-foreground">
                          support@ephesusai.com
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium mb-1">Phone</p>
                        <p className="text-sm text-muted-foreground">
                          518-732-1269
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Survey CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <Card className="max-w-3xl mx-auto p-8 md:p-12 text-center space-y-6 gradient-border bg-gradient-to-br from-[#388087]/5 to-[#6FB3B8]/5">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#388087] to-[#6FB3B8] flex items-center justify-center shadow-lg animate-float">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">We Value Your <span className="bg-gradient-to-r from-[#388087] to-[#6FB3B8] bg-clip-text text-transparent">Feedback</span></h2>
            <p className="text-lg text-muted-foreground">
              Help us serve you better by sharing your thoughts and experiences in our quick survey.
            </p>
            <Link href="/surveys" className="cursor-pointer">
              <Button size="lg" className="gap-2 group bg-gradient-to-r from-[#388087] to-[#6FB3B8] hover:from-[#2d6b72] hover:to-[#5a9fa4] text-white shadow-lg hover:shadow-xl transition-all duration-300">
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
