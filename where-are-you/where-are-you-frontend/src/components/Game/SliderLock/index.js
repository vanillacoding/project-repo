import React, { useState, useContext } from "react";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { changePlayerPassword, solvePassword } from "../../../actions/game";
import { ModalContext } from "../../../contexts/ModalContext";
import Button from "../../Shared/NormalButton";
import Slider from "./Slider";

const Content = styled.div`
  width: auto;
  height: auto;
  padding: ${({ theme }) => theme.padding.big};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Title = styled.p`
  position: relative;
  font-weight: 700;

  &::before {
    width: 6px;
    height: 6px;
    display: block;
    position: absolute;
    left: calc(50% - 3px);
    bottom: -15px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.color.red} transparent transparent transparent;
    content: "";
  }
`;

const Lock = styled.div`
  padding: ${({ theme }) => theme.padding.small};
  border: 1px solid ${({ theme }) => theme.color.grey};

  & > div:not(:last-child) {
    margin: 0 0 10px 0;
  }
`;

const Result = styled.p`
  margin: 0.5rem 0 0 0;
  color: ${({ theme }) => theme.color.red};
  font-size: 1rem;
`;

const getInitialState = (playerAnswer, password) => {
  if (playerAnswer !== "") {
    return playerAnswer.split("");
  }

  return [...Array(password.length).fill(0)];
};

function SliderLock({ name, password }) {
  const playerPassword = useSelector((state) => state.game.playerPassword[name].answer);
  const [answer, setAnswer] = useState(getInitialState(playerPassword, password));
  const [result, setResult] = useState(null);

  const { handleModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleNumber = (order, number) => {
    setAnswer((prev) => {
      const copyAnswer = [...prev];
      copyAnswer[order] = number;
      return copyAnswer;
    });
  };

  const checkAnswer = () => {
    dispatch(changePlayerPassword(name, answer.join("")));

    if (answer.join("") !== password) {
      setResult("비밀번호가 틀렸어.. 다시 생각해보자.");
      return;
    }

    dispatch(solvePassword(name));
    handleModal(null);
    history.push("/game/ending");
  };

  return (
    <Content>
      <Title>PASSWORD</Title>
      <Lock>
        {answer.map((number, index) => (
          <Slider
            handleNumber={handleNumber}
            order={index}
            value={Number(answer[index])}
            key={index}
          />))}
      </Lock>
      {result
        && <Result>{result}</Result>}
      <Button
        title="입력"
        color="black"
        handleClick={checkAnswer}
      />
    </Content>
  );
}

SliderLock.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default SliderLock;
