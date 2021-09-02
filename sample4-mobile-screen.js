const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // デバイスリスト
  // https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
  const device = puppeteer.devices['iPhone 11 Pro'];
  await page.emulate(device);
  await page.goto(process.argv[2]);
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();