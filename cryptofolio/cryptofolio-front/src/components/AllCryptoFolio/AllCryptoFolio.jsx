import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CryptoFolioList from "../CryptoFolioList/CryptoFolioList";
import CryptoFolioButtons from "../CryptoFolioButtons/CryptoFolioButtons";

import { useSelector } from "react-redux";

import calculateProfit from "../../utils/calculateProfit";

const CryptoFolioContainer = styled.div`
  padding: 40px;
  min-height: 87vh;
  background-color: black;
  color: white;
`;

const ListTitle = styled.h1`
  margin-top: 30px;
  font-family: "Roboto", sans-serif;
  font-size: 1.6em;
  font-weight: 800;
`;

const CryptoFolioItemContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 26px;
  row-gap: 20px;
  column-gap: 5px;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

const AllCryptoFolio = () => {
  const [cryptoFolios, setCryptofolios] = useState([]);
  const { user } = useSelector((state) => state.authReducer);
  const { coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);

  useEffect(() => {
    if (!coinData) {
      return;
    }

    const allCryptofolios = calculateProfit(allCryptoFolios, coinData).sort(
      (a, b) => b.profitPercent - a.profitPercent
    );

    setCryptofolios(allCryptofolios);
  }, [allCryptoFolios, coinData, user?.cryptofolios]);

  return (
    <CryptoFolioContainer>
      <CryptoFolioButtons />
      <ListTitle>All CryptoFolios</ListTitle>
      <CryptoFolioItemContainer>
        <CryptoFolioList
          cryptoFolios={cryptoFolios}
          slice={cryptoFolios.length + 1}
        />
      </CryptoFolioItemContainer>
    </CryptoFolioContainer>
  );
};

export default AllCryptoFolio;
