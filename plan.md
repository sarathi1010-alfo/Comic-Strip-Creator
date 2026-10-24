1. **Tier 1 Content Creation (Pillar Article)**
   - Add a new 1500+ word article to `src/data/seo-blog.json`.
   - Title: `Advanced Comic Color Psychology Guide: Master Emotion Through Hue`
   - Slug: `advanced-comic-color-psychology-guide-2026`
   - Will include proper H1, H2s, Executive Summary, AEO statistical data box, AI Snapshot (under first H2), FAQ Schema, and outbound links to `/` and `/assets`.
   - Word count will exceed 1500 words via a script payload.

2. **Tier 2 Programmatic Pages Creation**
   - Append 4 genres to `src/data/seo-genres.json`:
     - `cyberpunk-neon-noir-comic-creator`
     - `wholesome-slice-of-life-comic-maker`
     - `lovecraftian-horror-comic-generator`
     - `retro-futuristic-sci-fi-comic-builder`
   - Append 3 layouts to `src/data/seo-layouts.json`:
     - `mood-based-color-coded-layout`
     - `nostalgic-sepia-flashback-layout`
     - `hyper-saturated-action-layout`
   - Append 1 style to `src/data/seo-styles.json`:
     - `soft-pastel-watercolor-style`
   - Each entry will be ~350-400 words, have an `updatedAt` date, proper formatting, and FAQ Schema.

3. **Tier 3 Social Posts**
   - Create/append to `docs/seo-ops/social-posts-color-psychology.md` with 12 platform-native posts (X, Instagram, Pinterest, Reddit) promoting the new Tier 1 content.

4. **Internal Linking (Inbound Retroactive)**
   - Find two older posts in `src/data/seo-blog.json` (e.g., `comic-color-theory-guide` and `slice-of-life-comic-ideas`).
   - Modify their `intro` content to link to `/blog/advanced-comic-color-psychology-guide-2026`.
   - Update their `updatedAt` field to today.

5. **Sitemap and E2E Tests Configuration**
   - Append the 9 new URLs to `scripts/run_e2e_tests.js`.
   - The Next.js dynamic sitemap generation automatically includes URLs added to the JSON files. Run `npm run build` and `scripts/generate-sitemap.js` (if applicable) or verify standard sitemap output.

6. **E2E Test Execution & Verification**
   - Run the full E2E test suite or a subset explicitly testing the new URLs and core editor functionally. Wait for tests to pass successfully (200 OK statuses).

7. **IndexNow/Sitemap Ping Execution**
   - Trigger the IndexNow API via cURL to notify search engines about the new URLs.

8. **GSC Documentation**
   - Update `docs/gsc-fix-plan.md` documenting the updates and URL publication.

9. **Pre-commit Steps**
   - Run verification checks and `pre_commit_instructions` as required before submitting.

10. **Submit Changes**
   - Commit all updates and submit.
