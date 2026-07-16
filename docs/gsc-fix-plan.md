# Google Search Console (GSC) Fix Plan - 2026-07-14

## Current Status Analysis (Hypothetical GSC Snapshot)
- **Excluded (Discovered - currently not indexed):** 14 pages.
- **Crawled - currently not indexed:** 8 pages.
- **404 Errors:** 0 (Verified via local build & E2E).
- **Core Web Vitals:** Passing (Verified via Lighthouse locally).

## Priority Fixes

### 1. Accelerate Indexing for New Content
The new Tier 1 article (`/blog/comic-strip-guide`) and 8 programmatic pages must be indexed immediately.
- **Action:** Manual URL inspection and "Request Indexing" for `/blog/comic-strip-guide`.
- **Action:** Verify Sitemap inclusion (confirmed in `public/sitemap.xml`).
- **Action:** Submit sitemap via GSC dashboard manually since local `submit-sitemap.js` requires GCP keys.
- **Status (2026-07-14):** Published Tier 1 article (`/blog/comic-strip-guide`) and 8 programmatic pages. Retroactive linking completed. Technical integrity verified via build and E2E.

### 2. Address "Discovered - currently not indexed"
This usually indicates crawl budget issues or low-quality content signals.
- **Action:** Verify that all programmatic pages have at least 300 words of unique content (H1 + Intro + FAQs).
- **Action:** Ensure canonical tags are correctly pointing to self (verified in `metaFactories.ts` usage).
- **Action:** Monitor these URLs for the next 7 days. If they remain excluded, add 1-2 more internal links from high-authority posts.
- **Update (2026-07-14):** Added retroactive internal links from `comic-strip-structure-guide`, `character-design-for-comics`, `100-comic-strip-ideas`, and `how-to-write-a-comic-script` to the new Tier 1 authority guide.

### 3. Retroactive Internal Linking Audit
- **Action:** Check 10 older blog posts for "orphaned" status (low internal inbound links).
- **Action:** Link these orphaned posts to the new authority guides.
- **Completed (2026-07-14):** Retroactively linked four older posts to `/blog/comic-strip-guide` and refreshed their `updatedAt` dates.

### 4. Technical Hygiene
- **Action:** Regularly run `node scripts/run_e2e_tests.js` before every push to maintain the Zero Errors Policy.
- **Action:** Monitor `robots.txt` for unintended `Disallow` rules on marketing paths.
- **Status (2026-07-14):** Zero Errors Policy confirmed via local build and headless browser testing on all new URLs.

## Daily Update - 2026-07-14
- **Published Content:** Tier 1 guide (/blog/comic-strip-guide) and 8 programmatic Tier 2 pages.
- **Technical Verification:** Build successful, E2E tests passed (Status 200 for all new URLs, core functionality verified).
- **Internal Linking:** Retroactive links added to Tier 1 guide from 4 high-authority posts.
- **Sitemap:** public/sitemap.xml updated and verified.

## Daily Update - 2026-07-14
- **Published Content:** Tier 1 guide (/blog/comic-strip-guide) and 8 programmatic Tier 2 pages.
- **Technical Verification:** Build successful, E2E tests passed (Status 200 for all new URLs, core functionality verified).
- **Internal Linking:** Retroactive links added to Tier 1 guide from 4 high-authority posts.
- **Sitemap:** public/sitemap.xml updated and verified.

## Daily Update - 2026-07-16
- **Content Freshness:** Updated 'updatedAt' for Tier 1 guide (/blog/comic-strip-guide) and 8 programmatic Tier 2 pages.
- **Internal Linking:** Retroactively linked 'comic-book-lettering-guide' and 'how-to-create-superhero-comic-strips' to the new Tier 1 guide.
- **Technical Verification:** Passed. Verified 200 OK for all new URLs and core functionality.
