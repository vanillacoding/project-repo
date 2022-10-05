import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import MetaData from "../MetaData/MetaData";
import Button from "../shared/Button/Button";

import calculateProfit from "../../utils/calculateProfit";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5vw;
  height: 80px;
  font-size: 1.1em;
  background-color: #0d1315;
`;

const HeaderLogo = styled.div`
  font-family: "Roboto Condensed", sans-serif;
  font-size: 1.8em;
  font-weight: 800;
  font-style: italic;
  color: white;
  cursor: pointer;
`;

const WelcomeMessage = styled.div`
  font-size: 0.8em;
  margin-left: 30px;
  color: white;

  span {
    font-weight: 800;
  }
`;

const HeaderItemContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 0.8em;
  font-weight: 800;
  margin-left: 40px;

  div {
    margin-left: 20px;
    cursor: pointer;
  }
`;

const HeaderAuthContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  color: white;
  font-size: 0.8em;
  font-weight: 800;
`;

const HeaderLogin = styled.div`
  margin-right: 20px;
  cursor: pointer;
`;

const Header = () => {
  const [highestProfit, setHighestProfit] = useState("");
  const history = useHistory();
  const { isAuthorized, user } = useSelector((state) => state.authReducer);
  const { coinData } = useSelector((state) => state.coinReducer);

  useEffect(() => {
    if (!coinData) {
      return;
    }

    const myCryptoFolios = calculateProfit(user?.cryptofolios, coinData).sort(
      (a, b) => b.profitPercent - a.profitPercent
    );

    setHighestProfit(myCryptoFolios[0]?.profitPercent);
  }, [coinData, user?.cryptofolios]);

  return (
    <>
      <MetaData />
      <HeaderContainer>
        <HeaderLogo onClick={() => history.push("/")}>CryptoFolio</HeaderLogo>
        <HeaderItemContainer>
          <div onClick={() => history.push("/cryptofolio/all")}>Show All</div>
          <div onClick={() => history.push("/cryptofolio")}>Rank</div>
          <div onClick={() => history.push("/cryptofolio/new")}>Creat New</div>
          <div onClick={() => history.push("/my-cryptofolio")}>
            My Cryptofolio
          </div>
        </HeaderItemContainer>
        {isAuthorized && (
          <WelcomeMessage>
            {user?.name}님 환영합니다. 현재 최고 수익율은
            <span> {highestProfit}%</span> 입니다.
          </WelcomeMessage>
        )}

        <HeaderAuthContainer>
          {isAuthorized ? (
            <Button
              onClick={() => history.push("/logout")}
              bgColor={"#eb4d4b"}
              fontWeight={"600"}
            >
              Log out
            </Button>
          ) : (
            <>
              <HeaderLogin onClick={() => history.push("/login")}>
                Log In
              </HeaderLogin>
              <Button onClick={() => history.push("/signup")}>Sign Up</Button>
            </>
          )}
        </HeaderAuthContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
