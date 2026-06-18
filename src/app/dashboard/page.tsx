import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { OnboardingBanner } from '@/components/OnboardingBanner';
import {
  ClipboardList, CreditCard, Zap, MessageSquare,
  CheckCircle, Clock, ArrowRight, Phone, Mail, Globe,
  ChevronRight, Sparkles, Shield, Activity
} from 'lucide-react';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ onboarding?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const params = await searchParams;

  const [userData] = await db.select().from(userTable).where(eq(userTable.id, session.user.id));

  const showOnboarding =
    params.onboarding === 'true' ||
    (!userData?.intakeCompleted && !userData?.onboardingDismissed);

  const firstName = session.user.name?.split(' ')[0] || 'there';

  const STATUS_CARDS = [
    {
      title: 'Intake Form',
      icon: ClipboardList,
      status: userData?.intakeCompleted ? 'Complete' : 'Action needed',
      statusColor: userData?.intakeCompleted ? '#10b981' : '#f59e0b',
      dotColor: userData?.intakeCompleted ? '#10b981' : '#f59e0b',
      glowColor: userData?.intakeCompleted ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
      borderColor: userData?.intakeCompleted ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
      iconGradient: userData?.intakeCompleted ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #d97706, #f59e0b)',
      description: userData?.intakeCompleted
        ? 'Your configuration has been received and is being processed.'
        : 'Submit your intake form to begin the setup process.',
      href: userData?.intakeCompleted ? '/dashboard/intake' : '/intake',
      cta: userData?.intakeCompleted ? 'View status' : 'Complete now',
    },
    {
      title: 'Subscription',
      icon: CreditCard,
      status: 'Pending setup',
      statusColor: '#38bdf8',
      dotColor: '#38bdf8',
      glowColor: 'rgba(56,189,248,0.12)',
      borderColor: 'rgba(56,189,248,0.2)',
      iconGradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
      description: 'Your subscription will be fully activated after onboarding is complete.',
      href: '/dashboard/subscription',
      cta: 'View details',
    },
    {
      title: 'Active Services',
      icon: Zap,
      status: 'Configuring',
      statusColor: '#a78bfa',
      dotColor: '#a78bfa',
      glowColor: 'rgba(167,139,250,0.12)',
      borderColor: 'rgba(167,139,250,0.2)',
      iconGradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
      description: 'Your AI services are being configured after intake form completion.',
      href: '/dashboard/subscription',
      cta: 'Learn more',
    },
    {
      title: 'Support',
      icon: MessageSquare,
      status: 'Available 24/7',
      statusColor: '#2DD4BF',
      dotColor: '#2DD4BF',
      glowColor: 'rgba(45,212,191,0.12)',
      borderColor: 'rgba(45,212,191,0.2)',
      iconGradient: 'linear-gradient(135deg, #0D9488, #2DD4BF)',
      description: 'Our team is ready to help with any questions or configuration requests.',
      href: '/dashboard/support',
      cta: 'Get help',
    },
  ];

  const SERVICES = [
    { icon: Phone, label: 'AI Voice Receptionist', desc: 'Smart call handling & routing', href: '/services/ai-voice-receptionist', color: '#0D9488' },
    { icon: Mail, label: 'AI Email Automation', desc: 'Intelligent email workflows', href: '/services/ai-email-automation', color: '#6366f1' },
    { icon: Globe, label: 'AI Website Chatbot', desc: ' 24/7 visitor engagement', href: '/services/ai-website-chatbot', color: '#0ea5e9' },
  ];

  const STEPS = [
    { done: !!userData?.intakeCompleted, text: 'Complete your client intake form', sub: 'Tell us about your business and needs' },
    { done: false, text: 'Ephesus AI configures your AI system', sub: 'Custom setup and testing' },
    { done: false, text: 'Attend your refinement session', sub: 'Fine-tune everything together' },
    { done: false, text: 'Go live with your AI suite', sub: 'Calls, emails & chats handled automatically' },
  ];

  return (
    <div className="space-y-8">
      {showOnboarding && <OnboardingBanner intakeCompleted={!!userData?.intakeCompleted} />}

      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(13,148,136,0.12) 0%, rgba(45,212,191,0.06) 50%, rgba(6,13,24,0.8) 100%)',
          border: '1px solid rgba(13,148,136,0.2)',
          boxShadow: '0 0 40px rgba(13,148,136,0.08)',
        }}>
        {/* Background shimmer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)', filter: 'blur(30px)' }} />
        </div>

        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0D9488, #2DD4BF)', boxShadow: '0 0 10px rgba(13,148,136,0.5)' }}>
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(45,212,191,0.7)' }}>
                Client Dashboard
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Welcome back,{' '}
              <span style={{ background: 'linear-gradient(135deg, #0D9488, #2DD4BF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {firstName}
              </span>
            </h1>
            <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Here&apos;s an overview of your Ephesus AI account and services.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>

      {/* Status cards */}
      <div>
        <h2 className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Account Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STATUS_CARDS.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.title}
                className="relative rounded-2xl p-5 group transition-all duration-300 hover:translate-y-[-2px]"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: `1px solid ${card.borderColor}`,
                  boxShadow: `0 4px 24px ${card.glowColor}`,
                }}>
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: card.iconGradient, boxShadow: `0 4px 12px ${card.glowColor}` }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: card.dotColor }} />
                    <span className="text-xs font-semibold" style={{ color: card.statusColor }}>{card.status}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-white mb-1">{card.title}</h3>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{card.description}</p>

                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200"
                  style={{ color: card.statusColor }}
                >
                  {card.cta} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 rounded-2xl opacity-5 pointer-events-none"
                  style={{ background: card.iconGradient }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Services + Next Steps row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Services — 3 cols */}
        <div className="lg:col-span-3 rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0D9488, #2DD4BF)' }}>
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              Your AI Services
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', color: '#a78bfa' }}>
              3 services
            </span>
          </div>

          <div className="space-y-2">
            {SERVICES.map(({ icon: Icon, label, desc, href, color }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group hover:bg-white/5"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Next Steps — 2 cols */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h2 className="font-semibold text-white flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Activity className="w-3.5 h-3.5 text-white" />
            </div>
            Onboarding Progress
          </h2>

          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                {/* Timeline dot */}
                <div className="flex flex-col items-center gap-0 flex-shrink-0 mt-0.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? '' : i === STEPS.findIndex(s => !s.done) ? 'ring-2 ring-offset-2' : ''}`}
                    style={step.done ? {
                      background: 'linear-gradient(135deg, #059669, #10b981)',
                      boxShadow: '0 0 8px rgba(16,185,129,0.4)',
                    } : i === STEPS.findIndex(s => !s.done) ? {
                      background: 'rgba(13,148,136,0.15)',
                      border: '2px solid rgba(13,148,136,0.5)',
                      ringColor: 'rgba(13,148,136,0.2)',
                      ringOffsetColor: 'transparent',
                    } : {
                      background: 'rgba(255,255,255,0.06)',
                      border: '2px solid rgba(255,255,255,0.1)',
                    }}>
                    {step.done && <CheckCircle className="w-3 h-3 text-white" />}
                    {!step.done && i === STEPS.findIndex(s => !s.done) && (
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#0D9488' }} />
                    )}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px h-4 mt-1" style={{ background: step.done ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.08)' }} />
                  )}
                </div>

                <div className="pb-1">
                  <p className={`text-xs font-medium ${step.done ? 'line-through' : 'text-white'}`}
                    style={step.done ? { color: 'rgba(255,255,255,0.35)' } : {}}>
                    {step.text}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{step.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security / trust footer */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <Shield className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }} />
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Your data is encrypted and secure. Ephesus AI is SOC 2 aligned and HIPAA aware.
          <Link href="/privacy-policy" className="ml-1 underline hover:text-white/50 transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
