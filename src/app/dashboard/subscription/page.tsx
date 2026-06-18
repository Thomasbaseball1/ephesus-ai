import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CreditCard, Zap, Phone, Mail, Globe, ArrowRight, Star
} from 'lucide-react';

const SERVICES = [
  {
    icon: Phone,
    name: 'AI Voice Receptionist',
    description: 'Handles inbound calls, qualifies leads, and routes to the right department 24/7.',
  },
  {
    icon: Mail,
    name: 'AI Email Automation',
    description: 'Responds to emails, books appointments, and follows up automatically.',
  },
  {
    icon: Globe,
    name: 'AI Website Chatbot',
    description: 'Engages website visitors, answers FAQs, and captures leads in real time.',
  },
];

export default async function SubscriptionPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Subscription</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Your Ephesus AI plan and billing details.
        </p>
      </div>

      {/* Current plan */}
      <Card className="p-6 gradient-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold">Current Plan</h2>
              <p className="text-xs text-muted-foreground">Billing &amp; subscription status</p>
            </div>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-sky-400/10 text-sky-400 border border-sky-400/20">
            Pending Setup
          </span>
        </div>

        <div className="rounded-xl bg-secondary/30 p-4 text-sm text-muted-foreground">
          <p>
            Your subscription will be activated by the Ephesus AI team after your intake form is
            reviewed and your AI system is configured. You will receive an email confirmation once
            billing is set up.
          </p>
        </div>

        <div className="mt-4 flex gap-3">
          <Button asChild size="sm" className="gap-1.5 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-sm">
            <Link href="/dashboard/support">
              Contact Us to Get Started <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </Card>

      {/* Included services */}
      <Card className="p-6 gradient-border">
        <h2 className="font-semibold mb-1 flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#0D9488]" /> Services Included
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Your Ephesus AI package includes the following AI-powered services.
        </p>
        <div className="space-y-3">
          {SERVICES.map(({ icon: Icon, name, description }) => (
            <div key={name} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upgrade CTA */}
      <Card className="p-6 bg-gradient-to-br from-[#0D9488]/5 to-[#2DD4BF]/5 border-[#0D9488]/20">
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-[#0D9488] flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-semibold">Need to upgrade or modify your plan?</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Reach out to our team to discuss adding services, adjusting your package, or getting
              a custom quote for your business.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-3 gap-1.5">
              <Link href="/dashboard/support">
                Contact Ephesus AI <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
