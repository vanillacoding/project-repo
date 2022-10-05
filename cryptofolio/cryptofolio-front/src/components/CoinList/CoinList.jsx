import React from "react";
import PropTypes from "prop-types";

import CoinItem from "../CoinItem/CoinItem";

const CoinList = ({ coinList, handleSelect, selectedList, handleAmount }) => {
  return (
    <>
      {coinList
        .sort((a, b) => b.marketCap.marketCap - a.marketCap.marketCap)
        .map((coin) => {
          return (
            <CoinItem
              key={coin.name}
              coin={coin}
              onClick={handleSelect}
              selectedList={selectedList}
              handleAmount={handleAmount}
            />
          );
        })}
    </>
  );
};

CoinList.propTypes = {
  coinList: PropTypes.array.isRequired,
  handleSelect: PropTypes.func.isRequired,
  selectedList: PropTypes.array.isRequired,
  handleAmount: PropTypes.func.isRequired,
};

export default CoinList;
