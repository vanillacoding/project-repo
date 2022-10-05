import {
  CHART_TYPE,
  COLORS,
  CATEGORIES,
  TICKERS,
} from "../constants/constants";
import * as d3 from "d3";

/**
 *
 * @param {object} d
 * @param {string} chartType
 * @returns Color Code
 */
const getCircleColor = (d, chartType) => {
  if (chartType === CHART_TYPE.EXCHANGE) {
    if (d.exchanges.length === 2) {
      return COLORS.BOTH_EXCHANGE;
    } else if (d.exchanges.includes("binance")) {
      return COLORS.BINANCE;
    } else {
      return COLORS.UPBIT;
    }
  }

  if (chartType === CHART_TYPE.CATEGORY) {
    const color = d3.scaleOrdinal(d3["schemeSet2"]);
    color.domain(CATEGORIES);
    return color(d.categories[0]);
  }

  if (chartType === CHART_TYPE.PORTFOLIO) {
    const color = d3.scaleOrdinal([
      "#cfe1f2",
      "#b5d4e9",
      "#93c3df",
      "#6daed5",
      "#4b97c9",
      "#2f7ebc",
      "#1864aa",
    ]);
    color.domain(TICKERS);
    return color(d.name);
  }

  if (chartType === CHART_TYPE.MYPORTFOLIO) {
    const color = d3.scaleOrdinal([
      "#fdd8b3",
      "#fdc28c",
      "#fda762",
      "#fb8d3d",
      "#f2701d",
      "#e25609",
    ]);
    color.domain(TICKERS);
    return color(d.name);
  }
};

export default getCircleColor;
