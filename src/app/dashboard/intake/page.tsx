import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user as userTable, intakeSubmissions } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IntakePageClient } from '@/components/IntakePageClient';
import {
  ClipboardList, CheckCircle, Clock, ArrowRight,
} from 'lucide-react';

export default async function IntakePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const [userData] = await db.select().from(userTable).where(eq(userTable.id, session.user.id));

  let submission = null;
  if (userData?.intakeCompleted) {
    const [latest] = await db
      .select()
      .from(intakeSubmissions)
      .where(eq(intakeSubmissions.userId, session.user.id))
      .limit(1);
    submission = latest;
  }

  const submittedAt = submission?.createdAt
    ? new Date(submission.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Intake Form</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Your client configuration form for Ephesus AI setup.
        </p>
      </div>

      {userData?.intakeCompleted ? (
        <Card className="p-6 gradient-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">Form Submitted</h2>
              {submittedAt && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  Submitted on {submittedAt}
                </p>
              )}
              <p className="text-sm text-muted-foreground mt-3">
                Our team has received your intake form and is working on configuring your AI system.
                You&apos;ll be contacted once your setup is ready for review.
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <IntakePageClient />
      )}

      {/* What happens next */}
      <Card className="p-6 bg-gradient-to-br from-[#0D9488]/5 to-[#2DD4BF]/5 border-[#0D9488]/20">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0D9488]" /> What happens after submission?
        </h2>
        <ol className="space-y-3">
          {[
            'Ephesus AI reviews your intake form (less than 1 business day)',
            'Our team configures and tests your AI system',
            'You attend a testing & refinement session with our team',
            'Your AI system goes live — handling calls, emails & chats',
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </Card>

      <Card className="p-6 gradient-border">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow flex-shrink-0">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold">Questions about the intake form?</h2>
            <p className="text-sm text-muted-foreground mt-1">
              If you need help filling out your intake form or have questions about any section,
              our support team is happy to assist.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-3 gap-1.5">
              <Link href="/dashboard/support">
                Contact Support <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
