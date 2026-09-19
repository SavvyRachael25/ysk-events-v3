import { NextResponse } from "next/server";
import { forward, splitName, str } from "@/lib/ghl-forward";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try { body = (await request.json()) as Record<string, unknown>; } catch { return NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 }); }
  if (str(body.website)) return NextResponse.json({ ok: true, throttled: true }); // honeypot

  const name = str(body.name, 200);
  const email = str(body.email, 320);
  if (!name) return NextResponse.json({ ok: false, error: "missing-name" }, { status: 400 });
  if (!/\S+@\S+\.\S+/.test(email)) return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 });

  return forward(process.env.GHL_FAN_WEBHOOK, "keep-me-posted", { ...splitName(name), name, email });
}
