import dayjs from "dayjs";
import calculateProfit from "./calculateProfit";
/**
 *
 * @param {array} cryptofolioList
 * @param {object} coinData
 * @return {array} sorted List
 */
const getMonthlySorted = (cryptofolioList = [], coinData = {}) => {
  return calculateProfit(cryptofolioList, coinData)
    .filter(
      (cryptofolio) =>
        new Date(dayjs(cryptofolio.createdAt)) -
          new Date(dayjs(Date.now()).add(-1, "month")) >
        0
    )
    .sort((a, b) => b.profitPercent - a.profitPercent);
};

export default getMonthlySorted;
