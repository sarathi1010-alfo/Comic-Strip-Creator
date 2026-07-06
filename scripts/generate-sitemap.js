const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://comicflow.alfo.online';


function generateSitemap() {
  const currentDate = new Date().toISOString();

  // Load data files
  const blogData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/seo-blog.json'), 'utf-8'));
  const useCasesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/seo-use-cases.json'), 'utf-8'));
  const vsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/seo-vs.json'), 'utf-8'));
  const templatesData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/seo-templates.json'), 'utf-8'));

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/terms-of-service',
    '/privacy-policy',
    '/blog',
    '/faq',
    '/use-cases',
    '/vs',
    '/templates',
    '/editor',
  ];

  let sitemapIndexXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapIndexXml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (let sitemapId = 0; sitemapId < 1000; sitemapId++) {
    sitemapIndexXml += `  <sitemap>\n`;
    sitemapIndexXml += `    <loc>${BASE_URL}/sitemap/${sitemapId}.xml</loc>\n`;
    sitemapIndexXml += `  </sitemap>\n`;
  }
  sitemapIndexXml += '</sitemapindex>\n';
  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemapIndexXml);

  console.log('Sitemap Index generated at public/sitemap.xml');
}

generateSitemap();
