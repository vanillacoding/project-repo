import React from "react";
import styled from "styled-components";

const ChatUI = ({ startIndex, startPosition, moveDirection }) => {
  const stairs = Array(10).fill("");

  return (
    <Wrapper>
      <Stairs>
        {stairs.map((_, index) => {
          return (
            <Stair className="stair" key={index} index={index} />
          );
        })}
      </Stairs>
      <Stairs>
        {stairs.map((_, index) => {
          return (
            <Stair className="stair" key={index} index={index} />
          );
        })}
      </Stairs>
      {startIndex === 10 && <Confirm>+1</Confirm>}
      <Plant>
        <div className="stem stem-center"></div>
        <div className="stem stem-left-s"></div>
        <div className="stem stem-right-s"></div>
        <div className="stem stem-left-l"></div>
        <div className="stem stem-right-l"></div>
      </Plant>
      <Character
        moveDirection={moveDirection}
        key={startIndex}
        startIndex={startIndex}
        startPosition={startPosition}
      >
        <div className="head"></div>
        <div className="upper-body"></div>
        <div className="arm"></div>
        <div className="upper-leg"></div>
        <div className="down-leg"></div>
        <div className="foot"></div>
      </Character>
    </Wrapper>
  );
};

const Confirm = styled.div`
  position: absolute;
  bottom: calc(3.472vw * 10 + 130px);
  left: 0;
  padding: 0px 19px;
  transform: scaleX(-1);
  opacity: 0;
  animation: fade .5s ease-in-out;
  animation-delay: 1000ms;

  @keyframes fade {
    0% {
      opacity: 0;
      bottom: calc(3.472vw * 10 + 130px);
    }
    50% {
      opacity: 1;
      bottom: calc(3.472vw * 10 + 135px);
    }
    100% {
      opacity: 0;
      bottom: calc(3.472vw * 10 + 140px);
    }
  }
`;

const Plant = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 110px;
  transform: scale(.6);

  .stem {
    position: absolute;
    bottom: 0;
    transform-origin: 50% 100%;
    z-index: 10;
    overflow: hidden;

    :before, :after {
      content: "";
      position: absolute;
      top: 0;
      border-top: 0;
      border-radius: 50%;
    }
  }

  .stem-left-s {
    width: 50px;
    height: 60px;
    left: -15px;
    animation: wave 3s infinite ease-in-out;

    :before {
      right: 0;
      width: 90px;
      height: 120px;
      border-right: 20px solid #2b544d;
    }

    :after {
      top:1px;
      right:6px;
      width:90px;
      height:120px;
      transform: rotateZ(15deg);
      border-right: 18px solid #2b544d;
    }
  }

  .stem-left-l {
    width: 80px;
    height: 100px;
    left: -30px;
    animation: reverseWave 4s infinite ease-in-out;

    :before {
      right:2px;
      width: 160px;
      height: 190px;
      border-right: 25px solid #2b544d;
      transform: rotateZ(20deg);
    }

    :after {
      right: 7px;
      width: 160px;
      height: 190px;
      border-right: 18px solid #2b544d;
      transform: rotateZ(25deg);
    }
  }

  .stem-right-s {
    height: 50px;
    width: 80px;
    right: -35px;
    animation: reverseWave 3.2s -0.5s infinite ease-in-out;

    :before {
      left: 0;
      height: 190px;
      width: 100px;
      border-left: 22px solid #2b544d;
    }

    :after {
      left: 15px;
      width: 100px;
      height: 190px;
      border-left: 13px solid #2b544d;
      transform: rotateZ(-10deg);
    }
  }

  .stem-right-l {
    width: 80px;
    height: 75px;
    right: -22px;
    animation: wave 3.2s -1s infinite ease-in-out;

    :before {
      left: 0;
      width: 160px;
      height: 190px;
      border-left: 26px solid #2b544d;
    }

    :after {
      left: 6px;
      height: 190px;
      width: 160px;
      border-left: 20px solid #2b544d;
      transform: rotateZ(-10deg);
    }
  }

  .stem-center {
    width: 90px;
    height: 120px;
    left: -15px;
    animation: wave 3s -1.2s infinite ease-in-out;

    :before {
      right: 10px;
      width: 140px;
      height: 240px;
      border-right: 28px solid #2b544d;
      transform: rotateZ(15deg);
    }

    :after {
      right:15px;
      height:240px;
      width:140px;
      border-right: 17px solid #2b544d;
      transform: rotateZ(15deg);
    }
  }
};

@keyframes wave {
	0% {
		transform: rotateZ(3deg) translateZ(-1px);
	}
	25%{
		transform: rotateZ(-4deg) translateZ(-1px);
	}
	50% {
		transform: rotateZ(2deg) translateZ(-1px);
	}
	75% {
		transform: rotateZ(-6deg) translateZ(-1px);
	}
	100% {
		transform: rotateZ(3deg) translateZ(-1px);
	}
}

@keyframes reverseWave {
	0% {
		transform: rotateZ(0deg) translateZ(-1px);
	}
	25%{
		transform: rotateZ(-3deg) translateZ(-1px);
	}
	50% {
		transform: rotateZ(3deg) translateZ(-1px);
	}
	75% {
		transform: rotateZ(-1deg) translateZ(-1px);
	}
	100% {
		transform: rotateZ(0deg) translateZ(-1px);
	}
}
`;

const Character = styled.div`
  position: absolute;
  bottom: ${(props) => `${props.startIndex * 3.472}vw`};
  right: ${(props) => `${props.startIndex * 3.472}vw`};
  width: 26px;
  height: 115px;
  transform: scaleX(-1);
  animation: ${(props) => props.moveDirection ? "moveUp 1s linear" : "moveDown 1s linear"};

  @keyframes moveUp {
    0% {
      bottom: ${(props) => (props.startIndex - 1) * 3.472 + "vw"};
      right: ${(props) => (props.startIndex - 1) * 3.472 + "vw"};
    }
    25% {
      bottom: ${(props) => props.startIndex * 3.472 + "vw"};
      right: ${(props) => (props.startIndex - 1) * 3.472 + "vw"};
    }
    50% {
      bottom: ${(props) => props.startIndex * 3.472 + 1.041666 + "vw"};
      right: ${(props) => (props.startIndex - 1) * 3.472 + 1.041666 + "vw"};
    }
    75% {
      bottom: ${(props) => props.startIndex * 3.472 + 1.041666 + "vw"};
      right: ${(props) => (3.472 * (props.startIndex - 1) + 2.777) + "vw"};
    }
    100% {
      bottom: ${(props) => 3.472 * props.startIndex + "vw"};
      right: ${(props) => 3.472 * props.startIndex + "vw"};
    }
  }

  @keyframes moveDown {
    0% {
      bottom: ${(props) => 3.472 * (props.startPosition) + "vw"};
      right: ${(props) => 3.472 * (props.startPosition) + "vw"};
    }
    25% {
      bottom: ${(props) => (props.startPosition * 3.472) + 1.041666 + "vw"};
      right: ${(props) => (3.472 * props.startPosition) - 0.69444 + "vw"};
    }
    50% {
      bottom: ${(props) => (props.startPosition * 3.472) + 1.041666 + "vw"};
      right: ${(props) => (props.startPosition * 3.472) - 2.777 + "vw"};
    }
    75% {
      bottom: ${(props) => props.startPosition * 3.472 + "vw"};
      right: ${(props) => (props.startIndex) * 3.472 + "vw"};
    }
    100% {
      bottom: ${(props) => (props.startIndex) * 3.472 + "vw"};
      right: ${(props) => (props.startIndex) * 3.472 + "vw"};
    }
  }

  .head {
    background-color: #222;
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    animation: moveHead 1s linear;
  }

  .upper-body {
    background-color: #222;
    position: absolute;
    top: 19px;
    left: 0;
    width: 20px;
    height: 50px;
    border-radius: 50px;
    animation: moveBody 1s linear;
  }

  .arm {
    position: absolute;
    top: 27px;
    left: 9px;
    width: 5px;
    height: 34px;
    z-index: -10;
    background-color: #222;
    border: 5px solid #222;
    border-radius: 10px;
    z-index: 10;
    transform: rotate(355deg);
    transform-origin: 10px 10px;
    animation: moveArm 1s linear;
  }

  .upper-leg {
    background-color: white;
    position: absolute;
    top: 68px;
    left: 5px;
    width: 10px;
    height: 30px;
    border: 5px solid #222;
    background-color: #222;
    border-radius: 10px;
    transform-origin: 10px 10px;
    animation: moveUpperLeg 1s linear;
  }

  .down-leg {
    position: absolute;
    background-color: white;
    top: 91px;
    left: 5px;
    width: 10px;
    height: 25px;
    border: 5px solid #222;
    background-color: #222;
    border-radius: 10px;
    transform-origin: 10px 5px;
    animation: moveDownLeg 1s linear;
  }

  .foot {
    position: absolute;
    background-color: white;
    bottom: 0;
    left: 5px;
    width: 20px;
    height: 5px;
    border: 5px solid #222;
    background-color: #222;
    border-radius: 10px;
    transform-origin: 9px 9px;
    animation: moveFoot 1s linear;
    animation-fill-mode: forwards;
  }
`;

const Stairs = styled.div`
  :before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 25%;
    display: block;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    width: 100px;
    height: 200px;
    background-color: #565ba6;
  }

  position: absolute;
  left: 0;
  bottom: 0;
`;

const Stair = styled.div`
  background-color: #e47732;
  width: ${(props) => Number(props.index + 1) * 3.472 + "vw"};
  height: 3.472vw;
`;

const Wrapper = styled.div`
  position: relative;
  width: 38.19444vw;
  margin-left: auto;
  padding-left: 110px;
  transform: scaleX(-1);
`;

export default ChatUI;
