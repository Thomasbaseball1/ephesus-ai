import { db } from '@/db';
import { user as userTable, outlookIntegrations, voiceAgentAssignments, instagramIntegrations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Card } from '@/components/ui/card';
import { AdminClientRow } from '@/components/AdminClientRow';
import { AdminInstagramRow } from '@/components/AdminInstagramRow';
import { AdminVoiceAgentPanel } from '@/components/AdminVoiceAgentPanel';
import { Users, Plug, Webhook, Phone, Instagram } from 'lucide-react';

export default async function AdminPage() {
  // Fetch all users who have Outlook connected
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

  // Instagram integrations
  const igIntegrations = await db
    .select({
      integrationId: instagramIntegrations.id,
      userId: instagramIntegrations.userId,
      igUserId: instagramIntegrations.igUserId,
      igUsername: instagramIntegrations.igUsername,
      igName: instagramIntegrations.igName,
      accessToken: instagramIntegrations.accessToken,
      tokenExpiresAt: instagramIntegrations.tokenExpiresAt,
      connectedAt: instagramIntegrations.connectedAt,
      n8nWebhookUrl: instagramIntegrations.n8nWebhookUrl,
      userName: userTable.name,
      userEmail: userTable.email,
      companyName: userTable.companyName,
    })
    .from(instagramIntegrations)
    .leftJoin(userTable, eq(instagramIntegrations.userId, userTable.id));

  // All users (for overview stats)
  const allUsers = await db.select().from(userTable);
  const voiceAssignments = await db.select().from(voiceAgentAssignments).where(eq(voiceAgentAssignments.isActive, true));

  const stats = [
    { label: 'Total Clients', value: allUsers.length, icon: Users },
    { label: 'Outlook Connected', value: integrations.length, icon: Plug },
    { label: 'Instagram Connected', value: igIntegrations.length, icon: Instagram },
    { label: 'AI Receptionist', value: voiceAssignments.length, icon: Phone },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Client Management</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage client integrations and N8N workflow connections.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-5 gradient-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center shadow">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Clients with Outlook connected */}
      <div>
        <h2 className="font-semibold mb-4">Outlook Integrations</h2>
        {integrations.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground text-sm gradient-border">
            No clients have connected Outlook yet.
          </Card>
        ) : (
          <div className="space-y-3">
            {integrations.map((integration) => (
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
        )}
      </div>

      {/* Instagram integrations */}
      <div>
        <h2 className="font-semibold mb-4">Instagram Integrations</h2>
        {igIntegrations.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground text-sm gradient-border">
            No clients have connected Instagram yet.
          </Card>
        ) : (
          <div className="space-y-3">
            {igIntegrations.map((ig) => (
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
        )}
      </div>

      {/* All clients without Outlook */}
      {allUsers.filter(u => !integrations.find(i => i.userId === u.id)).length > 0 && (
        <div>
          <h2 className="font-semibold mb-4 text-muted-foreground">Other Clients</h2>
          <div className="space-y-3">
            {allUsers
              .filter(u => !integrations.find(i => i.userId === u.id))
              .map(u => (
                <Card key={u.id} className="gradient-border px-5 py-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0D9488] to-[#2DD4BF] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {u.name?.[0]?.toUpperCase() || '?'}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}{u.companyName ? ` · ${u.companyName}` : ''}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">No Outlook</span>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <AdminVoiceAgentPanel userId={u.id} userName={u.name} />
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
