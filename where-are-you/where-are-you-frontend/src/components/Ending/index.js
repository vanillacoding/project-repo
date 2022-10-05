import React, { useRef, useEffect } from "react";

import styled, { keyframes } from "styled-components";

import FirstScene from "./FirstScene";
import LastScene from "./LastScene";
import Result from "./Result";
import SecondScene from "./SecondScene";
import ThirdScene from "./ThirdScene";

const fadeIn = keyframes`
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 10vh 0 0 0;
  display: grid;
  grid-template-columns: 600px auto;
  grid-template-rows: 430px 160px auto;
`;

const Scene = styled.div`
  display: flex;
  justify-content: center;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;

  &:first-child {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    animation-delay: 0;
  }

  &:nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    animation-delay: 4s;
  }

  &:nth-child(3) {
    grid-column: 1 / 2;
    grid-row: 3 / 5;
    animation-delay: 5.5s;
  }

  &:nth-child(4) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    animation-delay: 6.5s;
  }

  &:nth-child(5) {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
    animation-delay: 9s;
  }
`;

export default function Ending() {
  const endingRef = useRef();
  const thirdSceneRef = useRef();

  useEffect(() => {
    const thirdSceneTop = thirdSceneRef.current.offsetTop;

    setTimeout(() => {
      window.scroll({
        top: thirdSceneTop,
        behavior: "smooth"
      });
    }, 5000);
  }, []);

  return (
    <Wrapper ref={endingRef}>
      <Scene>
        <FirstScene />
      </Scene>
      <Scene>
        <SecondScene />
      </Scene>
      <Scene ref={thirdSceneRef}>
        <ThirdScene />
      </Scene>
      <Scene>
        <LastScene />
      </Scene>
      <Scene>
        <Result />
      </Scene>
    </Wrapper>
  );
}
