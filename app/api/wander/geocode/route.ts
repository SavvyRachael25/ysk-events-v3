import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

/**
 * Thin proxy in front of OpenStreetMap's Nominatim search so the browser
 * never talks to it directly. Nominatim's usage policy asks for a real
 * User-Agent that identifies the app and for light, non-bulk use; a personal
 * board typing one place name at a time is well inside that. Set
 * WANDER_CONTACT (an email or URL) in the environment so they can reach you
 * if the traffic ever looks wrong.
 *
 * https://operations.osmfoundation.org/policies/nominatim/
 */
const NOMINATIM = "https://nominatim.openstreetmap.org/search";

export interface GeocodeHit {
  label: string;
  name: string;
  lat: number;
  lng: number;
  kind: string;
}

type NominatimRow = {
  display_name?: string;
  name?: string;
  lat?: string;
  lon?: string;
  type?: string;
  class?: string;
  addresstype?: string;
};

export async function GET(request: NextRequest) {
  const q = (request.nextUrl.searchParams.get("q") ?? "").trim().slice(0, 200);
  if (q.length < 2) return NextResponse.json({ ok: false, error: "query-too-short" }, { status: 400 });

  const url = new URL(NOMINATIM);
  url.searchParams.set("q", q);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "6");
  url.searchParams.set("addressdetails", "0");

  const contact = process.env.WANDER_CONTACT?.trim();
  const headers: Record<string, string> = {
    "User-Agent": `Wanderboard/1.0 (personal travel board${contact ? `; ${contact}` : ""})`,
    Accept: "application/json",
  };
  const lang = request.headers.get("accept-language");
  if (lang) headers["Accept-Language"] = lang;

  try {
    const upstream = await fetch(url, { headers, signal: AbortSignal.timeout(8000) });
    if (!upstream.ok) {
      return NextResponse.json({ ok: false, error: `upstream-${upstream.status}` }, { status: 502 });
    }
    const rows = (await upstream.json()) as NominatimRow[];
    const hits: GeocodeHit[] = rows
      .map((r) => ({
        label: r.display_name ?? "",
        name: r.name || (r.display_name ?? "").split(",")[0] || q,
        lat: Number(r.lat),
        lng: Number(r.lon),
        kind: r.addresstype || r.type || r.class || "place",
      }))
      .filter((h) => Number.isFinite(h.lat) && Number.isFinite(h.lng));
    return NextResponse.json(
      { ok: true, hits },
      { headers: { "Cache-Control": "public, max-age=86400, s-maxage=86400" } },
    );
  } catch {
    return NextResponse.json({ ok: false, error: "upstream-unreachable" }, { status: 502 });
  }
}
