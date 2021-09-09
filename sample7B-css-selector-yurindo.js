// ランキングのような複数の要素ブロックからブロック内の複数の要素（タイトル、価格）を取得するサンプル
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 1920, height: 1000});
  // https://www.yurindo.co.jp/ranking/week-all
  await page.goto(process.argv[2]);

  await page.waitForSelector('#best_main');
  const oneProductBlock = '.rank_list.clearfix.has_image'
  const productName = '.list_title.clearfix'
  const productPrice = '.price'
  const productUrl = '.a-link-normal'

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

  console.log(products)
  await browser.close();
})();