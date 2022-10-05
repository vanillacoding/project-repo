import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

import useErrorMessage from "../../hooks/useErrorMessage";
import { useCallback } from "react";

import changeNumberFormat from "../../utils/changeNumberFormat";
import { EXCHANGE_MARK } from "../../constants/constants";

const CoinInfoContainer = styled.div`
  margin: 10px 0;
  margin-left: 5vw;
  padding: 20px;
  width: 600px;
  border-radius: 10px;
  color: black;
  cursor: pointer;
  background-color: ${(props) => (props.picked ? "#ffeaa7" : "#f5f6fa")};
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const CoinName = styled.div`
  text-align: left;
  margin-left: 10px;
  margin-right: 30px;
  font-size: 1.2em;
  font-weight: 800;
`;

const CoinPriceContainer = styled.div`
  width: 300px;
  font-size: 0.85em;

  div:first-child {
    margin-bottom: 10px;
  }

  div {
    span:last-child {
      font-weight: 800;
    }
  }
`;

const ExchangeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;

  img {
    display: block;
    width: 30px;
    margin-left: 10px;
  }
`;

const AmountContainer = styled.div`
  margin-left: 5vw;
  width: 600px;
`;

const InputAmount = styled.input`
  padding: 10px;
  width: 100%;
  outline: none;
  font-size: 20px;
  background-color: white;
  font-weight: 800;

  &::placeholder {
    font-size: 16px;
    font-weight: 600;
  }
`;

const CoinItem = ({ coin, onClick, selectedList, handleAmount }) => {
  const [value, setValue] = useState("");
  const [error, showErrorMessage] = useErrorMessage("");

  const handleClick = useCallback(() => {
    if (
      selectedList.length > 9 &&
      !selectedList.some((selected) => selected.name === coin.ticker)
    ) {
      return showErrorMessage("10개 이하로 선택해주세요!");
    }

    if (selectedList.some((selected) => selected.name === coin.ticker)) {
      handleAmount(0, coin.ticker);
      setValue("");
    }

    onClick(coin.ticker);
  }, [coin.ticker, handleAmount, onClick, selectedList, showErrorMessage]);

  const handleChangeValue = useCallback(
    (input) => {
      const NANRegex = /[^0-9.]/g;

      if (NANRegex.test(input[input.length - 1]) && input.length > 0) {
        return showErrorMessage("숫자만 입력할 수 있습니다.");
      }

      setValue(input);

      if (input.length === 0) {
        handleAmount(0, coin.ticker);
      }
      handleAmount(input, coin.ticker);
    },
    [coin.ticker, handleAmount, showErrorMessage]
  );

  return (
    <>
      {error.length > 0 && <ErrorMessage error={error} />}
      <CoinInfoContainer
        onClick={handleClick}
        picked={selectedList.some((selected) => selected.name === coin.ticker)}
      >
        <img src={coin.imagePath} width="20px" alt="" />
        <CoinName>{coin.ticker}</CoinName>
        <CoinPriceContainer>
          <div>
            <span>현재 가격</span>
            &nbsp;&nbsp;
            <span>${changeNumberFormat(coin.price?.price)}</span>
          </div>
          <div>
            <span>시가 총액</span>
            &nbsp;&nbsp;
            <span>${changeNumberFormat(coin.marketCap?.marketCap)}</span>
          </div>
        </CoinPriceContainer>
        <ExchangeContainer>
          {coin.exchanges.includes("upbit") && (
            <img src={EXCHANGE_MARK.UPBIT} alt="exchange mark"></img>
          )}
          {coin.exchanges.includes("binance") && (
            <img src={EXCHANGE_MARK.BINANCE} alt="exchange mark"></img>
          )}
        </ExchangeContainer>
      </CoinInfoContainer>
      <AmountContainer>
        {selectedList.some((selected) => selected.name === coin.ticker) && (
          <InputAmount
            type="textarea"
            placeholder="Enter Amount"
            onChange={(e) => handleChangeValue(e.target.value)}
            value={
              selectedList.filter(
                (selected) => selected.name === coin.ticker
              )[0].amount || value
            }
          />
        )}
      </AmountContainer>
    </>
  );
};

CoinItem.propTypes = {
  coin: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedList: PropTypes.array.isRequired,
  handleAmount: PropTypes.func.isRequired,
};

export default CoinItem;
