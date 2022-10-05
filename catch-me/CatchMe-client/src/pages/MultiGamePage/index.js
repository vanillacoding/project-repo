import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

import clouds from "../../../public/clouds.png"
import config from "../../phaser/scenes/multiplay";
import Modal from "../../components/Modal";
import GameOverModalView from "../../components/Modal/GameOverModalView";
import { gameProgress } from "../../constants/gameState";
import { changeReadyState, gameProgressSelector, leaveRoom } from "../../redux/slices/multiplaySlice";
import PageWrapper from "../../components/shared/PageWrapper";
import PageCard from "../../components/shared/PageCard";
import { updateGameProgress } from "../../redux/slices/singlePlaySlice";

import mainFont from "../.././../public/font/ConcertOne-Regular.ttf"

const MultiGamePage = () => {
  const progress  = useSelector(gameProgressSelector);
  const isWin = useSelector(({ multiple: { user } }) => user.isWin);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy();
    };
  }, []);

  const handleHomeButtonClick = () => {
    dispatch(leaveRoom());

    history.push("/");
  };

  const handleGameRestartButtonClick = () => {
    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));

    history.push(`/waiting/${id}`);
  };

  return (
    <PageWrapper color="#B9F8FF" src={clouds}>
      <PageCard width={1024} height={768}>
        {progress === gameProgress.GAME_OVER && (
          <Modal>
            <GameOverModalView 
              onHomeClick={handleHomeButtonClick}
              onRestartClick={handleGameRestartButtonClick} 
              message={isWin ? "WIN" : "LOSE"}
              isMultiplay={true}
            />
          </Modal>
        )}
        <GameContainer id="game-container" />
      </PageCard>
    </PageWrapper>
  );
};

const GameContainer = styled.div`
  border-radius: 10px;
`;

export default MultiGamePage;
