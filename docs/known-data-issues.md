# Known Data Issues + Proposed Backend Fixes

Things we've patched around on the landing page that should ideally be
fixed in the data layer / backend instead. This file is a pointer; the
actual fixes belong in `terra-backend` and the Flutter seller wizard.

Each entry names the symptom, where we band-aided it, and the
recommended permanent fix.

---

## 1. FCT districts saved as `city` instead of "Abuja"

**Symptom.** Sellers in Abuja save the `city` field as the local
district name (Gwarinpa, Maitama, Wuse II, Asokoro, Wuye, Jabi,
Garki, etc.) rather than as "Abuja". The hero map's
`?city=Abuja&verified=true` query missed these listings entirely;
the map looked sparse despite the dev DB having real Abuja
inventory.

**Where we band-aided it.** `src/components/LiveMap.tsx`. Dropped
the `city=Abuja` query parameter; switched to a coordinates-based
client-side filter using `ABUJA_MAX_BOUNDS` (the FCT envelope the
map already locks to). Anything geographically in FCT renders
regardless of how the `city` field is shaped.

**Why this is wrong long-term.**

- The Flutter buyer-map, the search-results screen, the city explore
  screen, and the saved-listings screen all still filter by city
  string. They miss the Gwarinpa-as-city listings the same way the
  landing did before our patch. Fixing only the landing leaves the
  product surfaces broken.
- The fallback strategy (drop the filter, bounds-check on client)
  doesn't scale to other cities. We'd need a separate bounding box
  for every supported city.
- The data also makes city-level analytics inaccurate. "Verified
  plots in Abuja" undercounts.

**Recommended fix (in `terra-backend`).**

1. Normalise FCT districts to `city="Abuja"` at write time:
   - In the listing create / update handler, detect a known FCT
     district name and rewrite `city` to "Abuja".
   - Move the district name into a new field, e.g.
     `neighborhood VARCHAR(80)`.
   - Same pattern for Lagos districts (Lekki, Ikoyi, Victoria
     Island, Yaba, Surulere, etc.) and Port Harcourt districts.
2. One-time backfill migration: scan existing listings, detect
   FCT / Lagos / PH district strings in the `city` column, and
   rewrite as above.
3. Either:
   - Bake a static city-district lookup table into Go (cheap, easy
     to audit, hard to extend), or
   - Drive it from a `city_aliases` Postgres table the admin
     surface can manage.

**Once that ships**, revert `LiveMap.tsx` to a normal `city=Abuja`
filter and delete the bounds-check filter.

---

## 2. Listings with `lat=0, lng=0`

**Symptom.** Earlier in development we saw verified listings with
`latitude=0, longitude=0`. These are seller-flow defaults: the
seller didn't tap the map to place the pin, the backend accepted
the listing anyway, and it ends up at the intersection of the
prime meridian and equator (Atlantic Ocean off the African
coast).

**Where we band-aided it.** `src/components/LiveMap.tsx`. The
coordinates filter already excludes any listing where
`Number.isFinite(lat) && Number.isFinite(lng)` doesn't hold AND
the bounds check (lat / lng must be inside FCT) naturally drops
(0, 0). So this works for the landing for free.

**Why this is wrong long-term.**

- Verification flow should never let a listing reach `verified=true`
  without valid coordinates. A reviewer who confirmed the title
  document but not the location is half-doing the job.
- The Flutter app surfaces these listings as "at the coast of West
  Africa" on the buyer map (technically correct, practically broken).

**Recommended fix (in `terra-backend`).**

1. Add a database check constraint:
   `CHECK (latitude != 0 OR longitude != 0)` on listing_properties.
   Cheap and prevents the symptom at write time.
2. Make the seller wizard's map-pick step REQUIRED (currently
   optional in the form layer).
3. Migrate existing zeroed coordinates: either set them to NULL
   (and unverify the listing), or update them to the city centroid
   as a last-resort fallback.

---

## 3. `verified=true` filter passes through to `/v1/listings/map`

**Symptom.** Not observed yet, just flagged for awareness. The
`/v1/listings` endpoint accepts `verified=true`. The Flutter app's
map view at scale uses `/v1/listings/map` which is a compact
projection. If these endpoints diverge on which filters they
honour, the landing page (which uses `/v1/listings`) and the
Flutter buyer-map (which uses `/v1/listings/map`) could show
different inventory for the same query.

**Where we band-aided it.** Nowhere yet. Both surfaces happen to
use compatible filters today.

**Recommended fix (in `terra-backend`).**

Keep the filter contracts between `/v1/listings` and
`/v1/listings/map` in lockstep. If a new filter is added to one,
add it to the other. A handler-level shared filter struct (or a
test that diffs the two query params) would help.

---

## How this file gets removed

When item 1 ships in `terra-backend` (FCT / Lagos district
normalisation), remove the `BAND-AID` block from `LiveMap.tsx` and
delete the corresponding section above. When item 2 ships (zero-
coord rejection), delete that section too. The goal is for this
file to be empty within a few sprints — band-aids are temporary by
design.
