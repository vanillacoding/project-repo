import { CIRCLE_TYPE, CHART_SIZE } from "../constants/constants";
import createRadiusScale from "./createRadiusScale";

/**
 *
 * @param {array} exchange Option for audioContext
 * @returns Created audioContext
 */

const width = CHART_SIZE.BUBBLE_WIDTH;
const height = CHART_SIZE.BUBBLE_HEIGHT;

const createCircles = (svg, coinList, circleType = CIRCLE_TYPE.MARKETCAP) => {
  let radiusScale = createRadiusScale(circleType, coinList);
  svg.selectAll("g").remove();

  const baseGroup = svg.selectAll("g").data(coinList);
  const circleGroup = baseGroup.enter().append("g");

  if (circleType === CIRCLE_TYPE.MARKETCAP) {
    return circleGroup
      .append("circle")
      .attr("transform", "translate(0,0)")
      .attr("r", (d) =>
        d.marketCap ? radiusScale(d.marketCap?.marketCap) : 10
      );
  }

  if (circleType === CIRCLE_TYPE.PRICE) {
    return circleGroup
      .append("circle")
      .attr("transform", "translate(0,0)")
      .attr("r", (d) => (d.price ? radiusScale(d.price?.price) : 10));
  }

  if (circleType === CIRCLE_TYPE.AMOUNT) {
    return circleGroup
      .append("circle")
      .attr("transform", `translate(${width / 2},${height / 2 - 100})`)
      .attr("r", (d) => radiusScale(d.amount));
  }

  if (circleType === CIRCLE_TYPE.VALUE) {
    return circleGroup
      .append("circle")
      .attr("transform", `translate(${width / 2},${height / 2 - 100})`)
      .attr("r", (d) => radiusScale(d.value));
  }
};

export default createCircles;
