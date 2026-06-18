import Link from "next/link";
import { Brain, Mail, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              <span className="font-semibold">Ephesus AI Solutions</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your all-in-one AI communications suite — inbound calls, emails, website chat, and lead revival campaigns, all on autopilot.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
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
            <h3 className="font-semibold mb-4">Services</h3>
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
            <h3 className="font-semibold mb-4">Connect</h3>
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

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ephesus AI Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}