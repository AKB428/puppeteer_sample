// 1つの要素だけ取得するサンプル
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1000});

  // https://www.amazon.co.jp/gp/bestsellers/hobby/
  // https://www.amazon.co.jp/gp/bestsellers/dvd/
  await page.goto(process.argv[2]);

  await page.waitForSelector('#zg-right-col');
  const target = '.p13n-sc-truncated';
  const findElements = await page.$eval(target, element => {
    return element.textContent
  });
  console.log(findElements);
  await browser.close();
})();