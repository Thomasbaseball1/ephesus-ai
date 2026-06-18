import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { DashboardSidebar } from '@/components/DashboardSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  return (
    <div className="dashboard-shell min-h-screen">
      <div className="dashboard-shell__ambient" aria-hidden="true" />
      <DashboardSidebar user={session.user} />
      <div className="relative flex min-w-0 flex-1 flex-col lg:pl-[19rem]">
        <main className="dashboard-content mx-auto w-full max-w-[1420px] flex-1 px-4 pb-12 pt-20 sm:px-6 lg:px-8 lg:pt-6 xl:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
