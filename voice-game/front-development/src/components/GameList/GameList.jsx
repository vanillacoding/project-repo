import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import GameCard from "../GameCard/GameCard";
import GameOption from "../GameOption/GameOption";

import useErrorMessage from "../../hooks/useErrorMessage";
import useMicInput from "../../hooks/useMicInput";

import energyBattleGif from "../../images/thumbnails/energyBattle_gif.gif";
import monsterEscapeGif from "../../images/thumbnails/monsterEscape_gif.gif";
import littleForestGif from "../../images/thumbnails/littleForest_gif.gif";
import comingSoonThumbnail from "../../images/thumbnails/comingSoon_thumbnail.png";
import { GAME_TITLE } from "../../constants/constants";
import { useSelector } from "react-redux";

const MainPage = styled.section`
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTitle = styled.h1`
  width: 100vw;
  margin-top: -2vh;
  font-size: 3rem;
  text-align: center;
  line-height: 1.3em;
`;

const Name = styled.span`
  color: #f1c40f;
`;

const WelcomeMessage = styled.h1`
  line-height: 1.3em;
  margin-bottom: 2vh;
`;

const GameCardGrid = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1.3vw;
  row-gap: 1.3vw;
  padding: 30px;
  @media only screen and (max-width: 1120px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const GameList = () => {
  const history = useHistory();
  const [error, showErrorMessage] = useErrorMessage("");
  const { isMicOn, isUnAuthMode, playerData } = useSelector(
    (state) => state.authReducer
  );
  useMicInput(showErrorMessage);

  const selectGame = useCallback(
    (game) => {
      if (!isMicOn) {
        return showErrorMessage(
          "우측 상단에서 마이크를 허용하고 새로고침 해주세요 🥲"
        );
      }

      switch (game) {
        case GAME_TITLE.LITTLE_FOREST:
          history.push("/games/littleForest");
          break;

        case GAME_TITLE.MONSTER_ESCAPE:
          history.push("/games/monsterEscape");
          break;

        case GAME_TITLE.ENERGY_BATTLE:
          history.push("/games/energyBattle");
          break;

        default:
          showErrorMessage("준비 중입니다 🤠");
      }
    },
    [history, isMicOn, showErrorMessage]
  );

  return (
    <MainPage>
      <GameOption />
      {error.length > 0 && <ErrorMessage error={error} />}
      <MainTitle> WELCOME TO VOICE GAME !! </MainTitle>
      {isUnAuthMode ? (
        <WelcomeMessage>
          비회원으로 접속하셨네요! &nbsp; &nbsp; 현재 이름은{" "}
          <Name>{playerData.name}</Name>
          입니다 😃
        </WelcomeMessage>
      ) : (
        <h1>
          <Name>{playerData.name}</Name>님 환영합니다 😃
        </h1>
      )}
      <GameCardGrid>
        <GameCard
          onClick={selectGame}
          title={GAME_TITLE.LITTLE_FOREST}
          gif={littleForestGif}
        />
        <GameCard
          onClick={selectGame}
          title={GAME_TITLE.MONSTER_ESCAPE}
          gif={monsterEscapeGif}
        />
        <GameCard
          onClick={selectGame}
          title={GAME_TITLE.ENERGY_BATTLE}
          gif={energyBattleGif}
        />
        <GameCard onClick={selectGame} gif={comingSoonThumbnail} />
      </GameCardGrid>
    </MainPage>
  );
};

export default GameList;
