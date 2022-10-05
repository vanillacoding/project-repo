import React from "react";

import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";

const barAnimation = (numbers) => keyframes`
  from {
    width: 0;
  }

  to {
    width: calc(100% / 4 * ${numbers});
  }
`;

const stripeAnimation = keyframes`
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 60px 0;
  }
`;

const Wrapper = styled.div`
  width: 365px;
  display: flex;
  align-items: center;
  position: relative;
  top: -2.7rem;
  color: rgba(0, 0, 0, 0.4);
`;

const Label = styled.span`
  width: 65px;
`;

const Guide = styled.ul`
  width: 300px;
  padding: 0;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: -15px;
  right: 0;
  font-size: 0.8rem;
`;

const Bar = styled.div`
  width: 300px;
  height: 15px;
  position: relative;
  background-size: 30px 30px;
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.7) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.7) 75%,
    transparent 75%,
    transparent
  );
  border: 1px solid ${({ theme }) => theme.color.orange};
  animation: ${stripeAnimation} 1s linear infinite;

  &::after {
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.color.orange};
    content: "";
    animation: ${props => barAnimation(props.unlockedPasswords)} 2s forwards;
  }
`;

const Alert = styled.span`
  width: 50px;
  padding: 0 0 5px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: -2.8rem;
  left: calc(300px / 4 * ${props => props.unlockedPasswords} + 40px);
  font-size: 0.7rem;
  text-align: center;
  line-height: 0.7rem;

  &::after {
    width: 5px;
    height: 5px;
    margin: 3px 0 0 0;
    display: block;
    border-width: 5px;
    border-style: solid;
    border-color: #ccb8ac transparent transparent transparent;
    content: "";
  }
`;

function ProgressBar() {
  const playerPassword = useSelector((state) => state.game.playerPassword);

  const checkUnlockedPasswords = () => {
    let count = 0;

    for (const password in playerPassword) {
      if (password === "password5") continue;

      if (playerPassword[password].isUnlocked) count++;
    }

    return count;
  };

  return (
    <Wrapper>
      <Label aria-hidden="true">Unlocked</Label>
      <p className="sr-only">
        해제된 비밀번호 갯수: {checkUnlockedPasswords()}개
      </p>
      <Guide>
        <li aria-hidden="true">0</li>
        <li aria-hidden="true">1</li>
        <li aria-hidden="true">2</li>
        <li aria-hidden="true">3</li>
        <li aria-hidden="true">4</li>
      </Guide>
      <Bar unlockedPasswords={checkUnlockedPasswords()} />
      <Alert
        aria-hidden="true"
        unlockedPasswords={checkUnlockedPasswords()}
      >
        {checkUnlockedPasswords() === 4
          ? "TRY ESCAPE"
          : "KEEP GOING"
        }
      </Alert>
    </Wrapper>
  );
}

export default ProgressBar;
