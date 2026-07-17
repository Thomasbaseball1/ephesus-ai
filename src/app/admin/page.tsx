import { db } from '@/db';
import {
  instagramIntegrations,
  outlookIntegrations,
  user as userTable,
  voiceAgentAssignments,
} from '@/db/schema';
import { desc, eq } from 'drizzle-orm';
import { AdminClientRow } from '@/components/AdminClientRow';
import { AdminInstagramRow } from '@/components/AdminInstagramRow';
import { AdminVoiceAgentPanel } from '@/components/AdminVoiceAgentPanel';
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Instagram,
  Mail,
  Phone,
  PlugZap,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  Users,
} from 'lucide-react';

export default async function AdminPage() {
  const integrations = await db
    .select({
      integrationId: outlookIntegrations.id,
      userId: outlookIntegrations.userId,
      outlookEmail: outlookIntegrations.email,
      displayName: outlookIntegrations.displayName,
      connectedAt: outlookIntegrations.connectedAt,
      n8nWebhookUrl: outlookIntegrations.n8nWebhookUrl,
      graphSubscriptionId: outlookIntegrations.graphSubscriptionId,
      graphSubscriptionExpiry: outlookIntegrations.graphSubscriptionExpiry,
      expiresAt: outlookIntegrations.expiresAt,
      userName: userTable.name,
      userEmail: userTable.email,
      companyName: userTable.companyName,
      intakeCompleted: userTable.intakeCompleted,
    })
    .from(outlookIntegrations)
    .leftJoin(userTable, eq(outlookIntegrations.userId, userTable.id));

  const igIntegrations = await db
    .select({
      integrationId: instagramIntegrations.id,
      userId: instagramIntegrations.userId,
      igUserId: instagramIntegrations.igUserId,
      igUsername: instagramIntegrations.igUsername,
      igName: instagramIntegrations.igName,
      tokenExpiresAt: instagramIntegrations.tokenExpiresAt,
      connectedAt: instagramIntegrations.connectedAt,
      n8nWebhookUrl: instagramIntegrations.n8nWebhookUrl,
      userName: userTable.name,
      userEmail: userTable.email,
      companyName: userTable.companyName,
    })
    .from(instagramIntegrations)
    .leftJoin(userTable, eq(instagramIntegrations.userId, userTable.id));

  const allUsers = await db.select().from(userTable).orderBy(desc(userTable.createdAt));
  const voiceAssignments = await db
    .select()
    .from(voiceAgentAssignments)
    .where(eq(voiceAgentAssignments.isActive, true));

  const outlookByUser = new Map(integrations.map(item => [item.userId, item]));
  const instagramByUser = new Map(igIntegrations.map(item => [item.userId, item]));
  const voiceByUser = new Map(voiceAssignments.map(item => [item.userId, item]));
  const configuredChannels = integrations.length + igIntegrations.length + voiceAssignments.length;

  const stats = [
    { label: 'Total clients', value: allUsers.length, icon: Users, tone: 'mint' },
    { label: 'Outlook connected', value: integrations.length, icon: Mail, tone: 'calm' },
    { label: 'Instagram connected', value: igIntegrations.length, icon: Instagram, tone: 'calm' },
    { label: 'Receptionists live', value: voiceAssignments.length, icon: Phone, tone: 'mint' },
  ];

  return (
    <div className="admin-console space-y-6 lg:space-y-8">
      <section className="admin-hero">
        <div className="admin-hero__grid" aria-hidden="true" />
        <div className="admin-hero__copy">
          <p className="admin-kicker"><Sparkles /> Private operations</p>
          <h1>Client operations, <em>under control.</em></h1>
          <p>
            Manage accounts, connected channels, automation endpoints, and AI receptionist assignments from one secure workspace.
          </p>
          <div className="admin-hero__signals">
            <span><ShieldCheck /> Sole administrator access</span>
            <span><Activity /> Production data live</span>
          </div>
        </div>
        <div className="admin-hero__summary">
          <div className="admin-hero__summary-top"><span>Operations pulse</span><i /> Live</div>
          <strong>{allUsers.length}</strong>
          <p>client account{allUsers.length === 1 ? '' : 's'} in production</p>
          <div className="admin-hero__summary-line">
            <span>Configured channels</span><b>{configuredChannels}</b>
          </div>
          <div className="admin-hero__summary-line">
            <span>Awaiting voice assignment</span><b>{Math.max(0, allUsers.length - voiceAssignments.length)}</b>
          </div>
        </div>
      </section>

      <section className="admin-stat-grid" aria-label="Client operations summary">
        {stats.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="admin-stat-card" data-tone={tone}>
            <span className="admin-stat-card__icon"><Icon /></span>
            <div><strong>{value}</strong><p>{label}</p></div>
            <ArrowUpRight />
          </div>
        ))}
      </section>

      <section>
        <div className="admin-section-heading">
          <div><p className="admin-kicker">Demo workspace</p><h2>Demo client</h2></div>
          <span>isolated from production clients</span>
        </div>

        <article className="admin-client-card">
          <div className="admin-client-card__header">
            <div className="admin-client-avatar"><UserRoundCheck /></div>
            <div className="min-w-0 flex-1">
              <div className="admin-client-card__name-row">
                <h3>HVAC + Plumbing CRM Demo</h3>
                <span className="admin-state-badge" data-state="ready"><i /> Demo bridge ready</span>
              </div>
              <p>Use this client to test Vapi phone calls booking into the demo calendar without changing production accounts.</p>
            </div>
            <a
              href="/dashboard/demo/trades-crm"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/15"
            >
              Open demo CRM <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="admin-channel-grid">
            <div data-state="ready"><Phone /><span><strong>Vapi phone</strong><small>Assistant can call the demo booking endpoint</small></span><i /></div>
            <div data-state="ready"><CalendarDays /><span><strong>CRM calendar</strong><small>Imports phone bookings while the demo is open</small></span><i /></div>
            <div data-state="ready"><PlugZap /><span><strong>Bridge endpoints</strong><small>/api/demo-crm/{'{services,availability,bookings}'}</small></span><i /></div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/62">
            <p className="mb-2 font-semibold text-white">Vapi tool setup</p>
            <p className="mb-2">
              Three server tools, all POST, all accepting Vapi&apos;s tool-call envelope:
            </p>
            <ul className="mb-2 list-disc space-y-1 pl-5">
              <li><code className="rounded bg-white/10 px-1.5 py-0.5 text-white">get_service_details</code> → <code className="rounded bg-white/10 px-1.5 py-0.5 text-white">POST /api/demo-crm/services</code> — pass <code>serviceName</code> for one service, or nothing for the full catalog (16 services across HVAC, Plumbing, Maintenance, Sales).</li>
              <li><code className="rounded bg-white/10 px-1.5 py-0.5 text-white">check_availability</code> → <code className="rounded bg-white/10 px-1.5 py-0.5 text-white">POST /api/demo-crm/availability</code> — pass <code>date</code> plus optional <code>technician</code>, <code>serviceName</code>/<code>duration</code>, and <code>start</code> to check one slot.</li>
              <li><code className="rounded bg-white/10 px-1.5 py-0.5 text-white">book_appointment</code> → <code className="rounded bg-white/10 px-1.5 py-0.5 text-white">POST /api/demo-crm/bookings</code> — send name, email, phone, service, technician, date, start, duration, and notes.</li>
            </ul>
            <p>
              Technicians are Ramos, Keisha, Dawson, and Priya. The demo calendar imports booked rows and blocks same-technician overlaps.
            </p>
          </div>
        </article>
      </section>

      <section>
        <div className="admin-section-heading">
          <div><p className="admin-kicker">Account registry</p><h2>Client directory</h2></div>
          <span>{allUsers.length} production account{allUsers.length === 1 ? '' : 's'}</span>
        </div>

        <div className="admin-client-grid">
          {allUsers.map(client => {
            const outlook = outlookByUser.get(client.id);
            const instagram = instagramByUser.get(client.id);
            const voice = voiceByUser.get(client.id);
            const createdAt = new Date(client.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            });

            return (
              <article key={client.id} className="admin-client-card">
                <div className="admin-client-card__header">
                  <div className="admin-client-avatar">{client.name?.[0]?.toUpperCase() || '?'}</div>
                  <div className="min-w-0 flex-1">
                    <div className="admin-client-card__name-row">
                      <h3>{client.name}</h3>
                      {client.intakeCompleted && <span className="admin-state-badge" data-state="ready"><i /> Intake complete</span>}
                    </div>
                    <p>{client.email}{client.companyName ? ` / ${client.companyName}` : ''}</p>
                  </div>
                  <span className="admin-client-card__joined"><CalendarDays /> Joined {createdAt}</span>
                </div>

                <div className="admin-channel-grid">
                  <div data-state={outlook ? 'ready' : 'idle'}><Mail /><span><strong>Outlook</strong><small>{outlook ? outlook.outlookEmail : 'Not connected'}</small></span><i /></div>
                  <div data-state={instagram ? 'ready' : 'idle'}><Instagram /><span><strong>Instagram</strong><small>{instagram ? `@${instagram.igUsername}` : 'Not connected'}</small></span><i /></div>
                  <div data-state={voice ? 'ready' : 'idle'}><Phone /><span><strong>AI Receptionist</strong><small>{voice ? voice.label || voice.assistantName || 'Assigned' : 'Not assigned'}</small></span><i /></div>
                </div>

                <div className="admin-client-card__voice">
                  <AdminVoiceAgentPanel userId={client.id} userName={client.name} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <div className="admin-section-heading">
          <div><p className="admin-kicker">Automation layer</p><h2>Integration operations</h2></div>
          <span>{integrations.length + igIntegrations.length} connected workspace{integrations.length + igIntegrations.length === 1 ? '' : 's'}</span>
        </div>

        {integrations.length === 0 && igIntegrations.length === 0 ? (
          <div className="admin-empty-grid">
            <div className="admin-empty-panel"><span><Mail /></span><div><h3>Outlook automations</h3><p>No client has connected Outlook yet.</p></div></div>
            <div className="admin-empty-panel"><span><Instagram /></span><div><h3>Instagram automations</h3><p>No client has connected Instagram yet.</p></div></div>
          </div>
        ) : (
          <div className="space-y-6">
            {integrations.length > 0 && (
              <div className="admin-integration-group">
                <h3><PlugZap /> Outlook and n8n</h3>
                <div className="space-y-3">
                  {integrations.map(integration => (
                    <AdminClientRow
                      key={integration.integrationId}
                      integrationId={integration.integrationId}
                      userId={integration.userId}
                      userName={integration.userName || 'Unknown'}
                      userEmail={integration.userEmail || ''}
                      companyName={integration.companyName || ''}
                      outlookEmail={integration.outlookEmail}
                      displayName={integration.displayName || ''}
                      connectedAt={integration.connectedAt}
                      n8nWebhookUrl={integration.n8nWebhookUrl || ''}
                      graphSubscriptionId={integration.graphSubscriptionId || ''}
                      graphSubscriptionExpiry={integration.graphSubscriptionExpiry || ''}
                      tokenExpiresAt={integration.expiresAt}
                      intakeCompleted={!!integration.intakeCompleted}
                    />
                  ))}
                </div>
              </div>
            )}
            {igIntegrations.length > 0 && (
              <div className="admin-integration-group">
                <h3><Instagram /> Instagram and n8n</h3>
                <div className="space-y-3">
                  {igIntegrations.map(ig => (
                    <AdminInstagramRow
                      key={ig.integrationId}
                      integrationId={ig.integrationId}
                      userId={ig.userId}
                      userName={ig.userName || 'Unknown'}
                      userEmail={ig.userEmail || ''}
                      companyName={ig.companyName || ''}
                      igUsername={ig.igUsername}
                      igName={ig.igName}
                      connectedAt={ig.connectedAt}
                      tokenExpiresAt={ig.tokenExpiresAt}
                      n8nWebhookUrl={ig.n8nWebhookUrl || ''}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <footer className="admin-audit-note"><ShieldCheck /> Admin access is restricted to the approved production account and enforced on every server endpoint.</footer>
    </div>
  );
}
