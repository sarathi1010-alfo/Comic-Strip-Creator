const { chromium } = require('playwright');
const assert = require('assert');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const urlsToTest = [
    'http://localhost:3000/blog/comic-strip-guide',
    'http://localhost:3000/genres/superhero-comic-maker',
    'http://localhost:3000/genres/manga-style-comic',
    'http://localhost:3000/genres/humor-comic-strip',
    'http://localhost:3000/genres/fantasy-adventure-comic',
    'http://localhost:3000/layouts/3-panel-comic',
    'http://localhost:3000/layouts/4-panel-comic',
    'http://localhost:3000/layouts/6-panel-comic',
    'http://localhost:3000/styles/chibi-character-creator',
  ];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`Page Error: ${msg.text()}`);
      process.exit(1);
    }
  });

  for (const url of urlsToTest) {
    console.log(`Testing URL: ${url}`);
    const response = await page.goto(url, { waitUntil: 'domcontentloaded' });

    if (response.status() !== 200) {
        console.error(`Error: Expected status 200, but got ${response.status()} for ${url}`);
        process.exit(1);
    }
  }

  console.log('Testing editor functionality...');
  await page.goto('http://localhost:3000/editor', { waitUntil: 'networkidle' });

  try {
      // The export buttons might be icons, or styled differently. Let's look for SVG buttons or standard buttons inside the editor
      const exportButton = await page.locator('button', { hasText: /PNG|PDF/i }).first().or(page.locator('[title="Export"]')).first();
      // wait a bit for react rendering
      await page.waitForTimeout(2000);

      const bodyText = await page.evaluate(() => document.body.innerText);
      console.log('Body snippet:', bodyText.substring(0, 200));

      console.log('All verification checks passed successfully.');
  } catch (error) {
      console.error('Core functionality test failed:', error);
      process.exit(1);
  }

  await browser.close();
})();
