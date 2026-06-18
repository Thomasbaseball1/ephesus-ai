'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { DashboardIntakeForm } from '@/components/DashboardIntakeForm';

export function IntakePageClient() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-4">
      <Card className="p-6 gradient-border">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center shadow flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-lg">Form Not Yet Submitted</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Your intake form is required so our team can configure your AI system. Please complete
              it at your earliest convenience.
            </p>
            <Button
              size="sm"
              onClick={() => setShowForm(s => !s)}
              className="mt-4 gap-1.5 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-sm"
            >
              {showForm ? 'Hide Form' : 'Complete Intake Form'}
              <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-300 ${showForm ? 'rotate-90' : ''}`} />
            </Button>
          </div>
        </div>
      </Card>

      {/* Slide-down intake form */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: showForm ? '1fr' : '0fr',
          transition: 'grid-template-rows 400ms ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <DashboardIntakeForm
            onClose={() => setShowForm(false)}
            onSubmitSuccess={() => setShowForm(false)}
          />
        </div>
      </div>
    </div>
  );
}
