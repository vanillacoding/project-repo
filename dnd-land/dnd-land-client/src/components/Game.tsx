import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { fullWidthAndHeight } from "../styles/mixin";

import Phaser from "phaser";
import { config } from "../phaser-game/config";

function Game() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    const phaserGame = new Phaser.Game(config);

    return () => {
      phaserGame.destroy(true);
    };
  }, []);

  return (
    <Wrapper>
      <div id="game-container" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${fullWidthAndHeight}

  position: absolute;
  top: 0;
  left: 0;
`;

export default Game;
