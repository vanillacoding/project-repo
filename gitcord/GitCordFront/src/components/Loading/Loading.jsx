import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ModalBackground from "../publicComponents/ModalBackground/ModalBackground";

const Loader = styled.div`
  position: relative;
  height: 5rem;
  width: 9rem;
  animation-name: rotate;
  animation-duration: 3s;
  animation-delay: 1s;
  animation-iteration-count: infinite;

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(720deg);
  }
  to {
    transform: rotate(720deg);
  }
}

.l-small {
  position: absolute;
  height: 1rem;
  width: 1rem;
  background: #eee;
  left: 0;
  top: 2rem;
  animation-name: left-small;
  animation-duration: 3s;
  animation-delay: 1s;
  animation-iteration-count: infinite;
}

@keyframes left-small {
  from {
    transform: translate(0rem, 0rem);
  }
  20% {
    transform: translate(-2rem, -1rem);
  }
  60% {
    transform: translate(3rem, -3rem);
  }
  70% {
    transform: translate(-2rem, -1rem);
  }
  80% {
    transform: translate(0rem, 0rem);
  }
  to {
    transform: translate(0rem, 0rem);
  }
}

.l-big {
  position: absolute;
  height: 2rem;
  width: 2rem;
  background: #eee;
  left: 1rem;
  top: 1.5rem;
  animation-name: left-big;
  animation-duration: 3s;
  animation-delay: 1s;
  animation-iteration-count: infinite;
}

@keyframes left-big {
  from {
    transform: translateX(0rem);
  }
  20% {
    transform: translateX(-1rem);
  }
  70% {
    transform: translateX(-1rem);
  }
  80% {
    transform: translateX(0rem);
  }
  to {
    transform: translateX(0rem);
  }
}

.face {
  position: absolute;
  height: 3rem;
  width: 3rem;
  background: #eee;
  left: 3rem;
  top: 1rem;
  border-radius: 20%;
}

.face::before {
  position: absolute;
  content: "";
  height: 0.8rem;
  width: 0.75rem;
  background: #262a39;
  border-radius: 50%;
  top: 1rem;
  left: 0.5rem;
}

.face::after {
  position: absolute;
  content: "";
  height: 0.8rem;
  width: 0.75rem;
  background: #262a39;
  border-radius: 50%;
  top: 1rem;
  right: 0.5rem;
}

.r-big {
  position: absolute;
  height: 2rem;
  width: 2rem;
  background: #eee;
  right: 1rem;
  top: 1.5rem;
  animation-name: right-big;
  animation-duration: 3s;
  animation-delay: 1s;
  animation-iteration-count: infinite;
}

@keyframes right-big {
  from {
    transform: translateX(0rem);
  }
  20% {
    transform: translateX(1rem);
  }
  70% {
    transform: translateX(1rem);
  }
  80% {
    transform: translateX(0rem);
  }
  to {
    transform: translateX(0rem);
  }
}

.r-small {
  position: absolute;
  height: 1rem;
  width: 1rem;
  background: #eee;
  right: 0;
  top: 2rem;
  animation-name: right-small;
  animation-duration: 3s;
  animation-delay: 1s;
  animation-iteration-count: infinite;
}

@keyframes right-small {
  from {
    transform: translate(0rem, 0rem);
  }
  20% {
    transform: translate(2rem, -1rem);
  }
  30% {
    transform: translate(1rem, 3rem);
  }
  40% {
    transform: translate(-2rem, 3rem);
  }
  50% {
    transform: translate(-2rem, 3rem);
  }
  60% {
    transform: translate(1rem, 3rem);
  }
  70% {
    transform: translate(2rem, -1rem);
  }
  80% {
    transform: translate(0rem, 0rem);
  }
  to {
    transform: translate(0rem, 0rem);
  }
}
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 600px;
  height: 250px;

  .text {
    font-size: 50px;
    font-weight: bold;
    color: white;
  }
`;

function Loading() {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const loadingCount = setTimeout(() => {
      if (loadingText === "Loading...") {
        setLoadingText("Loading");
      } else {
        setLoadingText(loadingText + ".");
      }
    }, 500);

    return () => clearTimeout(loadingCount);
  }, [loadingText]);

  return (
    <ModalBackground>
      <LoadingContainer>
        <Loader>
          <span className="l-small"></span>
          <span className="l-big"></span>
          <span className="face"></span>
          <span className="r-big"></span>
          <span className="r-small"></span>
        </Loader>
        <div className="text">{loadingText}</div>
      </LoadingContainer>
    </ModalBackground>
  );
}

export default Loading;
