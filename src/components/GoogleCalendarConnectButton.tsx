'use client';

import { useState } from 'react';
import { CalendarPlus, Loader2, Plug, PlugZap } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface GoogleCalendarConnectButtonProps {
  integrationId?: number;
  isConnected: boolean;
  isExpired?: boolean;
  fullWidth?: boolean;
  returnTo?: string;
}

export function GoogleCalendarConnectButton({
  integrationId,
  isConnected,
  isExpired,
  fullWidth,
  returnTo = '/dashboard/integrations',
}: GoogleCalendarConnectButtonProps) {
  const [disconnecting, setDisconnecting] = useState(false);
  const connectHref = `/api/integrations/google-calendar/connect?returnTo=${encodeURIComponent(returnTo)}`;

  const handleDisconnect = async () => {
    if (!integrationId) return;
    if (!confirm('Disconnect this Google Calendar account? Ephesus AI will no longer be able to create calendar events for it.')) return;

    setDisconnecting(true);
    try {
      const res = await fetch('/api/integrations/google-calendar/disconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ integrationId }),
      });
      if (!res.ok) throw new Error('Failed');
      window.location.reload();
    } catch {
      toast.error('Failed to disconnect Google Calendar. Please try again.');
      setDisconnecting(false);
    }
  };

  if (isConnected && !isExpired) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleDisconnect}
        disabled={disconnecting}
        className={`text-red-500 border-red-500/30 hover:bg-red-500/10 hover:text-red-400${fullWidth ? ' w-full justify-center' : ' flex-shrink-0'}`}
      >
        {disconnecting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plug className="w-3.5 h-3.5" />}
        {disconnecting ? 'Disconnecting...' : 'Disconnect'}
      </Button>
    );
  }

  return (
    <Button
      asChild
      size="sm"
      className={`gap-1.5 bg-[#1A73E8] hover:bg-[#1765CC] text-white shadow-sm${fullWidth ? ' w-full justify-center' : ' flex-shrink-0'}`}
    >
      <a href={connectHref}>
        {isExpired ? <PlugZap className="w-3.5 h-3.5" /> : <CalendarPlus className="w-3.5 h-3.5" />}
        {isExpired ? 'Reconnect' : 'Connect'}
      </a>
    </Button>
  );
}
