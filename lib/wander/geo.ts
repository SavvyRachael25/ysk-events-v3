import { isLocated, type Located, type Pin } from "./types";

export { isLocated };

const EARTH_RADIUS_M = 6371008.8;

/**
 * Approximate walking pace used everywhere in the app. 80 m per minute is
 * about 4.8 km/h, a relaxed city pace with a coffee in hand. Straight-line
 * distance, so real walks run a little longer around blocks and rivers.
 */
export const WALK_M_PER_MIN = 80;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

/** Great-circle distance in metres (haversine). */
export function distanceM(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(s)));
}

/** Initial bearing from a to b, degrees clockwise from north, 0 to 360. */
export function bearingDeg(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const φ1 = toRad(aLat);
  const φ2 = toRad(bLat);
  const Δλ = toRad(bLng - aLng);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;

export function compass(bearing: number): (typeof COMPASS)[number] {
  return COMPASS[Math.round(bearing / 45) % 8];
}

export function walkMinutes(metres: number): number {
  return Math.max(1, Math.round(metres / WALK_M_PER_MIN));
}

export function formatDistance(metres: number): string {
  if (metres < 950) return `${Math.round(metres / 10) * 10} m`;
  return `${(metres / 1000).toFixed(metres < 9500 ? 1 : 0)} km`;
}

export function formatWalk(metres: number): string {
  const min = walkMinutes(metres);
  if (min < 60) return `${min} min walk`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} h ${m} min walk` : `${h} h walk`;
}

export interface Anchor {
  label: string;
  lat: number;
  lng: number;
  /** Pin id when the anchor is one of the board's own pins. */
  pinId?: string;
}

export interface NearbyHit {
  pin: Located;
  metres: number;
  bearing: number;
}

/** Every located pin other than the anchor itself, with distance, nearest first. */
export function nearby(pins: Pin[], anchor: Anchor, radiusM: number): NearbyHit[] {
  const hits: NearbyHit[] = [];
  for (const pin of pins) {
    if (!isLocated(pin)) continue;
    if (anchor.pinId && pin.id === anchor.pinId) continue;
    const metres = distanceM(anchor.lat, anchor.lng, pin.lat, pin.lng);
    if (metres <= radiusM) hits.push({ pin, metres, bearing: bearingDeg(anchor.lat, anchor.lng, pin.lat, pin.lng) });
  }
  return hits.sort((a, b) => a.metres - b.metres);
}

export interface Cluster {
  id: string;
  pins: Located[];
  centre: { lat: number; lng: number };
  /** Longest straight-line hop between any two pins in the cluster. */
  spanM: number;
}

/**
 * Groups located pins so that every pin sits within `linkM` of at least one
 * other pin in its group (single-linkage). No ordering is implied; a cluster
 * is just "these are all a short walk from each other".
 */
export function clusterPins(pins: Pin[], linkM: number): Cluster[] {
  const located = pins.filter(isLocated);
  const parent = located.map((_, i) => i);
  const find = (i: number): number => (parent[i] === i ? i : (parent[i] = find(parent[i])));
  const union = (a: number, b: number) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) parent[rb] = ra;
  };
  for (let i = 0; i < located.length; i++) {
    for (let j = i + 1; j < located.length; j++) {
      if (distanceM(located[i].lat, located[i].lng, located[j].lat, located[j].lng) <= linkM) union(i, j);
    }
  }
  const groups = new Map<number, Located[]>();
  located.forEach((pin, i) => {
    const root = find(i);
    const list = groups.get(root) ?? [];
    list.push(pin);
    groups.set(root, list);
  });
  const clusters: Cluster[] = [];
  for (const group of groups.values()) {
    const centre = {
      lat: group.reduce((s, p) => s + p.lat, 0) / group.length,
      lng: group.reduce((s, p) => s + p.lng, 0) / group.length,
    };
    let spanM = 0;
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        spanM = Math.max(spanM, distanceM(group[i].lat, group[i].lng, group[j].lat, group[j].lng));
      }
    }
    clusters.push({ id: group.map((p) => p.id).sort().join("+"), pins: group, centre, spanM });
  }
  // Biggest clusters first; singletons at the end.
  return clusters.sort((a, b) => b.pins.length - a.pins.length || a.spanM - b.spanM);
}

/** Parse "48.86, 2.33" or "48.86 2.33" or a Google Maps "@48.86,2.33,17z" fragment. */
export function parseLatLng(input: string): { lat: number; lng: number } | null {
  const m = input.match(/(-?\d{1,2}(?:\.\d+)?)\s*[, ]\s*(-?\d{1,3}(?:\.\d+)?)/);
  if (!m) return null;
  const lat = Number(m[1]);
  const lng = Number(m[2]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  return { lat, lng };
}

export function mapsSearchUrl(pin: Pin): string {
  if (isLocated(pin)) return `https://www.google.com/maps/search/?api=1&query=${pin.lat},${pin.lng}`;
  const q = [pin.name, pin.address, pin.trip].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function walkingDirectionsUrl(from: Anchor, to: Located): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${from.lat},${from.lng}&destination=${to.lat},${to.lng}&travelmode=walking`;
}
