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
    'http://localhost:3000/blog/comic-color-theory-guide',
    'http://localhost:3000/genres/noir-comic-maker',
    'http://localhost:3000/genres/romance-comic-creator',
    'http://localhost:3000/genres/horror-comic-generator',
    'http://localhost:3000/genres/sci-fi-comic-builder',
    'http://localhost:3000/layouts/vertical-scroll-comic',
    'http://localhost:3000/layouts/2-panel-comic-layout',
    'http://localhost:3000/styles/pixel-art-comic-creator',
    'http://localhost:3000/styles/webtoon-style-comic-maker',
  ];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('Page Error: ' + msg.text());
    }
  });

  for (const url of urlsToTest) {
    console.log('Testing URL: ' + url);
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    if (response.status() !== 200) {
        console.error('Error: Expected status 200, but got ' + response.status() + ' for ' + url);
        process.exit(1);
    }
  }

  console.log('Testing editor functionality at /editor...');
  await page.goto('http://localhost:3000/editor', { waitUntil: 'networkidle' });

  try {
      // 1. Verify Panel Editor exists
      const panels = await page.locator('div[id^="panel-"]').all();
      console.log('Found ' + panels.length + ' panels.');
      assert(panels.length > 0, 'No comic panels found in editor.');

      // 2. Verify Asset Library loading (using text content in sidebars)
      const bodyText = await page.innerText('body');
      assert(bodyText.includes('Characters') || bodyText.includes('Props') || bodyText.includes('Assets'), 'Asset categories not found in editor.');

      // 3. Verify Export features
      const exportButtons = await page.locator('button').all();
      const exportTexts = await Promise.all(exportButtons.map(b => b.innerText()));
      const hasExport = exportTexts.some(text => text.includes('Export') || text.includes('PNG') || text.includes('PDF'));
      assert(hasExport, 'Export buttons not found.');

      console.log('✅ All core functionality checks passed.');
  } catch (error) {
      console.error('❌ Core functionality test failed: ' + error.message);
      process.exit(1);
  }

  await browser.close();
  console.log('All E2E tests completed successfully.');
})();
