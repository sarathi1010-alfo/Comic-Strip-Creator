# Google Search Console (GSC) Fix Plan - 2026-07-12

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
- **Status (2026-07-12):** Published Tier 1 article and 8 programmatic pages. Technical integrity verified via build and E2E.

### 2. Address "Discovered - currently not indexed"
This usually indicates crawl budget issues or low-quality content signals.
- **Action:** Verify that all programmatic pages have at least 300 words of unique content (H1 + Intro + FAQs).
- **Action:** Ensure canonical tags are correctly pointing to self (verified in `metaFactories.ts` usage).
- **Action:** Monitor these URLs for the next 7 days. If they remain excluded, add 1-2 more internal links from high-authority posts.
- **Update (2026-07-12):** Added retroactive internal links from `comic-strip-structure-guide` and `character-design-for-comics` to the new Tier 1 authority guide.

### 3. Retroactive Internal Linking Audit
- **Action:** Check 10 older blog posts for "orphaned" status (low internal inbound links).
- **Action:** Link these orphaned posts to the new authority guides.
- **Completed (2026-07-12):** Retroactively linked two older posts to `/blog/comic-strip-guide` and refreshed their `updatedAt` dates.

### 4. Technical Hygiene
- **Action:** Regularly run `node scripts/run_e2e_tests.js` before every push to maintain the Zero Errors Policy.
- **Action:** Monitor `robots.txt` for unintended `Disallow` rules on marketing paths.
- **Status (2026-07-12):** Zero Errors Policy confirmed via local build and headless browser testing on all new URLs.
