import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

import { gameSocket, getMySocketId } from '../utils/socket';

import Button from './Button';

function SpeechGame({ roomId, isMyTurn, setIsMyTurn, setCurrentTurn, setIsFinalGame }) {
  const [gameData, setGameData] = useState(null);
  const gameDataRef = useRef();
  const isMyTurnRef = useRef();

  const timeout = useRef();
  const recognition = useRef();

  const [phrase, setPhrase] = useState('');
  const [notification, setNotification] = useState('');
  const [script, setScript] = useState('');

  const deleteReconginiton = () => {
    if (!recognition.current) return;
    recognition.current.stop();
    recognition.current = null;
  };

  const restartSpeech = () => {
    if (!recognition.current) return;

    try {
      recognition.current.stop();
      recognition.current.start();
    } catch (err) {
      console.warn(err);
    }
  };

  const resetGame = () => {
    setPhrase('');
    setNotification('');
    setScript('');

    setCurrentTurn('');
    setGameData(null);
    setIsFinalGame(false);
    setIsMyTurn(false);

    clearTimeout(timeout.current);
    timeout.current = null;
    gameDataRef.current = null;
  };

  const startGame = () => {
    gameSocket.startGame({ title: 'speechBomb', roomId });
  };

  useEffect(() => {
    if (gameData) return;

    gameSocket.listenInitailizingGame(data => {
      const { initialTurn } = data;
      const mySocketId = getMySocketId();
      const isMyTurn = mySocketId === initialTurn;

      gameDataRef.current = data;
      isMyTurnRef.current = isMyTurn;

      setGameData(data);
      setIsMyTurn(isMyTurn);
      setCurrentTurn(initialTurn);
    });

    gameSocket.listenTurnChange(targetSocketId => {
      const mySocketId = getMySocketId();
      const isMyTurn = targetSocketId === mySocketId;

      isMyTurnRef.current = isMyTurn;

      setIsMyTurn(isMyTurn);
      setCurrentTurn(targetSocketId);
    });

    gameSocket.listenResetGame(resetGame);

    return () => resetGame();
  }, []);

  useEffect(() => {
    if (!gameData) return;

    if (!timeout.current) {
      timeout.current = setTimeout(() => {
        deleteReconginiton();

        if (isMyTurnRef.current) {
          setNotification('내가 걸렸다..💥');
        } else {
          setNotification('난 걸리지 않았다😎');
        }

        setGameData(null);
        setScript('');
        setIsFinalGame(true);

        clearTimeout(timeout.current);
        timeout.current = null;
        gameDataRef.current = null;
      }, gameData.explosionTime);
    }
  }, [gameData, isMyTurn]);

  useEffect(() => {
    if (!gameData) return;
    if (!isMyTurn) {
      deleteReconginiton();

      gameSocket.listenProceedGame(data => {
        const { targetPhrase, notification, script } = data;
        if (notification) setNotification(notification);
        if (targetPhrase) setPhrase(targetPhrase);
        if (script) setScript(script);
      });
    } else {
      setScript('');
      setPhrase('');

      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const SpeechGrammarList =
        window.SpeechGrammarList || window.webkitSpeechGrammarList;

      const randomIndex = _.random(0, gameData.phrases.length - 1);
      const targetPhrase = gameData.phrases[randomIndex];

      gameSocket.sendGameStatus({
        roomId,
        targetPhrase,
        notification: '두구두구두구🥁',
      });

      const startRecongnition = () => {
        setPhrase(targetPhrase);
        setNotification('두구두구두구🥁');

        recognition.current = new SpeechRecognition();
        const speechRecognitionList = new SpeechGrammarList();
        const grammar = `#JSGF V1.0; grammar phrase; public <phrase> = ${phrase};`;
        let speechResult;

        speechRecognitionList.addFromString(grammar, 1);

        recognition.current.grammars = speechRecognitionList;
        recognition.current.lang = 'ko';
        recognition.current.interimResults = true;
        recognition.current.maxAlternatives = 1;

        const getSpeechResult = (result = '') => {
          if (!gameDataRef.current) return;

          const isAnswer =
            result.split(' ').join('') === targetPhrase.split(' ').join('');

          if (isAnswer) {
            gameSocket.sendGameStatus({
              roomId,
              notification: '정답입니다.',
            });

            setNotification('정답입니다.');
            gameSocket.sendNextTurn({ roomId });
          } else {
            setNotification('다시 한번 말 해보세요.💪');
            restartSpeech();
          }
        };

        recognition.current.start();

        recognition.current.onaudiostart = () => {
          if (!recognition.current) return;

          gameSocket.sendGameStatus({
            roomId,
            script: '인식중..👂',
          });

          setScript('인식중..👂');
        };

        recognition.current.onresult = ev => {
          speechResult = ev.results[0][0].transcript;

          gameSocket.sendGameStatus({
            roomId,
            script: speechResult,
          });

          setScript(speechResult);
        };

        recognition.current.onend = () => {
          getSpeechResult(speechResult);
        };

        recognition.current.onerror = ev => {
          console.warn(ev.error);
          deleteReconginiton();
          gameSocket.sendResetGame(roomId);
        };
      };

      startRecongnition();
    }
  }, [gameData, isMyTurn]);

  return (
    <Container isMyTurn={isMyTurn}>
      <div>
        {gameData ?
          <p className='turn'>{isMyTurn ? '🙋‍♂️내 차례!🙋‍♀️' : '내 차례 아님..'}</p>
          :
          <Button onClick={startGame}>게임 시작</Button>
        }
      </div>
      {!gameData ?
        <p className='title'>폭탄을 돌려라! 🧨</p>
        :
        <>
          <p className='phrase'>{phrase}</p>
          <p className='script'>{script}</p>
        </>
      }
      <p className='notification'>{notification}</p>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 320px;
  height: 400px;
  border-radius: 36px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: red;
  color: ${({ theme }) => theme.orange};
  background-color: ${({ isMyTurn, theme }) =>
    isMyTurn ? theme.pink : theme.darkPurple};
  overflow: hidden;

  div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button {
    color: ${({ theme }) => theme.darkPurple};
  }

  p {
    font-size: 21px;
    line-height: 28px;
    margin-bottom: 20px;
  }

  .turn {
    font-size: 18px;
    color: ${({ theme }) => theme.emerald};
  }

  .phrase {
    margin-bottom: 40px;
    color: ${({ theme }) => theme.emerald};
  }

  .script {
    margin-bottom: 40px;
  }

  .notification {
    position: absolute;
    bottom: -20px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: ${({ theme }) => theme.darkPurple};
    background-color: ${({ theme }) => theme.emerald};
  }
`;

export default SpeechGame;

SpeechGame.propTypes = {
  roomId: PropTypes.string.isRequired,
  setIsMyTurn: PropTypes.func.isRequired,
  isMyTurn: PropTypes.bool.isRequired,
  currentTurn: PropTypes.string.isRequired,
  setCurrentTurn: PropTypes.func.isRequired,
  setIsFinalGame: PropTypes.func.isRequired,
};
