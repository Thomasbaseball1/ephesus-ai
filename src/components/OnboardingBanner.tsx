'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ClipboardCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardIntakeForm } from '@/components/DashboardIntakeForm';

interface OnboardingBannerProps {
  intakeCompleted: boolean;
}

export function OnboardingBanner({ intakeCompleted }: OnboardingBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  if (dismissed || intakeCompleted) return null;

  const handleDismiss = async () => {
    setDismissed(true);
    try {
      await fetch('/api/user/dismiss-onboarding', { method: 'POST' });
      router.refresh();
    } catch {
      // silently fail — banner is already hidden locally
    }
  };

  return (
    <div className="dashboard-onboarding">
      <div className="dashboard-onboarding__banner">
        <div className="dashboard-onboarding__step">01</div>
        <div className="dashboard-onboarding__icon">
          <ClipboardCheck />
        </div>
        <div className="min-w-0 flex-1">
          <p className="dashboard-kicker">Recommended next action</p>
          <h2>Complete your client intake brief</h2>
          <p>
            Help us configure your AI system by sharing details about your business. It only takes a few minutes.
          </p>
          <div className="dashboard-onboarding__actions">
            <Button
              size="sm"
              onClick={() => setShowForm(s => !s)}
              className="dashboard-primary-action h-9 gap-2 rounded-xl px-4"
            >
              {showForm ? 'Hide Form' : 'Complete Intake Form'}
              <ArrowRight className={`transition-transform duration-200 ${showForm ? 'rotate-90' : ''}`} />
            </Button>
            <button
              onClick={handleDismiss}
              className="dashboard-onboarding__skip"
            >
              Skip for now
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="dashboard-onboarding__dismiss"
          aria-label="Dismiss"
        >
          <X />
        </button>
      </div>

      <div
        className="dashboard-onboarding__form"
        style={{
          display: 'grid',
          gridTemplateRows: showForm ? '1fr' : '0fr',
          transition: 'grid-template-rows 300ms ease-out',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="pt-5">
            <DashboardIntakeForm
              onClose={() => setShowForm(false)}
              onSubmitSuccess={() => setShowForm(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
