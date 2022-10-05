import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { removePlayerGameData } from "../../actions/game";
import { savePlayerName, removePlayer } from "../../actions/player";
import DoorImage from "../../assets/main/main_door.png";
import LinkButton from "../Shared/LinkButton";
import NormalButton from "../Shared/NormalButton";
import Logo from "./Logo";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    clip-path: polygon(0 0, 0 0, 0 0, 0 100%);
  }

  to {
    clip-path: polygon(100% 65%, 100% 33%, 0 0, 0 100%);
  }
`;

const Wrapper = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  font-family: "Goudy Bookletter 1911";

  &::before {
    content: "";
    width: 65vw;
    height: 100vh;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background: rgba(255, 255, 255, 0.65);
    clip-path: polygon(0 0, 0 0, 0 0, 0 100%);
    animation: ${scaleUp} 1s 3.3s forwards;
  }
`;

const StartBox = styled.div`
  margin: -4rem 0 0 3rem;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0;
  animation: ${fadeIn} 1s 3.5s forwards;
`;

const Input = styled.input`
  width: 100%;
  margin: 0 0 0.5rem 0;
  padding: 0.5rem;
  display: block;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.grey};
  }
`;

const Validation = styled.p`
  color: ${({ theme }) => theme.color.red};
  font-size: 1rem;
`;

const Door = styled.img`
  width: 300px;
  height: 388px;
  margin: 0 2rem 0 0;
  display: inline-block;
  align-self: center;
  opacity: 0;
  animation: ${fadeIn} 1.5s 3.3s forwards;
`;

function Main() {
  const [name, setName] = useState("");
  const [validationText, setValidationText] = useState("");
  const playerName = useSelector((state) => state.player.name);

  const dispatch = useDispatch();
  const history = useHistory();

  const startGame = () => {
    if (name === "") {
      setValidationText("이름을 입력해주세요.");
      return;
    }

    dispatch(savePlayerName(name.trim()));
    history.push("/game/room/livingroom");
  };

  const startNewGame = () => {
    dispatch(removePlayer());
    dispatch(removePlayerGameData());
  };

  const renderContinueGame = () => {
    return (
      <Menu>
        <LinkButton
          path="/game/room/livingroom"
          color="black"
          title="CONTINUE"
        />
        <NormalButton
          title="NEW GAME"
          color="black"
          handleClick={startNewGame}
        />
      </Menu>
    );
  };

  const renderNewGame = () => {
    return (
      <Menu>
        <label
          htmlFor="name"
          className="sr-only"
        >
          이름
        </label>
        <Input
          id="name"
          placeholder="Type your name"
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
        />
        {validationText && <Validation>{validationText}</Validation>}
        <NormalButton
          title="GAME START"
          color="black"
          handleClick={startGame}
        />
      </Menu>
    );
  };

  return (
    <Wrapper>
      <StartBox>
        <Logo />
        {playerName !== ""
          ? renderContinueGame()
          : renderNewGame()}
      </StartBox>
      <Door src={DoorImage} alt="게임 메인 이미지" />
    </Wrapper>
  );
}

export default Main;
