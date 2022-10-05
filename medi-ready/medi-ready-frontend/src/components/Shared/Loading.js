import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <Loader>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </Loader>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  span {
    display: block;
    position: absolute;
    top: calc(50% - 10px);
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ccc;
  }

  span:nth-child(1) {
    background-color: #FF5460;
    animation: move 2s infinite cubic-bezier(.2,.64,.81,.23);
  }
  span:nth-child(2) {
    background-color: #FF9D84;
    animation: move 2s 150ms infinite cubic-bezier(.2,.64,.81,.23);
  }
  span:nth-child(3) {
    background-color: #F0E797;
    animation: move 2s 300ms infinite cubic-bezier(.2,.64,.81,.23);
  }
  span:nth-child(4) {
    background-color: #75B08A;
    animation: move 2s 450ms infinite cubic-bezier(.2,.64,.81,.23);
  }

  @keyframes move {
    0% {left: 0%;}
    100% {left:100%;}
  }
`;

const Loader = styled.div`
  position: relative;
  width: calc(100vw - 230px);
  height: 100%;
  left: 230px;
`;

export default Loading;
