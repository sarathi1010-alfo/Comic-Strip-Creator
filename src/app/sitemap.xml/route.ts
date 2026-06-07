import { getBaseUrl } from "@/lib/seo";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const baseUrl = getBaseUrl();

  // In a real application, you might dynamically fetch the list of available sitemaps
  const sitemaps = [
    `${baseUrl}/sitemaps/core.xml`,
    `${baseUrl}/sitemaps/use-cases.xml`,
    `${baseUrl}/sitemaps/blog.xml`,
    `${baseUrl}/sitemaps/vs.xml`,
    `${baseUrl}/sitemaps/templates.xml`,
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const lastmod = new Date().toISOString();

  sitemaps.forEach((url) => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });

  xml += '</sitemapindex>';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
    },
  });
}
