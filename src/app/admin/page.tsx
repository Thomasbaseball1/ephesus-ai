import { db } from '@/db';
import Link from 'next/link';
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
  MonitorPlay,
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

      <section className="admin-integration-group">
        <h3><MonitorPlay /> Demo center</h3>
        <div className="admin-empty-panel">
          <span><Sparkles /></span>
          <div>
            <h3>Client portal AI demo</h3>
            <p>Preview the interactive conversation generator your clients can access from their dashboard.</p>
          </div>
          <Link href="/admin/demo" className="admin-action-button ml-auto inline-flex items-center justify-center">
            Open demo <ArrowUpRight />
          </Link>
        </div>
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
