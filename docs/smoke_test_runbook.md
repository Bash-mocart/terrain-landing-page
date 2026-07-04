# Smoke Test Runbook

Companion to `terra-backend/docs/product_validation_field_kit.md` ("Smoke test
spec"). Everything needed to launch, run, and read the experiment.

## What's built

- **Variant pages** (this repo): `/v/verified`, `/v/plans`, `/v/abroad` — one
  layout, three hero promises. Static hero (no map) so ad-click LCP is fast.
  Pages are `noindex` (experiment traffic only).
- **Signup capture** (terra-backend, migration 061): `POST /v1/waitlist`
  stores contact + intent + variant + UTM blob, IP rate-limited. Rows land in
  `waitlist_signups`.
- **Fake-door pricing rider**: after signup, the visitor is offered an
  independent check at a price **randomized per visitor** (₦50k / ₦75k /
  ₦150k). A tap + property details → `POST /v1/waitlist/{id}/check-request`,
  recorded on the same row.
- **Meta Pixel**: set `NEXT_PUBLIC_META_PIXEL_ID` in the landing env. Fires
  `PageView`, `Lead` (tagged with variant + intent), and the custom
  `CheckRequested` (tagged with price).

## Launch checklist

1. Deploy terra-backend main (migration 061 auto-applies).
2. Create a Meta Pixel in Events Manager → set `NEXT_PUBLIC_META_PIXEL_ID` →
   deploy the landing page.
3. Smoke-check each URL: submit a test signup on each variant, confirm rows:
   `SELECT variant, contact FROM waitlist_signups ORDER BY created_at DESC LIMIT 5;`
   Delete the test rows before launch.
4. Create 3 campaigns (one per variant — separate campaigns so budget doesn't
   auto-shift toward the early winner and pollute the comparison), each with
   one ad set + one ad, all optimizing for the `Lead` event.

## Ad sets

| | V1 verified | V2 plans | V3 abroad |
|---|---|---|---|
| **Destination** | `/v/verified?utm_source=meta&utm_campaign=v1` | `/v/plans?utm_source=meta&utm_campaign=v2` | `/v/abroad?utm_source=meta&utm_campaign=v3` |
| **Geo** | Nigeria: Lagos, Abuja, Ogun | same as V1 | UK, US, Canada |
| **Age / targeting** | 25–50; interests: real estate, land ownership, property investment | same as V1 | 25–55; Nigerian expat interests (Nollywood, Nigerian news outlets) + real-estate interests |
| **Budget** | ₦18k over 9 days (₦2k/day) | ₦18k over 9 days | ₦18k-equivalent over 9 days |
| **Primary text** | You've heard the land stories. Fake papers. One plot sold to three people. Terrain is different: every listing checked, every company CAC-verified, before you ever see it. | Own land or a home without emptying your account. Interest-free instalment plans on verified plots and homes, from CAC-verified companies. | Buying land back home shouldn't require trusting an uncle's friend's agent. Terrain's accredited lawyer + surveyor check the title and stand on the land — evidence in your hands before you send anything. |
| **Headline** | Buy land without fear | Instalment plans on verified land | We stand on the land for you |
| **CTA button** | Learn More | Learn More | Learn More |

One visual across all three (same photo/graphic) — the *copy* is the variable
under test, so everything else stays constant.

## Readout

Run daily; decide at day 9–10.

```sql
-- Signups per variant (the headline number)
SELECT variant, COUNT(*) AS signups,
       COUNT(*) FILTER (WHERE intent = 'buy_soon') AS buy_soon
FROM waitlist_signups
GROUP BY variant ORDER BY signups DESC;

-- Fake-door: willingness to pay per price point
SELECT check_price_naira, COUNT(*) AS requests
FROM waitlist_signups
WHERE check_requested_at IS NOT NULL
GROUP BY check_price_naira ORDER BY check_price_naira;

-- Lead quality: intent mix per variant
SELECT variant, COALESCE(intent, '(skipped)') AS intent, COUNT(*)
FROM waitlist_signups GROUP BY 1, 2 ORDER BY 1, 3 DESC;
```

Combine with Ads Manager: cost per click and click→signup rate per variant.
**Pass rule** (pre-committed in the field kit): a variant wins at ≥2× the
signup rate of the others with ≥300 clicks each. If V1 (trust) doesn't win or
tie, that's evidence against leading the marketing with verification.

## Honesty rules (non-negotiable)

- **Answer every check request personally within 24h** and offer the concierge
  version (a real lawyer + surveyor, sourced via the Guide D interviews).
  Never leave the fake door unanswered.
- Fulfil the first 3 requests manually end-to-end — that's the COGS + SLA
  discovery for the paid-check product.
- Message every signup when early access actually opens; they are beta
  recruits, not just data points.
