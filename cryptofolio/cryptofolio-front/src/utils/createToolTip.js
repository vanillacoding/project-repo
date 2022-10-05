/* eslint-disable indent */
import { CHART_TYPE } from "../constants/constants";
import { tip as d3tip } from "d3-v6-tip";
import changeNumberFormat from "./changeNumberFormat";
/**
 *
 * @param {string} chartType Type of Current Chart
 * @param {object} coinData Coin Data Set
 * @returns Tooltip d3 object
 */
const createToolTip = (chartType, coinData) => {
  if (
    chartType === CHART_TYPE.PORTFOLIO ||
    chartType === CHART_TYPE.MYPORTFOLIO
  ) {
    return d3tip()
      .attr("class", "tooltip")
      .style("left", "0px")
      .style("top", "0px")
      .html((event, d) => {
        d = coinData[d.name];
        return `<div>
				<img src=${d?.imagePath}></img>
				<span class="name">&nbsp;&nbsp;${d.name.toUpperCase()}</span>
				<div class="ticker">${d.ticker}</div>
				<div class="info">
					<span>Ciculating Supply</span> <span>${changeNumberFormat(
            d.circulatingSupply,
            "int"
          )}</span>
				</div>
				<div class="info">
					<span>Market Cap</span> <span>${changeNumberFormat(
            d.marketCap?.marketCap,
            "int"
          )}</span>
				</div>
				<div class="info">
					<span>Price</span> <span>${changeNumberFormat(d.price?.price)}</span>
				</div>
				<div class="info">
					<span>Category</span> <span>${d.categories?.slice(0, 3)}</span>
				</div>
				<div class="info">
					<span>Portfolio</span> <span>${d.portfolios?.slice(0, 2)}</span>
				</div>
				<div class="info">
					<span>Exchange</span> <span>${d.exchanges}</span>
				</div>
      </div>`;
      });
  }

  if (chartType === CHART_TYPE.EXCHANGE || chartType === CHART_TYPE.CATEGORY) {
    return d3tip()
      .attr("class", "tooltip")
      .style("left", "0px")
      .style("top", "0px")
      .html((event, d) => {
        return `<div>
				<img src=${d?.imagePath}></img>
				<span class="name">&nbsp;&nbsp;${d.name.toUpperCase()}</span>
				<div class="ticker">${d.ticker}</div>
				<div class="info">
					<span>Ciculating Supply</span> <span>${changeNumberFormat(
            d.circulatingSupply,
            "int"
          )}</span>
				</div>
				<div class="info">
					<span>Market Cap</span> <span>${changeNumberFormat(
            d.marketCap?.marketCap,
            "int"
          )}</span>
				</div>
				<div class="info">
					<span>Price</span> <span>${changeNumberFormat(d.price?.price)}</span>
				</div>
				<div class="info">
					<span>Category</span> <span>${d.categories.slice(0, 3)}</span>
				</div>
				<div class="info">
					<span>Portfolio</span> <span>${d.portfolios.slice(0, 2)}</span>
				</div>
				<div class="info">
					<span>Exchange</span> <span>${d.exchanges}</span>
				</div>
      </div>`;
      });
  }

  if (chartType === CHART_TYPE.PIE) {
    return d3tip()
      .attr("class", "tooltip")
      .style("left", "0px")
      .style("top", "0px")
      .html((event, d) => {
        const newD = coinData[d.data.name];
        return `<div>
				<img src=${newD?.imagePath}></img>
				<span class="name">&nbsp;&nbsp;${newD.name.toUpperCase()}</span>
				<div class="ticker">${newD.ticker}</div>
				<div class="info">
					<span>Amount</span> <span>${changeNumberFormat(d.data.amount, "int")}</span>
				</div>
				<div class="info">
					<span>Value</span> <span>${changeNumberFormat(
            d.data.amount * newD.price?.price
          )}</span>
				</div>
				<div class="info">
					<span>Price</span> <span>${changeNumberFormat(newD.price?.price)}</span>
				</div>
      </div>`;
      });
  }
};

export default createToolTip;
