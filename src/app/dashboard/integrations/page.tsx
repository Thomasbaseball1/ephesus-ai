import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { googleCalendarIntegrations, outlookIntegrations, instagramIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Card } from '@/components/ui/card';
import { OutlookConnectButton } from '@/components/OutlookConnectButton';
import { GoogleCalendarConnectButton } from '@/components/GoogleCalendarConnectButton';
import { InstagramConnectButton } from '@/components/InstagramConnectButton';
import { CalendarDays, Mail, CheckCircle, AlertCircle, Plug, Users, Info } from 'lucide-react';
import { ensureFreshToken } from '@/lib/outlook-refresh';
import { DashboardPageHeader } from '@/components/DashboardPageHeader';

export default async function IntegrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ connected?: string; error?: string; disconnected?: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const params = await searchParams;

  const [[outlook], googleCalendars, [instagram]] = await Promise.all([
    db.select().from(outlookIntegrations).where(eq(outlookIntegrations.userId, session.user.id)).limit(1),
    db.select().from(googleCalendarIntegrations).where(eq(googleCalendarIntegrations.userId, session.user.id)),
    db.select().from(instagramIntegrations).where(eq(instagramIntegrations.userId, session.user.id)).limit(1),
  ]);

  const isConnected = !!outlook;
  const googleConnected = googleCalendars.length > 0;
  const igConnected = !!instagram;

  // Try to silently refresh the access token if it's expired/expiring.
  // isExpired is only true if the refresh itself fails (refresh token revoked/expired).
  let isExpired = false;
  if (outlook) {
    const nowSec = Math.floor(Date.now() / 1000);
    if (outlook.expiresAt <= nowSec + 300) {
      const refreshed = await ensureFreshToken(outlook.id);
      isExpired = !refreshed;
    }
  }
  const connectedAt = outlook
    ? new Date(outlook.connectedAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

  return (
    <div className="dashboard-route space-y-6">
      <DashboardPageHeader
        eyebrow="Connected systems"
        title="Integrations"
        description="Connect the business accounts and channels Ephesus AI uses to work on your behalf."
        icon={Plug}
        status={`${Number(isConnected) + googleCalendars.length + Number(igConnected)} connected`}
      />

      {/* Status toasts */}
      {params.connected === 'outlook' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Outlook connected successfully! Ephesus AI can now manage your inbox.
        </div>
      )}
      {params.connected === 'instagram' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Instagram connected successfully! New-follower automations are now active.
        </div>
      )}
      {params.connected === 'google-calendar' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Google Calendar connected successfully! The Salon Biz CRM demo can now create real events.
        </div>
      )}
      {params.disconnected === 'instagram' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary border border-border text-muted-foreground text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Instagram disconnected.
        </div>
      )}
      {params.error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {params.error === 'microsoft_auth_failed' && 'Microsoft authorization was declined or failed. Please try again.'}
          {params.error === 'token_exchange_failed' && 'Failed to complete authorization. Please try again.'}
          {params.error === 'instagram_auth_failed' && 'Instagram authorization was declined or cancelled. Please try again.'}
          {params.error === 'instagram_not_configured' && 'Instagram integration is not yet configured. Please contact Ephesus AI support.'}
          {params.error === 'instagram_token_failed' && 'Failed to complete Instagram authorization. Please try again.'}
          {params.error === 'instagram_profile_failed' && 'Connected to Instagram but could not fetch profile. Please ensure you have a Business or Creator account.'}
          {params.error === 'google_calendar_not_configured' && 'Google Calendar integration is not configured yet. Add Google OAuth credentials and try again.'}
          {params.error === 'google_calendar_auth_failed' && 'Google Calendar authorization was declined or failed. Please try again.'}
          {params.error === 'google_calendar_token_failed' && 'Failed to complete Google Calendar authorization. Please try again.'}
          {params.error === 'google_calendar_profile_failed' && 'Connected to Google but could not fetch profile details. Please try again.'}
          {params.error === 'google_calendar_refresh_missing' && 'Google did not return a refresh token. Reconnect and approve offline access.'}
          {params.error === 'instagram_no_business_account' && (
            <span>No Instagram Business or Creator account was found linked to a Facebook Page. In Instagram: <strong>Settings → Account → Linked accounts → Facebook</strong> and connect a Facebook Page (not just your personal profile), then try again.</span>
          )}
          {!['microsoft_auth_failed','token_exchange_failed','instagram_auth_failed','instagram_not_configured','instagram_token_failed','instagram_profile_failed','instagram_no_business_account','google_calendar_not_configured','google_calendar_auth_failed','google_calendar_token_failed','google_calendar_profile_failed','google_calendar_refresh_missing'].includes(params.error) && 'Something went wrong. Please try again.'}
        </div>
      )}

      {/* Outlook card */}
      <Card className="p-5 md:p-6 gradient-border">
        <div className="flex items-start gap-4">
          {/* Outlook icon */}
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-[#0078D4] flex items-center justify-center flex-shrink-0 shadow">
            <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7" fill="white">
              <path d="M7.462 2C5.55 2 4 3.55 4 5.462v13.076C4 20.45 5.55 22 7.462 22h9.076C18.45 22 20 20.45 20 18.538V9.154L14.846 2H7.462z" opacity=".3"/>
              <path d="M14.846 2v5.538a1.616 1.616 0 0 0 1.616 1.616H20L14.846 2z"/>
              <path d="M8.308 12.154h7.384v1.23H8.308v-1.23zm0 2.462h7.384v1.23H8.308v-1.23zm0 2.461h4.923v1.231H8.308v-1.23z"/>
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            {/* Title row — button inline on md+, hidden here on mobile */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-semibold text-base">Microsoft Outlook</h2>
                {isConnected && !isExpired && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Connected
                  </span>
                )}
                {isExpired && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Expired
                  </span>
                )}
                {!isConnected && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                    Not connected
                  </span>
                )}
              </div>
              {/* Button inline on desktop */}
              <div className="hidden md:block flex-shrink-0">
                <OutlookConnectButton isConnected={isConnected} isExpired={isExpired} />
              </div>
            </div>

            {isConnected ? (
              <div className="mt-1 space-y-0.5">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{outlook.email}</span>
                  {outlook.displayName && ` · ${outlook.displayName}`}
                </p>
                <p className="text-xs text-muted-foreground">Connected on {connectedAt}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">
                Allow Ephesus AI to read and send emails through your Outlook or Office 365 inbox.
              </p>
            )}

            {/* Permissions list */}
            <div className="mt-3 flex flex-wrap gap-2">
              {['Read inbox', 'Send emails', 'Manage emails'].map(p => (
                <span key={p} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                  {p}
                </span>
              ))}
            </div>

            {/* Button full-width on mobile */}
            <div className="mt-4 md:hidden">
              <OutlookConnectButton isConnected={isConnected} isExpired={isExpired} fullWidth />
            </div>
          </div>
        </div>
      </Card>

      {/* Google Calendar card */}
      <Card className="p-5 md:p-6 gradient-border">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-[#1A73E8] flex items-center justify-center flex-shrink-0 shadow">
            <CalendarDays className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-semibold text-base">Google Calendar</h2>
                {googleConnected ? (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {googleCalendars.length} connected
                  </span>
                ) : (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                    Not connected
                  </span>
                )}
              </div>
              <div className="hidden md:block flex-shrink-0">
                <GoogleCalendarConnectButton isConnected={false} />
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-1">
              Connect Gmail or Google Workspace calendars so the Salon Biz CRM demo can create real booking events.
            </p>

            {googleCalendars.length > 0 && (
              <div className="mt-3 space-y-2">
                {googleCalendars.map(calendar => (
                  <div key={calendar.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-secondary/30 px-3 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{calendar.email}</p>
                      {calendar.displayName && <p className="text-xs text-muted-foreground">{calendar.displayName}</p>}
                    </div>
                    <GoogleCalendarConnectButton integrationId={calendar.id} isConnected />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {['Create events', 'Choose calendar', 'Multiple Google accounts'].map(p => (
                <span key={p} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                  {p}
                </span>
              ))}
            </div>

            <div className="mt-4 md:hidden">
              <GoogleCalendarConnectButton isConnected={false} fullWidth />
            </div>
          </div>
        </div>
      </Card>

      {/* Instagram card */}
      <Card className="p-5 md:p-6 gradient-border">
        <div className="flex items-start gap-4">
          {/* Instagram gradient icon */}
          <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow"
            style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            {/* Title row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-semibold text-base">Instagram</h2>
                {igConnected ? (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Connected
                  </span>
                ) : (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                    Not connected
                  </span>
                )}
              </div>
              {/* Button inline on desktop */}
              <div className="hidden md:block flex-shrink-0">
                <InstagramConnectButton isConnected={igConnected} />
              </div>
            </div>

            {igConnected ? (
              <div className="mt-1 space-y-0.5">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {instagram.igUsername ? `@${instagram.igUsername}` : instagram.igName || 'Connected account'}
                  </span>
                  {instagram.igName && instagram.igUsername && ` · ${instagram.igName}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  Connected on {new Date(instagram.connectedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                {instagram.tokenExpiresAt && (
                  <p className="text-xs text-muted-foreground">
                    Token expires {new Date(instagram.tokenExpiresAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">
                Connect your Instagram Business or Creator account so Ephesus AI can trigger automations when you get a new follower.
              </p>
            )}

            {/* Permissions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {['Read profile', 'Follower insights', 'New-follower automation'].map(p => (
                <span key={p} className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                  {p}
                </span>
              ))}
            </div>

            {/* Pre-connection requirements guide */}
            {!igConnected && (
              <div className="mt-4 rounded-xl overflow-hidden"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-2 px-4 py-2.5"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                  <Info className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#94a3b8' }} />
                  <span className="text-xs font-semibold" style={{ color: '#94a3b8' }}>Before you connect</span>
                </div>
                <div className="px-4 py-3 space-y-3">
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Requires an <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>Instagram Business or Creator account</span> linked to a <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>Facebook Page</span>. Personal accounts are not supported by Meta&apos;s API.
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        n: '1',
                        title: 'Switch to a Professional account',
                        body: <>In Instagram: <span className="font-mono" style={{ color: 'rgba(255,255,255,0.55)', wordBreak: 'break-word' }}>Settings → Account → Switch to professional account</span>. Choose <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Creator</strong> or <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Business</strong>. It&apos;s free.</>,
                      },
                      {
                        n: '2',
                        title: 'Link to a Facebook Page',
                        body: <>Switching to Professional does <em>not</em> auto-link a Facebook Page. Go to <span className="font-mono" style={{ color: 'rgba(255,255,255,0.55)', wordBreak: 'break-word' }}>Settings → Account → Linked accounts → Facebook</span>.</>,
                      },
                      {
                        n: '3',
                        title: 'Come back and click Connect',
                        body: <>Once steps 1 &amp; 2 are done, click <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Connect Instagram</strong> and authorize via Facebook.</>,
                      },
                    ].map(({ n, title, body }) => (
                      <div key={n} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                          style={{ background: 'rgba(225,48,108,0.15)', color: '#f472b6', border: '1px solid rgba(225,48,108,0.3)' }}>{n}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>{title}</p>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Automation note when connected */}
            {igConnected && (
              <div className="mt-4 flex items-start gap-2 p-3 rounded-xl text-xs"
                style={{ background: 'rgba(225,48,108,0.06)', border: '1px solid rgba(225,48,108,0.15)', color: 'rgba(255,255,255,0.6)' }}>
                <Users className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#f472b6' }} />
                <span>
                  <span className="font-semibold" style={{ color: '#f472b6' }}>New-follower automation active.</span>
                  {' '}When someone follows your account, Ephesus AI will automatically send them a welcome DM via your n8n workflow.
                </span>
              </div>
            )}

            {/* Button full-width on mobile */}
            <div className="mt-4 md:hidden">
              <InstagramConnectButton isConnected={igConnected} fullWidth />
            </div>
          </div>
        </div>
      </Card>

      {/* Coming soon integrations */}
      <Card className="p-6 gradient-border">
        <h2 className="font-semibold mb-4 flex items-center gap-2">
          <Plug className="w-4 h-4 text-[#0D9488]" /> Coming Soon
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'Gmail', color: 'bg-red-500', desc: 'Google Workspace email' },
            { name: 'Salesforce', color: 'bg-blue-500', desc: 'CRM sync' },
            { name: 'HubSpot', color: 'bg-orange-500', desc: 'Marketing & CRM' },
          ].map(({ name, color, desc }) => (
            <div key={name} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 opacity-60">
              <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
