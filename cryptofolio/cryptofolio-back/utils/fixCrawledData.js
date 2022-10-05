const categoryData = require("../crawler/crawled/category/category.json");
const portfolioData = require("../crawler/crawled/portfolio/portfolio.json");
const { parseNumber } = require("./parseNumber");
const { upbitTickers } = require("../crawler/baseList/upbitList");
const { binanceTickers } = require("../crawler/baseList/binanceList");
/**
 *
 * @param {object} inputData Option for audioContext
 * @returns Created audioContext
 */
exports.fixCrawledData = (data) => {
  let fixedData = { ...data, categories: [], portfolios: [] };

  Object.entries(categoryData).forEach(([key, value]) => {
    if (value.ticker.includes(fixedData.ticker)) {
      fixedData.categories.push(key);
    }
  });

  Object.entries(portfolioData).forEach(([key, value]) => {
    if (value.ticker.includes(fixedData.ticker)) {
      fixedData.portfolios.push(key);
    }
  });

  if (fixedData.categories.length === 0) {
    fixedData.categories.push("etc");
  }

  if (upbitTickers.includes(fixedData.ticker)) {
    fixedData.exchanges.unshift("upbit");
  }

  if (binanceTickers.includes(fixedData.ticker)) {
    fixedData.exchanges.push("binance");
  }

  const {
    circulatingSupply,
    totalSupply,
    maxSupply,
    date,
    marketCap: { marketCap },
    price: { price },
    dominance,
  } = fixedData;

  const parsedCirculatingSupply = parseNumber(circulatingSupply);
  const parsedTotalSupply = parseNumber(totalSupply);
  const parsedMaxSupply = parseNumber(maxSupply);
  const parsedMarketCap = parseNumber(marketCap);
  const parsedPrice = parseNumber(price);
  const parsedDominance = parseNumber(dominance);

  fixedData = {
    ...fixedData,
    circulatingSupply: parsedCirculatingSupply,
    totalSupply: parsedTotalSupply,
    maxSupply: parsedMaxSupply,
    marketCap: {
      marketCap: parsedMarketCap,
      date,
    },
    price: {
      price: parsedPrice,
      date,
    },
    dominance: parsedDominance,
  };

  return fixedData;
};
