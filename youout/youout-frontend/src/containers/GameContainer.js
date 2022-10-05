import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import GameHeader from '../components/GameHeader';
import Camera from '../components/Camera';
import CardWrapper from '../components/CardWrapper';
import { Popup } from '../components/Card';
import Button from '../components/Button';
import { setRoute } from '../reducer/route';
import { disconnectGame } from '../reducer/currentGame';
import awsRekognition from '../utils/aws';
import { translateKorean } from '../utils/kakao';
import { convertMsToMinutes, convertTimeToMs, format } from '../utils/index';
import { updateData, listenUpdateData, gameComplete } from '../utils/socket';
import { GAME_PHASE, DELAY, GAME_MESSAGE } from '../constants/game';

const GameContainer = () => {
  const gameInfo = useSelector((state) => state.currentGame);
  const {
    gameInfo: { quizList, timeLimit },
    users,
  } = gameInfo;
  const { id: userId } = useSelector((state) => state.user.info);
  const dispatch = useDispatch();
  const { game_id } = useParams();

  const [ minutes, setMinutes ] = useState(0);
  const [ seconds, setSeconds ] = useState(59);

  const [ gameIndex, setGameIndex ] = useState(0);
  const [ gamePhase, setGamePhase ] = useState(GAME_PHASE.KEYWORD);
  const [ userAnswer, setUserAnswer ] = useState('');
  const [ resultMessage, setResultMessage ] = useState('');
  const [ userAlertList, setUserAlertList ] = useState([]);
  const [ isCardShowing, setIsCardShowing ] = useState(true);
  const [ isHintShowing, setIsHintShowing ] = useState(false);
  const [ isQuitShowing, setIsQuitShowing ] = useState(false);
  const [ isSubmittedAnswer, setIsSubmittedAnswer ] = useState(false);
  const [ recognizedKeywordList, setRecognizedKeywordList ] = useState([]);

  useEffect(() => {
    setGameIndex(0);
    setMinutes(convertMsToMinutes(timeLimit) - 1);
  }, []);

  useEffect(() => {
    listenUpdateData((data) => {
      const target = users.find((user) => user._id === data.userId);
      setUserAlertList([ ...userAlertList, target ]);
    });

    const timerId = setInterval(() => {
      setUserAlertList((prev) => {
        return prev.filter((item, index) => index !== 0);
      });
    }, DELAY.THREE_SEC);

    return () => clearInterval(timerId);
  }, [userAlertList]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (seconds > 0) return setSeconds((prev) => prev - 1);

      if (seconds === 0) {
        if (minutes === 0) {
          dispatch(disconnectGame({ gameId: game_id }));
          dispatch(setRoute('/games'));
          clearTimeout(timerId);
          return;
        }

        setMinutes((prev) => prev - 1);
        setSeconds(59);
      }
    }, DELAY.ONE_SEC);

    return () => clearTimeout(timerId);
  }, [seconds]);

  const matchPhotoToKeyword = async (dataUri) => {
    if (gamePhase === GAME_PHASE.QUIZ) return;

    const response = await awsRekognition.detectLabels(dataUri);
    const result = await awsRekognition.compareLabels({
      keyword: quizList[gameIndex].keyword,
      data: response,
    });

    if (!result) {
      setResultMessage('땡!');
      const list = await Promise.all(response.Labels.slice(0, 3).map(async (item) => {
        return await translateKorean(item.Name);
      }));
      setRecognizedKeywordList(list);
      return;
    }

    setGamePhase(GAME_PHASE.QUIZ);
    setIsCardShowing(true);
    setResultMessage('');
    setRecognizedKeywordList([]);
  };

  const handleSubmitAnswer = () => {
    if (isSubmittedAnswer) return;

    const isCorrectAnswer = format(userAnswer) === format(quizList[gameIndex].answer);

    if (!isCorrectAnswer) {
      setResultMessage(GAME_MESSAGE.WRONG_ANSWER);
      setUserAnswer('');
      setGamePhase(GAME_PHASE.QUIZ);
      return;
    }

    setResultMessage(GAME_MESSAGE.CORRECT_ANSWER);
    updateData({ gameId: game_id, userId });
    setIsSubmittedAnswer(true);

    setTimeout(() => {
      const lastQuizIndex = quizList.length - 1;
      setGameIndex((prev) => prev + 1);

      if (gameIndex === lastQuizIndex) {
        gameComplete({
          gameId: game_id,
          userId,
          clearTime: convertTimeToMs(minutes, seconds),
        });

        dispatch(setRoute(`/games/${game_id}/result`));
        return;
      }

      setGamePhase(GAME_PHASE.KEYWORD);
      setIsCardShowing(true);
      setResultMessage('');
      setUserAnswer('');
      setIsSubmittedAnswer(false);
    }, DELAY.TWO_SEC);
  };

  const handleToggleHint = () => setIsHintShowing(!isHintShowing);
  const handleToggleQuit = () => setIsQuitShowing(!isQuitShowing);
  const handleQuit = () => dispatch(setRoute('/games'));
  const handleSetAnswer = ({ target }) => {
    setResultMessage('');
    setUserAnswer(target.value);
  };

  return (
    <>
      <GameHeader
        minutes={minutes}
        seconds={seconds}
        onToggleHint={handleToggleHint}
        onToggleQuit={handleToggleQuit}
      >
        {
          isHintShowing &&
          <Popup
            className='hintPopup'
            content={
              gamePhase === GAME_PHASE.QUIZ
                ? quizList[gameIndex]?.hint
                : GAME_MESSAGE.WAIT_FOR_QUIZ
            }
          >
            <Button className='popupButton' text='확인' onClick={handleToggleHint} />
          </Popup>
        }
        {
          isQuitShowing &&
          <Popup className='exitPopup' content={GAME_MESSAGE.CONFIRM_QUIT}>
            <Button className='popupButton' text='확인' onClick={handleQuit} />
            <Button className='popupButton' text='취소' onClick={handleToggleQuit} />
          </Popup>
        }
      </GameHeader>
      <Camera matchPhotoToKeyword={matchPhotoToKeyword} />
      {
        quizList[gameIndex] &&
        <CardWrapper
          keyword={quizList[gameIndex].keyword}
          quiz={quizList[gameIndex].quiz}
          gamePhase={gamePhase}
          userAnswer={userAnswer}
          resultMessage={resultMessage}
          userAlertList={userAlertList}
          isCardShowing={isCardShowing}
          onSetCardShowing={setIsCardShowing}
          onSubmitAnswer={handleSubmitAnswer}
          onSetAnswer={handleSetAnswer}
          recognizedKeywordList={recognizedKeywordList}
        />
      }
    </>
  );
};

export default GameContainer;
