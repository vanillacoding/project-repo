import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import CryptoFolioButtons from "../CryptoFolioButtons/CryptoFolioButtons";
import CryptoFolioList from "../CryptoFolioList/CryptoFolioList";

import calculateProfit from "../../utils/calculateProfit";

const CryptoFolioContainer = styled.div`
  padding: 40px;
  background-color: black;
  min-height: 87vh;
  color: white;
`;

const ListContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 60px;
`;

const ListTitle = styled.h1`
  font-family: "Roboto", sans-serif;
  font-size: 1.6em;
  font-weight: 800;
`;

const CryptoFolioItemContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 20px;
  align-items: center;
  background-color: black;
  color: white;
`;

const MyCryptoFolioPage = () => {
  const [cryptoFolios, setCryptoFolios] = useState([]);
  const { user } = useSelector((state) => state.authReducer);
  const { coinData } = useSelector((state) => state.coinReducer);
  const { allCryptoFolios } = useSelector((state) => state.cryptofolioReducer);

  useEffect(() => {
    if (!coinData) {
      return;
    }

    const myCryptoFolios = calculateProfit(user?.cryptofolios, coinData).sort(
      (a, b) => b.profitPercent - a.profitPercent
    );

    setCryptoFolios(myCryptoFolios);
  }, [allCryptoFolios, coinData, user?.cryptofolios]);

  return (
    <CryptoFolioContainer>
      <CryptoFolioButtons />
      <ListContainer>
        <ListTitle>My CryptoFolios</ListTitle>
        <CryptoFolioItemContainer>
          <CryptoFolioList
            cryptoFolios={cryptoFolios}
            slice={cryptoFolios.length + 1}
          />
        </CryptoFolioItemContainer>
      </ListContainer>
    </CryptoFolioContainer>
  );
};

export default MyCryptoFolioPage;
