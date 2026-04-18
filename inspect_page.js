const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log('CONSOLE:', msg.type(), msg.text());
  });

  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });

  try {
    console.log('Navigating to http://localhost:3002...');
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle', timeout: 30000 });
    
    const content = await page.content();
    console.log('--- ROOT HTML ---');
    console.log(content.substring(0, 500) + '...');
    
    const bodyVisible = await page.isVisible('body');
    const rootVisible = await page.isVisible('#__next') || await page.isVisible('main') || await page.isVisible('div');
    
    console.log('Body visible:', bodyVisible);
    console.log('Root element visible:', rootVisible);

    const bodyContent = await page.evaluate(() => document.body.innerHTML);
    console.log('Body innerHTML length:', bodyContent.length);
    if (bodyContent.length < 100) {
        console.log('Body content:', bodyContent);
    }

  } catch (e) {
    console.log('Navigation failed:', e.message);
  }

  await browser.close();
})();
