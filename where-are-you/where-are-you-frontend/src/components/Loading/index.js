import React from "react";

import styled, { keyframes } from "styled-components";

import PuzzleIcon from "./PuzzleIcon";

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.color.background};
  color: white;
  animation: ${fadeOut} 1s 1.5s ease-in-out forwards;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.color.black};
  font-size: 1.5rem;
  font-weight: 700;
`;

function Loading() {
  return (
    <Wrapper>
      <PuzzleIcon />
      <Text>Loading...</Text>
    </Wrapper>
  );
}

export default Loading;
