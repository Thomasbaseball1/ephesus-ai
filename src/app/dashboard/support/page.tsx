import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Card } from '@/components/ui/card';
import { SupportForm } from '@/components/SupportForm';
import { MessageSquare, Mail, Clock } from 'lucide-react';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';

export default async function SupportPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  return (
    <div className="dashboard-route space-y-6">
      <DashboardPageHeader
        eyebrow="Client success"
        title="Support"
        description="Get direct help from the Ephesus team with setup, integrations, or active services."
        icon={MessageSquare}
        status="Team available"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: MessageSquare, label: 'Send a Message', desc: 'Submit a support request below' },
          { icon: Mail, label: 'Email Us', desc: 'support@ephesusai.com' },
          { icon: Clock, label: 'Response Time', desc: 'Less than 1 business day' },
        ].map(({ icon: Icon, label, desc }) => (
          <Card key={label} className="p-4 gradient-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow flex-shrink-0">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </Card>
        ))}
      </div>

      <SupportForm
        userEmail={session.user.email}
        userName={session.user.name || ''}
      />
    </div>
  );
}
