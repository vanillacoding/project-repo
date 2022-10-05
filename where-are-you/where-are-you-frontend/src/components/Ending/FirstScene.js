import React from "react";

import styled, { keyframes } from "styled-components";

import doorClosed from "../../assets/ending/ending01-1.png";
import doorOpened from "../../assets/ending/ending01-2.png";
import light from "../../assets/ending/ending01_light.png";

const changeBg = keyframes`
  to {
    background: url(${doorOpened}) no-repeat center;
  }
`;

const lightOn = keyframes`
  to {
    opacity: 0.7;
  }
`;

const Scene = styled.div`
  width: 600px;
  height: 420px;
  position: relative;
  background: url(${doorClosed}) no-repeat center;
  animation: ${changeBg} 1s 1s forwards;
`;

const Light = styled.img`
  position: absolute;
  bottom: -30px;
  left: -20px;
  opacity: 0;
  animation: ${lightOn} 1s 2s forwards;
`;

function FirstScene() {
  return (
    <Scene>
      <Light src={light} alt="빛 효과 이미지" />
    </Scene>
  );
}

export default FirstScene;
