import { createDecipheriv, createHash, createHmac, timingSafeEqual } from "node:crypto";
import { FUNDING_BOARD_ENC } from "./funding-board.enc";

/**
 * Server-side gate for /funding.
 *
 * FUNDING_PASSWORD  the password the team types in.
 * FUNDING_DATA_KEY  base64, 32 bytes; decrypts lib/funding-board.enc.ts.
 *
 * The board is only decrypted and sent after the password is checked here,
 * so the page source a stranger sees holds the password form and nothing else.
 */

export const COOKIE = "ysk_funding";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function env() {
  const password = process.env.FUNDING_PASSWORD || "";
  const keyB64 = process.env.FUNDING_DATA_KEY || "";
  const key = Buffer.from(keyB64, "base64");
  return { password, key, ready: password.length >= 8 && key.length === 32 };
}

export function isConfigured(): boolean {
  return env().ready;
}

function sha(s: string): Buffer {
  return createHash("sha256").update(s, "utf8").digest();
}

export function passwordMatches(attempt: string): boolean {
  const { password, ready } = env();
  if (!ready) return false;
  return timingSafeEqual(sha(attempt), sha(password));
}

/** Session token. Changing the password signs everyone out. */
export function sessionToken(): string {
  const { password, key } = env();
  return createHmac("sha256", key).update("ysk-funding-session:v1:" + password).digest("base64url");
}

export function sessionValid(cookieValue: string | undefined): boolean {
  if (!cookieValue || !env().ready) return false;
  const a = Buffer.from(cookieValue);
  const b = Buffer.from(sessionToken());
  return a.length === b.length && timingSafeEqual(a, b);
}

export function boardHtml(): string {
  const { key } = env();
  const d = createDecipheriv("aes-256-gcm", key, Buffer.from(FUNDING_BOARD_ENC.iv, "base64"));
  d.setAuthTag(Buffer.from(FUNDING_BOARD_ENC.tag, "base64"));
  return Buffer.concat([d.update(Buffer.from(FUNDING_BOARD_ENC.ct, "base64")), d.final()]).toString("utf8");
}

export function gateHtml(opts: { error?: boolean; notReady?: boolean }): string {
  const msg = opts.notReady
    ? '<p class="err">This page is not switched on yet.</p>'
    : opts.error
      ? '<p class="err" role="alert">That password did not work.</p>'
      : "";
  const form = opts.notReady
    ? ""
    : `<form method="post" action="/funding" autocomplete="off">
      <label for="pw">Password</label>
      <input id="pw" name="password" type="password" required autofocus autocomplete="current-password">
      <button type="submit">Open the board</button>
    </form>`;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>YSK Funding Board</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&display=swap">
<style>
:root{--ink:#000;--paper:#fff;--line:#e6e6e6;--pink:#ff018f;--soft:#6a6a6a;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--ink:#fff;--paper:#000;--line:#303030;--soft:#a8a8a8;color-scheme:dark}}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--paper);color:var(--ink);font-family:Archivo,"Helvetica Neue",Arial,sans-serif;padding:24px 16px}
main{width:100%;max-width:380px}
.ribbon{height:6px;background:linear-gradient(90deg,#009ed6 0 25%,#3adfa8 25% 50%,#ff470f 50% 75%,#ff018f 75%);margin-bottom:28px}
.kick{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--soft);font-weight:600}
h1{font-size:32px;line-height:1.05;font-weight:800;text-transform:uppercase;letter-spacing:-.01em;margin:6px 0 22px}
label{display:block;font-size:13px;font-weight:600;margin-bottom:6px}
input{width:100%;font:inherit;font-size:16px;padding:12px;border:1px solid var(--ink);background:var(--paper);color:var(--ink);border-radius:0}
input:focus{outline:2px solid var(--pink);outline-offset:1px}
button{margin-top:14px;width:100%;font:inherit;font-weight:700;font-size:15px;padding:13px;border:0;border-radius:0;background:var(--ink);color:var(--paper);cursor:pointer}
button:hover{background:var(--pink);color:#fff}
.err{color:#d4006f;font-size:14px;margin:0 0 14px}
@media (prefers-color-scheme:dark){.err{color:#ff5cb0}}
</style>
</head><body><main>
<div class="ribbon"></div>
<div class="kick">YSK Events · Team only</div>
<h1>Funding Board</h1>
${msg}
${form}
</main></body></html>`;
}
