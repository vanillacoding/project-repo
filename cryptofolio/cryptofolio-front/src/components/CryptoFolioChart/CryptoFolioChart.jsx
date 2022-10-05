import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import SVG from "../shared/SVG/SVG";

import usePieChart from "../../hooks/usePieChart";
import { useSelector } from "react-redux";

import { COLOR_SET } from "../../constants/constants";

const size = { height: 200, width: 200, radius: 100 };

const CryptoFolioChart = ({ selectedList }) => {
  const { coinData } = useSelector((state) => state.coinReducer);
  const svgRef = useRef();
  const colorRef = useRef(
    COLOR_SET[Math.floor(Math.random() * COLOR_SET.length)]
  );

  usePieChart(svgRef, selectedList, coinData, size, colorRef.current);

  useEffect(() => {
    colorRef.current = COLOR_SET[Math.floor(Math.random() * COLOR_SET.length)];
  }, []);

  return <SVG ref={svgRef}></SVG>;
};

CryptoFolioChart.propTypes = {
  selectedList: PropTypes.array.isRequired,
};

export default CryptoFolioChart;
