import React from "react";

import styled, { keyframes } from "styled-components";

import cat from "../../assets/ending/ending04.png";
import balloon from "../../assets/ending/ending04_meow.png";

const showBalloon = keyframes`
  to {
    opacity: 1;
  }
`;

const Scene = styled.div`
  width: 500px;
  height: 341px;
  position: relative;
  top: 50px;
  background: url(${cat}) no-repeat center;
`;

const Balloon = styled.img`
  position: absolute;
  top: 150px;
  right: -50px;
  opacity: 0;
  animation: ${showBalloon} 1s 8s forwards;
`;

function LastScene() {
  return (
    <Scene>
      <Balloon src={balloon} alt="말풍선 이미지" />
    </Scene>
  );
}

export default LastScene;
