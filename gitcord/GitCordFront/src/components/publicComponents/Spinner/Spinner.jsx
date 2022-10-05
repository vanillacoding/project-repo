import React from "react";
import styled from "styled-components";

const SpinnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  .backdrop {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .spinner {
    top: calc(50% - 12.5px);
    left: calc(50% - 12.5px);
    width: 25px;
    height: 25px;
    border-top: 8px solid #f0f8ff;
    border-right: 8px solid #f0f8ff;
    border-bottom: 8px solid #f0f8ff;
    border-left: 8px solid #8c618d;
    border-radius: 50%;
    animation-name: spin;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      border-left: 8px solid #ff1493;
    }

    25% {
      transform: rotate(360deg);
      border-left: 8px solid #ffd700;
    }

    50% {
      transform: rotate(720deg);
      border-left: 8px solid #98fb98;
    }

    75% {
      transform: rotate(1080deg);
      border-left: 8px solid #00ffff;
    }

    100% {
      transform: rotate(1440deg);
      border-left: 8px solid #ff1493;
    }
  }
`;

function Spinner() {
  return (
    <SpinnerContainer>
      <div className="backdrop">
        <div className="spinner" />
      </div>
    </SpinnerContainer>
  );
}

export default Spinner;
