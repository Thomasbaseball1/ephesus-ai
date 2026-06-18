'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, Lock, LogIn, Brain } from 'lucide-react';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function LoginForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/sign-in/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await res.json()
        : null;

      if (!res.ok || data?.code || data?.error) {
        const fallbackMessage = res.status >= 500
          ? 'Sign in is temporarily unavailable. Please try again shortly.'
          : 'Invalid email or password.';
        toast.error(data?.message || fallbackMessage);
      } else {
        window.location.href = redirect;
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeIn duration={500} translateY={24}>
    <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm">
      <div className="text-center mb-8">
        <Link href="/" className="inline-block">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Ephisus-logo-1761437704742.png?width=8000&height=8000&resize=contain"
            alt="Ephesus AI Solutions"
            width={480}
            height={120}
            className="h-44 w-auto mx-auto dark:invert"
          />
        </Link>
        <h1 className="text-2xl font-bold text-white mt-4">Welcome back</h1>
        <p className="text-white/50 text-sm mt-1">Sign in to your client portal</p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full gap-3 bg-white hover:bg-white/90 text-gray-700 border-white/20 mb-4 cursor-pointer"
        onClick={() => toast.info('Google login coming soon. Please use email & password for now.')}
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-transparent text-white/40">or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-white/70 text-sm">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-[#0D9488]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-white/70 text-sm">Password</Label>
            <Link href="/forgot-password" className="text-xs text-[#2DD4BF] hover:text-white transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-[#0D9488]"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full gap-2 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25 mt-2"
        >
          <LogIn className="w-4 h-4" />
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <p className="text-center text-sm text-white/40 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-[#2DD4BF] hover:text-white transition-colors font-medium">
          Create one
        </Link>
      </p>

      <div className="flex items-center justify-center gap-1.5 mt-6 pt-5 border-t border-white/10">
        <Brain className="w-3.5 h-3.5 text-white/20" />
        <span className="text-xs text-white/20">Ephesus AI Solutions Client Portal</span>
      </div>
    </Card>
    </FadeIn>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
