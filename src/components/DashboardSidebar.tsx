'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from '@/lib/auth-client';
import {
  ArrowUpRight,
  ChevronRight,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Phone,
  Plug,
  User,
  X,
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    label: 'Command',
    items: [
      { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
      { href: '/dashboard/receptionist', label: 'AI Receptionist', icon: Phone, badge: 'Live' },
    ],
  },
  {
    label: 'Workspace',
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

function Brand() {
  return (
    <Link href="/dashboard" className="dashboard-brand" aria-label="Ephesus client portal home">
      <span className="dashboard-brand__mark">E</span>
      <span>
        <strong>EPHESUS</strong>
        <small>AI SOLUTIONS</small>
      </span>
    </Link>
  );
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
    ? user.name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2)
    : user.email[0].toUpperCase();

  return (
    <>
      <nav className="dashboard-nav">
        {NAV_SECTIONS.map(section => (
          <div key={section.label} className="dashboard-nav__section">
            <p>{section.label}</p>
            <div>
              {section.items.map(item => {
                const Icon = item.icon;
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className="dashboard-nav__item"
                    data-active={active ? 'true' : 'false'}
                  >
                    <span className="dashboard-nav__icon"><Icon /></span>
                    <span className="flex-1">{item.label}</span>
                    {'badge' in item && item.badge && (
                      <span className="dashboard-nav__badge"><i />{item.badge}</span>
                    )}
                    {active && <ChevronRight className="h-3.5 w-3.5" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="dashboard-sidebar__footer">
        <Link href="/" className="dashboard-view-site" onClick={onNavigate}>
          View public website <ArrowUpRight />
        </Link>
        <div className="dashboard-user-card">
          <div className="dashboard-user-card__avatar">
            {user.image ? (
              <Image src={user.image} alt={user.name} width={36} height={36} />
            ) : initials}
            <span />
          </div>
          <div className="min-w-0 flex-1">
            <p>{user.name}</p>
            <small>{user.email}</small>
          </div>
        </div>
        <button onClick={handleSignOut} className="dashboard-signout">
          <LogOut /> Sign out
        </button>
      </div>
    </>
  );
}

export function DashboardSidebar({ user }: { user: SidebarUser }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <aside className="dashboard-sidebar hidden lg:flex">
        <div className="dashboard-sidebar__header">
          <Brand />
          <div className="dashboard-workspace-label"><span /> Client workspace</div>
        </div>
        <NavContent user={user} />
      </aside>

      <div className="dashboard-mobile-bar lg:hidden">
        <Brand />
        <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </div>

      {mobileOpen && (
        <button
          className="dashboard-drawer-backdrop lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
      )}

      <aside className="dashboard-drawer lg:hidden" data-open={mobileOpen ? 'true' : 'false'}>
        <div className="dashboard-drawer__header">
          <Brand />
          <button onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button>
        </div>
        <NavContent user={user} onNavigate={() => setMobileOpen(false)} />
      </aside>
    </>
  );
}
