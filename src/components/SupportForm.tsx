'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send, CheckCircle } from 'lucide-react';

interface SupportFormProps {
  userEmail: string;
  userName: string;
}

export function SupportForm({ userEmail, userName }: SupportFormProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subject.trim(), message: message.trim(), userEmail, userName }),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSent(true);
    } catch {
      toast.error('Failed to send message. Please try again or email us directly.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <Card className="p-8 gradient-border text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center shadow mx-auto mb-4">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
        <h2 className="font-semibold text-lg">Message Sent!</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
          Your message has been sent to the Ephesus AI team. We&apos;ll get back to you within 1–2 business days.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => { setSent(false); setSubject(''); setMessage(''); }}
        >
          Send Another Message
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 gradient-border max-w-xl">
      <h2 className="font-semibold mb-4">Send a Message</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="subject" className="text-sm">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="e.g. Question about my intake form"
            required
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-sm">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Describe your question or issue..."
            rows={5}
            required
            className="resize-none"
          />
        </div>

        <Button
          type="submit"
          disabled={sending}
          className="gap-2 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white shadow-sm"
        >
          <Send className="w-4 h-4" />
          {sending ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Card>
  );
}
