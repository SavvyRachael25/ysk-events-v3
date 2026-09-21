# Wanderboard

A free-form travel vision board that sorts by category and by proximity, and
deliberately never by time. Built for Christine (@slaystine). Lives at `/wander`.

The idea: save every café, shop, museum and corner you want, without turning
the list into an itinerary. When you decide where you are going today ("the
Louvre"), the Nearby tab shows which other saved places are within a short
walk, grouped by category, so the rest of the day can be wandered rather than
planned.

## What it does

- **Board**: scrapbook grid of everything saved. Filter by category and mood
  tag, search, and sort by shuffle (default), category, neighbourhood, A to Z
  or newest. There is no sort by date or day on purpose.
- **Nearby**: pick one anchor (a saved place, your live location, or any
  address), set a walking radius, and see what else on your list is inside
  it, with walk time and compass direction, a radar plot, and a walking
  directions link. "Surprise me" picks one.
- **Clusters**: groups saved places that sit within a few minutes of each
  other, so you can see that one anchor covers several wishes.
- **Add / edit**: name, category, trip, neighbourhood, note, moods, source
  link, image link, and a location found by search (OpenStreetMap),
  by "I'm here now", or by pasting coordinates.

## Where the data lives

In the browser, under one `localStorage` key. Nothing is sent to a server
except place-name lookups. The board menu exports and imports JSON, which is
also the backup and the way to move between phone and laptop.

The first open shows a sample Paris board with approximate pins. Any edit
makes the board yours; "Clear it, start fresh" empties it.

## Location search

`/api/wander/geocode` proxies OpenStreetMap's Nominatim with an identifying
User-Agent, as their usage policy asks. Set `WANDER_CONTACT` (an email or
URL) in the deployment environment so they can reach you if needed. If the
lookup is unavailable the form still accepts pasted coordinates.

## Files

- `app/wander/` route, layout, styles, icons
- `components/wander/` UI
- `lib/wander/` types, geo maths, sample board, storage
- `app/api/wander/geocode/route.ts` Nominatim proxy
- `public/wander/` web app manifest and icon (add to home screen)

## Moving it out

Everything is self-contained under the paths above and depends on nothing
else in this repository. To ship it on its own domain, copy those folders
into a fresh Next.js project and rename the route to `/`.
