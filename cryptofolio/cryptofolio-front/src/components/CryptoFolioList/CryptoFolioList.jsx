import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import CryptoFolioChart from "../CryptoFolioChart/CryptoFolioChart";

import changeNumberFormat from "../../utils/changeNumberFormat";

const CryptoFolioItemContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(8, 1fr);
  margin-top: 26px;
  row-gap: 20px;
  column-gap: 5px;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

const CryptoFolioItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const CryptoFolioName = styled.div`
  font-weight: 800;
`;

const CryptoFolioInfo = styled.div`
  margin-top: 5px;
  display: flex;
  justify-content: center;

  span {
    display: block;
    text-align: left;
  }
  span:first-child {
    font-weight: 800;
  }
`;

const CryptoFolioList = ({ cryptoFolios, slice }) => {
  const { user } = useSelector((state) => state.authReducer);
  const history = useHistory();

  return (
    <CryptoFolioItemContainer>
      {!cryptoFolios && <div>No Cryptofolios</div>}
      {cryptoFolios &&
        cryptoFolios.slice(0, slice).map((cryptofolio) => (
          <CryptoFolioItem key={cryptofolio._id}>
            <CryptoFolioInfo style={{ marginTop: "15px" }}>
              <CryptoFolioName>{cryptofolio.name}</CryptoFolioName>
            </CryptoFolioInfo>
            <div
              onClick={() => history.push(`/cryptofolio/${cryptofolio._id}`)}
            >
              <CryptoFolioChart selectedList={cryptofolio?.selectedList} />
            </div>
            <CryptoFolioInfo style={{ marginTop: "15px" }}>
              <span>작성자&nbsp;&nbsp;</span>
              <span>{cryptofolio.createdBy?.name || user.name}</span>
            </CryptoFolioInfo>
            <CryptoFolioInfo>
              <span>현재 수익&nbsp;&nbsp;</span>
              <span>${changeNumberFormat(cryptofolio.profit, "int")}</span>
            </CryptoFolioInfo>
            <CryptoFolioInfo>
              <span>수익률&nbsp;&nbsp;</span>
              <span>{changeNumberFormat(cryptofolio.profitPercent)}%</span>
            </CryptoFolioInfo>
            <CryptoFolioInfo>
              <span>작성일&nbsp;&nbsp;</span>
              <span>{cryptofolio.createdAt?.slice(5, 10)}</span>
            </CryptoFolioInfo>
          </CryptoFolioItem>
        ))}
    </CryptoFolioItemContainer>
  );
};

CryptoFolioList.propTypes = {
  cryptoFolios: PropTypes.array,
};

export default CryptoFolioList;
