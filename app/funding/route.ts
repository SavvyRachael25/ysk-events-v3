import { NextRequest } from "next/server";
import {
  COOKIE,
  COOKIE_MAX_AGE,
  boardHtml,
  gateHtml,
  isConfigured,
  passwordMatches,
  sessionToken,
  sessionValid,
} from "@/lib/funding-gate";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PRIVATE_HEADERS: Record<string, string> = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
};

function html(body: string, status = 200, extra: Record<string, string> = {}) {
  return new Response(body, { status, headers: { ...PRIVATE_HEADERS, ...extra } });
}

function redirect(request: NextRequest, search: string, cookie?: string) {
  const headers: Record<string, string> = {
    Location: new URL("/funding" + search, request.url).toString(),
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
  };
  if (cookie) headers["Set-Cookie"] = cookie;
  return new Response(null, { status: 303, headers });
}

function cookie(value: string, maxAge: number) {
  return `${COOKIE}=${value}; Path=/funding; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
}

export async function GET(request: NextRequest) {
  if (!isConfigured()) return html(gateHtml({ notReady: true }), 503);

  const url = request.nextUrl;
  if (url.searchParams.has("signout")) return redirect(request, "", cookie("", 0));

  if (sessionValid(request.cookies.get(COOKIE)?.value)) {
    return html(boardHtml());
  }
  return html(gateHtml({ error: url.searchParams.get("e") === "1" }), 401);
}

export async function POST(request: NextRequest) {
  if (!isConfigured()) return html(gateHtml({ notReady: true }), 503);

  let attempt = "";
  try {
    const form = await request.formData();
    attempt = String(form.get("password") ?? "");
  } catch {
    attempt = "";
  }

  if (attempt && passwordMatches(attempt)) {
    return redirect(request, "", cookie(sessionToken(), COOKIE_MAX_AGE));
  }
  // Slow down guessing.
  await new Promise((r) => setTimeout(r, 800));
  return redirect(request, "?e=1");
}
