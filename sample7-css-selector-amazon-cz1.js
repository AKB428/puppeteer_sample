const puppeteer = require('puppeteer');
// 引数URL例
// https://www.amazon.co.jp/gp/bestsellers/hobby/
// https://www.amazon.co.jp/gp/bestsellers/books
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1000});
  // JSファイルの後の第一引数  [0]node [1]JSファイル名
  await page.goto(process.argv[2]);

  await page.waitForSelector('#zg-right-col');
  const oneProductBlock = '.zg-item-immersion'
  const productRanking = '.zg-badge-text'
  const productName = '.p13n-sc-truncated'
  const productPrice = '.p13n-sc-price'
  const productUrl = '.a-link-normal'

  const findElements = await page.$$(oneProductBlock)
  const products = []
  
  console.log(findElements.length)

  for (const oneProduct of findElements) {
    const ranking = await oneProduct.$eval(productRanking, item => {
      return item.textContent;
    });
    const name = await oneProduct.$eval(productName, item => {
      return item.textContent;
    });
    const price = await oneProduct.$eval(productPrice, item => {
      return item.textContent;
    });
    const url = await oneProduct.$eval(productUrl, item => {
      return item.href;
    });

    products.push({ranking: ranking, name: name, price: price, url: url})
  };

  console.log(products)
  await browser.close();
})();