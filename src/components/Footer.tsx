import Link from "next/link";
import { Mail, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050807]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#5eead4]/25 bg-[#5eead4]/10 text-sm font-bold text-[#8ff5e3]">E</span>
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-bold tracking-[0.17em] text-white">EPHESUS</span>
                <span className="mt-1 text-[8px] tracking-[0.3em] text-white/40">AI SOLUTIONS</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/40">
              Your all-in-one AI communications suite &mdash; inbound calls, emails, website chat, and lead revival campaigns, all on autopilot.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/surveys" className="text-muted-foreground hover:text-foreground transition-colors">
                  Surveys
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-muted-foreground hover:text-foreground transition-colors">
                  Live AI Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/intake" className="text-muted-foreground hover:text-foreground transition-colors">
                  Client Intake Form
                </Link>
              </li>
              <li>
                <Link href="/services/ai-voice-receptionist" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Voice Receptionist
                </Link>
              </li>
              <li>
                <Link href="/services/ai-email-automation" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Email Automation
                </Link>
              </li>
              <li>
                <Link href="/services/ai-website-chatbot" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Website Chatbot
                </Link>
              </li>
              <li>
                <Link href="/services/ai-lead-revival" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI Lead Revival
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sms-opt-in" className="text-muted-foreground hover:text-foreground transition-colors">
                  SMS Opt-In
                </Link>
              </li>
              <li>
                <Link href="/sms-terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  SMS Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Connect</h3>
            <div className="flex gap-4">
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.08] pt-7 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Ephesus AI Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
