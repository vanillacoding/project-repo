const puppeteer = require("puppeteer");
const MetaData = require("../models/metadataModel");
const { getDate } = require("../utils/getDate");
const { getAverage } = require("../utils/getAverage");
const { parseNumber } = require("../utils/parseNumber");

exports.metadataCrawler = async () => {
  console.log("start metadata crawler");
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--window-size=1920, 1080", "--disable-notifications"],
    });

    const page = await browser.newPage();
    const metadata = {};

    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
    );
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    await page.goto("https://coinpan.com/");
    await page.waitForTimeout(Math.floor(Math.random() * 100 + 100));
    const premium = await page.evaluate(async () => {
      return Array.from(
        document.querySelectorAll(".korea_premium .diff_percent")
      ).map((v) => v.textContent);
    });

    await page.goto("https://coinmarketcap.com/");
    await page.waitForTimeout(Math.floor(Math.random() * 100 + 100));
    const crawled = await page.evaluate(async () => {
      return Array.from(document.querySelectorAll(".container .eALoKW"))
        .map((v) => v.textContent)
        .slice(0, 5);
    });

    await page.goto("https://kr.tradingview.com/symbols/USDKRW/");
    await page.waitForTimeout(Math.floor(Math.random() * 100 + 100));
    const rate = await page.evaluate(() => {
      return document.querySelector(".tv-symbol-price-quote__value")
        .textContent;
    });

    metadata.time = getDate();
    metadata.premium = getAverage(premium);
    metadata.rate = parseNumber(rate);
    metadata.marketCapDollar = parseNumber(crawled[2]);
    metadata.marketCapWon = metadata.marketCapDollar * parseNumber(rate);
    metadata.dominance = crawled[4].split(":")[2].replace("ETH", "").trim();

    await page.close();
    await browser.close();

    await MetaData.deleteMany();
    await MetaData.create(metadata);

    console.log("end metadata crawler");
    return metadata;
  } catch (err) {
    console.error(err);
  }
};
