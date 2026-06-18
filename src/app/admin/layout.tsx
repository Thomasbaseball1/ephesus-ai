import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/lib/auth';
import { Shield } from 'lucide-react';

const ADMIN_EMAILS = new Set([
  'tmore.haller@yahoo.com',
  'thaller@algobull.ai',
  'sreid@algobull.ai',
  'deenwest@gmail.com',
]);

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) redirect('/login?redirect=/admin');
  if (!ADMIN_EMAILS.has(session.user.email)) redirect('/dashboard');

  return (
    <div className="min-h-screen bg-background">
      {/* Admin top bar */}
      <header className="border-b border-border bg-[#0F172A] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Ephisus-logo-1761437704742.png?width=8000&height=8000&resize=contain"
                alt="Ephesus AI"
                width={120}
                height={30}
                className="h-8 w-auto dark:invert"
              />
            </Link>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0D9488]/20 border border-[#0D9488]/30">
              <Shield className="w-3 h-3 text-[#2DD4BF]" />
              <span className="text-xs font-medium text-[#2DD4BF]">Admin Panel</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-xs text-white/50 hover:text-white transition-colors">
              ← Client Dashboard
            </Link>
            <span className="text-xs text-white/30">{session.user.email}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
