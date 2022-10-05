import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";

import clouds from "../../../public/clouds.png"
import config from "../../phaser/scenes/singleplay";
import Modal from "../../components/Modal";
import GameOverModalView from "../../components/Modal/GameOverModalView";
import GameClearModalView from "../../components/Modal/GameClearModalView";
import { gameProgress } from "../../constants/gameState";
import { updateGameProgress, gameProgressSelector } from "../../redux/slices/singlePlaySlice";
import PageCard from "../../components/shared/PageCard";
import PageWrapper from "../../components/shared/PageWrapper";

const GamePage = () => {
  const { progress } = useSelector(gameProgressSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();
  const [gameResult, setGameResult] = useState({
    score: "",
    time: "",
  });

  useEffect(() => {
    const game = new Phaser.Game(config);

    const guideMessage = "Use the rudder key to move";

    addToast(guideMessage, {
      appearance: "info",
      autoDismiss: false,
    });

    game.events.on("gameClear", ({ score, time }) => {
      console.log(score, time);
      setGameResult((prev) => ({
        ...prev,
        score,
        time,
      }));

      dispatch(updateGameProgress(gameProgress.GAME_CLEAR));
    });

    return () => {
      game.destroy();
    };
  }, []);

  const handleGameOverModalClick = () => {
    history.push("/");

    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));
  };

  const handleGameClearModalClick = () => {
    history.push("/records");

    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));
  };

  return (
    <PageWrapper color="#B9F8FF" src={clouds}>
      {progress === gameProgress.GAME_OVER && (
        <Modal>
          <GameOverModalView onHomeClick={handleGameOverModalClick} />
        </Modal>
      )}
      {progress === gameProgress.GAME_CLEAR && (
        <Modal>
          <GameClearModalView 
            onClick={handleGameClearModalClick} 
            score={gameResult.score} 
            time={gameResult.time} 
          />
        </Modal>
      )}
      <PageCard width={1024} height={768}>
        <GameContainer id="game-container" />
      </PageCard>
    </PageWrapper>
  );
};

const GameContainer = styled.div`
  border-radius: 10px;
`;

export default GamePage;
