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
  primarySoftware?: string[];
  currentSystems?: string[];
  systemsOverview?: string;
  disconnectedSystems?: string;
  biggestProblems?: string[];
  lostBusinessSources?: string[];
  automationGoals?: string[];
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
    const systemsOverview = asCleanText(body.systemsOverview);
    const currentProcess = asCleanText(body.currentProcess);
    const idealOutcome = asCleanText(body.idealOutcome);

    if (!name || !email || !company || !industry || !systemsOverview || !currentProcess || !idealOutcome) {
      return NextResponse.json(
        { error: "Name, email, company, industry, systems overview, current process, and ideal outcome are required." },
        { status: 400 },
      );
    }

    const primarySoftware = asCleanList(body.primarySoftware);
    const currentSystems = asCleanList(body.currentSystems);
    const biggestProblems = asCleanList(body.biggestProblems);
    const lostBusinessSources = asCleanList(body.lostBusinessSources);
    const automationGoals = asCleanList(body.automationGoals);

    const html = `
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

    await getResendClient().emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@ephesusai.com",
      to: SUPPORT_EMAIL,
      replyTo: email,
      subject: `[AI Opportunity Audit] ${company} - ${name}`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[ai-opportunity-audit] submit failed:", error);
    return NextResponse.json({ error: "Failed to submit questionnaire." }, { status: 500 });
  }
}
