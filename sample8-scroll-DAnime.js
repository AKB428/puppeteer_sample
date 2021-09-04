const puppeteer = require('puppeteer');
// https://anime.dmkt-sp.jp/animestore/CR/CR00000013
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1000});

  await page.goto(process.argv[2]);

  // 画像がローディングされないので1秒待つ
  await page.waitForTimeout(1000)

  await page.mouse.down(500)
　// 画像がローディングされないので1秒待つ
  await page.waitForTimeout(1000)
  
  await page.evaluate(async () => {
      const distance = 500;
      const delay = 200;
      couner = 0;
      while (couner <= 40) {
        // 500pxずつスクロール移動して、100ミリ秒待機する
        document.scrollingElement.scrollBy(0, distance);
        await new Promise(resolve => {
          setTimeout(resolve, delay);
        });
        couner+=1
      }
  })


  await page.screenshot({ path: 'example.png', fullPage: true });

  await browser.close();
})();