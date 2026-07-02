const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 1000 });

  console.log('Capturing screenshot of /blog/comic-strip-guide');
  await page.goto('http://localhost:3000/blog/comic-strip-guide', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'tier1_article.png', fullPage: true });

  console.log('Capturing screenshot of /genres/superhero-comic-maker');
  await page.goto('http://localhost:3000/genres/superhero-comic-maker', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'tier2_genre.png', fullPage: true });

  console.log('Capturing screenshot of /editor');
  await page.goto('http://localhost:3000/editor', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'editor_page.png' });

  await browser.close();
})();
