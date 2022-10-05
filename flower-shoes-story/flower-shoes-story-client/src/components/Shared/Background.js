import React from "react";
import styled from "styled-components";

import bg_noise from "../../assets/bg_noise.png";

const Background = () => {
  return (
    <Wrapper></Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vw;
  background: url(${bg_noise}) repeat 50%/190px 190px;
  animation: noise .24s steps(4) forwards infinite;
  z-index: -1;
  opacity: .21;
  transition: 1.1s linear 0.5s;
`;

export default Background;
