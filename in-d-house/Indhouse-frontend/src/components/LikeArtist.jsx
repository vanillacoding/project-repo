import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as d3 from "d3";
import cloud from "d3-cloud";

import Title from "./shared/Title";

import useGetArtists from "../hooks/useGetArtists";
import { title } from "../constants";

const width = window.innerWidth * 0.7;
const height = window.innerHeight * 0.6;
const colorPallete = ["#F7E32D", "#509BF5", "#FFFFFF"];
const fontSizes = ["40", "50", "55"];

const Wrapper = styled.div`
  .d3-box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FavoriteArtist = ({ likeMusic }) => {
  const { artist } = useGetArtists(likeMusic);
  const d3Ref = useRef(null);

  useEffect(() => {
    const color = d3.scaleQuantile()
      .domain([0, artist.length])
      .range(colorPallete);

    const size = d3.scaleQuantile()
      .domain([0, artist.length])
      .range(fontSizes);

    const dataSet = artist.map((name, idx) => ({
      text: name,
      size: size(idx),
    }));

    const svg = d3.select(d3Ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g");

    const draw = words => {
      svg.append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", d => d.size)
        .style("fill", (_, i) => color(i))
        .style("font-weight", 900)
        .attr("text-anchor", "middle")
        .transition()
        .duration(500)
        .attr("transform", d => `translate(${[d.x, d.y]})`)
        .text(d => d.text);
    };

    cloud()
      .size([width, height])
      .words(dataSet)
      .padding(4)
      .rotate(_ => 0)
      .fontSize(d => d.size)
      .on("end", draw)
      .start();
  }, [artist]);

  return (
    <Wrapper>
      <Title title={title.favoriteArtist} />
      <div className="d3-box">
        <svg ref={d3Ref} width={width} height={height} />
      </div>
    </Wrapper>
  );
};

FavoriteArtist.propTypes = {
  likeMusic: PropTypes.arrayOf(PropTypes.shape({
    genreId: PropTypes.string.isRequired,
    _id: PropTypes.string,
  })).isRequired,
};

export default FavoriteArtist;
