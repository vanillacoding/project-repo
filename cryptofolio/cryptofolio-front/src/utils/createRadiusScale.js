import * as d3 from "d3";
import {
  MARKETCAP_RANGE,
  CIRCLE_TYPE,
  PRICE_RANGE,
} from "../constants/constants";

/**
 *
 * @param {string} circleType
 * @param {object} data
 * @returns radius scale
 */

const createRadiusScale = (circleType = CIRCLE_TYPE.MARKETCAP, data) => {
  let max, min;
  switch (circleType) {
    case CIRCLE_TYPE.MARKETCAP:
      return d3
        .scaleSqrt()
        .domain([MARKETCAP_RANGE.MIN, MARKETCAP_RANGE.MAX])
        .range([8, 250]);

    case CIRCLE_TYPE.PRICE:
      return d3
        .scaleSqrt()
        .domain([PRICE_RANGE.MIN, PRICE_RANGE.MAX])
        .range([8, 250]);

    case CIRCLE_TYPE.AMOUNT:
      max = Math.max(...data.map((item) => item.amount));
      min = Math.min(...data.map((item) => item.amount));

      return d3.scaleSqrt().domain([min, max]).range([10, 120]);

    case CIRCLE_TYPE.VALUE:
      max = Math.max(...data.map((item) => item.value));
      min = Math.min(...data.map((item) => item.value));

      return d3.scaleSqrt().domain([min, max]).range([10, 120]);

    default:
      break;
  }
};

export default createRadiusScale;
