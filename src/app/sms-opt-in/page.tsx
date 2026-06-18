"use client";

import Link from "next/link";
import { useState } from "react";
import { MessageSquare, CheckCircle, ArrowRight, Shield, Bell, XCircle, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

function SmsOptInForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    transactionalConsent: false,
    marketingConsent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!form.phone.trim()) {
      setError("A phone number is required to opt in.");
      return;
    }
    if (!form.email.trim()) {
      setError("An email address is required.");
      return;
    }
    if (!form.transactionalConsent) {
      setError("You must consent to transactional messages to submit.");
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow-xl shadow-[#0D9488]/30">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold">You&apos;re opted in!</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Thanks, <strong>{form.firstName}</strong>. You&apos;ll receive a confirmation text shortly. Reply <strong>STOP</strong> at any time to unsubscribe.
        </p>
        <p className="text-xs text-muted-foreground/60">
          Message and data rates may apply.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="firstName">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="lastName">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="phone">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="(555) 000-0000"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition"
        />
        <p className="text-xs text-muted-foreground/60">
          Entering a phone number alone does not grant permission to send SMS messages. Consent must be collected using the checkboxes below.
        </p>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0D9488]/50 focus:border-[#0D9488] transition"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-border pt-4 space-y-4">
        {/* Transactional consent — required */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              name="transactionalConsent"
              checked={form.transactionalConsent}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded border border-border bg-background peer-checked:bg-[#0D9488] peer-checked:border-[#0D9488] transition flex items-center justify-center">
              {form.transactionalConsent && <CheckCircle className="w-3.5 h-3.5 text-white" />}
            </div>
          </div>
          <span className="text-sm text-muted-foreground leading-relaxed">
            I consent to receive transactional messages from <strong className="text-foreground">Ephesus AI Solutions</strong> at the phone number provided. These include appointment reminders, service updates, and inquiry follow-ups. Message frequency may vary. Message &amp; Data rates may apply. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.{" "}
            <span className="text-red-500 font-medium">(Required)</span>
          </span>
        </label>

        {/* Marketing consent — optional */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={form.marketingConsent}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded border border-border bg-background peer-checked:bg-[#0D9488] peer-checked:border-[#0D9488] transition flex items-center justify-center">
              {form.marketingConsent && <CheckCircle className="w-3.5 h-3.5 text-white" />}
            </div>
          </div>
          <span className="text-sm text-muted-foreground leading-relaxed">
            I consent to receive marketing and promotional messages from <strong className="text-foreground">Ephesus AI Solutions</strong> at the phone number provided. Message frequency may vary. Message &amp; Data rates may apply. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.{" "}
            <span className="text-muted-foreground/50">(Optional)</span>
          </span>
        </label>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 bg-red-500/5 border border-red-500/20 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#0D9488]/25 cursor-pointer"
      >
        <Send className="w-4 h-4" />
        Opt In to SMS Communications
      </button>

      {/* Legal links */}
      <p className="text-xs text-center text-muted-foreground/50">
        By submitting, you agree to our{" "}
        <Link href="/privacy-policy" className="underline hover:text-[#0D9488] transition-colors">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms-of-service" className="underline hover:text-[#0D9488] transition-colors">
          Terms of Service
        </Link>
        . SMS consent is not shared with third parties.
      </p>
    </form>
  );
}

export default function SmsOptInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">

        {/* Hero */}
        <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0D9488_0%,_transparent_60%)] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#2DD4BF_0%,_transparent_60%)] opacity-15" />
          <div className="container mx-auto px-6 relative text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow-2xl shadow-[#0D9488]/40 mb-8">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              SMS Communication{" "}
              <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                Opt-In
              </span>
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-lg">
              Stay connected with Ephesus AI Solutions via text message. Receive updates, appointment reminders, and helpful AI insights directly to your phone.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16 max-w-3xl">

          {/* Opt-In Form */}
          <Card className="p-8 mb-10 gradient-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center flex-shrink-0 shadow">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Sign Up for SMS Updates</h2>
                <p className="text-sm text-muted-foreground">Complete the form below to opt in</p>
              </div>
            </div>
            <SmsOptInForm />
          </Card>

          {/* Program Description */}
          <Card className="p-8 space-y-6 mb-8 gradient-border">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center flex-shrink-0 shadow">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Program Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By opting in to SMS communications from <strong>Ephesus AI Solutions</strong>, you agree to receive text messages related to:
                </p>
                <ul className="mt-4 space-y-2">
                  {[
                    "Appointment confirmations and reminders",
                    "Follow-up messages after consultations",
                    "Updates about your AI services and onboarding",
                    "Promotional offers and announcements (occasional)",
                    "Responses to inquiries submitted through our website",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Message Frequency & Charges */}
          <Card className="p-8 space-y-4 mb-8 gradient-border">
            <h2 className="text-xl font-bold">Message Frequency &amp; Charges</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Message Frequency",
                  value: "Message frequency varies. You may receive up to 4–8 messages per month depending on your service activity.",
                },
                {
                  label: "Message & Data Rates",
                  value: "Message and data rates may apply. Charges depend on your mobile carrier and plan.",
                },
              ].map(({ label, value }) => (
                <div key={label} className="p-4 rounded-xl bg-secondary/30 space-y-1">
                  <p className="text-sm font-semibold text-[#0D9488]">{label}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Stop & Help Instructions */}
          <Card className="p-8 space-y-4 mb-8 gradient-border">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center flex-shrink-0 shadow">
                <XCircle className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-4">
                <h2 className="text-xl font-bold">How to Opt Out &amp; Get Help</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 space-y-2">
                    <p className="text-sm font-bold text-red-500">To Stop SMS Messages</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Reply <strong>STOP</strong> to any message at any time. You will receive a confirmation and no further messages will be sent.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0D9488]/5 border border-[#0D9488]/20 space-y-2">
                    <p className="text-sm font-bold text-[#0D9488]">For Help or Support</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Reply <strong>HELP</strong> to any message or contact us directly at{" "}
                      <a href="mailto:support@ephesusai.com" className="text-[#0D9488] hover:underline">
                        support@ephesusai.com
                      </a>
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/70">
                  After texting STOP, you may still receive a final confirmation message. To re-subscribe, text START at any time.
                </p>
              </div>
            </div>
          </Card>

          {/* Privacy & Data */}
          <Card className="p-8 space-y-4 mb-8 gradient-border">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center flex-shrink-0 shadow">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold">Privacy &amp; Data Usage</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your phone number and personal information are collected solely for the purpose of delivering SMS communications you have opted into. We will never:
                </p>
                <ul className="space-y-2">
                  {[
                    "Sell or share your phone number with third parties for marketing purposes",
                    "Send messages unrelated to your relationship with Ephesus AI Solutions",
                    "Retain your data longer than necessary for our service obligations",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                  For full details on how we handle your data, please review our{" "}
                  <Link href="/privacy-policy" className="text-[#0D9488] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Card>

          {/* Supported Carriers */}
          <Card className="p-8 space-y-4 mb-8 gradient-border">
            <h2 className="text-xl font-bold">Supported Carriers</h2>
            <p className="text-sm text-muted-foreground">
              SMS service is available through all major U.S. carriers including AT&amp;T, Verizon, T-Mobile, Sprint, Boost Mobile, Cricket, US Cellular, and others. Carrier support may vary.
            </p>
          </Card>

          {/* Legal Footer */}
          <div className="text-center space-y-4 pt-4">
            <p className="text-xs text-muted-foreground/60 max-w-2xl mx-auto leading-relaxed">
              By opting into SMS communications from Ephesus AI Solutions, you acknowledge that you have read and agree to the terms outlined on this page. This service is intended for users in the United States. Standard message and data rates apply.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground/60">
              <Link href="/privacy-policy" className="hover:text-[#0D9488] transition-colors">Privacy Policy</Link>
              <span>·</span>
              <Link href="/sms-terms" className="hover:text-[#0D9488] transition-colors">SMS Terms</Link>
              <span>·</span>
              <Link href="/terms-of-service" className="hover:text-[#0D9488] transition-colors">Terms of Service</Link>
              <span>·</span>
              <a href="mailto:support@ephesusai.com" className="hover:text-[#0D9488] transition-colors">support@ephesusai.com</a>
            </div>
          </div>

        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#134E4A] to-[#0F172A] py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0D9488_0%,_transparent_70%)] opacity-10" />
          <div className="container mx-auto px-6 relative text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Questions About Our{" "}
              <span className="bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] bg-clip-text text-transparent">
                SMS Program?
              </span>
            </h2>
            <p className="text-white/60 max-w-lg mx-auto">
              Reach out to our team and we&apos;ll be happy to help.
            </p>
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#0D9488]/25 mt-2 cursor-pointer">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
