const puppeteer = require("puppeteer");
const Coin = require("../models/coinModel");
const { getDate } = require("../utils/getDate");

const crawlPricePage = async (page, i) => {
  try {
    const crawlResult = {
      marketCap: {},
      price: {},
    };

    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
    );
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.setDefaultNavigationTimeout(0);
    await page.goto(`https://coinmarketcap.com/?page=${i}`);

    await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
    await page.evaluate(async () => {
      window.scrollBy(0, 1500);
    });
    await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
    await page.evaluate(async () => {
      window.scrollBy(0, 1500);
    });
    await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
    await page.evaluate(async () => {
      window.scrollBy(0, 1500);
    });
    await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
    await page.evaluate(async () => {
      window.scrollBy(0, 1500);
    });
    await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
    await page.evaluate(async () => {
      window.scrollBy(0, 1500);
    });
    await page.waitForTimeout(Math.floor(Math.random() * 500 + 1000));
    await page.evaluate(async () => {
      window.scrollBy(0, 1500);
    });
    await page.waitForTimeout(Math.floor(Math.random() * 1000 + 2000));

    const crawledData = await page.evaluate(() => {
      const coinData = { price: {}, marketCap: {} };
      const NANRegex = /[^0-9.]/g;

      const ticker = Array.from(
        document.querySelectorAll("td .coin-item-symbol")
      ).map((v) => v.textContent);

      const price = Array.from(
        document.querySelectorAll("td .price___3rj7O")
      ).map((v) => parseFloat(v.textContent?.replace(NANRegex, "")));

      const marketCap = Array.from(document.querySelectorAll("td .kDEzev"))
        .filter((v, index) => !(index % 2))
        .map((v) => parseInt(v.textContent?.replace(NANRegex, ""), 10));

      ticker.forEach((value, index) => {
        coinData.price[value] = price[index];
        coinData.marketCap[value] = marketCap[index];
      });

      return coinData;
    });

    crawlResult.price = crawledData.price;
    crawlResult.marketCap = crawledData.marketCap;

    await page.waitForTimeout(Math.floor(Math.random() * 2000 + 1000));
    await page.close();

    return crawlResult;
  } catch (err) {
    console.log(err);
  }
};

const savePriceDB = async (date, priceList, marketCapList, i) => {
  try {
    await Coin.findOneAndUpdate(
      { ticker: priceList[i][0] },
      { price: { date, price: priceList[i][1] } }
    );

    await Coin.findOneAndUpdate(
      { ticker: marketCapList[i][0] },
      { marketCap: { date, marketCap: marketCapList[i][1] } }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.priceCrawler = async () => {
  console.log("start price crawler");
  try {
    const finalResult = {
      marketCap: {},
      price: {},
    };

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--window-size=1920, 1080", "--disable-notifications"],
    });

    const pageCrawlPromises = [];
    const savePromises = [];

    for (let i = 1; i < 11; i++) {
      const page = await browser.newPage();
      pageCrawlPromises.push(crawlPricePage(page, i));
    }

    const pageCrawlResult = await Promise.all(pageCrawlPromises);

    pageCrawlResult.forEach((data) => {
      finalResult.marketCap = { ...finalResult.marketCap, ...data.marketCap };
      finalResult.price = { ...finalResult.price, ...data.price };
    });

    finalResult.date = getDate();

    const updatedPrice = { ...finalResult };
    const priceList = Object.entries(updatedPrice.price);
    const marketCapList = Object.entries(updatedPrice.marketCap);

    for (let i = 0; i < Math.min(priceList.length, marketCapList.length); i++) {
      savePromises.push(
        savePriceDB(finalResult.date, priceList, marketCapList, i)
      );
    }

    await Promise.all(savePromises);
    await browser.close();

    const savedList = await Coin.find().lean();
    const savedResult = {};

    savedList.forEach((coin) => {
      savedResult[coin.ticker] = coin;
    });

    console.log("end price crawler");
    return savedResult;
  } catch (err) {
    console.error(err);
  }
};
