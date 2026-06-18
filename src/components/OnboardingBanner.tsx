'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClipboardList, X, ArrowRight } from 'lucide-react';
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
    <div className="space-y-0">
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0D9488]/15 to-[#2DD4BF]/15 border border-[#0D9488]/30 p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center flex-shrink-0 shadow">
          <ClipboardList className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">Complete your client intake form</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Help us configure your AI system by sharing details about your business. It only takes a few minutes.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <Button
              size="sm"
              onClick={() => setShowForm(s => !s)}
              className="gap-1.5 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-sm"
            >
              {showForm ? 'Hide Form' : 'Complete Intake Form'}
              <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${showForm ? 'rotate-90' : ''}`} />
            </Button>
            <button
              onClick={handleDismiss}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Skip for now
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Inline form with slide-down animation */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: showForm ? '1fr' : '0fr',
          transition: 'grid-template-rows 400ms ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="pt-4">
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
