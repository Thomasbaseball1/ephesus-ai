import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const SUPPORT_EMAIL = process.env.RESEND_TO_EMAIL || "support@ephesusai.com";

type AuditPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  industry?: string;
  teamSize?: string;
  monthlyLeads?: string;
  toolsOverview?: string;
  primarySoftware?: string[];
  currentSystems?: string[];
  systemsOverview?: string;
  disconnectedSystems?: string;
  biggestProblems?: string[] | string;
  lostBusinessSources?: string[];
  automationGoals?: string[] | string;
  currentProcess?: string;
  manualWork?: string;
  idealOutcome?: string;
  urgency?: string;
  budgetRange?: string;
  notes?: string;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(apiKey);
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function asCleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asCleanList(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim())
    : [];
}

function asCleanListOrText(value: unknown) {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim()).join(", ");
  return asCleanText(value);
}

function section(title: string, rows: [string, string | string[] | undefined][]) {
  const filteredRows = rows.filter(([, value]) => Array.isArray(value) ? value.length > 0 : Boolean(value));
  if (!filteredRows.length) return "";

  return `
    <h3 style="margin:24px 0 10px;color:#0D9488;font-size:16px;">${escapeHtml(title)}</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${filteredRows.map(([label, value]) => `
        <tr>
          <td style="width:34%;padding:10px 12px;border:1px solid #e5e7eb;background:#f8fafc;color:#475569;font-size:13px;font-weight:700;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;color:#0f172a;font-size:14px;line-height:1.55;vertical-align:top;white-space:pre-wrap;">${Array.isArray(value) ? escapeHtml(value.join(", ")) : escapeHtml(value)}</td>
        </tr>
      `).join("")}
    </table>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as AuditPayload;
    const name = asCleanText(body.name);
    const email = asCleanText(body.email).toLowerCase();
    const company = asCleanText(body.company);
    const industry = asCleanText(body.industry);
    const toolsOverview = asCleanText(body.toolsOverview);
    const systemsOverview = asCleanText(body.systemsOverview);
    const currentProcess = asCleanText(body.currentProcess);
    const idealOutcome = asCleanText(body.idealOutcome);
    const biggestProblems = asCleanListOrText(body.biggestProblems);
    const automationGoals = asCleanListOrText(body.automationGoals);

    if (!name || !email || !company || !industry || !toolsOverview || !systemsOverview || !biggestProblems || !automationGoals || !idealOutcome) {
      return NextResponse.json(
        { error: "Name, email, company, industry, tools, systems overview, problems, AI goals, and ideal outcome are required." },
        { status: 400 },
      );
    }

    const primarySoftware = asCleanList(body.primarySoftware);
    const currentSystems = asCleanList(body.currentSystems);
    const lostBusinessSources = asCleanList(body.lostBusinessSources);

    const internalHtml = `
      <div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;color:#0f172a;">
        <div style="border-radius:18px 18px 0 0;background:linear-gradient(135deg,#0D9488,#2DD4BF);padding:28px 32px;color:white;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;">AI Opportunity Audit</p>
          <h1 style="margin:0;font-size:26px;line-height:1.15;">${escapeHtml(company)}</h1>
          <p style="margin:10px 0 0;color:rgba(255,255,255,0.82);font-size:14px;">Submitted by ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:0;border-radius:0 0 18px 18px;padding:28px 32px;background:#ffffff;">
          ${section("Contact", [
            ["Name", name],
            ["Email", email],
            ["Phone", asCleanText(body.phone)],
            ["Company", company],
            ["Website", asCleanText(body.website)],
            ["Industry", industry],
          ])}
          ${section("Business Snapshot", [
            ["Team size", asCleanText(body.teamSize)],
            ["Monthly leads", asCleanText(body.monthlyLeads)],
            ["Tools overview", toolsOverview],
            ["Specific tools", primarySoftware],
            ["Current systems", currentSystems],
            ["Systems overview", systemsOverview],
            ["Disconnected systems", asCleanText(body.disconnectedSystems)],
          ])}
          ${section("Problems and Lost Business", [
            ["Biggest problems", biggestProblems],
            ["Lost business sources", lostBusinessSources],
            ["Current process", currentProcess],
            ["Manual work", asCleanText(body.manualWork)],
          ])}
          ${section("AI Fit", [
            ["Automation goals", automationGoals],
            ["Ideal outcome", idealOutcome],
            ["Urgency", asCleanText(body.urgency)],
            ["Budget range", asCleanText(body.budgetRange)],
            ["Notes", asCleanText(body.notes)],
          ])}
        </div>
      </div>
    `;

    const customerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;">
        <div style="border-radius:18px 18px 0 0;background:#071211;padding:28px 32px;color:white;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#77ead6;">Ephesus AI</p>
          <h1 style="margin:0;font-size:25px;line-height:1.18;">We received your AI audit</h1>
          <p style="margin:12px 0 0;color:rgba(255,255,255,0.74);font-size:15px;line-height:1.6;">Thanks, ${escapeHtml(name)}. We will review where ${escapeHtml(company)} can save time, respond faster, and reduce missed opportunities.</p>
        </div>
        <div style="border:1px solid #e5e7eb;border-top:0;border-radius:0 0 18px 18px;padding:28px 32px;background:#ffffff;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.7;">Based on what you shared, the best next step is a short conversation with Ephesus AI so we can map your current systems, identify the easiest automation win, and recommend what should be connected first.</p>
          ${section("What you told us", [
            ["Tools in use", primarySoftware],
            ["Tools overview", toolsOverview],
            ["Systems overview", systemsOverview],
            ["Biggest problems", biggestProblems],
            ["AI goals", automationGoals],
            ["Ideal outcome", idealOutcome],
          ])}
          <div style="margin-top:24px;border-radius:14px;background:#ecfeff;padding:18px 20px;">
            <p style="margin:0;color:#0f766e;font-size:14px;font-weight:700;">Suggested next step</p>
            <p style="margin:8px 0 0;color:#134e4a;font-size:14px;line-height:1.65;">Reply to this email or reach out to Ephesus AI to schedule a walkthrough. We can help turn this audit into a practical automation plan for calls, emails, scheduling, CRM updates, and follow-up.</p>
          </div>
          <p style="margin:22px 0 0;color:#64748b;font-size:13px;line-height:1.6;">Ephesus AI<br/>${escapeHtml(SUPPORT_EMAIL)}</p>
        </div>
      </div>
    `;

    const resend = getResendClient();
    const from = process.env.RESEND_FROM_EMAIL || "noreply@ephesusai.com";

    await Promise.all([
      resend.emails.send({
        from,
        to: SUPPORT_EMAIL,
        replyTo: email,
        subject: `[AI Opportunity Audit] ${company} - ${name}`,
        html: internalHtml,
      }),
      resend.emails.send({
        from,
        to: email,
        replyTo: SUPPORT_EMAIL,
        subject: "We received your Ephesus AI audit",
        html: customerHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ai-opportunity-audit] submit failed:", error);
    return NextResponse.json({ error: "Failed to submit questionnaire." }, { status: 500 });
  }
}
