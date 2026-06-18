'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, ArrowLeft, Brain, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/custom/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log('[Forgot password] Response:', res.status, JSON.stringify(data));
      if (!res.ok || data?.error) {
        toast.error(data?.error || data?.message || JSON.stringify(data) || 'Something went wrong.');
      } else {
        setSent(true);
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeIn duration={500} translateY={24}>
      <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm">
        <div className="text-center mb-8">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Ephisus-logo-1761437704742.png?width=8000&height=8000&resize=contain"
            alt="Ephesus AI Solutions"
            width={480}
            height={120}
            className="h-36 w-auto mx-auto dark:invert"
          />
          <h1 className="text-xl font-bold text-white mt-4">
            {sent ? 'Check your email' : 'Reset your password'}
          </h1>
          <p className="text-white/50 text-sm mt-1">
            {sent
              ? 'If an account exists with that email, we\'ve sent a reset link.'
              : 'Enter your email and we\'ll send you a reset link.'}
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
            </div>
            <p className="text-sm text-white/60">
              Check your inbox (and spam folder) for the reset link. It expires in 1 hour.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm text-[#2DD4BF] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <Button
              type="submit"
              disabled={loading || !email}
              className="w-full gap-2 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-lg shadow-[#0D9488]/25 mt-2"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>
          </form>
        )}

        {!sent && (
          <p className="text-center text-sm text-white/40 mt-6">
            <Link href="/login" className="text-[#2DD4BF] hover:text-white transition-colors font-medium inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to login
            </Link>
          </p>
        )}

        <div className="flex items-center justify-center gap-1.5 mt-6 pt-5 border-t border-white/10">
          <Brain className="w-3.5 h-3.5 text-white/20" />
          <span className="text-xs text-white/20">Ephesus AI Solutions Client Portal</span>
        </div>
      </Card>
    </FadeIn>
  );
}