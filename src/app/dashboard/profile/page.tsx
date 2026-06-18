import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { user as userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ProfileForm } from '@/components/ProfileForm';

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const [userData] = await db.select().from(userTable).where(eq(userTable.id, session.user.id));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your account information.
        </p>
      </div>

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
