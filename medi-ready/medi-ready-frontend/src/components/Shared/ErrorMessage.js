import React from "react";
import styled from "styled-components";

const ErrorMessage = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.p`
  position: relative;
  margin-top: 10px;
  text-align: left;
  letter-spacing: -0.65px;
  line-height: 1.2;
  font-size: 13px;
  color: #f03264;
  animation-name: bounce;
  animation-duration: .5s;
  animation-delay: .25s;

  @keyframes bounce {
    0% {
      transform: translateX(0px);
      timing-function: ease-in;
    }
    37% {
      transform: translateX(5px);
      timing-function: ease-out;
    }
    55% {
      transform: translateX(-5px);
      timing-function: ease-in;
    }
    73% {
      transform: translateX(4px);
      timing-function: ease-out;
    }
    82% {
      transform: translateX(-4px);
      timing-function: ease-in;
    }
    91% {
      transform: translateX(2px);
      timing-function: ease-out;
    }
    96% {
      transform: translateX(-2px);
      timing-function: ease-in;
    }
    100% {
      transform: translateX(0px);
      timing-function: ease-in;
    }
  }
`;

export default ErrorMessage;
