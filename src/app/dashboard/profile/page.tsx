import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ProfileForm } from '@/components/ProfileForm';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';
import { UserRound } from 'lucide-react';

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const [userData] = await db.select().from(userTable).where(eq(userTable.id, session.user.id));

  return (
    <div className="dashboard-route space-y-6">
      <DashboardPageHeader
        eyebrow="Account settings"
        title="Profile"
        description="Keep your contact details and company information current."
        icon={UserRound}
      />

      <ProfileForm
        initialData={{
          name: userData?.name || session.user.name || '',
          email: userData?.email || session.user.email || '',
          companyName: userData?.companyName || '',
          phone: userData?.phone || '',
        }}
      />
    </div>
  );
}
