import { getBaseUrl } from "@/lib/seo";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const baseUrl = getBaseUrl();

  const routes = [
    { url: baseUrl, priority: 1.0, changefreq: 'weekly' },
    { url: `${baseUrl}/editor`, priority: 0.8, changefreq: 'monthly' },
    { url: `${baseUrl}/templates`, priority: 0.8, changefreq: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.5, changefreq: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.5, changefreq: 'yearly' },
    { url: `${baseUrl}/privacy-policy`, priority: 0.3, changefreq: 'yearly' },
    { url: `${baseUrl}/terms-of-service`, priority: 0.3, changefreq: 'yearly' },
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const lastmod = new Date().toISOString();

  routes.forEach((route) => {
    xml += '  <url>\n';
    xml += `    <loc>${route.url}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
    },
  });
}
