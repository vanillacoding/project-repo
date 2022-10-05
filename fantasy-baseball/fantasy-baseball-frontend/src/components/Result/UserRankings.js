import React, { useState } from "react";

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styled from "styled-components";

import BettingInfo from "../BettingInfo";
import LinkButton from "../Shared/LinkButton";
import RankingTable from "./RankingTable";

const Wrapper = styled.div`
  height: calc(100vh - 102px);
  display: flex;
  flex-direction: column;
`;

const InfoBox = styled.div`
  margin: auto 0 0 0;
  padding: ${({ theme }) => theme.padding.base};
  background: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const InfoBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BettingResult = styled.div`
  width: 100%;
  margin: 0 0 1rem 0;
  padding: ${({ theme }) => theme.padding.base};
  background: rgba(0, 0, 0, 0.05);
  font-size: ${({ theme }) => theme.fontSize.base};

  strong {
    margin: 0 0.5rem 0 0;
    padding: 0.3rem 0.5rem;
    background: ${({ theme }) => theme.color.blue};
    font-family: "Bebas Neue";
    color: ${({ theme }) => theme.color.white};
  }

  span {
    padding: 0 0.3rem;
  }
`;

const findUserRanking = (email, rankings) => {
  const userIndex = rankings.findIndex((ranking) => ranking.user.email === email);
  if (userIndex < 3) return null;
  return rankings.slice(userIndex - 2, userIndex + 3);
};

const getUserBettingInfo = (email, rankings) => {
  const userBetting = rankings.find((ranking) => ranking.user.email === email);
  return {
    earnedMoney: userBetting.earnedMoney,
    bettingMoney: userBetting.bettingMoney,
    result: userBetting.earnedMoney - userBetting.bettingMoney,
  };
};

function UserRankings({ userRankings, gameDate }) {
  const user = useSelector((state) => state.login.user);

  const [isCalculated, setIsCalculated] = useState(false);
  const [topRankers] = useState(userRankings.slice(0, 3));
  const [myRanking] = useState(
    findUserRanking(user.email, userRankings)
  );
  const [bettingResult] = useState(
    getUserBettingInfo(user.email, userRankings)
  );

  const renderBettingResult = () => {
    const { earnedMoney, bettingMoney } = bettingResult;
    const difference = earnedMoney - bettingMoney;
    const resultMessage = (difference > 0) ? "🎉 축하합니다!" : "😢 돈을 잃으셨네요..";

    if (isCalculated === false) {
      return (
        <BettingResult>
          아직 정산되지 않았습니다.
        </BettingResult>
      );
    }

    return (
      <BettingResult>
        <strong>RESULT</strong>
        {earnedMoney}
        <span>-</span>
        {bettingMoney}
        <span>=</span>
        {difference}
        <span>{resultMessage}</span>
      </BettingResult>
    );
  };

  return (
    <Wrapper>
      <RankingTable
        title="TOP RANKERS"
        rankings={topRankers}
      />
      {myRanking
        && (
          <RankingTable
            title="MY RANKING"
            rankings={myRanking}
          />
        )}
      <LinkButton
        path={`/statistics/${gameDate}`}
        type="button"
        title="CHECK PLAYERS STATISTICS"
        color="white"
        size="small"
      />
      <InfoBox>
        {bettingResult
          && renderBettingResult()}
        <InfoBottom>
          <BettingInfo
            setIsCalculated={setIsCalculated}
            gameDate={gameDate}
          />
          <LinkButton
            path="/"
            type="button"
            title="GO TO MAIN"
            color="blue"
            size="small"
          />
        </InfoBottom>
      </InfoBox>
    </Wrapper>
  );
}

UserRankings.propTypes = {
  userRankings: PropTypes.arrayOf(PropTypes.object).isRequired,
  gameDate: PropTypes.string.isRequired,
};

export default UserRankings;
