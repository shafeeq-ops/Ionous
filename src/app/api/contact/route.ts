import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const INTERNAL_FROM = "Ionous Briefings <shafeeq@ionous.ai>";
const INTERNAL_TO = ["thomas@ionous.ai"];
const CUSTOMER_FROM = "Thomas Olson <thomas@ionous.ai>";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  "bot-field"?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body["bot-field"]) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !company || !message) {
    return NextResponse.json({ ok: false, error: "Missing required field" }, { status: 400 });
  }
  if (name.length > 200 || company.length > 200 || message.length > 5000) {
    return NextResponse.json({ ok: false, error: "Field too long" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();
  const userAgent = req.headers.get("user-agent") ?? "";
  const referer = req.headers.get("referer") ?? "";

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  const supabaseWrite = (async () => {
    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase env vars missing — skipping briefings insert");
      return { ok: false as const, reason: "supabase_not_configured" };
    }
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from("briefings").insert({
        name,
        email,
        company,
        message,
        user_agent: userAgent,
        referer,
        submitted_at: submittedAt,
      });
      if (error) {
        console.error("Supabase insert failed:", error.message);
        return { ok: false as const, reason: "supabase_insert_failed" };
      }
      return { ok: true as const };
    } catch (err) {
      console.error("Supabase write threw:", err);
      return { ok: false as const, reason: "supabase_threw" };
    }
  })();

  const resend = new Resend(resendKey);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const internalEmail = resend.emails.send({
    from: INTERNAL_FROM,
    to: INTERNAL_TO,
    replyTo: email,
    subject: `New briefing request: ${name} — ${company}`,
    text: [
      `New briefing request from ionous.ai`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Company: ${company}`,
      ``,
      `Message:`,
      message,
      ``,
      `—`,
      `Submitted: ${submittedAt}`,
      `User-Agent: ${userAgent}`,
      `Referer: ${referer}`,
    ].join("\n"),
    html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;color:#0b0f1a;">
        <p style="color:#5a5a66;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;margin:0 0 8px;">New briefing</p>
        <h2 style="margin:0 0 24px;font-size:22px;font-weight:500;">${safeName} <span style="color:#5a5a66;font-weight:400;">— ${safeCompany}</span></h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#5a5a66;width:80px;">Email</td><td><a href="mailto:${safeEmail}" style="color:#0b0f1a;">${safeEmail}</a></td></tr>
          <tr><td style="padding:6px 0;color:#5a5a66;">Company</td><td>${safeCompany}</td></tr>
        </table>
        <div style="margin:24px 0;padding:20px;border-left:2px solid #e6e6ea;background:#f7f7f9;border-radius:2px;">
          <p style="margin:0;line-height:1.6;font-size:15px;">${safeMessage}</p>
        </div>
        <p style="color:#8b8b95;font-size:12px;margin:24px 0 0;">Reply directly — Reply-To is set to the requester.<br/>Submitted ${submittedAt} · ${escapeHtml(userAgent)}</p>
      </div>
    `,
  });

  const customerEmail = resend.emails.send({
    from: CUSTOMER_FROM,
    to: [email],
    replyTo: INTERNAL_TO,
    subject: "We received your Ionous briefing request",
    text: [
      `Hi ${name},`,
      ``,
      `Thanks for reaching out. We've received your briefing request and will respond within two business days.`,
      ``,
      `For your records, here's what you sent:`,
      ``,
      `${message}`,
      ``,
      `If you need to add anything in the meantime, just reply to this email.`,
      ``,
      `— Thomas`,
      `Ionous`,
    ].join("\n"),
    html: `
      <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;color:#0b0f1a;line-height:1.6;">
        <p>Hi ${safeName},</p>
        <p>Thanks for reaching out. We've received your briefing request and will respond within two business days.</p>
        <p style="color:#5a5a66;font-size:13px;margin:24px 0 8px;">For your records, here's what you sent:</p>
        <div style="margin:0 0 24px;padding:16px 20px;border-left:2px solid #e6e6ea;background:#f7f7f9;border-radius:2px;">
          <p style="margin:0;font-size:14px;">${safeMessage}</p>
        </div>
        <p>If you need to add anything in the meantime, just reply to this email.</p>
        <p style="margin-top:32px;">— Thomas<br/><span style="color:#5a5a66;">Ionous</span></p>
      </div>
    `,
  });

  const [dbResult, internalResult, customerResult] = await Promise.allSettled([
    supabaseWrite,
    internalEmail,
    customerEmail,
  ]);

  const dbOk = dbResult.status === "fulfilled" && dbResult.value.ok;
  const internalOk =
    internalResult.status === "fulfilled" && !internalResult.value.error;
  const customerOk =
    customerResult.status === "fulfilled" && !customerResult.value.error;

  if (!internalOk && internalResult.status === "fulfilled") {
    console.error("Internal email failed:", internalResult.value.error);
  } else if (internalResult.status === "rejected") {
    console.error("Internal email threw:", internalResult.reason);
  }
  if (!customerOk && customerResult.status === "fulfilled") {
    console.error("Customer email failed:", customerResult.value.error);
  } else if (customerResult.status === "rejected") {
    console.error("Customer email threw:", customerResult.reason);
  }

  if (!internalOk && !dbOk) {
    return NextResponse.json(
      { ok: false, error: "Submission failed. Please email thomas@ionous.ai directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    stored: dbOk,
    internalNotified: internalOk,
    customerNotified: customerOk,
  });
}
