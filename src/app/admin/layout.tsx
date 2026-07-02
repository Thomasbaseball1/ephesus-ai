import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { isAdminEmail } from '@/lib/admin-access';
import { ArrowLeft, LockKeyhole, MonitorPlay, ShieldCheck } from 'lucide-react';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect('/login?redirect=/admin');
  if (!isAdminEmail(session.user.email)) redirect('/dashboard');

  return (
    <div className="admin-shell min-h-screen">
      <div className="admin-shell__ambient" aria-hidden="true" />
      <header className="admin-topbar">
        <div className="admin-topbar__brand-group">
          <Link href="/admin" className="admin-brand" aria-label="Ephesus admin home">
            <span className="admin-brand__mark">E</span>
            <span><strong>EPHESUS</strong><small>AI SOLUTIONS</small></span>
          </Link>
          <span className="admin-topbar__divider" />
          <span className="admin-secure-badge"><ShieldCheck /> Private admin console</span>
        </div>

        <div className="admin-topbar__account">
          <span><LockKeyhole /> {session.user.email}</span>
          <Link href="/admin/demo"><MonitorPlay /> Demo</Link>
          <Link href="/dashboard"><ArrowLeft /> Client dashboard</Link>
        </div>
      </header>

      <main className="admin-content mx-auto w-full max-w-[1500px] px-4 pb-14 pt-24 sm:px-6 lg:px-10 lg:pt-28">
        {children}
      </main>
    </div>
  );
}
