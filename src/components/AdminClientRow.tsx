'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Mail, CheckCircle, AlertCircle, Clock, Building2,
  Webhook, Save, RefreshCw, ChevronDown, ChevronUp, Loader2
} from 'lucide-react';
import { AdminVoiceAgentPanel } from '@/components/AdminVoiceAgentPanel';

interface AdminClientRowProps {
  integrationId: number;
  userId: string;
  userName: string;
  userEmail: string;
  companyName: string;
  outlookEmail: string;
  displayName: string;
  connectedAt: string;
  n8nWebhookUrl: string;
  graphSubscriptionId: string;
  graphSubscriptionExpiry: string;
  tokenExpiresAt: number;
  intakeCompleted: boolean;
}

export function AdminClientRow(props: AdminClientRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(props.n8nWebhookUrl);
  const [saving, setSaving] = useState(false);
  const [renewing, setRenewing] = useState(false);
  const [testing, setTesting] = useState(false);

  const tokenExpired = props.tokenExpiresAt < Math.floor(Date.now() / 1000);
  const subExpiry = props.graphSubscriptionExpiry ? new Date(props.graphSubscriptionExpiry) : null;
  const subExpired = subExpiry ? subExpiry < new Date() : true;
  const hasSubscription = !!props.graphSubscriptionId && !subExpired;

  const connectedDate = new Date(props.connectedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  const handleSaveWebhook = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/integrations/${props.integrationId}/webhook`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ n8nWebhookUrl: webhookUrl.trim() }),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success('N8N webhook URL saved.');
    } catch {
      toast.error('Failed to save webhook URL.');
    } finally {
      setSaving(false);
    }
  };

  const handleRenewSubscription = async () => {
    setRenewing(true);
    try {
      const res = await fetch(`/api/admin/integrations/${props.integrationId}/subscribe`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      toast.success('Graph subscription renewed. Emails will now trigger N8N.');
      window.location.reload();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to create subscription.');
    } finally {
      setRenewing(false);
    }
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) { toast.error('Enter an N8N webhook URL first.'); return; }
    setTesting(true);
    try {
      const res = await fetch(`/api/admin/integrations/${props.integrationId}/test`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed');
      toast.success('Test payload sent to N8N webhook!');
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
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {props.userName[0]?.toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium">{props.userName}</p>
              {props.companyName && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Building2 className="w-3 h-3" />{props.companyName}
                </span>
              )}
              {props.intakeCompleted && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Intake done
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-xs text-muted-foreground">{props.userEmail}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Mail className="w-3 h-3" />{props.outlookEmail}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Status badges */}
          {hasSubscription ? (
            <span className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle className="w-3 h-3" /> Live
            </span>
          ) : (
            <span className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertCircle className="w-3 h-3" /> No subscription
            </span>
          )}
          {webhookUrl ? (
            <span className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Webhook className="w-3 h-3" /> N8N set
            </span>
          ) : (
            <span className="hidden sm:flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
              <Webhook className="w-3 h-3" /> No webhook
            </span>
          )}
          {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-border px-5 py-4 space-y-5 bg-secondary/10">
          {/* N8N Webhook URL */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
              N8N Webhook URL
            </label>
            <div className="flex gap-2">
              <Input
                value={webhookUrl}
                onChange={e => setWebhookUrl(e.target.value)}
                placeholder="https://algobullai.app.n8n.cloud/webhook/..."
                className="font-mono text-xs"
              />
              <Button
                size="sm"
                onClick={handleSaveWebhook}
                disabled={saving}
                className="gap-1.5 bg-gradient-to-r from-[#0D9488] to-[#2DD4BF] hover:opacity-90 text-white flex-shrink-0"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleTestWebhook}
                disabled={testing || !webhookUrl}
                className="flex-shrink-0 gap-1.5"
              >
                {testing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Test'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Paste the webhook URL from the Webhook trigger node in this client&apos;s N8N workflow.
            </p>
          </div>

          {/* Graph Subscription */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Microsoft Graph Subscription
              </label>
              {hasSubscription ? (
                <div className="space-y-0.5">
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Active — inbox is being monitored
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Expires {subExpiry?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">{props.graphSubscriptionId}</p>
                </div>
              ) : (
                <p className="text-xs text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {props.graphSubscriptionId ? 'Subscription expired — renew to resume monitoring' : 'No subscription — inbox is not being monitored'}
                </p>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRenewSubscription}
              disabled={renewing}
              className="flex-shrink-0 gap-1.5"
            >
              {renewing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              {hasSubscription ? 'Renew' : 'Activate'}
            </Button>
          </div>

          {/* Voice Agent */}
          <div className="pt-1 border-t border-border">
            <AdminVoiceAgentPanel userId={props.userId} userName={props.userName} />
          </div>

          {/* Meta */}
          <p className="text-xs text-muted-foreground">
            Connected {connectedDate} · {props.displayName || props.outlookEmail}
            {tokenExpired && <span className="text-amber-400 ml-2">· Access token expired (client must reconnect)</span>}
          </p>
        </div>
      )}
    </Card>
  );
}
