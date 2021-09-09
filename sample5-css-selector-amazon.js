// 複数の要素を取得するサンプル
const puppeteer = require('puppeteer');
// https://www.amazon.co.jp/gp/bestsellers/hobby/
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1000});
  // JSファイルの後の第一引数  [0]node [1]JSファイル名
  await page.goto(process.argv[2]);

  await page.waitForSelector('#zg-right-col');
  const target = '.p13n-sc-truncated';
  const findElements = await page.$$eval(target, elements => {
    return elements.map(element => element.textContent);
  });
  console.log(findElements);
  await browser.close();
})();