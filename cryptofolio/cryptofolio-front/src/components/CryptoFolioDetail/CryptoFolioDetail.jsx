import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useHistory } from "react-router-dom";

import SVG from "../shared/SVG/SVG";
import Button from "../shared/Button/Button";

import usePieChart from "../../hooks/usePieChart";

import actionCreator from "../../actions/actionCreator";
import changeNumberFormat from "../../utils/changeNumberFormat";
import calculateProfit from "../../utils/calculateProfit";
import { COLOR_SET } from "../../constants/constants";

const CryptoFolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  background-color: black;
  color: white;
`;

const CryptoFolioName = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
`;

const CryptoFolioInfoContainer = styled.div`
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 1.2em;
`;

const CryptoFolioInfo = styled.div`
  margin-bottom: 10px;

  span:first-child {
    font-weight: 800;
  }
`;

const CrypoFolioCoins = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 30%;

  span {
    display: block;
    width: 200px;
    margin-left: 10px;
  }
`;

const CoinTicker = styled.div`
  width: 60px;
`;

const Section = styled.span`
  font-weight: 800;
`;

const size = { height: 500, width: 500, radius: 250 };

const CryptoFolioDetail = () => {
  const [currentFolio, setCurrentFolio] = useState({});
  const svgRef = useRef();
  const colorRef = useRef(
    COLOR_SET[Math.floor(Math.random() * COLOR_SET.length)]
  );

  const { user } = useSelector((state) => state.authReducer);
  const { metadata, coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);
  const dispatch = useDispatch();

  const history = useHistory();
  const param = useParams();
  const { state } = useLocation();

  const handleDelete = () => {
    dispatch(
      actionCreator.deleteCryptofolioAction(
        user?._id,
        currentFolio?._id,
        history
      )
    );
  };

  const getWonValue = (value) => {
    return changeNumberFormat(
      (value * metadata?.rate * (parseFloat(metadata?.premium) + 100)) / 100,
      "int"
    );
  };

  useEffect(() => {
    let thisFolio = allCryptoFolios.filter(
      (cryptofolio) => cryptofolio._id === param.cryptofolioId
    )[0];

    if (!thisFolio && state) {
      thisFolio = state;
    }

    if (coinData) {
      const calculatedFolio = calculateProfit([thisFolio], coinData);
      setCurrentFolio(calculatedFolio[0]);
    }
  }, [allCryptoFolios, coinData, param.cryptofolioId, state]);

  usePieChart(
    svgRef,
    currentFolio?.selectedList,
    coinData,
    size,
    colorRef.current
  );

  return (
    <CryptoFolioContainer>
      <CryptoFolioName>{currentFolio?.name}</CryptoFolioName>
      <SVG ref={svgRef}></SVG>
      <CryptoFolioInfoContainer>
        <CryptoFolioInfo>
          <span>작성자</span>
          &nbsp;&nbsp;
          <span>{currentFolio.createdBy?.name || user.name}</span>
        </CryptoFolioInfo>
        <CryptoFolioInfo>
          <span>현재 가치</span>
          &nbsp;&nbsp;
          <span>${changeNumberFormat(currentFolio.currentValue)}</span>
        </CryptoFolioInfo>
        <CryptoFolioInfo>
          <span>현재 가치</span>
          &nbsp;&nbsp;
          {getWonValue(currentFolio.currentValue)}원
        </CryptoFolioInfo>
        <CryptoFolioInfo>
          <span>현재 수익</span>
          &nbsp;&nbsp;
          <span>${changeNumberFormat(currentFolio.profit)}</span>
        </CryptoFolioInfo>
        <CryptoFolioInfo>
          <span>현재 수익</span>
          &nbsp;&nbsp;
          <span>{getWonValue(currentFolio.profit)}원</span>
        </CryptoFolioInfo>
        <CryptoFolioInfo>
          <span>수익률</span>
          &nbsp;&nbsp;
          <span>{currentFolio.profitPercent}%</span>
        </CryptoFolioInfo>
        <CryptoFolioInfo>
          <span>작성일&nbsp;&nbsp;</span>
          <span>{currentFolio.createdAt}</span>
        </CryptoFolioInfo>
      </CryptoFolioInfoContainer>
      <CrypoFolioCoins>
        <CoinTicker></CoinTicker>
        <Section>코인명</Section>
        <Section>현재 가격</Section>
        <Section>코인 수</Section>
        <Section>총 가치</Section>
      </CrypoFolioCoins>
      {coinData &&
        currentFolio?.selectedList?.map((coin) => {
          const currentCoin = coinData[coin.name];
          return (
            <CrypoFolioCoins key={coin.name}>
              <img src={currentCoin.imagePath} alt="ticker" />
              <span>{coin.name}</span>
              <span>${changeNumberFormat(currentCoin.price?.price)}&nbsp;</span>
              <span>{changeNumberFormat(coin.amount, "int")}</span>
              <span>
                $
                {changeNumberFormat(
                  currentCoin.price?.price * parseInt(coin.amount)
                )}
              </span>
            </CrypoFolioCoins>
          );
        })}
      {user?._id === currentFolio.createdBy?._id && (
        <Button
          onClick={handleDelete}
          bgColor={"#e84118"}
          margin={["10px", 0, 0, 0]}
        >
          Delete
        </Button>
      )}
    </CryptoFolioContainer>
  );
};

export default CryptoFolioDetail;
