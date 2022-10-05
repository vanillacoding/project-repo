import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import CryptoFolioList from "../CryptoFolioList/CryptoFolioList";
import CryptoFolioButtons from "../CryptoFolioButtons/CryptoFolioButtons";

import calculateProfit from "../../utils/calculateProfit";
import getMonthlySorted from "../../utils/getMonthlySorted";
import getWeeklySorted from "../../utils/getWeeklySorted";

const CryptoFolioContainer = styled.div`
  padding: 40px;
  background-color: black;
  min-height: 87vh;
  color: white;
`;

const ListContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 60px;
`;

const ListTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 1.6em;
  font-weight: 800;
`;

const CryptoFolioPage = () => {
  const [cryptoFolios, setCryptoFolios] = useState({});
  const { user } = useSelector((state) => state.authReducer);
  const { coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);

  useEffect(() => {
    if (!coinData) {
      return;
    }

    const monthlyCryptoFolios = getMonthlySorted(allCryptoFolios, coinData);
    const weeklyCryptoFolios = getWeeklySorted(allCryptoFolios, coinData);
    const allTimeCryptoFolios = calculateProfit(allCryptoFolios, coinData).sort(
      (a, b) => b.profitPercent - a.profitPercent
    );

    const caculatedCryptoFolios = {
      monthlyCryptoFolios,
      weeklyCryptoFolios,
      allTimeCryptoFolios,
    };

    setCryptoFolios(caculatedCryptoFolios);
  }, [allCryptoFolios, coinData, user?.cryptoFolios]);

  return (
    <CryptoFolioContainer>
      <CryptoFolioButtons />
      <ListContainer>
        <ListTitle>Weekly Top Profit</ListTitle>
        <CryptoFolioList
          cryptoFolios={cryptoFolios.weeklyCryptoFolios}
          slice={7}
        />
      </ListContainer>
      <ListContainer>
        <ListTitle>Monthly Top Profit</ListTitle>
        <CryptoFolioList
          cryptoFolios={cryptoFolios.monthlyCryptoFolios}
          slice={7}
        />
      </ListContainer>
      <ListContainer>
        <ListTitle>All Time Top Profit</ListTitle>
        <CryptoFolioList
          cryptoFolios={cryptoFolios.allTimeCryptoFolios}
          slice={7}
        />
      </ListContainer>
    </CryptoFolioContainer>
  );
};

export default CryptoFolioPage;
