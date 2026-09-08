# Deployment

The frontend deploys to Vercel from `main`.

## CI and merge protection

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`, using
Node.js 24, `npm ci`, lint, route type generation, TypeScript checking, and a
production build.

After the workflow has run on GitHub, configure protection for `main`:

- Require a pull request before merging.
- Require the `Quality checks` status check and an up-to-date branch.
- Prevent direct pushes and bypasses that would skip those checks.

Vercel deploys independently of GitHub Actions, so require `Quality checks`
before merging.

## Vercel configuration

| Setting | Required value |
| --- | --- |
| Framework preset | Next.js |
| Production branch | `main` |
| Build command | `npm run build` |
| Node.js | 24.x, matching CI |
| Output directory | Framework default |

Configure these public variables separately for Preview and Production:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_TERRAIN_API_URL` | Production: `https://api.terrain.ng`. Preview: test backend URL. |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Public `pk` token authorized for production or preview origins. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Production experiment pixel ID when tracking is enabled; omit in previews to avoid test events. |

Changes to these variables require a rebuild.

An unset API URL falls back to production. Until previews have a test backend,
intercept signup and check-request submissions in browser tests to avoid
writing production data.

## Release checks

Before merging, confirm CI passes and inspect the Vercel preview. After
deployment, confirm the expected commit is serving on the production domain.

- Open `/`, `/browse`, and `/explore`; verify listings and maps load.
- On mobile, enter and exit the landing map's explore mode. Page scrolling
  should work again after exit. On desktop, check drag-pan and page scrolling.
- Enable reduced motion: reveal content must be immediately visible without
  animation. With normal motion, verify sections reveal when scrolled into view.
- Open `/v/verified`, `/v/plans`, and `/v/abroad`. Against intercepted requests
  or a test backend, verify signup success and failure/retry, campaign parameter
  capture (maximum 400 characters), and a stable offer price during retries.
  Verify check-request success, failure/retry, and `Not now`.
- Inspect browser errors and Vercel runtime logs for new failures.

These browser checks are manual. See [Smoke Test Runbook](smoke_test_runbook.md)
for the marketing experiment.

## Rollback

If a release breaks critical browsing or signup, use Vercel's Instant Rollback
to restore the previous known-good production deployment. Recheck the affected
routes and record the failing commit and symptoms. Revert or fix that commit
through a pull request before the next release.

A frontend rollback does not reverse API migrations or database writes.
For incorrect environment variables, update the values and rebuild.

## References

- [Vercel Git deployments](https://vercel.com/docs/git)
- [Vercel environments](https://vercel.com/docs/deployments/environments)
- [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Vercel Instant Rollback](https://vercel.com/docs/instant-rollback)
