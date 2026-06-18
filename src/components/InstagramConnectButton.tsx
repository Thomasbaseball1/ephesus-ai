'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  isConnected: boolean;
  fullWidth?: boolean;
}

export function InstagramConnectButton({ isConnected, fullWidth }: Props) {
  const [disconnecting, setDisconnecting] = useState(false);

  const handleDisconnect = async () => {
    if (!confirm('Disconnect your Instagram account? The new-follower automation will stop working.')) return;
    setDisconnecting(true);
    try {
      await fetch('/api/integrations/instagram/disconnect', { method: 'POST' });
      window.location.href = '/dashboard/integrations?disconnected=instagram';
    } catch {
      setDisconnecting(false);
    }
  };

  if (isConnected) {
    return (
      <button
        onClick={handleDisconnect}
        disabled={disconnecting}
        className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50${fullWidth ? ' w-full' : ' flex-shrink-0'}`}
        style={{
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
          color: '#f87171',
        }}
      >
        {disconnecting && <Loader2 className="w-3 h-3 animate-spin" />}
        Disconnect
      </button>
    );
  }

  return (
    <a
      href="/api/integrations/instagram/connect"
      className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200${fullWidth ? ' w-full' : ' flex-shrink-0'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(225,48,108,0.2), rgba(193,53,132,0.15))',
        border: '1px solid rgba(225,48,108,0.35)',
        color: '#f472b6',
      }}
    >
      Connect Instagram
    </a>
  );
}
