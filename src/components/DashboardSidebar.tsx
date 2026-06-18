'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { signOut } from '@/lib/auth-client';
import {
  LayoutDashboard, ClipboardList, CreditCard, User, MessageSquare,
  LogOut, Plug, Phone, ChevronRight, Sparkles, Menu, X
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
      { href: '/dashboard/receptionist', label: 'AI Receptionist', icon: Phone, badge: 'Live' },
    ],
  },
  {
    label: 'Account',
    items: [
      { href: '/dashboard/intake', label: 'Intake Form', icon: ClipboardList },
      { href: '/dashboard/subscription', label: 'Subscription', icon: CreditCard },
      { href: '/dashboard/integrations', label: 'Integrations', icon: Plug },
      { href: '/dashboard/profile', label: 'Profile', icon: User },
      { href: '/dashboard/support', label: 'Support', icon: MessageSquare },
    ],
  },
];

interface SidebarUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

function NavContent({ user, onNavigate }: { user: SidebarUser; onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (item: { href: string; exact?: boolean }) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email[0].toUpperCase();

  return (
    <>
      {/* Navigation */}
      <nav className="flex-1 px-3 pb-2 overflow-y-auto space-y-5">
        {NAV_SECTIONS.map(section => (
          <div key={section.label}>
            <p className="px-3 mb-1.5 text-[10px] font-bold tracking-widest uppercase"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map(item => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      active ? 'text-white' : 'text-white/40 hover:text-white/80'
                    }`}
                    style={active ? {
                      background: 'linear-gradient(135deg, rgba(13,148,136,0.25) 0%, rgba(45,212,191,0.1) 100%)',
                      border: '1px solid rgba(13,148,136,0.3)',
                      boxShadow: '0 0 12px rgba(13,148,136,0.15)',
                    } : {
                      background: 'transparent',
                      border: '1px solid transparent',
                    }}
                  >
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                        style={{ background: 'linear-gradient(180deg, #0D9488, #2DD4BF)' }} />
                    )}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      active ? '' : 'group-hover:bg-white/5'
                    }`}
                      style={active ? {
                        background: 'linear-gradient(135deg, #0D9488, #2DD4BF)',
                        boxShadow: '0 2px 8px rgba(13,148,136,0.4)',
                      } : {}}>
                      <Icon className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-current'}`} />
                    </div>
                    <span className="flex-1">{item.label}</span>
                    {'badge' in item && item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wide"
                        style={{
                          background: 'rgba(16,185,129,0.15)',
                          border: '1px solid rgba(16,185,129,0.3)',
                          color: '#10b981',
                        }}>
                        {item.badge}
                      </span>
                    )}
                    {active && <ChevronRight className="w-3 h-3 text-teal-400 flex-shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User section */}
      <div className="px-3 pb-4 pt-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1"
          style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0D9488, #2DD4BF)', boxShadow: '0 0 10px rgba(13,148,136,0.4)' }}>
              {user.image ? (
                <Image src={user.image} alt={user.name} width={32} height={32} className="rounded-full" />
              ) : (
                initials
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: '#10b981', borderColor: '#080f1a' }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate">{user.name}</p>
            <p className="text-[10px] truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-xl text-xs transition-all duration-200 cursor-pointer hover:bg-red-500/10 hover:text-red-400"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <LogOut className="w-3.5 h-3.5 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </>
  );
}

export function DashboardSidebar({ user }: { user: SidebarUser }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on route change
  const pathname = usePathname();
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const sidebarBg = {
    background: 'linear-gradient(180deg, #080f1a 0%, #0a1628 40%, #0b1e2d 100%)',
  };

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col z-30 overflow-hidden"
        style={sidebarBg}>
        {/* Ambient glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        {/* Right edge border */}
        <div className="absolute inset-y-0 right-0 w-px"
          style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(13,148,136,0.3) 30%, rgba(45,212,191,0.15) 60%, transparent 100%)' }} />

        {/* Logo */}
        <div className="relative px-5 pt-5 pb-4">
          <Link href="/" className="block">
            <div className="relative h-12 w-full">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Ephisus-logo-1761437704742.png?width=8000&height=8000&resize=contain"
                alt="Ephesus AI Solutions"
                fill
                className="object-contain object-left dark:invert"
              />
            </div>
          </Link>
          <div className="mt-3 flex items-center gap-1.5 px-2 py-1 rounded-md w-fit"
            style={{ background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.2)' }}>
            <Sparkles className="w-3 h-3 text-teal-400" />
            <span className="text-[10px] font-semibold tracking-widest uppercase text-teal-400">Client Portal</span>
          </div>
        </div>

        <NavContent user={user} />

        {/* Bottom ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-32 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.08) 0%, transparent 70%)', filter: 'blur(16px)' }} />
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
        style={{ background: 'rgba(8,15,26,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/">
          <div className="relative h-8 w-32">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Ephisus-logo-1761437704742.png?width=8000&height=8000&resize=contain"
              alt="Ephesus AI"
              fill
              className="object-contain object-left dark:invert"
            />
          </div>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ── Mobile drawer backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-50"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div
        className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col overflow-hidden transition-transform duration-300 ease-out"
        style={{
          ...sidebarBg,
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-teal-400">Client Portal</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <NavContent user={user} onNavigate={() => setMobileOpen(false)} />
      </div>
    </>
  );
}
