import React, { useContext } from "react";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";

import { changeTextBox } from "../../../actions/game";
import cursor from "../../../assets/common/search_cursor.png";
import rooms from "../../../constants/rooms";
import { ModalContext } from "../../../contexts/ModalContext";
import DetailImage from "../DetailImage";
import Lock from "../Lock";
import SliderLock from "../SliderLock";
import StylePuzzle from "../StylePuzzle";
import Canvas from "./Canvas";

const scale = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  width: 800px;
  height: 600px;
  position: absolute;
  top: 0;
  z-index: 1;

  &:hover {
    cursor: url(${cursor}), auto;
  };
`;

const Circle = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: -9999px;
  left: -9999px;
  z-index: 1;
  background: ${({ theme }) => theme.color.yellow};
  border-radius: 50%;
  mix-blend-mode: difference;
  opacity: 0;
  transition-duration: 0.1s all;
  transform: scale(1);

  &.scale {
    background: ${({ theme }) => theme.color.orange};
    animation: ${scale} 1s infinite;
  }
`;

function Room({ room }) {
  const puzzles = useSelector((state) => state.puzzle.byName);
  const passwords = useSelector((state) => state.password.byName);

  const { handleModal } = useContext(ModalContext);
  const dispatch = useDispatch();

  const showText = (image) => {
    if (image.detailImage) {
      handleModal(<DetailImage image={image.detailImage} name={image.name} text={image.text}/>);
    }

    dispatch(changeTextBox(image.text));
  };

  const showLock = (image) => {
    const puzzle = puzzles[image.puzzle];
    const { name, password } = passwords[image.password];

    if (puzzle === undefined) {
      handleModal(<SliderLock name={name} password={password} />);
      return;
    }

    handleModal(<Lock name={name} password={password} puzzleName={puzzle.name} />);
  };

  const showPuzzle = (image) => {
    const puzzle = puzzles[image.puzzle];
    handleModal(<StylePuzzle puzzle={puzzle} />);
  };

  const runImageAction = (image) => {
    if (image.text) {
      showText(image);
      return;
    }

    if (image.password) {
      showLock(image);
      return;
    }

    if (image.puzzle) {
      showPuzzle(image);
    }
  };

  return (
    <Wrapper>
      <Canvas
        runImageAction={runImageAction}
        room={room}
        items={rooms[room].items}
        leftButton={rooms[room].leftButton}
        rightButton={rooms[room].rightButton}
        description={rooms[room].description}
      />
      <Circle id="circle" />
    </Wrapper>
  );
}

Room.propTypes = {
  room: PropTypes.string.isRequired
};

export default Room;
