'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Instagram, Webhook, Save, ChevronDown, ChevronUp, Loader2, CheckCircle, Clock } from 'lucide-react';

interface Props {
  integrationId: number;
  userId: string;
  userName: string;
  userEmail: string;
  companyName: string;
  igUsername: string;
  igName: string | null;
  connectedAt: string;
  tokenExpiresAt: string | null;
  n8nWebhookUrl: string;
}

const IG_GRADIENT = 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)';

export function AdminInstagramRow(props: Props) {
  const [expanded, setExpanded] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(props.n8nWebhookUrl);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  const connectedDate = new Date(props.connectedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  const tokenExpiry = props.tokenExpiresAt ? new Date(props.tokenExpiresAt) : null;
  const tokenExpired = tokenExpiry ? tokenExpiry < new Date() : false;
  const tokenExpiringSoon = tokenExpiry && !tokenExpired
    ? (tokenExpiry.getTime() - Date.now()) < 7 * 24 * 60 * 60 * 1000
    : false;

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/instagram/${props.integrationId}/webhook`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ n8nWebhookUrl: webhookUrl.trim() }),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success('Instagram n8n webhook URL saved.');
    } catch {
      toast.error('Failed to save webhook URL.');
    } finally {
      setSaving(false);
    }
  };

  const handleTest = async () => {
    if (!webhookUrl) { toast.error('Enter an n8n webhook URL first.'); return; }
    setTesting(true);
    try {
      const res = await fetch(`/api/admin/instagram/${props.integrationId}/test`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed');
      toast.success('Test payload sent to n8n webhook!');
    } catch {
      toast.error('Failed to send test payload.');
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="gradient-border overflow-hidden">
      {/* Header row */}
      <div
        className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-secondary/20 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ background: IG_GRADIENT }}>
            {props.userName[0]?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium">{props.userName}</p>
              {props.companyName && (
                <span className="text-xs text-muted-foreground">{props.companyName}</span>
              )}
              <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(225,48,108,0.1)', color: '#f472b6', border: '1px solid rgba(225,48,108,0.2)' }}>
                <Instagram className="w-3 h-3" />
                @{props.igUsername}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{props.userEmail} · Connected {connectedDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {webhookUrl ? (
            <span className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Webhook className="w-3 h-3" /> n8n set
            </span>
          ) : (
            <span className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
              <Webhook className="w-3 h-3" /> No webhook
            </span>
          )}
          {tokenExpired ? (
            <span className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              Token expired
            </span>
          ) : tokenExpiringSoon ? (
            <span className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Expiring soon
            </span>
          ) : (
            <span className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle className="w-3 h-3" /> Token OK
            </span>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="border-t border-border px-5 py-4 space-y-5 bg-secondary/10">

          {/* n8n Webhook URL */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
              n8n Webhook URL (New Follower trigger)
            </label>
            <div className="flex gap-2">
              <Input
                value={webhookUrl}
                onChange={e => setWebhookUrl(e.target.value)}
                placeholder="https://your-n8n.app.n8n.cloud/webhook/..."
                className="font-mono text-xs"
              />
              <Button
                size="sm"
                onClick={handleSave}
                disabled={saving}
                className="gap-1.5 text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #E1306C, #833AB4)' }}
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleTest}
                disabled={testing || !webhookUrl}
                className="flex-shrink-0"
              >
                {testing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Test'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              When a new follower is detected, our app POSTs to this URL with follower data and the client&apos;s access token.
            </p>
          </div>

          {/* Token info */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Access Token
            </label>
            {tokenExpiry ? (
              <p className={`text-xs flex items-center gap-1.5 ${tokenExpired ? 'text-red-400' : tokenExpiringSoon ? 'text-amber-400' : 'text-emerald-400'}`}>
                <Clock className="w-3 h-3" />
                {tokenExpired ? 'Expired' : 'Expires'} {tokenExpiry.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                {tokenExpired && ' — client must reconnect their Instagram account'}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">No expiry info stored</p>
            )}
          </div>

          {/* Instagram account info */}
          <div className="pt-1 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Instagram account: <span className="text-foreground font-medium">@{props.igUsername}</span>
              {props.igName && ` · ${props.igName}`}
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
