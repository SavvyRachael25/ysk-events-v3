import { NextResponse } from "next/server";

/**
 * Forward a site form to a GHL inbound webhook (Carmen Best pattern).
 * Only allow-listed keys leave the server. If the webhook is unset or GHL
 * fails, the form shows an error instead of a false "thank you".
 */
export function str(v: unknown, max = 4000) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function forward(webhook: string | undefined, tag: string, out: Record<string, string>) {
  if (!webhook) {
    console.error(`[${tag}] webhook env unset`);
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  }
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...out, source: "yskevents.com", submitted_at: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error(`[${tag}] GHL webhook returned`, res.status);
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }
  } catch (err) {
    console.error(`[${tag}] GHL webhook failed`, err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

export function splitName(name: string) {
  const parts = name.split(/\s+/);
  return { first_name: parts[0] ?? "", last_name: parts.slice(1).join(" ") };
}
