"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-6 h-20">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="block group leading-none">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Ephisus-logo-1761437704742.png?width=8000&height=8000&resize=contain"
              alt="Ephesus AI Solutions Logo"
              width={440}
              height={100}
              className="h-40 w-auto block transition-transform group-hover:scale-105 duration-300 dark:invert"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  isActive(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF]" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">
                    {session.user.name?.split(' ')[0] || session.user.email}
                  </span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-44 rounded-xl bg-background border border-border shadow-xl py-1 z-50">
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
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488]/10 transition-all duration-300 cursor-pointer"
              >
                Client Portal
              </Link>
            )}
            <CalendlyButton>
              <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer">
                Get Started
              </span>
            </CalendlyButton>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="Toggle menu"
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
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-gradient-to-r from-[#388087]/10 to-[#6FB3B8]/10 text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
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
                  className="flex items-center gap-2 py-3 px-4 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all duration-300"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 w-full py-3 px-4 rounded-lg text-sm font-medium text-red-500 hover:bg-secondary/50 transition-all duration-300 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 px-4 text-sm font-medium rounded-lg border border-[#0D9488] text-[#0D9488] hover:bg-[#0D9488]/10 transition-all duration-300"
              >
                Client Portal
              </Link>
            )}
            <CalendlyButton>
              <span
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 px-4 text-sm font-medium rounded-lg bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] text-white hover:opacity-90 transition-all duration-300 shadow-lg cursor-pointer"
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