import * as d3 from "d3";
import {
  CHART_SIZE,
  CHART_TYPE,
  CIRCLE_TYPE,
  VIEW_TYPE,
} from "../constants/constants";
import createRadiusScale from "./createRadiusScale";

/**
 *
 * @param {string} chartType
 * @param {string} circleType
 * @param {string} viewType
 * @param {array} coinList
 * @returns
 */
const width = CHART_SIZE.BUBBLE_WIDTH;
const height = CHART_SIZE.BUBBLE_HEIGHT;

const createSimulation = (
  chartType = CHART_TYPE.EXCHANGE,
  circleType = CIRCLE_TYPE.MARKETCAP,
  viewType = VIEW_TYPE.BASIC,
  coinList
) => {
  const radiusScale = createRadiusScale(circleType, coinList);
  let forceX;
  let forceY;

  switch (chartType) {
    case CHART_TYPE.EXCHANGE:
      if (viewType === VIEW_TYPE.SEPARATE) {
        forceX = d3
          .forceX((d) => {
            if (d.exchanges?.length === 2) return width / 2 - 200;
            if (d.exchanges?.includes("upbit")) return width / 4 - 200;
            if (d.exchanges?.includes("binance")) return (width / 4) * 3 - 80;
          })
          .strength(0.1);

        forceY = d3
          .forceY((d) => {
            if (d.exchanges?.length === 2) return height / 2 - 100;
            if (d.exchanges?.includes("upbit")) return 200;
            if (d.exchanges?.includes("binance")) return height - 400;
          })
          .strength(0.1);
      }

      if (viewType === VIEW_TYPE.BASIC) {
        forceX = d3.forceX(width / 2).strength(0.05);
        forceY = d3.forceY(height / 2).strength(0.05);

        if (circleType === CIRCLE_TYPE.PRICE) {
          forceX = d3.forceX(width / 2).strength(0.01);
          forceY = d3.forceY(height / 2).strength(0.01);
        }
      }

      if (circleType === CIRCLE_TYPE.MARKETCAP) {
        return d3
          .forceSimulation()
          .force("x", forceX)
          .force("y", forceY)
          .force(
            "collide",
            d3.forceCollide((d) => radiusScale(d.marketCap?.marketCap) + 3)
          );
      }

      if (circleType === CIRCLE_TYPE.PRICE) {
        return d3
          .forceSimulation()
          .force("x", forceX)
          .force("y", forceY)
          .force(
            "collide",
            d3.forceCollide((d) => radiusScale(d.price?.price) + 3)
          );
      }
      break;

    case CHART_TYPE.CATEGORY:
      forceX = d3.forceX(width / 2).strength(0.02);
      forceY = d3.forceY(height / 2).strength(0.02);

      if (circleType === CIRCLE_TYPE.MARKETCAP) {
        return d3
          .forceSimulation()
          .force("x", forceX)
          .force("y", forceY)
          .force(
            "collide",
            d3.forceCollide((d) => radiusScale(d.marketCap?.marketCap) + 3)
          );
      }

      if (circleType === CIRCLE_TYPE.PRICE) {
        return d3
          .forceSimulation()
          .force("x", forceX)
          .force("y", forceY)
          .force(
            "collide",
            d3.forceCollide((d) => radiusScale(d.price?.price) + 3)
          );
      }
      break;

    case CHART_TYPE.PORTFOLIO:
    case CHART_TYPE.MYPORTFOLIO:
      forceX = d3.forceX(0).strength(0.02);
      forceY = d3.forceY(0).strength(0.02);

      if (circleType === CIRCLE_TYPE.AMOUNT) {
        return d3
          .forceSimulation()
          .force("x", forceX)
          .force("y", forceY)
          .force(
            "collide",
            d3.forceCollide((d) => radiusScale(d.amount) + 5)
          );
      }

      if (circleType === CIRCLE_TYPE.VALUE) {
        return d3
          .forceSimulation()
          .force("x", forceX)
          .force("y", forceY)
          .force(
            "collide",
            d3.forceCollide((d) => radiusScale(d.value) + 5)
          );
      }
      break;

    default:
      break;
  }
};

export default createSimulation;
