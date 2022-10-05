const { CATEGORY_DATA } = require("../crawler/baseData/CATEGORY_DATA");
const { PORTFOLIO_DATA } = require("../crawler/baseData/PORTFOLIO_DATA");
const { parseNumber } = require("./parseNumber");
const {
  COIN_TICKERS_UPBIT,
  COIN_TICKERS_BINANCE,
} = require("../crawler/baseData/coinData");
/**
 *
 * @param {object} inputData Option for audioContext
 * @returns Created audioContext
 */
exports.fixCrawledData = (data) => {
  let fixedData = { ...data, categories: [], portfolios: [] };

  Object.entries(CATEGORY_DATA).forEach(([key, value]) => {
    if (value.ticker.includes(fixedData.ticker)) {
      fixedData.categories.push(key);
    }
  });

  Object.entries(PORTFOLIO_DATA).forEach(([key, value]) => {
    if (value.ticker.includes(fixedData.ticker)) {
      fixedData.portfolios.push(key);
    }
  });

  if (fixedData.categories.length === 0) {
    fixedData.categories.push("etc");
  }

  if (COIN_TICKERS_UPBIT.includes(fixedData.ticker)) {
    fixedData.exchanges.unshift("upbit");
  }

  if (COIN_TICKERS_BINANCE.includes(fixedData.ticker)) {
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
