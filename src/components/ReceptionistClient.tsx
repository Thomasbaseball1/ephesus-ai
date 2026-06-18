'use client';

import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import {
  Phone, PhoneMissed, PhoneIncoming, Clock, CheckCircle,
  XCircle, RefreshCw, Loader2, ChevronDown, ChevronUp,
  TrendingUp, Calendar, Hash, Mic, User, Building2,
  Mail, MessageSquare, AlertTriangle, Lightbulb, Target, Star,
  ArrowRight, Info, MapPin, Download, Filter, X, Search,
  Sparkles, BarChart3, PhoneCall
} from 'lucide-react';

interface Assignment {
  id: number;
  assistantId: string;
  assistantName: string | null;
  label: string | null;
  isActive: boolean;
  assignedAt: string;
  lastSyncedAt: string | null;
}

interface CallRecord {
  id: string;
  assistantId: string;
  createdAt: string | null;
  startedAt: string | null;
  endedAt: string | null;
  durationSeconds: number | null;
  status: string | null;
  endedReason: string | null;
  type: string | null;
  callerPhoneNumber: string | null;
  calledNumber: string | null;
  transcript: string | null;
  summary: string | null;
  successEvaluation: string | null;
  successEvaluationReason: string | null;
  recordingUrl: string | null;
  stereoRecordingUrl: string | null;
  totalCost: string | null;
  forwardedPhoneNumber: string | null;
  transferDestination: string | null;
  aiAnalyzedAt: string | null;
  callerIntent: string | null;
  callType: string | null;
  urgency: string | null;
  sentiment: string | null;
  leadScore: number | null;
  buyerReadiness: string | null;
  primaryTopic: string | null;
  secondaryTopics: string | null;
  keyEntities: string | null;
  objections: string | null;
  infoGathered: string | null;
  infoMissing: string | null;
  nextBestAction: string | null;
  followUpSms: string | null;
  followUpEmailSubject: string | null;
  followUpEmailBody: string | null;
  managerAlert: string | null;
  automationIdeas: string | null;
}

interface Props {
  assignment: Assignment | null;
  initialCalls: CallRecord[];
}

function getDurationSeconds(call: CallRecord): number | null {
  if (call.durationSeconds) return call.durationSeconds;
  if (call.startedAt && call.endedAt) {
    const diff = Math.round(
      (new Date(call.endedAt).getTime() - new Date(call.startedAt).getTime()) / 1000
    );
    return diff > 0 ? diff : null;
  }
  return null;
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  });
}

function formatShortDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric',
  });
}

function tryParseJson<T>(val: string | null, fallback: T): T {
  if (!val) return fallback;
  try { return JSON.parse(val) as T; } catch { return fallback; }
}

const cardStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.025)',
  border: '1px solid rgba(255,255,255,0.07)',
  borderRadius: '16px',
};

const cardHoverStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
};

function Badge({ children, color = 'default' }: { children: React.ReactNode; color?: 'default' | 'green' | 'red' | 'amber' | 'sky' | 'purple' | 'teal' }) {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' },
    green: { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' },
    red: { background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' },
    amber: { background: 'rgba(245,158,11,0.1)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' },
    sky: { background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' },
    purple: { background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' },
    teal: { background: 'rgba(13,148,136,0.12)', color: '#2DD4BF', border: '1px solid rgba(13,148,136,0.3)' },
  };
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium inline-flex items-center gap-1" style={styles[color]}>
      {children}
    </span>
  );
}

function EndedReasonBadge({ reason }: { reason: string | null }) {
  if (!reason) return null;
  const map: Record<string, { label: string; color: 'default' | 'green' | 'red' | 'amber' | 'sky' | 'purple' | 'teal' }> = {
    'customer-ended-call': { label: 'Caller hung up', color: 'default' },
    'assistant-ended-call': { label: 'Completed', color: 'green' },
    'voicemail': { label: 'Voicemail', color: 'sky' },
    'silence-timed-out': { label: 'Silence timeout', color: 'amber' },
    'transfer': { label: 'Transferred', color: 'purple' },
    'no-answer': { label: 'No answer', color: 'red' },
    'pipeline-error': { label: 'Error', color: 'red' },
  };
  const entry = map[reason] || { label: reason, color: 'default' as const };
  return <Badge color={entry.color}>{entry.label}</Badge>;
}

function SuccessBadge({ val }: { val: string | null }) {
  if (!val || val === 'unknown' || val === 'N/A') return null;
  const success = val === 'true' || val === 'True' || val === '1';
  return (
    <Badge color={success ? 'green' : 'red'}>
      {success ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
      {success ? 'Successful' : 'Unsuccessful'}
    </Badge>
  );
}

function SentimentBadge({ val }: { val: string | null }) {
  if (!val) return null;
  const colorMap: Record<string, 'green' | 'default' | 'red' | 'amber'> = {
    positive: 'green', neutral: 'default', negative: 'red', mixed: 'amber',
  };
  return <Badge color={colorMap[val] || 'default'}>{val}</Badge>;
}

function UrgencyBadge({ val }: { val: string | null }) {
  if (!val) return null;
  const colorMap: Record<string, 'default' | 'amber' | 'red'> = {
    low: 'default', medium: 'amber', high: 'red', critical: 'red',
  };
  return <Badge color={colorMap[val] || 'default'}>{val} urgency</Badge>;
}

function LeadScoreDots({ score }: { score: number | null }) {
  if (!score) return <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>—</span>;
  const getColor = (filled: boolean, s: number) => {
    if (!filled) return 'rgba(255,255,255,0.1)';
    if (s >= 8) return '#10b981';
    if (s >= 5) return '#f59e0b';
    return '#f87171';
  };
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i} className="w-2 h-2 rounded-full transition-colors"
          style={{ background: getColor(i < score, score) }} />
      ))}
      <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{score}/10</span>
    </div>
  );
}

function TagList({ items, color = 'default' }: { items: string[]; color?: 'default' | 'sky' | 'purple' | 'teal' }) {
  if (!items.length) return <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>None</span>;
  const styles: Record<string, React.CSSProperties> = {
    default: { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' },
    sky: { background: 'rgba(56,189,248,0.08)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' },
    purple: { background: 'rgba(167,139,250,0.08)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' },
    teal: { background: 'rgba(13,148,136,0.1)', color: '#2DD4BF', border: '1px solid rgba(13,148,136,0.25)' },
  };
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span key={i} className="text-xs px-2 py-0.5 rounded-full font-medium" style={styles[color]}>{item}</span>
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-widest uppercase mb-2"
      style={{ color: 'rgba(255,255,255,0.3)' }}>
      {children}
    </p>
  );
}

function InfoBox({ children, color = 'default' }: { children: React.ReactNode; color?: 'teal' | 'amber' | 'default' }) {
  const styles: Record<string, React.CSSProperties> = {
    default: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' },
    teal: { background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)' },
    amber: { background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)' },
  };
  return (
    <div className="rounded-xl p-3" style={styles[color]}>{children}</div>
  );
}

function ReceptionistSkeleton() {
  const pulse: React.CSSProperties = { background: 'rgba(255,255,255,0.05)', borderRadius: '8px' };
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm px-4 py-3 rounded-xl"
        style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)', color: 'rgba(45,212,191,0.8)' }}>
        <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" style={{ color: '#2DD4BF' }} />
        <span>Fetching latest call data and running AI analysis — this only takes a moment&hellip;</span>
      </div>
      <div className="p-4 rounded-2xl" style={cardStyle}>
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={pulse} />
          <div className="h-4 w-48 rounded-lg animate-pulse" style={pulse} />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="p-4 space-y-2 rounded-2xl" style={cardStyle}>
            <div className="w-8 h-8 rounded-xl animate-pulse" style={pulse} />
            <div className="h-6 w-12 rounded-lg animate-pulse" style={pulse} />
            <div className="h-3 w-16 rounded-md animate-pulse" style={pulse} />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-2xl" style={cardStyle}>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-xl flex-shrink-0 animate-pulse" style={pulse} />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-36 rounded-lg animate-pulse" style={pulse} />
                <div className="h-3 w-24 rounded-md animate-pulse" style={pulse} />
              </div>
              <div className="h-3 w-16 rounded-md hidden sm:block animate-pulse" style={pulse} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReceptionistClient({ assignment, initialCalls }: Props) {
  const [calls, setCalls] = useState<CallRecord[]>(initialCalls);
  const [syncing, setSyncing] = useState(false);
  const [initialSyncing, setInitialSyncing] = useState(!!assignment);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, string>>({});
  const hasSynced = useRef(false);

  const [search, setSearch] = useState('');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [filterCallType, setFilterCallType] = useState('all');
  const [filterSentiment, setFilterSentiment] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [filterClassification, setFilterClassification] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!assignment || hasSynced.current) return;
    hasSynced.current = true;
    (async () => {
      setInitialSyncing(true);
      try {
        const res = await fetch('/api/voice-agent/calls');
        if (res.ok) {
          const data = await res.json();
          setCalls(data.calls || []);
        }
      } catch {
        // silently fail
      } finally {
        setInitialSyncing(false);
      }
    })();
  }, [assignment]);

  const sync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/voice-agent/calls');
      if (!res.ok) throw new Error('Sync failed');
      const data = await res.json();
      setCalls(data.calls || []);
      toast.success('Call records updated.');
    } catch {
      toast.error('Failed to sync call records.');
    } finally {
      setSyncing(false);
    }
  };

  // Filtering
  const filteredCalls = calls.filter(call => {
    if (search) {
      const q = search.toLowerCase();
      const hay = [call.callerPhoneNumber, call.callerIntent, call.summary, call.primaryTopic, call.callType]
        .filter(Boolean).join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filterDateRange !== 'all') {
      const days = filterDateRange === '7d' ? 7 : filterDateRange === '30d' ? 30 : filterDateRange === '90d' ? 90 : 0;
      if (days > 0) {
        const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
        if (!call.createdAt || call.createdAt < cutoff) return false;
      }
    }
    if (filterCallType !== 'all') {
      if (filterCallType === 'phone' && call.type === 'webCall') return false;
      if (filterCallType === 'web' && call.type !== 'webCall') return false;
    }
    if (filterSentiment !== 'all' && call.sentiment !== filterSentiment) return false;
    if (filterUrgency !== 'all' && call.urgency !== filterUrgency) return false;
    if (filterClassification !== 'all' && call.callType !== filterClassification) return false;
    return true;
  });

  const activeFilterCount = [
    search, filterDateRange !== 'all', filterCallType !== 'all',
    filterSentiment !== 'all', filterUrgency !== 'all', filterClassification !== 'all'
  ].filter(Boolean).length;

  const exportData = async (format: 'csv' | 'xlsx') => {
    const rows = filteredCalls.map(c => {
      const entities = tryParseJson<Record<string, string[]>>(c.keyEntities, {});
      return {
        'Call ID': c.id,
        'Date': c.startedAt ? new Date(c.startedAt).toLocaleString() : '',
        'Caller': c.callerPhoneNumber || (c.type === 'webCall' ? 'Website visitor' : ''),
        'Called Number': c.calledNumber || '',
        'Call Type': c.type || '',
        'Duration (s)': getDurationSeconds(c) ?? '',
        'Status': c.status || '',
        'Ended Reason': c.endedReason || '',
        'Summary': c.summary || '',
        'Transcript': c.transcript || '',
        'Caller Intent': c.callerIntent || '',
        'Classification': c.callType || '',
        'Urgency': c.urgency || '',
        'Sentiment': c.sentiment || '',
        'Lead Score': c.leadScore ?? '',
        'Buyer Readiness': c.buyerReadiness || '',
        'Primary Topic': c.primaryTopic || '',
        'Secondary Topics': tryParseJson<string[]>(c.secondaryTopics, []).join('; '),
        'People Mentioned': (entities.person_names || []).join('; '),
        'Companies Mentioned': (entities.company_names || []).join('; '),
        'Locations Mentioned': (entities.locations || []).join('; '),
        'Emails Mentioned': (entities.emails || []).join('; '),
        'Objections': tryParseJson<string[]>(c.objections, []).join('; '),
        'Info Gathered': tryParseJson<string[]>(c.infoGathered, []).join('; '),
        'Info Missing': tryParseJson<string[]>(c.infoMissing, []).join('; '),
        'Next Best Action': c.nextBestAction || '',
        'Follow-Up SMS': c.followUpSms || '',
        'Follow-Up Email Subject': c.followUpEmailSubject || '',
        'Follow-Up Email Body': c.followUpEmailBody || '',
        'Manager Alert': c.managerAlert || '',
        'Automation Ideas': tryParseJson<string[]>(c.automationIdeas, []).join('; '),
        'Recording URL': c.stereoRecordingUrl || c.recordingUrl || '',
        'Total Cost ($)': c.totalCost ? Number(c.totalCost).toFixed(4) : '',
        'AI Analyzed At': c.aiAnalyzedAt || '',
      };
    });

    const filename = `call-history-${new Date().toISOString().slice(0, 10)}`;

    if (format === 'csv') {
      const headers = Object.keys(rows[0] || {});
      const csv = [
        headers.join(','),
        ...rows.map(r => headers.map(h => `"${String(r[h as keyof typeof r] ?? '').replace(/"/g, '""')}"`).join(',')),
      ].join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `${filename}.csv`; a.click();
      URL.revokeObjectURL(url);
    } else {
      const XLSX = await import('xlsx');
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Calls');
      XLSX.writeFile(wb, `${filename}.xlsx`);
    }
  };

  if (!assignment && initialSyncing) return <ReceptionistSkeleton />;

  if (!assignment) {
    return (
      <div className="p-12 rounded-2xl text-center" style={cardStyle}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.2), rgba(45,212,191,0.1))', border: '1px solid rgba(13,148,136,0.2)' }}>
          <Phone className="w-8 h-8" style={{ color: '#0D9488' }} />
        </div>
        <h2 className="font-semibold text-lg mb-2 text-white">AI Receptionist Not Yet Active</h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Your AI phone receptionist is being configured by the Ephesus AI team. You&apos;ll receive a notification once it&apos;s live and handling calls.
        </p>
      </div>
    );
  }

  const totalCalls = calls.length;
  const completedCalls = calls.filter(c => c.endedReason === 'assistant-ended-call').length;
  const transferredCalls = calls.filter(c => c.endedReason === 'transfer' || c.forwardedPhoneNumber).length;
  const callsWithDuration = calls.map(c => ({ ...c, _dur: getDurationSeconds(c) })).filter(c => c._dur);
  const avgDuration = callsWithDuration.length
    ? Math.round(callsWithDuration.reduce((acc, c) => acc + (c._dur || 0), 0) / callsWithDuration.length)
    : 0;
  const successRate = calls.filter(c => c.successEvaluation).length
    ? Math.round((calls.filter(c => c.successEvaluation === 'true' || c.successEvaluation === 'True').length / calls.filter(c => c.successEvaluation).length) * 100)
    : null;
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const thisWeek = calls.filter(c => c.createdAt && c.createdAt > weekAgo).length;
  const analyzedWithScore = calls.filter(c => c.aiAnalyzedAt && c.leadScore);
  const avgLeadScore = analyzedWithScore.length
    ? Math.round(analyzedWithScore.reduce((a, c) => a + (c.leadScore || 0), 0) / analyzedWithScore.length * 10) / 10
    : null;

  const STATS = [
    { icon: Hash, label: 'Total Calls', value: totalCalls.toLocaleString(), gradient: 'linear-gradient(135deg, #0D9488, #2DD4BF)', glow: 'rgba(13,148,136,0.3)' },
    { icon: Calendar, label: 'This Week', value: thisWeek.toLocaleString(), gradient: 'linear-gradient(135deg, #0284c7, #38bdf8)', glow: 'rgba(56,189,248,0.2)' },
    { icon: Clock, label: 'Avg Duration', value: formatDuration(avgDuration), gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)', glow: 'rgba(167,139,250,0.2)' },
    ...(successRate !== null ? [{ icon: TrendingUp, label: 'Success Rate', value: `${successRate}%`, gradient: 'linear-gradient(135deg, #059669, #10b981)', glow: 'rgba(16,185,129,0.2)' }] : []),
    ...(avgLeadScore !== null ? [{ icon: Star, label: 'Avg Lead Score', value: `${avgLeadScore}/10`, gradient: 'linear-gradient(135deg, #d97706, #f59e0b)', glow: 'rgba(245,158,11,0.2)' }] : []),
    { icon: PhoneIncoming, label: 'Completed', value: completedCalls.toLocaleString(), gradient: 'linear-gradient(135deg, #059669, #10b981)', glow: 'rgba(16,185,129,0.2)' },
    { icon: PhoneCall, label: 'Transferred', value: transferredCalls.toLocaleString(), gradient: 'linear-gradient(135deg, #d97706, #f59e0b)', glow: 'rgba(245,158,11,0.2)' },
  ];

  return (
    <div className="space-y-6">

      {/* Sync banner */}
      {initialSyncing && (
        <div className="flex items-center gap-3 text-sm px-4 py-3 rounded-xl"
          style={{ background: 'rgba(13,148,136,0.08)', border: '1px solid rgba(13,148,136,0.2)', color: 'rgba(45,212,191,0.8)' }}>
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" style={{ color: '#2DD4BF' }} />
          <span>Fetching latest call data and running AI analysis — this only takes a moment&hellip;</span>
        </div>
      )}

      {/* Agent status bar */}
      <div className="p-4 rounded-2xl flex items-center justify-between gap-4 flex-wrap"
        style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.18)' }}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0D9488, #2DD4BF)', boxShadow: '0 0 12px rgba(13,148,136,0.4)' }}>
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: '#10b981', borderColor: 'rgba(6,13,24,1)' }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{assignment.label || assignment.assistantName || 'AI Receptionist'}</p>
            {assignment.lastSyncedAt && (
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Last updated {formatDate(assignment.lastSyncedAt)}</p>
            )}
          </div>
        </div>
        <button
          onClick={sync}
          disabled={syncing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 disabled:opacity-50 cursor-pointer"
          style={{ background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.3)', color: '#2DD4BF' }}
        >
          {syncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
          Refresh
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {STATS.map(({ icon: Icon, label, value, gradient, glow }) => (
          <div key={label} className="p-4 rounded-2xl transition-all duration-200 hover:translate-y-[-1px]"
            style={{ ...cardStyle, boxShadow: `0 4px 20px ${glow}` }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2.5"
              style={{ background: gradient, boxShadow: `0 2px 8px ${glow}` }}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-xl font-bold text-white stat-value">{value}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Call log */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <h2 className="font-semibold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4" style={{ color: '#0D9488' }} />
            Call History
            <span className="text-xs font-normal" style={{ color: 'rgba(255,255,255,0.4)' }}>
              ({filteredCalls.length !== totalCalls
                ? `${filteredCalls.length} of ${totalCalls.toLocaleString()}`
                : totalCalls.toLocaleString()} calls)
            </span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(v => !v)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
              style={{
                background: showFilters ? 'rgba(13,148,136,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${showFilters ? 'rgba(13,148,136,0.3)' : 'rgba(255,255,255,0.1)'}`,
                color: showFilters ? '#2DD4BF' : 'rgba(255,255,255,0.6)',
              }}>
              <Filter className="w-3.5 h-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-white text-[10px] flex items-center justify-center font-bold"
                  style={{ background: '#0D9488' }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
            <button
              onClick={() => exportData('csv')}
              disabled={filteredCalls.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              <Download className="w-3.5 h-3.5" />CSV
            </button>
            <button
              onClick={() => exportData('xlsx')}
              disabled={filteredCalls.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-40"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              <Download className="w-3.5 h-3.5" />Excel
            </button>
          </div>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="p-4 rounded-2xl mb-3 space-y-3"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
              <input
                type="text"
                placeholder="Search caller, intent, topic, summary…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm text-white rounded-xl focus:outline-none focus:ring-1"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  '--tw-ring-color': '#0D9488',
                } as React.CSSProperties}
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                  <X className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.4)' }} />
                </button>
              )}
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {[
                { label: 'Date Range', value: filterDateRange, set: setFilterDateRange, options: [
                  { v: 'all', l: 'All time' }, { v: '7d', l: 'Last 7 days' },
                  { v: '30d', l: 'Last 30 days' }, { v: '90d', l: 'Last 90 days' },
                ]},
                { label: 'Channel', value: filterCallType, set: setFilterCallType, options: [
                  { v: 'all', l: 'All channels' }, { v: 'phone', l: 'Phone calls' }, { v: 'web', l: 'Website visits' },
                ]},
                { label: 'Sentiment', value: filterSentiment, set: setFilterSentiment, options: [
                  { v: 'all', l: 'All sentiments' }, { v: 'positive', l: 'Positive' },
                  { v: 'neutral', l: 'Neutral' }, { v: 'negative', l: 'Negative' }, { v: 'mixed', l: 'Mixed' },
                ]},
                { label: 'Urgency', value: filterUrgency, set: setFilterUrgency, options: [
                  { v: 'all', l: 'All urgency' }, { v: 'low', l: 'Low' },
                  { v: 'medium', l: 'Medium' }, { v: 'high', l: 'High' }, { v: 'critical', l: 'Critical' },
                ]},
                { label: 'Classification', value: filterClassification, set: setFilterClassification, options: [
                  { v: 'all', l: 'All types' }, { v: 'new_lead', l: 'New lead' },
                  { v: 'existing_customer', l: 'Existing customer' }, { v: 'support', l: 'Support' },
                  { v: 'spam', l: 'Spam' }, { v: 'other', l: 'Other' },
                ]},
              ].map(({ label, value, set, options }) => (
                <div key={label}>
                  <p className="text-xs mb-1 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
                  <select
                    value={value}
                    onChange={e => set(e.target.value)}
                    className="w-full text-xs rounded-xl px-2 py-1.5 cursor-pointer focus:outline-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}
                  >
                    {options.map(o => <option key={o.v} value={o.v} style={{ background: '#0f172a' }}>{o.l}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={() => { setSearch(''); setFilterDateRange('all'); setFilterCallType('all'); setFilterSentiment('all'); setFilterUrgency('all'); setFilterClassification('all'); }}
                className="text-xs flex items-center gap-1 cursor-pointer transition-colors"
                style={{ color: '#0D9488' }}>
                <X className="w-3 h-3" /> Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Empty states */}
        {filteredCalls.length === 0 && calls.length > 0 ? (
          <div className="p-8 text-center rounded-2xl" style={cardStyle}>
            <Filter className="w-8 h-8 mx-auto mb-3 opacity-20" style={{ color: 'white' }} />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>No calls match the current filters.</p>
          </div>
        ) : calls.length === 0 ? (
          <div className="p-8 text-center rounded-2xl" style={cardStyle}>
            <PhoneMissed className="w-8 h-8 mx-auto mb-3 opacity-20" style={{ color: 'white' }} />
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>No calls recorded yet. They&apos;ll appear here once your AI receptionist starts handling calls.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredCalls.map(call => {
              const isExpanded = expandedId === call.id;
              const tab = activeTab[call.id] || 'overview';
              const hasAI = !!call.aiAnalyzedAt;

              const entities = tryParseJson<{
                person_names: string[]; company_names: string[];
                phone_numbers: string[]; emails: string[];
                locations: string[]; dates: string[];
              }>(call.keyEntities, { person_names: [], company_names: [], phone_numbers: [], emails: [], locations: [], dates: [] });

              const secondaryTopics = tryParseJson<string[]>(call.secondaryTopics, []);
              const objections = tryParseJson<string[]>(call.objections, []);
              const infoGathered = tryParseJson<string[]>(call.infoGathered, []);
              const infoMissing = tryParseJson<string[]>(call.infoMissing, []);
              const automationIdeas = tryParseJson<string[]>(call.automationIdeas, []);

              const TABS = [
                { id: 'overview', label: 'Overview' },
                ...(hasAI ? [
                  { id: 'intelligence', label: 'AI Intelligence' },
                  { id: 'followup', label: 'Follow-Up' },
                ] : []),
                { id: 'transcript', label: 'Transcript' },
                ...(call.recordingUrl || call.stereoRecordingUrl ? [{ id: 'recording', label: 'Recording' }] : []),
              ];

              return (
                <div key={call.id} className="rounded-2xl overflow-hidden transition-all duration-200"
                  style={isExpanded ? { ...cardStyle, border: '1px solid rgba(13,148,136,0.25)' } : cardStyle}>

                  {/* Summary row */}
                  <div
                    className="px-4 py-3.5 flex items-center gap-4 cursor-pointer transition-all duration-200"
                    style={{ background: isExpanded ? 'rgba(13,148,136,0.04)' : 'transparent' }}
                    onClick={() => setExpandedId(isExpanded ? null : call.id)}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.2), rgba(45,212,191,0.1))', border: '1px solid rgba(13,148,136,0.2)' }}>
                      <PhoneIncoming className="w-4 h-4" style={{ color: '#2DD4BF' }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-white">
                          {call.callerPhoneNumber || (call.type === 'webCall' ? 'Website visitor' : 'Unknown caller')}
                        </span>
                        <EndedReasonBadge reason={call.endedReason} />
                        <SuccessBadge val={call.successEvaluation} />
                        {hasAI && <SentimentBadge val={call.sentiment} />}
                        {hasAI && call.urgency && call.urgency !== 'low' && <UrgencyBadge val={call.urgency} />}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs flex-wrap" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        <span>{formatShortDate(call.startedAt || call.createdAt)}</span>
                        {getDurationSeconds(call) && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />{formatDuration(getDurationSeconds(call))}
                          </span>
                        )}
                        {call.calledNumber && <span>→ {call.calledNumber}</span>}
                        {hasAI && call.callerIntent && (
                          <span className="hidden sm:block truncate max-w-[220px] italic">{call.callerIntent}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {hasAI && call.leadScore && (
                        <span className="hidden sm:flex items-center gap-1 text-xs font-medium" style={{ color: '#f59e0b' }}>
                          <Star className="w-3 h-3" /> {call.leadScore}/10
                        </span>
                      )}
                      {call.recordingUrl && (
                        <span className="hidden sm:flex items-center gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          <Mic className="w-3 h-3" />
                        </span>
                      )}
                      {hasAI && (
                        <span className="hidden sm:flex items-center gap-1 text-xs font-semibold" style={{ color: '#2DD4BF' }}>
                          <Sparkles className="w-3 h-3" /> AI
                        </span>
                      )}
                      {isExpanded
                        ? <ChevronUp className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                        : <ChevronDown className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                      }
                    </div>
                  </div>

                  {/* Expanded */}
                  {isExpanded && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
                      {/* Tab bar */}
                      <div className="flex gap-0 px-4 overflow-x-auto" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {TABS.map(t => (
                          <button
                            key={t.id}
                            onClick={() => setActiveTab(prev => ({ ...prev, [call.id]: t.id }))}
                            className="text-xs font-semibold px-3 py-2.5 border-b-2 whitespace-nowrap transition-all duration-200 cursor-pointer"
                            style={{
                              borderBottomColor: tab === t.id ? '#0D9488' : 'transparent',
                              color: tab === t.id ? '#2DD4BF' : 'rgba(255,255,255,0.4)',
                            }}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      <div className="px-4 py-4 space-y-4 text-sm">

                        {/* OVERVIEW */}
                        {tab === 'overview' && (
                          <>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {[
                                { label: 'Started', value: formatDate(call.startedAt) },
                                { label: 'Ended', value: formatDate(call.endedAt) },
                                { label: 'Duration', value: formatDuration(getDurationSeconds(call)) },
                                { label: 'Call Type', value: call.type?.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()) || '—' },
                                { label: 'Caller', value: call.callerPhoneNumber || (call.type === 'webCall' ? 'Website visitor' : '—') },
                                { label: 'Called Number', value: call.calledNumber || '—' },
                                { label: 'Transferred To', value: call.forwardedPhoneNumber || call.transferDestination || '—' },
                                { label: 'Status', value: call.status || '—' },
                              ].map(({ label, value }) => (
                                <div key={label} className="rounded-xl p-2.5"
                                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                  <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
                                  <p className="text-xs font-semibold text-white truncate">{value}</p>
                                </div>
                              ))}
                            </div>

                            {call.summary && (
                              <div>
                                <SectionLabel>Summary</SectionLabel>
                                <InfoBox>
                                  <p className="text-sm text-white leading-relaxed">{call.summary}</p>
                                </InfoBox>
                              </div>
                            )}

                            {call.successEvaluationReason && (
                              <div>
                                <SectionLabel>Evaluation Notes</SectionLabel>
                                <InfoBox>
                                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{call.successEvaluationReason}</p>
                                </InfoBox>
                              </div>
                            )}

                            <div className="flex items-center justify-between text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                              {call.totalCost && (
                                <span>Cost: <span className="font-mono text-white/50">${Number(call.totalCost).toFixed(4)}</span></span>
                              )}
                              <span className="font-mono">ID: {call.id.slice(0, 16)}…</span>
                            </div>
                          </>
                        )}

                        {/* AI INTELLIGENCE */}
                        {tab === 'intelligence' && hasAI && (
                          <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {[
                                { icon: Target, label: 'Caller Intent', content: <p className="text-xs font-medium text-white">{call.callerIntent || '—'}</p> },
                                { icon: Phone, label: 'Classification', content: <p className="text-xs font-medium text-white capitalize">{call.callType?.replace(/_/g, ' ') || '—'}</p> },
                                { icon: Star, label: 'Lead Score', content: <LeadScoreDots score={call.leadScore} /> },
                                { icon: null, label: 'Sentiment', content: <SentimentBadge val={call.sentiment} /> },
                                { icon: null, label: 'Urgency', content: <UrgencyBadge val={call.urgency} /> },
                                { icon: null, label: 'Buyer Readiness', content: <span className="text-xs font-semibold text-white capitalize">{call.buyerReadiness || '—'}</span> },
                              ].map(({ icon: Icon, label, content }) => (
                                <div key={label} className="rounded-xl p-3"
                                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                  <p className="text-xs mb-1.5 flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                                    {Icon && <Icon className="w-3 h-3" />}
                                    {label}
                                  </p>
                                  {content}
                                </div>
                              ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <SectionLabel>Primary Topic</SectionLabel>
                                <p className="text-sm font-medium text-white">{call.primaryTopic || '—'}</p>
                              </div>
                              <div>
                                <SectionLabel>Secondary Topics</SectionLabel>
                                <TagList items={secondaryTopics} color="sky" />
                              </div>
                            </div>

                            {(entities.person_names.length > 0 || entities.company_names.length > 0 || entities.locations.length > 0 || entities.emails.length > 0) && (
                              <div>
                                <SectionLabel>Key Entities Mentioned</SectionLabel>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {entities.person_names.length > 0 && (
                                    <InfoBox>
                                      <p className="text-xs mb-1.5 flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}><User className="w-3 h-3" /> People</p>
                                      <TagList items={entities.person_names} />
                                    </InfoBox>
                                  )}
                                  {entities.company_names.length > 0 && (
                                    <InfoBox>
                                      <p className="text-xs mb-1.5 flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}><Building2 className="w-3 h-3" /> Companies</p>
                                      <TagList items={entities.company_names} />
                                    </InfoBox>
                                  )}
                                  {entities.locations.length > 0 && (
                                    <InfoBox>
                                      <p className="text-xs mb-1.5 flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}><MapPin className="w-3 h-3" /> Locations</p>
                                      <TagList items={entities.locations} />
                                    </InfoBox>
                                  )}
                                  {entities.emails.length > 0 && (
                                    <InfoBox>
                                      <p className="text-xs mb-1.5 flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.4)' }}><Mail className="w-3 h-3" /> Emails</p>
                                      <TagList items={entities.emails} />
                                    </InfoBox>
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <SectionLabel>Info Captured</SectionLabel>
                                {infoGathered.length > 0
                                  ? <ul className="space-y-1.5">{infoGathered.map((item, i) => (
                                      <li key={i} className="text-xs flex items-start gap-1.5 text-white/70">
                                        <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#10b981' }} />{item}
                                      </li>
                                    ))}</ul>
                                  : <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>None</span>}
                              </div>
                              <div>
                                <SectionLabel>Info Still Needed</SectionLabel>
                                {infoMissing.length > 0
                                  ? <ul className="space-y-1.5">{infoMissing.map((item, i) => (
                                      <li key={i} className="text-xs flex items-start gap-1.5 text-white/70">
                                        <XCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#f87171' }} />{item}
                                      </li>
                                    ))}</ul>
                                  : <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>None</span>}
                              </div>
                            </div>

                            {objections.length > 0 && (
                              <div>
                                <SectionLabel>Objections Raised</SectionLabel>
                                <TagList items={objections} color="purple" />
                              </div>
                            )}

                            {call.nextBestAction && (
                              <InfoBox color="teal">
                                <p className="text-xs mb-1 flex items-center gap-1" style={{ color: 'rgba(45,212,191,0.7)' }}>
                                  <ArrowRight className="w-3 h-3" /> Recommended Next Action
                                </p>
                                <p className="text-sm font-semibold text-white">{call.nextBestAction}</p>
                              </InfoBox>
                            )}

                            {call.managerAlert && call.managerAlert.toLowerCase() !== 'no action required.' && (
                              <InfoBox color="amber">
                                <p className="text-xs mb-1 flex items-center gap-1" style={{ color: 'rgba(245,158,11,0.7)' }}>
                                  <AlertTriangle className="w-3 h-3" /> Manager Alert
                                </p>
                                <p className="text-sm text-white">{call.managerAlert}</p>
                              </InfoBox>
                            )}

                            {automationIdeas.length > 0 && (
                              <div>
                                <SectionLabel>Automation Opportunities</SectionLabel>
                                <ul className="space-y-1.5">
                                  {automationIdeas.map((idea, i) => (
                                    <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                                      <Lightbulb className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#f59e0b' }} />{idea}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        )}

                        {/* FOLLOW-UP */}
                        {tab === 'followup' && hasAI && (
                          <>
                            {call.followUpSms && (
                              <div>
                                <SectionLabel>SMS Follow-Up</SectionLabel>
                                <InfoBox>
                                  <div className="flex items-start gap-2">
                                    <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#38bdf8' }} />
                                    <p className="text-sm text-white leading-relaxed">{call.followUpSms}</p>
                                  </div>
                                </InfoBox>
                              </div>
                            )}
                            {call.followUpEmailSubject && (
                              <div>
                                <SectionLabel>Email Follow-Up</SectionLabel>
                                <InfoBox>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#2DD4BF' }} />
                                    <p className="text-xs font-bold text-white">Subject: {call.followUpEmailSubject}</p>
                                  </div>
                                  {call.followUpEmailBody && (
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap pl-6" style={{ color: 'rgba(255,255,255,0.6)' }}>{call.followUpEmailBody}</p>
                                  )}
                                </InfoBox>
                              </div>
                            )}
                            {!call.followUpSms && !call.followUpEmailSubject && (
                              <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                <Info className="w-4 h-4" /> No follow-up content generated for this call.
                              </div>
                            )}
                          </>
                        )}

                        {/* TRANSCRIPT */}
                        {tab === 'transcript' && (
                          <>
                            {call.transcript ? (
                              <div className="rounded-xl p-3 max-h-80 overflow-y-auto"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                <p className="text-xs leading-relaxed whitespace-pre-wrap font-mono" style={{ color: 'rgba(255,255,255,0.65)' }}>{call.transcript}</p>
                              </div>
                            ) : (
                              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>No transcript available for this call.</p>
                            )}
                          </>
                        )}

                        {/* RECORDING */}
                        {tab === 'recording' && (
                          <div>
                            <SectionLabel>Call Recording</SectionLabel>
                            <audio
                              controls
                              className="w-full max-w-lg h-10"
                              src={call.stereoRecordingUrl || call.recordingUrl || undefined}
                            />
                          </div>
                        )}

                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
