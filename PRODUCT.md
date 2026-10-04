# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Property buyers in Nigeria and Nigerians abroad buying back home (diaspora), both
first-timers building generational wealth and experienced buyers. Their shared fear: land
fraud, fake agents, double-sold plots, and, for the diaspora, not being able to walk the
plot themselves. Secondary audience: CAC-registered real estate companies who want to sell
to buyers who already trust what they find.

## Product Purpose

terrain.ng is the public face of Terrain, a Nigerian property marketplace (mobile app) that
makes buying land or a home as certain as a stamped registry record. Before launch, the
site's job is to make a fraud-wary buyer believe Terrain is different and **join the
waitlist**; companies get a smaller "Sell on Terrain" path. Success = waitlist sign-ups
from real buyers at home and abroad.

## Positioning

Only verified real estate companies can sell (CAC-checked before they list, shown with a
gold check), every listing is checked by Terrain, and the whole deal happens inside a
Terrain chat that can't be edited or deleted: message the company, receive the offer
letter, pay as agreed, and the deal is recorded at the registry. The record is the
product.

## Operating Context

- The app is not public yet: no store links. Listings are "Coming soon" on the site
  (`/browse`, `/explore`, and the hero map show no listings).
- The hero live map of Abuja (`src/components/LiveMap.tsx`, pins off) is the one part of the
  current site the owner likes and is kept.
- Public company pages exist at `/company/<id>` (shared from the app).
- Waitlist API: `POST /v1/waitlist` (existing form: `src/components/smoke/SignupForm.tsx`).
- Real data available from the API: verified companies (`/v1/home/sections`), company
  pages (`/v1/companies/{id}/page`). Never hardcode counts, cities or companies.

## Capabilities and Constraints

Confirmed in the product today:
- Verified companies (gold check) with staff profiles; companies invite their team by email.
- In-app chat with the company (no phone numbers exposed); chats are immutable; calls in app.
- Deal steps in the chat: offer letter → pay → recorded at the registry.
- Terrain checks listings (title documents: C of O > Govt Consent > Deed > Survey Plan > R of O).
- Payment plans (instalments) on listings; follow a company to get a push when it lists.
- Map with an infrastructure layer (roads and projects nearby) and nearby places.
- Listing media: photos and video.

Must not claim:
- 3D tours or drone aerials (not supported for sellers yet).
- Escrow or holding funds (Terrain never holds money).
- City coverage or listing counts that aren't from live data ("6 cities" was false).
- "Call the agent directly / contact details shown" (contact is in-app chat).
- Terrain Build and Terrain Grow as products (not built; the "Own. Build. Grow." line may stay
  as a promise).

## Brand Commitments

- Name: Terrain. Slogan: **Own. Build. Grow.**
- Brand colours black, white and green; green (#1A5C38 / #4A7C59) is for trust and verified
  marks, gold check for verified companies.
- Illustration family (app assets): warm painterly style, flat two-tone shading, faint
  grain; the same two characters (buyer woman in green gele and cream blouse, agent man in
  green kaftan and embroidered cap); palette forest green, laterite orange, sand, cream,
  charcoal. Deal-step scenes exist in the app repo (`assets/illustrations/buy_*.webp`).
- Voice: quiet confidence, short sentences, no hype.
- Imagery on the website: real photography (licensed stock or own shoots of Nigerian places,
  homes and people), not illustrations; the owner decided illustrations don't suit the
  landing page. People in photos are never presented as customers.

## Evidence on Hand

- Real: verified companies and their public pages; the app's illustrations.
- None yet: customer testimonials, closed deals, press. Do not fabricate testimonials,
  closings, user counts or city coverage.

## Product Principles

1. Trust through what's true — every claim on the page must be something the app does today.
2. The record is the story — show how a deal stays on record, not adjectives about safety.
3. Less text, more structure — the owner rejects text-heavy sections; let illustration and
   layout carry it.
4. One action — join the waitlist; companies have a quieter second path.

## Accessibility & Inclusion

Best effort WCAG AA contrast; works on mid-range Android over 3G (performance is
accessibility); readable on a phone first.
