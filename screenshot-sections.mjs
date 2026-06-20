import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/56944/.cache/puppeteer/chrome/win64-149.0.7827.22/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
await new Promise(r => setTimeout(r, 2000));

// Marco Teorico
await page.evaluate(() => {
  document.querySelector('#marco-teorico')?.scrollIntoView();
});
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: 'temporary screenshots/screenshot-7-marco.png' });

// Lab showcase
await page.evaluate(() => {
  document.querySelector('#lab-showcase')?.scrollIntoView();
});
await new Promise(r => setTimeout(r, 800));
await page.screenshot({ path: 'temporary screenshots/screenshot-8-lab.png' });

await browser.close();
console.log('done');
