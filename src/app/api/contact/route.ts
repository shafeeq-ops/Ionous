import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  "bot-field"?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body["bot-field"]) {
    return NextResponse.json({ ok: true });
  }

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

  const webhook = process.env.ZAPIER_WEBHOOK_URL;
  if (!webhook) {
    console.error("ZAPIER_WEBHOOK_URL not configured");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  const submittedAt = new Date().toISOString();
  const userAgent = req.headers.get("user-agent") ?? "";
  const referer = req.headers.get("referer") ?? "";

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "ionous.com briefing form",
        submittedAt,
        name,
        email,
        company,
        message,
        userAgent,
        referer,
      }),
    });
    if (!res.ok) {
      console.error("Zapier webhook returned", res.status);
      return NextResponse.json({ ok: false, error: "Upstream failure" }, { status: 502 });
    }
  } catch (err) {
    console.error("Zapier webhook fetch failed", err);
    return NextResponse.json({ ok: false, error: "Upstream failure" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
