import React from "react";

import styled from "styled-components";

import cat from "../../assets/ending/ending03.png";

const Scene = styled.div`
  width: 500px;
  height: 960px;
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  position: relative;
  top: -100px;
  background: url(${cat}) no-repeat top left;
`;

function ThirdScene() {
  return (
    <Scene />
  );
}

export default ThirdScene;
