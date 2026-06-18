'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Phone, ChevronDown, CheckCircle, Loader2, RefreshCw, Trash2, Plus
} from 'lucide-react';

interface Assistant {
  id: string;
  name: string | null;
  createdAt: string;
  model?: { provider?: string; model?: string };
  voice?: { provider?: string; voiceId?: string };
}

interface Assignment {
  id: number;
  assistantId: string;
  assistantName: string | null;
  label: string | null;
  isActive: boolean;
  assignedAt: string;
  assignedBy: string | null;
  lastSyncedAt: string | null;
}

interface Props {
  userId: string;
  userName: string;
}

export function AdminVoiceAgentPanel({ userId, userName }: Props) {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loadingAssistants, setLoadingAssistants] = useState(false);
  const [loadingAssignments, setLoadingAssignments] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [label, setLabel] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [open, setOpen] = useState(false);

  const loadAssignments = async () => {
    setLoadingAssignments(true);
    try {
      const res = await fetch(`/api/admin/clients/${userId}/voice-agent`);
      if (res.ok) setAssignments(await res.json());
    } finally {
      setLoadingAssignments(false);
    }
  };

  const loadAssistants = async () => {
    setLoadingAssistants(true);
    try {
      const res = await fetch('/api/admin/voice-agents');
      if (res.ok) setAssistants(await res.json());
      else toast.error('Failed to load assistants — check VAPI_PRIVATE_KEY');
    } finally {
      setLoadingAssistants(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (open) loadAssistants();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleAssign = async () => {
    if (!selectedId) { toast.error('Select an assistant first.'); return; }
    setAssigning(true);
    try {
      const chosen = assistants.find(a => a.id === selectedId);
      const res = await fetch(`/api/admin/clients/${userId}/voice-agent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistantId: selectedId,
          assistantName: chosen?.name || selectedId,
          label: label.trim() || chosen?.name || 'AI Receptionist',
        }),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success(`AI Receptionist assigned to ${userName}`);
      setSelectedId('');
      setLabel('');
      loadAssignments();
    } catch {
      toast.error('Failed to assign assistant.');
    } finally {
      setAssigning(false);
    }
  };

  const handleRemove = async (assignmentId: number) => {
    try {
      const res = await fetch(`/api/admin/clients/${userId}/voice-agent`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignmentId }),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success('Assignment removed.');
      loadAssignments();
    } catch {
      toast.error('Failed to remove assignment.');
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch(`/api/admin/clients/${userId}/voice-agent/sync`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sync failed');
      toast.success(`Synced ${data.synced} call record${data.synced !== 1 ? 's' : ''} for ${userName}`);
      loadAssignments();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Sync failed');
    } finally {
      setSyncing(false);
    }
  };

  const activeAssignments = assignments.filter(a => a.isActive);

  return (
    <div className="admin-voice-panel">
      <label className="admin-field-label">
        AI Receptionist
      </label>

      {/* Active assignments */}
      {loadingAssignments ? (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Loader2 className="w-3 h-3 animate-spin" /> Loading...</p>
      ) : activeAssignments.length > 0 ? (
        <div className="space-y-2 mb-3">
          {activeAssignments.map(a => (
            <div key={a.id} className="admin-assignment-row">
              <div className="flex items-center gap-2 min-w-0">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{a.label || a.assistantName || a.assistantId}</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">{a.assistantId}</p>
                  {a.lastSyncedAt && (
                    <p className="text-xs text-muted-foreground">
                      Last synced: {new Date(a.lastSyncedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleSync}
                  disabled={syncing}
                  className="h-7 gap-1 text-xs"
                >
                  {syncing ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
                  Sync
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemove(a.id)}
                  className="h-7 w-7 p-0 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground mb-3">No AI Receptionist assigned yet.</p>
      )}

      {/* Assign new / replace */}
      <button
        onClick={() => setOpen(o => !o)}
        className="admin-assign-toggle"
        aria-expanded={open}
      >
        <Plus className="w-3.5 h-3.5" />
        {activeAssignments.length > 0 ? 'Replace assistant' : 'Assign assistant'}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="admin-assignment-form">
          {loadingAssistants ? (
            <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Loader2 className="w-3 h-3 animate-spin" /> Loading assistants...</p>
          ) : (
            <>
              <div className="relative">
                <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <select
                  value={selectedId}
                  onChange={e => setSelectedId(e.target.value)}
                  className="admin-select w-full pl-8 pr-3"
                >
                  <option value="">Select an assistant...</option>
                  {assistants.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name || a.id} {a.model?.model ? `(${a.model.model})` : ''}
                    </option>
                  ))}
                </select>
              </div>
              <input
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="Display label (e.g. Main Receptionist)"
                className="admin-input w-full px-3"
              />
              <Button
                size="sm"
                onClick={handleAssign}
                disabled={assigning || !selectedId}
                className="admin-action-button gap-1.5 text-xs h-8"
              >
                {assigning ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                Assign
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
