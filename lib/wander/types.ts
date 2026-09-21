/**
 * Wanderboard: a free-form travel vision board that sorts by category and by
 * proximity, on purpose never by time. Built for Christine (@slaystine).
 *
 * Everything lives in the browser (localStorage) and can be exported as JSON.
 */

export const CATEGORIES = [
  "cafe",
  "bakery",
  "restaurant",
  "bar",
  "shop",
  "museum",
  "landmark",
  "park",
  "view",
  "other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_META: Record<
  Category,
  { label: string; plural: string; emoji: string; hue: string }
> = {
  cafe: { label: "Café", plural: "Cafés", emoji: "☕", hue: "var(--w-cafe)" },
  bakery: { label: "Bakery", plural: "Bakeries", emoji: "🥐", hue: "var(--w-bakery)" },
  restaurant: { label: "Restaurant", plural: "Restaurants", emoji: "🍽️", hue: "var(--w-restaurant)" },
  bar: { label: "Bar", plural: "Bars", emoji: "🍸", hue: "var(--w-bar)" },
  shop: { label: "Shop", plural: "Shops", emoji: "🛍️", hue: "var(--w-shop)" },
  museum: { label: "Museum", plural: "Museums", emoji: "🖼️", hue: "var(--w-museum)" },
  landmark: { label: "Landmark", plural: "Landmarks", emoji: "🏛️", hue: "var(--w-landmark)" },
  park: { label: "Park", plural: "Parks", emoji: "🌳", hue: "var(--w-park)" },
  view: { label: "View", plural: "Views", emoji: "🌅", hue: "var(--w-view)" },
  other: { label: "Other", plural: "Other", emoji: "✨", hue: "var(--w-other)" },
};

export interface Pin {
  id: string;
  name: string;
  category: Category;
  /** The trip or city this belongs to, e.g. "Paris". One board holds many trips. */
  trip: string;
  /** Neighbourhood or district, free text. */
  area?: string;
  /** Why it is on the list. Free-form, the vision-board part. */
  note?: string;
  /** Where she found it: Instagram post, blog, Google Maps link. */
  source?: string;
  /** Optional image URL for the board tile. */
  image?: string;
  /** Free-form moods: "rainy day", "golden hour", "solo", "with mom". */
  tags: string[];
  lat?: number;
  lng?: number;
  address?: string;
  visited: boolean;
  createdAt: number;
}

export interface Board {
  version: 1;
  title: string;
  handle?: string;
  /** True while the board still holds the seeded sample. Cleared on first edit. */
  sample?: boolean;
  pins: Pin[];
}

export type Located = Pin & { lat: number; lng: number };

export function isLocated(pin: Pin): pin is Located {
  return typeof pin.lat === "number" && typeof pin.lng === "number" && Number.isFinite(pin.lat) && Number.isFinite(pin.lng);
}

/**
 * Sorts that are allowed on the board. There is deliberately no "by day" or
 * "by time": the whole point is a board, not an itinerary.
 */
export const BOARD_SORTS = [
  { id: "shuffle", label: "Shuffle" },
  { id: "category", label: "Category" },
  { id: "area", label: "Neighbourhood" },
  { id: "name", label: "A to Z" },
  { id: "newest", label: "Newest" },
] as const;

export type BoardSort = (typeof BOARD_SORTS)[number]["id"];
