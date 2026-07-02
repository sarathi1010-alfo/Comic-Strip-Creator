# Google Search Console (GSC) Technical Hygiene & Fix Plan

## 1. Audit Current Status
- **Goal**: Identify all URLs with 4xx/5xx errors, excluded pages, and "Discovered - currently not indexed" status.
- **Action**: Export the "Indexing" report from GSC for the `alfo.online` property, filtering for the `comicflow` subdomain.

## 2. Address "Discovered - currently not indexed"
- **Issue**: Google knows about the URLs but hasn't crawled them yet.
- **Fix Plan**:
    - Ensure all new Tier 1 and Tier 2 URLs are included in the dynamic `sitemap.ts`.
    - Use the `scripts/submit-sitemap.js` tool to ping Google.
    - Implement a "Recommended Reading" widget on high-traffic pages to increase internal link juice to these new URLs.

## 3. Resolve 404 (Not Found) Errors
- **Issue**: Broken links or deleted content causing 404s.
- **Fix Plan**:
    - Identify 404 URLs from GSC.
    - If the content was moved, implement 301 redirects in `next.config.js`.
    - If the content was deleted, remove all internal links pointing to those URLs.
    - For high-value 404s, recreate the content or redirect to the most relevant category (e.g., `/genres` or `/blog`).

## 4. Fix "Crawled - currently not indexed"
- **Issue**: Google crawled the page but decided not to index it (often due to thin content or quality issues).
- **Fix Plan**:
    - Audit Tier 2 programmatic pages for "thin content" signals.
    - **Action Taken**: Already enhanced 8 programmatic pages with detailed FAQ sections and expanded intro text to improve quality scores.
    - Ensure each page has unique meta titles and descriptions (managed via `resolveMetadata.ts`).

## 5. Core Web Vitals & Mobile Usability
- **Goal**: Maintain 100/100 performance scores.
- **Action**:
    - Monitor GSC "Core Web Vitals" report.
    - Optimize any large image assets in the `/editor` or marketing pages.
    - Ensure the "AI Snapshot" and large headings don't cause Layout Shift (CLS).

## 6. Execution Timeline
- **Immediate**: Submit updated sitemap after today's publishing.
- **Weekly**: Monitor GSC for new coverage issues.
- **Monthly**: Full technical audit and link cleanup.
