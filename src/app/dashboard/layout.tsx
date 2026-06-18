import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { DashboardSidebar } from '@/components/DashboardSidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen flex" style={{ background: 'linear-gradient(135deg, #060d18 0%, #080f1d 50%, #060d18 100%)' }}>
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-64 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        {/* Dot grid overlay */}
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
      </div>

      <DashboardSidebar user={session.user} />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64 relative">
        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full mx-auto pt-20 md:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
