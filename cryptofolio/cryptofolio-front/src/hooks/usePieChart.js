import { useEffect, useCallback } from "react";
import * as d3 from "d3";
import createToolTip from "../utils/createToolTip";
import { CHART_TYPE } from "../constants/constants";

/**
 *
 * @param {object} svgRef
 * @param {array} selectedList
 * @param {object} coinData
 * @param {object} size
 * @param {colorSet} string
 *
 */

const usePieChart = (
  svgRef,
  selectedList,
  coinData,
  size,
  colorSet = "schemeSet2"
) => {
  const tip = createToolTip(CHART_TYPE.PIE, coinData);
  const handleMouseOver = useCallback(
    (event, d) => {
      tip.show(event, d);
    },
    [tip]
  );

  const handleMouseOut = useCallback(
    (event, d) => {
      tip.hide(event, d);
    },
    [tip]
  );

  useEffect(() => {
    const cent = { x: size.width / 2 + 5, y: size.height / 2 + 5 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", size.width + 10)
      .attr("height", size.height + 10);

    svg.selectAll("g").remove();

    const graph = svg
      .append("g")
      .attr("transform", `translate(${cent.x}, ${cent.y})`);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.amount * coinData[d.name].price.price);

    const arcPath = d3
      .arc()
      .outerRadius(size.radius)
      .innerRadius(size.radius / 2);

    const color = d3.scaleOrdinal(d3[colorSet]);

    const arcTweenEnter = (d) => {
      const i = d3.interpolate(d.endAngle, d.startAngle);

      return function (ticker) {
        d.startAngle = i(ticker);
        return arcPath(d);
      };
    };

    const update = (data) => {
      if (data.length === 0) return;

      color.domain(data.map((d) => d.name));

      const paths = graph.selectAll("path").data(pie(data));

      paths
        .enter()
        .append("path")
        .attr("class", "arc")
        .attr("d", arcPath)
        .attr("fill", (d) => color(d.data.name))
        .transition()
        .duration(300)
        .attrTween("d", arcTweenEnter);

      svg
        .selectAll("path")
        .attr("opacity", 0.8)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .call(tip);
    };

    if (selectedList && coinData) {
      update(selectedList);
    }

    return () => tip.hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinData, selectedList]);
};

export default usePieChart;
