'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Plug, PlugZap, Loader2 } from 'lucide-react';

interface OutlookConnectButtonProps {
  isConnected: boolean;
  isExpired: boolean;
  fullWidth?: boolean;
}

export function OutlookConnectButton({ isConnected, isExpired, fullWidth }: OutlookConnectButtonProps) {
  const [disconnecting, setDisconnecting] = useState(false);

  const handleDisconnect = async () => {
    if (!confirm('Disconnect your Outlook account? Ephesus AI will no longer have access to your inbox.')) return;
    setDisconnecting(true);
    try {
      const res = await fetch('/api/integrations/outlook/disconnect', { method: 'POST' });
      if (!res.ok) throw new Error('Failed');
      window.location.reload();
    } catch {
      toast.error('Failed to disconnect. Please try again.');
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
      className={`gap-1.5 bg-[#0078D4] hover:bg-[#006CBE] text-white shadow-sm${fullWidth ? ' w-full justify-center' : ' flex-shrink-0'}`}
    >
      <a href="/api/integrations/outlook/connect">
        <PlugZap className="w-3.5 h-3.5" />
        {isExpired ? 'Reconnect' : 'Connect'}
      </a>
    </Button>
  );
}
