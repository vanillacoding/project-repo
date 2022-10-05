import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useState } from "react";
import { CATEGORIES, PORTFOLIOS } from "../../constants/constants";

import TypeButton from "../shared/TypeButton/TypeButton";

const FilterButtonContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const FilterSelectContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const SelectCategory = styled.select`
  padding: 5px 10px;
  margin: 0 10px;
  font-weight: 600;
`;

const CoinFilter = ({ handleFilter }) => {
  const [exchange, setExchange] = useState("all");

  const handleClick = (e) => {
    setExchange(e.target.value);

    if (e.target.value === "all") {
      handleFilter(e.target.value, "all");
    } else {
      handleFilter(e.target.value, "exchange");
    }
  };

  return (
    <>
      <FilterButtonContainer>
        <TypeButton
          onClick={handleClick}
          value="all"
          picked={exchange === "all"}
        >
          All
        </TypeButton>
        <TypeButton
          onClick={handleClick}
          value="upbit"
          picked={exchange === "upbit"}
        >
          Upbit
        </TypeButton>
        <TypeButton
          onClick={handleClick}
          value="binance"
          picked={exchange === "binance"}
        >
          Binance
        </TypeButton>
      </FilterButtonContainer>
      <FilterSelectContainer>
        <SelectCategory
          name="category"
          onChange={(e) => handleFilter(e.target.value, "category")}
        >
          {CATEGORIES.sort().map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </SelectCategory>
        <SelectCategory
          name="portfolio"
          onChange={(e) => handleFilter(e.target.value, "portfolio")}
        >
          {PORTFOLIOS.sort().map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </SelectCategory>
      </FilterSelectContainer>
    </>
  );
};

CoinFilter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};

export default CoinFilter;
