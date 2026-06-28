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

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const addUrl = (urlPath, priority, changefreq) => {
    const fullUrl = urlPath === '' ? BASE_URL + '/' : `${BASE_URL}${urlPath}`;
    xml += `  <url>\n`;
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  };

  staticRoutes.forEach(route => addUrl(route, route === '' ? '1.0' : '0.8', 'monthly'));
  blogData.forEach(post => addUrl(`/blog/${post.slug}`, '0.7', 'weekly'));
  useCasesData.forEach(uc => addUrl(`/use-cases/${uc.slug}`, '0.7', 'monthly'));
  vsData.forEach(vs => addUrl(`/vs/${vs.slug}`, '0.7', 'monthly'));
  templatesData.forEach(template => addUrl(`/templates/${template.category}`, '0.7', 'monthly'));

  xml += '</urlset>\n';

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml);
  console.log('Sitemap generated at public/sitemap.xml');
}

generateSitemap();
