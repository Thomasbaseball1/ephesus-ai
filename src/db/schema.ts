import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

// ─── Auth Tables (better-auth) ────────────────────────────────────────────────

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  // Custom portal fields
  companyName: text('company_name'),
  phone: text('phone'),
  intakeCompleted: integer('intake_completed', { mode: 'boolean' }).default(false),
  onboardingDismissed: integer('onboarding_dismissed', { mode: 'boolean' }).default(false),
});

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
});

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

// ─── App Tables ───────────────────────────────────────────────────────────────

export const intakeSubmissions = sqliteTable('intake_submissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyName: text('company_name').notNull(),
  contactEmail: text('contact_email'),
  userId: text('user_id').references(() => user.id),
  data: text('data').notNull(),
  createdAt: text('created_at').notNull(),
});

export const contacts = sqliteTable('contacts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull(),
});

export const outlookIntegrations = sqliteTable('outlook_integrations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  microsoftUserId: text('microsoft_user_id').notNull(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token').notNull(),
  expiresAt: integer('expires_at').notNull(), // unix timestamp
  scopes: text('scopes'),
  connectedAt: text('connected_at').notNull(),
  // N8N + Graph subscription
  n8nWebhookUrl: text('n8n_webhook_url'),
  graphSubscriptionId: text('graph_subscription_id'),
  graphSubscriptionExpiry: text('graph_subscription_expiry'),
});

// ─── Voice Agent Tables ───────────────────────────────────────────────────────

export const voiceAgentAssignments = sqliteTable('voice_agent_assignments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  assistantId: text('assistant_id').notNull(),       // Vapi assistant ID
  assistantName: text('assistant_name'),              // friendly label from Vapi
  label: text('label'),                               // admin-set display label (e.g. "Main Receptionist")
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  assignedAt: text('assigned_at').notNull(),
  assignedBy: text('assigned_by'),                    // admin email who assigned it
  phoneNumber: text('phone_number'),                  // phone number attached to assistant (if any)
  lastSyncedAt: text('last_synced_at'),               // when calls were last pulled
});

export const callRecords = sqliteTable('call_records', {
  id: text('id').primaryKey(),                        // Vapi call ID
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  assistantId: text('assistant_id').notNull(),
  assignmentId: integer('assignment_id').references(() => voiceAgentAssignments.id),

  // Timing
  createdAt: text('created_at'),
  updatedAt: text('updated_at'),
  startedAt: text('started_at'),
  endedAt: text('ended_at'),
  queuedAt: text('queued_at'),

  // Duration & outcome
  durationSeconds: integer('duration_seconds'),
  durationMinutes: text('duration_minutes'),
  status: text('status'),                             // queued, ringing, in-progress, forwarding, ended
  endedReason: text('ended_reason'),                  // hangup, silence, voicemail, etc.
  type: text('type'),                                 // inboundPhoneCall, outboundPhoneCall, webCall

  // Caller info
  callerPhoneNumber: text('caller_phone_number'),
  callerCity: text('caller_city'),
  callerState: text('caller_state'),
  callerCountry: text('caller_country'),
  callerZip: text('caller_zip'),
  calledNumber: text('called_number'),

  // Transcript & summary
  transcript: text('transcript'),
  summary: text('summary'),
  structuredData: text('structured_data'),            // JSON from extractors

  // Sentiment & analysis
  successEvaluation: text('success_evaluation'),      // true/false/unknown
  successEvaluationReason: text('success_evaluation_reason'),

  // Recording & artifact
  recordingUrl: text('recording_url'),
  stereoRecordingUrl: text('stereo_recording_url'),
  videoRecordingUrl: text('video_recording_url'),
  artifactMessages: text('artifact_messages'),        // JSON array of message objects

  // Cost
  costBreakdown: text('cost_breakdown'),              // JSON
  totalCost: text('total_cost'),

  // Analysis / tool calls / errors
  messages: text('messages'),                         // full JSON message array
  toolCalls: text('tool_calls'),                      // JSON
  analysis: text('analysis'),                         // JSON
  metadata: text('metadata'),                         // JSON — any extra Vapi fields

  // Transfer
  forwardedPhoneNumber: text('forwarded_phone_number'),
  transferDestination: text('transfer_destination'),

  rawPayload: text('raw_payload'),                    // full raw JSON from Vapi for future-proofing

  // ── AI-generated analysis (Claude) ──────────────────────────────────────────
  aiAnalyzedAt: text('ai_analyzed_at'),               // ISO timestamp when analysis was run
  callerIntent: text('caller_intent'),                // e.g. "Request company information"
  callType: text('call_type'),                        // new_lead | existing_customer | support | spam | other
  urgency: text('urgency'),                           // low | medium | high | critical
  sentiment: text('sentiment'),                       // positive | neutral | negative | mixed
  leadScore: integer('lead_score'),                   // 1–10
  buyerReadiness: text('buyer_readiness'),            // low | medium | high
  primaryTopic: text('primary_topic'),
  secondaryTopics: text('secondary_topics'),          // JSON array of strings
  keyEntities: text('key_entities'),                  // JSON: {person_names, company_names, phones, emails, locations, dates}
  objections: text('objections'),                     // JSON array of strings
  infoGathered: text('info_gathered'),                // JSON array of strings — what info was captured
  infoMissing: text('info_missing'),                  // JSON array of strings — what info is still needed
  nextBestAction: text('next_best_action'),
  followUpSms: text('follow_up_sms'),
  followUpEmailSubject: text('follow_up_email_subject'),
  followUpEmailBody: text('follow_up_email_body'),
  managerAlert: text('manager_alert'),
  automationIdeas: text('automation_ideas'),          // JSON array of strings
});

export const instagramIntegrations = sqliteTable('instagram_integrations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  igUserId: text('ig_user_id').notNull(),           // Instagram user ID
  igUsername: text('ig_username').notNull(),          // e.g. @ephesusai
  igName: text('ig_name'),                            // display name
  accessToken: text('access_token').notNull(),        // long-lived token
  tokenExpiresAt: text('token_expires_at'),           // ISO timestamp
  profilePicUrl: text('profile_pic_url'),
  connectedAt: text('connected_at').notNull(),        // ISO timestamp
  // n8n webhook that gets POSTed when a new follower is detected
  n8nWebhookUrl: text('n8n_webhook_url'),
});

export const bookings = sqliteTable('bookings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  date: text('date').notNull(),
  timeSlot: text('time_slot').notNull(),
  notes: text('notes'),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});
