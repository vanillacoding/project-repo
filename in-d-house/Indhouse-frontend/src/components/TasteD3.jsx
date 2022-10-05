import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as d3 from "d3";

import { colorPallete } from "../constants";

const Svg = styled.svg`
  position: absolute;
  top: 50%;
  left: 55%;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  transform: translate(-50%, -50%);
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.indigo};
  position: absolute;
  left: 0;
  bottom: 1rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.strong};
  z-index: 50;
`;

const width = window.innerWidth;
const height = window.innerHeight;
const tooltipDuration = 200;
const circleNums = 9 * (width / 20);

const TasteD3 = ({ tasteData, handleClick }) => {
  const d3Ref = useRef(null);

  useEffect(() => {
    let isDragging = false;

    const circles = d3.range(circleNums).map((_, i) => {
      const type = i % 9;
      const data = tasteData[type];
      if (data.percentage === 0) return { radius: 0 };

      const radius = (data.percentage / 10) * 20;
      const color = colorPallete[data.genre];

      return { radius, color, name: data.genre };
    });

    const simulation = d3.forceSimulation()
      .force("forceX", d3.forceX().strength(0.1).x(width * 0.5))
      .force("forceY", d3.forceY().strength(0.1).y(height * 0.5))
      .force("center", d3.forceCenter().x(width * 0.5).y(height * 0.5))
      .force("charge", d3.forceManyBody().strength(-100))
      .alphaDecay(0);

    const svg = d3.select(d3Ref.current)
      .attr("width", width)
      .attr("height", height);

    const tooltip = d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("opacity", "0");

    const dragEventListener = d3.drag()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.03);
        d.fx = d.x;
        d.fy = d.y;

        isDragging = true;

        d3.select("#tooltip")
          .transition()
          .duration(tooltipDuration)
          .style("opacity", 0);
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.03);
        d.fx = null;
        d.fy = null;
        isDragging = false;
      });

    const mouseover = (_, d) => {
      if (isDragging) return;

      d3.select("#tooltip")
        .transition()
        .duration(tooltipDuration)
        .style("opacity", 1)
        .style("background-color", "white")
        .style("padding", "10px")
        .text(d.name);
    };

    const mousemove = event => {
      d3.select("#tooltip")
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`);
    };

    const mouseleave = () => {
      d3.select("#tooltip")
        .transition()
        .duration(tooltipDuration)
        .style("opacity", 0);
    };

    const node = svg.append("g")
      .attr("class", "node")
      .selectAll("circle")
      .data(circles)
      .enter()
      .append("circle")
      .attr("r", d => d.radius)
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("fill", d => d.color)
      .call(dragEventListener)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

    simulation
      .nodes(circles)
      .force("collide", d3.forceCollide()
        .strength(0.5)
        .radius(d => d.radius)
        .iterations(1))
      .on("tick", () => {
        node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
      });
  }, [tasteData]);

  return (
    <>
      <Svg ref={d3Ref} width={width} height={height} />
      <Button onClick={handleClick} >TASTE EXIT</Button>
    </>
  );
};

TasteD3.propTypes = {
  handleClick: PropTypes.func.isRequired,
  tasteData: PropTypes.arrayOf(PropTypes.shape({
    genre: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
  })),
};

export default TasteD3;
