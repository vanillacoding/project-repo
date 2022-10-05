import { useState, useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import useSound from 'use-sound';

import {
  changeGameStatus,
  changeMessage,
  saveUserAnswer,
  addScore,
} from '../../store/quizSlice';
import { getCountSameLetter } from '../../utils/getCountSameLetter';
import { inspectKorean } from '../../utils/inspectInputType';

import { GAME_STATUS } from '../../constants/game';
import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { VALIDATION_INPUT, VALIDATION_ANSWER } from '../../constants/messages';

import Button from '../share/Button';

function InputBox() {
  const dispatch = useDispatch();
  const quizCollection = useSelector((state) => state.quiz.quizCollection);
  const currentQuizIndex = useSelector((state) => state.quiz.currentQuizIndex);
  const currentQuizId = quizCollection.allIds[currentQuizIndex];
  const gameStatus = useSelector((state) => state.quiz.gameStatus);
  const isResultDisplayTime = gameStatus === GAME_STATUS.RESULT_DISPLAY_TIME;
  const { answer } = quizCollection.byId[currentQuizId];
  const [play] = useSound('/audio/breakIce.wav');
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isResultDisplayTime) setInput('');
  }, [isResultDisplayTime]);

  const submitInput = (ev) => {
    ev.preventDefault();
    play();

    if (input === answer) {
      setInput('');
      dispatch(addScore());
      dispatch(saveUserAnswer(input));

      return dispatch(changeGameStatus(GAME_STATUS.RESULT_DISPLAY_TIME));
    }

    if (input.length === 0)
      return dispatch(changeMessage(VALIDATION_INPUT.FILL_BLANK));

    if (!inspectKorean(input)) {
      setInput('');
      return dispatch(changeMessage(VALIDATION_INPUT.ONLY_KOREAN));
    }

    if (input.length < answer.length) {
      return dispatch(
        changeMessage({
          type: VALIDATION_INPUT.TYPE,
          text: `정답은 ${answer.length}자리 입니다.`,
        }),
      );
    }

    const count = getCountSameLetter(answer, input);
    count === 0
      ? dispatch(changeMessage(VALIDATION_ANSWER.ALL_WRONG))
      : dispatch(
          changeMessage({
            type: VALIDATION_ANSWER.TYPE,
            text: `정답과 ${count}글자가 일치합니다`,
          }),
        );

    dispatch(saveUserAnswer(input));
    setInput('');
  };

  const handleInput = (ev) => {
    const inputValue = ev.target.value.trim();

    if (answer && inputValue.length > answer.length) {
      setInput(inputValue.slice(0, answer.length));
      return dispatch(
        changeMessage({
          type: VALIDATION_INPUT.TYPE,
          text: `정답은 ${answer.length}자리 입니다.`,
        }),
      );
    }

    setInput(inputValue);
  };

  return (
    <Wrapper>
      {gameStatus === GAME_STATUS.ANSWER_GUESS_TIME ? (
        <Form
          onSubmit={submitInput}
          isAnswer={answer === input}
          data-testid="form"
        >
          <input
            className="input"
            type="text"
            lang="ko"
            placeholder="Guess What"
            value={input}
            onChange={handleInput}
            autoFocus
          />
          <Button
            text="Break"
            backgroundColor="lightPurple"
            size="small"
            type="submit"
            disabled={gameStatus === GAME_STATUS.BEFORE_START}
          />
        </Form>
      ) : null}
    </Wrapper>
  );
}

const MemoizedInputBox = memo(InputBox);
export default MemoizedInputBox;

const Wrapper = styled.div`
  ${flexCenterColumn}
  height: 16%;
`;

const Form = styled.form`
  ${flexCenter}
  text-align: center;

  .input {
    width: 140px;
    height: 50px;
    padding: 0;
    margin-right: 10px;
    text-align: center;
    border-radius: 20px;
    font-family: 'Do hyeon';
    font-size: 20px;
    background-color: #ffffff80;
    box-shadow: ${({ theme }) => theme.boxShadow};

    ::placeholder {
      font-size: 15px;
      font-family: 'Rammetto One';
      color: ${({ theme }) => theme.deepGray60};
    }
  }
`;
