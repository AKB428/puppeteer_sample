// サンプルを第一引数をとれるように変更したもの
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1000});
  // JSファイルの後の第一引数  [0]node [1]JSファイル名
  await page.goto(process.argv[2]);
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();