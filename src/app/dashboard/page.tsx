import type { CSSProperties } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { OnboardingBanner } from '@/components/OnboardingBanner';
import {
  Activity,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Globe,
  Mail,
  MessageSquare,
  MonitorPlay,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
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

  const statusCards = [
    {
      title: 'Intake brief',
      eyebrow: 'Setup foundation',
      icon: ClipboardList,
      status: userData?.intakeCompleted ? 'Received' : 'Action needed',
      tone: userData?.intakeCompleted ? 'ready' : 'attention',
      description: userData?.intakeCompleted
        ? 'Your configuration brief is in review with our implementation team.'
        : 'Tell us how your business works so we can configure every AI workflow.',
      href: userData?.intakeCompleted ? '/dashboard/intake' : '/intake',
      cta: userData?.intakeCompleted ? 'View submission' : 'Complete intake',
    },
    {
      title: 'Subscription',
      eyebrow: 'Account access',
      icon: CreditCard,
      status: 'Pending setup',
      tone: 'neutral',
      description: 'Billing activates after your implementation scope is reviewed and confirmed.',
      href: '/dashboard/subscription',
      cta: 'View plan',
    },
    {
      title: 'AI suite',
      eyebrow: 'Implementation',
      icon: Zap,
      status: 'Configuring',
      tone: 'progress',
      description: 'Your channels move through configuration, testing, and refinement before launch.',
      href: '/dashboard/subscription',
      cta: 'Explore services',
    },
    {
      title: 'Client support',
      eyebrow: 'Ephesus team',
      icon: MessageSquare,
      status: 'Available',
      tone: 'ready',
      description: 'Get direct help with onboarding, integrations, or your active AI systems.',
      href: '/dashboard/support',
      cta: 'Contact support',
    },
  ];

  const services = [
    { icon: Phone, label: 'AI Voice Receptionist', desc: 'Smart call handling and routing', href: '/dashboard/receptionist', status: 'Workspace ready' },
    { icon: Mail, label: 'AI Email Automation', desc: 'Intelligent email workflows', href: '/services/ai-email-automation', status: 'In configuration' },
    { icon: Globe, label: 'AI Website Chatbot', desc: 'Always-on visitor engagement', href: '/services/ai-website-chatbot', status: 'In configuration' },
  ];

  const steps = [
    { done: !!userData?.intakeCompleted, text: 'Complete your client intake form', sub: 'Business goals, routing, and technical details' },
    { done: false, text: 'Ephesus configures your AI system', sub: 'Custom build, integrations, and internal testing' },
    { done: false, text: 'Attend your refinement session', sub: 'Review conversations and fine-tune behavior' },
    { done: false, text: 'Go live with your AI suite', sub: 'Calls, emails, and chats handled automatically' },
  ];
  const completedSteps = steps.filter(step => step.done).length;
  const progress = Math.round((completedSteps / steps.length) * 100);

  return (
    <div className="dashboard-overview space-y-5 lg:space-y-6">
      {showOnboarding && <OnboardingBanner intakeCompleted={!!userData?.intakeCompleted} />}

      <section className="dashboard-command-hero">
        <div className="dashboard-command-hero__mesh" aria-hidden="true" />
        <div className="dashboard-command-hero__copy">
          <p className="dashboard-kicker"><Sparkles /> Ephesus command center</p>
          <h1 className="dashboard-display">
            Welcome back, <em>{firstName}.</em>
          </h1>
          <p>
            One workspace for your implementation, AI channels, and the team helping you bring them online.
          </p>
          <div className="dashboard-command-hero__actions">
            <Link href={userData?.intakeCompleted ? '/dashboard/receptionist' : '/intake'} className="dashboard-primary-action">
              {userData?.intakeCompleted ? 'Open AI Receptionist' : 'Continue setup'} <ArrowRight />
            </Link>
            <Link href="/dashboard/support" className="dashboard-secondary-action">Talk to your Ephesus team</Link>
          </div>
        </div>

        <div className="dashboard-readiness-card">
          <div className="dashboard-readiness-card__topline">
            <span>Workspace readiness</span>
            <span className="dashboard-operational"><i /> Systems online</span>
          </div>
          <div className="dashboard-readiness-card__body">
            <div
              className="dashboard-progress-ring"
              style={{ '--dashboard-progress': `${progress * 3.6}deg` } as CSSProperties}
            >
              <div><strong>{progress}%</strong><span>complete</span></div>
            </div>
            <div className="dashboard-readiness-card__details">
              <p><strong>{completedSteps} of {steps.length}</strong> launch milestones complete</p>
              <span>{completedSteps === 0 ? 'Your intake brief is the first step.' : 'Your implementation is moving forward.'}</span>
              <div><Activity /> Implementation tracker active</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="dashboard-section-heading">
          <div>
            <p className="dashboard-kicker">Give it a try</p>
            <h2>Interactive demos</h2>
          </div>
          <span>Client portal demos</span>
        </div>
        <div className="dashboard-status-grid">
          <Link href="/dashboard/demo" className="dashboard-status-card" data-tone="progress">
            <div className="dashboard-status-card__topline">
              <span className="dashboard-status-card__icon"><MonitorPlay /></span>
              <span className="dashboard-status-pill"><i /> Interactive</span>
            </div>
            <p className="dashboard-status-card__eyebrow">AI preview</p>
            <h3>AI inquiry handler</h3>
            <p>Generate a sample inbound conversation for any business description.</p>
            <span className="dashboard-status-card__cta">Try AI demo <ArrowRight /></span>
          </Link>

          <Link href="/dashboard/demo/salon-crm" className="dashboard-status-card" data-tone="ready">
            <div className="dashboard-status-card__topline">
              <span className="dashboard-status-card__icon"><CalendarDays /></span>
              <span className="dashboard-status-pill"><i /> Hosted</span>
            </div>
            <p className="dashboard-status-card__eyebrow">Business app demo</p>
            <h3>Salon Biz CRM</h3>
            <p>Open the live CRM demo with bookings, clients, email, reports, and Google Calendar sync.</p>
            <span className="dashboard-status-card__cta">Open CRM demo <ArrowRight /></span>
          </Link>
        </div>
      </section>

      <section>
        <div className="dashboard-section-heading">
          <div>
            <p className="dashboard-kicker">Workspace pulse</p>
            <h2>Account status</h2>
          </div>
          <span>Updated in real time</span>
        </div>
        <div className="dashboard-status-grid">
          {statusCards.map(card => {
            const Icon = card.icon;
            return (
              <Link key={card.title} href={card.href} className="dashboard-status-card" data-tone={card.tone}>
                <div className="dashboard-status-card__topline">
                  <span className="dashboard-status-card__icon"><Icon /></span>
                  <span className="dashboard-status-pill"><i />{card.status}</span>
                </div>
                <p className="dashboard-status-card__eyebrow">{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className="dashboard-status-card__cta">{card.cta} <ArrowRight /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.85fr]">
        <div className="dashboard-panel dashboard-services-panel">
          <div className="dashboard-panel__header">
            <div>
              <p className="dashboard-kicker">Connected channels</p>
              <h2>Your AI services</h2>
            </div>
            <span className="dashboard-count-badge">3 services</span>
          </div>
          <div className="dashboard-service-list">
            {services.map(({ icon: Icon, label, desc, href, status }) => (
              <Link key={label} href={href} className="dashboard-service-row">
                <span className="dashboard-service-row__icon"><Icon /></span>
                <span className="min-w-0 flex-1">
                  <strong>{label}</strong>
                  <small>{desc}</small>
                </span>
                <span className="dashboard-service-row__status"><i />{status}</span>
                <ChevronRight />
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-panel dashboard-journey-panel">
          <div className="dashboard-panel__header">
            <div>
              <p className="dashboard-kicker">Launch sequence</p>
              <h2>Your onboarding journey</h2>
            </div>
          </div>
          <div className="dashboard-journey">
            {steps.map((step, index) => {
              const current = !step.done && index === steps.findIndex(item => !item.done);
              return (
                <div key={step.text} className="dashboard-journey__step" data-state={step.done ? 'done' : current ? 'current' : 'upcoming'}>
                  <div className="dashboard-journey__marker">
                    {step.done ? <Check /> : <span>{index + 1}</span>}
                  </div>
                  <div><strong>{step.text}</strong><p>{step.sub}</p></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="dashboard-trust-bar">
        <ShieldCheck />
        <span>Your workspace is encrypted and private. Ephesus AI follows security-first implementation practices.</span>
        <Link href="/privacy-policy">Privacy policy <ArrowRight /></Link>
      </footer>
    </div>
  );
}
