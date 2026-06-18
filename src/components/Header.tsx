"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LayoutDashboard, LogOut, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import CalendlyButton from "@/components/CalendlyButton";
import { useSession, signOut } from "@/lib/auth-client";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  // Close user menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
    setUserMenuOpen(false);
  };

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : session?.user?.email?.[0]?.toUpperCase() || '?';

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/demo", label: "Live Demo" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav className="mx-auto h-16 max-w-7xl rounded-2xl border border-white/[0.09] bg-[#070b0b]/80 px-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:px-5">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 leading-none" aria-label="Ephesus AI home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#5eead4]/25 bg-[#5eead4]/10 text-sm font-bold text-[#8ff5e3] transition-colors duration-200 group-hover:bg-[#5eead4]/15">
              E
            </span>
            <span className="flex flex-col">
              <span className="text-[15px] font-bold tracking-[0.17em] text-white">EPHESUS</span>
              <span className="mt-1 text-[8px] font-medium tracking-[0.3em] text-white/45">AI SOLUTIONS</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                  isActive(link.href) ? "bg-white/[0.07] text-white" : "text-white/55 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {session ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-white transition-colors hover:bg-white/[0.06]"
                  aria-expanded={userMenuOpen}
                  aria-label="Open account menu"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#5eead4] text-xs font-bold text-[#05201b]">
                    {initials}
                  </div>
                  <span className="max-w-[108px] truncate text-sm font-medium">
                    {session.user.name?.split(' ')[0] || session.user.email}
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-white/10 bg-[#0b1110] py-1 shadow-2xl">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-muted-foreground" /> Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary/50 transition-colors"
                    >
                      <User className="w-4 h-4 text-muted-foreground" /> Profile
                    </Link>
                    <hr className="my-1 border-border" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-3 py-2 text-sm w-full text-left hover:bg-secondary/50 transition-colors text-red-500 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex cursor-pointer items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-white/65 transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
              >
                Client Portal
              </Link>
            )}
            <CalendlyButton>
              <span className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#77ead6] px-4 py-2 text-sm font-semibold text-[#06211d] shadow-[0_8px_28px_rgba(94,234,212,0.16)] transition-colors duration-200 hover:bg-[#9af3e3]">
                Get Started
              </span>
            </CalendlyButton>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/[0.06] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-[#070b0b]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "bg-[#5eead4]/10 text-[#8ff5e3]"
                    : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                  className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-white/[0.05]"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full rounded-xl px-4 py-3 text-center text-sm font-medium text-white/65 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                Client Portal
              </Link>
            )}
            <CalendlyButton>
              <span
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 block w-full cursor-pointer rounded-xl bg-[#77ead6] px-4 py-3 text-center text-sm font-semibold text-[#06211d] transition-colors hover:bg-[#9af3e3]"
              >
                Get Started
              </span>
            </CalendlyButton>
          </div>
        </div>
      )}
    </header>
  );
}
