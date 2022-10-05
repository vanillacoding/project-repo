import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../shared/Button/Button";

import useUpdatePrice from "../../hooks/useUpdatePrice";

const CryptoFolioButtons = () => {
  const { isAuthorized } = useSelector((state) => state.authReducer);
  const { coinData, isPriceLoading } = useSelector(
    (state) => state.coinReducer
  );
  const history = useHistory();

  const handleUpdatePrice = useUpdatePrice();

  return (
    <>
      {isAuthorized && (
        <Button
          onClick={() => history.push("/cryptofolio/new")}
          margin={[0, "10px", 0, 0]}
          bgColor={"#e84118"}
        >
          New Cryptofolio
        </Button>
      )}
      <Button
        onClick={() => history.push("/cryptofolio/all")}
        margin={[0, "10px", 0, 0]}
      >
        Show All
      </Button>
      {!isPriceLoading && (
        <Button onClick={handleUpdatePrice} bgColor={"#f1c40f"} color={"black"}>
          Update Price
        </Button>
      )}
      {isPriceLoading ? (
        <span> 최신 가격으로 업데이트 중입니다...</span>
      ) : (
        <span>
          &nbsp;&nbsp;
          <strong>마지막 업데이트: {coinData?.BTC?.price?.date}</strong>
        </span>
      )}
    </>
  );
};

export default CryptoFolioButtons;
