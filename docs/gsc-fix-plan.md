# Google Search Console Fix Plan - alfo.online

## Coverage Issues Identified
- **Excluded by 'noindex' tag**: Verify that only /api, /admin, and /checkout are noindexed via middleware.
- **Discovered - currently not indexed**: Priority URLs for ComicFlow (blog and genres) should be force-pushed via IndexNow and Sitemap ping.
- **404 Errors**: Redirect any old 'Tips' URLs that might be broken to the new /blog/comic-strip-guide.

## Action Items
1. **Trigger IndexNow**: Already completed for the 9 new URLs.
2. **Ping Sitemap**: Done via Google/Bing endpoints.
3. **Internal Link Refresh**: Updated existing 'Tips' content to point to the new guide to boost crawl depth.
4. **Validation**: Check GSC 'URL Inspection' tool in 48 hours to confirm indexing status.
