import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import * as d3 from "d3";

import getCircleColor from "../utils/getCircleColor";
import colorByChartType from "../utils/colorByChartType";
import createToolTip from "../utils/createToolTip";
import createSimulation from "../utils/createSimulation";
import createCircles from "../utils/createCircles";

import {
  COLORS,
  CHART_SIZE,
  VIEW_TYPE,
  CHART_TYPE,
  CIRCLE_TYPE,
} from "../constants/constants";

/**
 *
 * @param {Object} svgRef
 * @param {String} chartType
 * @param {String} circleType
 * @param {String} viewType
 *
 */
const width = CHART_SIZE.BUBBLE_WIDTH;
const height = CHART_SIZE.BUBBLE_HEIGHT;
const t = d3.transition().duration(500);

const useBubbleChart = (
  svgRef,
  chartType,
  circleType,
  viewType = VIEW_TYPE.BASIC
) => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);
  const { user } = useSelector((state) => state.authReducer);

  const tip = createToolTip(chartType, coinData);

  const handleMouseOver = useCallback(
    (event, d) => {
      tip.show(event, d);
      d3.select(event.currentTarget)
        .transition(() => t)
        .attr("fill", COLORS.MOUSEOVER_TARGET);
    },
    [tip]
  );

  const handleMouseOut = useCallback(
    (event, d) => {
      tip.hide(event, d);
      d3.select(event.currentTarget)
        .transition(() => t)
        .attr("fill", (d) => getCircleColor(d, chartType));
    },
    [chartType, tip]
  );

  const handleClick = useCallback((event, d) => {
    if (
      chartType === CHART_TYPE.PORTFOLIO ||
      chartType === CHART_TYPE.MYPORTFOLIO
    ) {
      return;
    }
    window.open(`https://coinmarketcap.com/currencies/${d.name}`, "_blank");
    return;
  }, []);

  const drawGraph = useCallback(
    (svg, coinList, chartType, circleType, viewType) => {
      if (!coinList || coinList.length === 0) {
        return;
      }

      const circles = createCircles(svg, coinList, circleType);
      const simulation = createSimulation(
        chartType,
        circleType,
        viewType,
        coinList
      );
      const ticked = () => {
        circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      };

      circles
        .attr("opacity", 0.85)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleClick)
        .style("cursor", "pointer")
        .call(tip);

      colorByChartType(circles, chartType);
      simulation.nodes(coinList).on("tick", ticked);
    },
    [handleClick, handleMouseOut, handleMouseOver, tip]
  );

  useEffect(() => {
    let coinList = [];
    let _circleType = circleType;

    if (!coinData) {
      return;
    }

    if (
      chartType === CHART_TYPE.EXCHANGE ||
      chartType === CHART_TYPE.CATEGORY
    ) {
      if (
        _circleType !== CIRCLE_TYPE.MARKETCAP &&
        _circleType !== CIRCLE_TYPE.PRICE
      ) {
        _circleType = CIRCLE_TYPE.MARKETCAP;
      }

      coinList = Object.values(coinData);
    }

    if (chartType === CHART_TYPE.PORTFOLIO) {
      if (
        _circleType !== CIRCLE_TYPE.AMOUNT &&
        _circleType !== CIRCLE_TYPE.VALUE
      ) {
        _circleType = CIRCLE_TYPE.AMOUNT;
      }
      const coinInPortFolio = {};

      allCryptoFolios.forEach((folio) => {
        folio.selectedList.forEach((coin) => {
          coinInPortFolio[coin.name]
            ? (coinInPortFolio[coin.name] += parseInt(coin.amount, 10))
            : (coinInPortFolio[coin.name] = parseInt(coin.amount, 10));
        });
      });

      coinList = Object.entries(coinInPortFolio).map(([key, value]) => {
        const price = coinData[key].price?.price;
        return { name: key, amount: value, value: value * price };
      });
    }

    if (chartType === CHART_TYPE.MYPORTFOLIO) {
      if (
        _circleType !== CIRCLE_TYPE.AMOUNT &&
        _circleType !== CIRCLE_TYPE.VALUE
      ) {
        _circleType = CIRCLE_TYPE.AMOUNT;
      }
      const coinInPortFolio = {};

      allCryptoFolios
        .filter((folio) => folio.createdBy._id === user?._id)
        .forEach((folio) => {
          folio.selectedList.forEach((coin) => {
            coinInPortFolio[coin.name]
              ? (coinInPortFolio[coin.name] += parseInt(coin.amount, 10))
              : (coinInPortFolio[coin.name] = parseInt(coin.amount, 10));
          });
        });

      coinList = Object.entries(coinInPortFolio).map(([key, value]) => {
        const price = coinData[key].price?.price;
        return { name: key, amount: value, value: value * price };
      });
    }

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    drawGraph(svg, coinList, chartType, _circleType, viewType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartType, viewType, coinData, circleType]);
};

export default useBubbleChart;
