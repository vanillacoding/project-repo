import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import TypeButton from "../shared/TypeButton/TypeButton";
import SearchBox from "../shared/SearchBox/SearchBox";
import SVG from "../shared/SVG/SVG";

import useBubbleChart from "../../hooks/useBubbleChart";
import useInput from "../../hooks/useInput";

import useSearchBubbleChart from "../../hooks/useSearchBubbleChart";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CHART_TYPE, CIRCLE_TYPE, VIEW_TYPE } from "../../constants/constants";
import "../../styles/tooltip.css";

const SearchContainer = styled.div`
  width: 250px;
  margin: 0 auto;
`;

const CircleTypeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const BubbleChart = ({ type }) => {
  const [viewType, setViewType] = useState(VIEW_TYPE.BASIC);
  const [circleType, setCircleType] = useState(CIRCLE_TYPE.MARKETCAP);
  const [searchTerm, onChangeSearchTerm] = useInput("");
  const svgRef = useRef();

  useBubbleChart(svgRef, type, circleType, viewType);
  const handleSearch = useSearchBubbleChart(svgRef, searchTerm, type);

  useEffect(() => {
    if (type === CHART_TYPE.PORTFOLIO || type === CHART_TYPE.MYPORTFOLIO) {
      setCircleType(CIRCLE_TYPE.AMOUNT);
    } else {
      setCircleType(CIRCLE_TYPE.MARKETCAP);
    }
  }, [type]);

  return (
    <>
      <SearchContainer>
        <SearchBox action="submit" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={onChangeSearchTerm}
            placeholder="Search Coin"
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </SearchBox>
      </SearchContainer>
      <CircleTypeContainer>
        {type === CHART_TYPE.EXCHANGE && (
          <>
            <TypeButton
              onClick={() => setViewType(VIEW_TYPE.BASIC)}
              picked={viewType === VIEW_TYPE.BASIC}
              padding={["6px", "12px", "6px", "12px"]}
              fontSize="0.8rem"
              bgColor="red"
              color="white"
            >
              Default
            </TypeButton>
            <TypeButton
              onClick={() => setViewType(VIEW_TYPE.SEPARATE)}
              picked={viewType === VIEW_TYPE.SEPARATE}
              padding={["6px", "12px", "6px", "12px"]}
              margin={["0px", "10px", "0px", "0px"]}
              fontSize="0.8rem"
              bgColor="red"
              color="white"
            >
              Exchange
            </TypeButton>
          </>
        )}
        {(type === CHART_TYPE.EXCHANGE || type === CHART_TYPE.CATEGORY) && (
          <>
            <TypeButton
              onClick={() => setCircleType(CIRCLE_TYPE.MARKETCAP)}
              picked={circleType === CIRCLE_TYPE.MARKETCAP}
              padding={["6px", "12px", "6px", "12px"]}
              margin={["0px", "0px", "0px", "10px"]}
              fontSize="0.8rem"
              bgColor="blue"
              color="white"
            >
              MarketCap
            </TypeButton>
            <TypeButton
              onClick={() => setCircleType(CIRCLE_TYPE.PRICE)}
              picked={circleType === CIRCLE_TYPE.PRICE}
              padding={["6px", "12px", "6px", "12px"]}
              fontSize="0.8rem"
              bgColor="blue"
              color="white"
            >
              Price
            </TypeButton>
          </>
        )}
        {(type === CHART_TYPE.PORTFOLIO || type === CHART_TYPE.MYPORTFOLIO) && (
          <>
            <TypeButton
              onClick={() => setCircleType(CIRCLE_TYPE.AMOUNT)}
              picked={circleType === CIRCLE_TYPE.AMOUNT}
              padding={["6px", "12px", "6px", "12px"]}
              margin={["0px", "0px", "0px", "10px"]}
              fontSize="0.8rem"
              bgColor="blue"
              color="white"
            >
              Amount
            </TypeButton>
            <TypeButton
              onClick={() => setCircleType(CIRCLE_TYPE.VALUE)}
              picked={circleType === CIRCLE_TYPE.VALUE}
              padding={["6px", "12px", "6px", "12px"]}
              fontSize="0.8rem"
              bgColor="blue"
              color="white"
            >
              Value
            </TypeButton>
          </>
        )}
      </CircleTypeContainer>
      <SVG ref={svgRef}></SVG>
    </>
  );
};

BubbleChart.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BubbleChart;
