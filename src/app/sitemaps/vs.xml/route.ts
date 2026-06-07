import { getBaseUrl } from "@/lib/seo";
import vsData from '@/data/seo-vs.json';

export const revalidate = 86400;

export async function GET() {
  const baseUrl = getBaseUrl();
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const lastmod = new Date().toISOString();

  vsData.forEach((post) => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/vs/${post.slug}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
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
