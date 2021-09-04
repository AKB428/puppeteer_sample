const puppeteer = require('puppeteer');
// https://www.amazon.co.jp/gp/bestsellers/hobby/
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1000});
  // JSファイルの後の第一引数  [0]node [1]JSファイル名
  await page.goto(process.argv[2]);

  await page.waitForSelector('#zg-right-col');
  const oneProductBlock = '.zg-item-immersion'
  const productName = '.p13n-sc-truncated'
  const productPrice = '.p13n-sc-price'

  const findElements = await page.$$(oneProductBlock)
  const products = []
  
  console.log(findElements.length)

  for (const oneProduct of findElements) {
    const name = await oneProduct.$eval(productName, item => {
      return item.textContent;
    });
    const price = await oneProduct.$eval(productPrice, item => {
      return item.textContent;
    });

    products.push({name: name, price: price})
  };

  await browser.close();
})();