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
import { Lock, Eye, EyeOff, Brain, CheckCircle } from 'lucide-react';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok || data?.error) {
        toast.error(data?.error || data?.message || 'Invalid or expired reset link.');
      } else {
        setDone(true);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <p className="text-white/60 text-sm">Invalid reset link. No token found.</p>
        <Link href="/forgot-password" className="text-[#2DD4BF] hover:text-white transition-colors text-sm font-medium">
          Request a new reset link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
        <p className="text-white/60 text-sm">Your password has been reset successfully.</p>
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] text-white shadow-lg shadow-[#0D9488]/25"
        >
          Sign in with new password
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="password" className="text-white/70 text-sm">New Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="At least 8 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={8}
            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-[#0D9488]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword" className="text-white/70 text-sm">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-[#0D9488]"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading || !password || !confirmPassword}
        className="w-full gap-2 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25 mt-2"
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <FadeIn duration={500} translateY={24}>
      <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Ephisus-logo-1761437704742.png?width=8000&height=8000&resize=contain"
            alt="Ephesus AI Solutions"
            width={480}
            height={120}
            priority
            className="h-36 w-auto mx-auto dark:invert"
          />
          <h1 className="text-xl font-bold text-white mt-4">Set new password</h1>
          <p className="text-white/50 text-sm mt-1">
            Enter your new password below.
          </p>
        </div>

        <Suspense fallback={null}>
          <ResetPasswordForm />
        </Suspense>

        <div className="flex items-center justify-center gap-1.5 mt-6 pt-5 border-t border-white/10">
          <Brain className="w-3.5 h-3.5 text-white/20" />
          <span className="text-xs text-white/20">Ephesus AI Solutions Client Portal</span>
        </div>
      </Card>
    </FadeIn>
  );
}
