const { chromium } = require('playwright');
const assert = require('assert');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const urlsToTest = [
    'http://localhost:3000/genres/neon-noir-comic-maker',
    'http://localhost:3000/genres/cyberpunk-color-comic-maker',
    'http://localhost:3000/genres/pastel-slice-of-life-comic',
    'http://localhost:3000/layouts/splash-page-layout-comic',
    'http://localhost:3000/blog/comic-anatomy-proportions-guide',
    'http://localhost:3000/genres/post-cyberpunk-comic-maker',
    'http://localhost:3000/genres/magic-realism-comic-creator',
    'http://localhost:3000/genres/superhero-origin-comic-maker',
    'http://localhost:3000/genres/detective-noir-comic-generator',
    'http://localhost:3000/layouts/comic-book-spread-layout',
    'http://localhost:3000/layouts/diamond-panel-comic-layout',
    'http://localhost:3000/layouts/honeycomb-panel-comic-layout',
    'http://localhost:3000/styles/gritty-comic-style',
    'http://localhost:3000/blog/comic-composition-perspective-guide',
    'http://localhost:3000/genres/mecha-comic-maker',
    'http://localhost:3000/genres/sports-comic-creator',
    'http://localhost:3000/genres/historical-fiction-comic-maker',
    'http://localhost:3000/layouts/splash-page-comic-layout',
    'http://localhost:3000/layouts/comic-book-cover-layout',
    'http://localhost:3000/layouts/2x2-grid-comic-layout',
    'http://localhost:3000/styles/comic-book-inking-style',
    'http://localhost:3000/styles/manga-shojo-style-creator',
    'http://localhost:3000/blog/mastering-comic-pacing-guide',
    'http://localhost:3000/genres/mythology-comic-maker',
    'http://localhost:3000/genres/fairy-tale-comic-creator',
    'http://localhost:3000/genres/dystopian-comic-generator',
    'http://localhost:3000/genres/space-opera-comic-builder',
    'http://localhost:3000/layouts/16-panel-grid-comic',
    'http://localhost:3000/layouts/circular-panel-comic-layout',
    'http://localhost:3000/layouts/irregular-panel-comic-layout',
    'http://localhost:3000/styles/line-art-comic-creator',
    'http://localhost:3000/blog/comic-background-design-guide',
    'http://localhost:3000/genres/supernatural-comic-maker',
    'http://localhost:3000/genres/steampunk-comic-creator',
    'http://localhost:3000/genres/zombie-comic-generator',
    'http://localhost:3000/genres/post-apocalyptic-comic-maker',
    'http://localhost:3000/layouts/10-panel-comic-layout',
    'http://localhost:3000/layouts/12-panel-grid-comic',
    'http://localhost:3000/layouts/diagonal-panel-comic',
    'http://localhost:3000/styles/manga-shonen-style-creator',
    'http://localhost:3000/blog/advanced-dialogue-techniques',
    'http://localhost:3000/genres/western-comic-maker',
    'http://localhost:3000/genres/mystery-comic-maker',
    'http://localhost:3000/genres/slice-of-life-comic-creator',
    'http://localhost:3000/genres/educational-comic-generator',
    'http://localhost:3000/layouts/1-panel-gag-cartoon',
    'http://localhost:3000/layouts/5-panel-comic-layout',
    'http://localhost:3000/layouts/9-panel-grid-comic',
    'http://localhost:3000/styles/pop-art-comic-maker',
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
    'http://localhost:3000/genres/thriller-comic-maker',
    'http://localhost:3000/genres/cyberpunk-comic-creator',
    'http://localhost:3000/genres/historical-comic-generator',
    'http://localhost:3000/genres/parody-comic-maker',
    'http://localhost:3000/layouts/7-panel-comic',
    'http://localhost:3000/layouts/8-panel-grid',
    'http://localhost:3000/layouts/infinite-canvas-comic',
    'http://localhost:3000/styles/watercolor-comic-creator',
    'http://localhost:3000/blog/digital-coloring-techniques-guide',
    'http://localhost:3000/genres/action-comic-maker',
    'http://localhost:3000/genres/comedy-comic-creator',
    'http://localhost:3000/layouts/5-panel-horizontal-layout',
    'http://localhost:3000/layouts/10-panel-grid-layout',
    'http://localhost:3000/styles/watercolor-comic-style',
    'http://localhost:3000/styles/pop-art-comic-style',
    'http://localhost:3000/styles/pixel-art-style',
    'http://localhost:3000/styles/retro-comic-style',
    'http://localhost:3000/blog/comic-inking-rendering-guide',
    'http://localhost:3000/genres/cyberpunk-noir-comic-maker',
    'http://localhost:3000/genres/urban-fantasy-comic-creator',
    'http://localhost:3000/genres/historical-romance-comic-maker',
    'http://localhost:3000/genres/space-western-comic-generator',
    'http://localhost:3000/layouts/asymmetrical-panel-comic-layout',
    'http://localhost:3000/layouts/widescreen-comic-layout',
    'http://localhost:3000/layouts/overlapping-panel-comic',
    'http://localhost:3000/styles/vintage-newspaper-comic-style',
    'http://localhost:3000/blog/character-expressions-guide',
    'http://localhost:3000/genres/fantasy-romance-comic-maker',
    'http://localhost:3000/genres/sci-fi-comedy-comic-creator',
    'http://localhost:3000/genres/superhero-parody-comic-maker',
    'http://localhost:3000/layouts/3x3-grid-comic-layout',
    'http://localhost:3000/layouts/4x4-grid-comic-layout',
    'http://localhost:3000/layouts/7-panel-irregular-comic',
    'http://localhost:3000/styles/minimalist-comic-style',
    'http://localhost:3000/styles/gothic-comic-style',
    'http://localhost:3000/blog/comic-lettering-sound-effects-guide',
    'http://localhost:3000/genres/martial-arts-comic-maker',
    'http://localhost:3000/genres/vampire-comic-creator',
    'http://localhost:3000/genres/time-travel-comic-generator',
    'http://localhost:3000/genres/spy-espionage-comic-builder',
    'http://localhost:3000/layouts/circle-panel-comic',
    'http://localhost:3000/layouts/triangle-panel-comic',
    'http://localhost:3000/layouts/layered-panel-comic',
    'http://localhost:3000/styles/charcoal-comic-style',
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
