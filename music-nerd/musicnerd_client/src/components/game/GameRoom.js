import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import Siriwave from 'siriwave';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import DefaultLayout from '../layout/DefaultLayout';
import Header from '../layout/Header';
import Modal from '../layout/Modal';
import Button from '../layout/Button';

import PlayerCard from './PlayerCard';
import TrackCard from './TrackCard';
import Chatting from './Chatting';
import FinalScore from './FinalScore';

import history from '../../lib/history';
import { FADEOUT_DURATION, TRACK_FADEOUT_SECONDS, TRACK_STOP_SECONDS } from '../../constants/index';

import {
  leaveRoom,
  onReady,
  offReady,
  sendMessage,
  requestGameStart,
  requestNewTrack,
} from '../../lib/socket';

let track;
let siriwave;
let fadeTimeout, stopTimeout;

const GameRoom = ({
  userId,
  gameId,
  gameHost,
  players,
  readyStatus,
  chatMessages,
  score,
  playLog,
  isGameReady,
  currentTrack,
  isGameEnded,
  updatePlayLog
}) => {
  const [ isReady, setIsReady ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ hasScored, setHasScored ] = useState(false);
  const [ isTrackEnded, setIsTrackEnded ] = useState(false);
  const [ shouldModalOpen, setShouldModalOpen ] = useState(false);

  useEffect(() => {
    return () => {
      if (track) track.stop();
    }
  }, []);

  useEffect(() => {
    if (currentTrack) {
      track = new Howl({
        src: [currentTrack.audio_url],
        volume: 0.6
      });

      if (!siriwave) {
        siriwave = new Siriwave({
          container: document.querySelector('#siri-container'),
          height: 450,
          width: 500,
          style: 'ios9',
          amplitude: 3
        });
      }
      siriwave.start();
      track.play();

      fadeTimeout = setTimeout(() => {
        track.fade(0.6, 0, 1000 * FADEOUT_DURATION);
      }, 1000 * TRACK_FADEOUT_SECONDS);

      stopTimeout = setTimeout(() => {
        updatePlayLog();
      }, 1000 * TRACK_STOP_SECONDS);
    }

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(stopTimeout);
      fadeTimeout = null;
      stopTimeout = null;
    }

    // eslint-disable-next-line
  }, [ currentTrack ]);

  useEffect(() => {
    const prevQuizScorer = playLog[playLog.length - 1];

    if (prevQuizScorer) {
      setHasScored(true);
    }

    setIsTrackEnded(true);
  }, [ playLog ]);

  useEffect(() => {
    let displayScorerTimeout;

    if (hasScored) {
      displayScorerTimeout = setTimeout(() => {
        setHasScored(false);
      }, 2000);
    }

    return () => clearTimeout(displayScorerTimeout);
  }, [ hasScored ]);

  useEffect(() => {
    let displayTrackInfoTimeout;
    let requestTrackTimeout;

    if (isTrackEnded) {
      displayTrackInfoTimeout = setTimeout(() => {
        if (track) {
          track.stop();
          clearTimeout(fadeTimeout);
          clearTimeout(stopTimeout);
          fadeTimeout = null;
          stopTimeout = null;
        }
        setIsTrackEnded(false);
      }, 4000);
    }

    if (!isTrackEnded && isGameReady) {
      requestTrackTimeout = setTimeout(() => {
        requestNewTrack();
      }, 1000);
    }

    return () => {
      clearTimeout(displayTrackInfoTimeout);
      clearTimeout(requestTrackTimeout);
    }

    // eslint-disable-next-line
  }, [ isGameReady, isTrackEnded ]);

  useEffect(() => {
    let scoreTimeout;

    if (isGameEnded) {
      siriwave.stop();
      scoreTimeout = setTimeout(() => {
        setShouldModalOpen(true);
      }, 2000);
    }

    return () => clearTimeout(scoreTimeout);

    // eslint-disable-next-line
  }, [ isGameEnded ]);

  const onExitButtonClick = (userId, gameId) => {
    leaveRoom(userId, gameId);
    return history.push('/waiting');
  };

  const onReadyButtonClick = userId => {
    !isReady ? onReady(userId) : offReady(userId);
    setIsReady(!isReady);
  };

  const onStartButtonClick = () => {
    for (const player of players) {
      if (!readyStatus[player.userId]) {
        return window.alert('모든 유저가 READY하지 않았습니다!');
      }
    }

    requestGameStart(players);
  };

  const onSendButtonClick = (event, message) => {
    event.preventDefault();

    sendMessage(message);
    setMessage('');
  };

  return (
    <DefaultLayout>
      <Modal
        shouldModalOpen={shouldModalOpen}
        setShouldModalOpen={setShouldModalOpen}
        title='Final Score'
      >
        <FinalScore score={score} userId={userId} gameId={gameId} />
      </Modal>
      <GameWrapper>
        <Header>
          {players.map(player => (
            <PlayerCard
              key={player.userId}
              userId={player.userId}
              username={player.username}
              score={score[player.username] ? score[player.username] : 0}
              isReady={readyStatus[player.userId]}
              hasScored={hasScored}
            />
          ))}
        </Header>
        <GameMain>
          <MainLeft>
            <div id='siri-container'></div>
            <TrackCard track={currentTrack} isTrackEnded={isTrackEnded} />
          </MainLeft>
          <MainRight>
            <ButtonContainer>
              {gameHost === userId &&
                <Button onClick={onStartButtonClick}>GAME START</Button>}
              {!isGameReady && <Button onClick={() => onReadyButtonClick(userId)}>READY</Button>}
              <Button onClick={() => onExitButtonClick(userId, gameId)}>EXIT</Button>
            </ButtonContainer>
            <Chatting
              message={message}
              setMessage={setMessage}
              onSendButtonClick={onSendButtonClick}
            >
              {chatMessages}
            </Chatting>
          </MainRight>
        </GameMain>
      </GameWrapper>
    </DefaultLayout>
  );
};

const GameWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2vh 2vw;
  overflow: hidden;
`;

const GameMain = styled.div`
  height: 76vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainLeft = styled.div`
  height: 45rem;
  width: 55rem;
  margin: 0 1.5rem;
  overflow: hidden;
  position: relative;

  img {
    height: 45rem;
    width: 55rem;
  }
`;

const MainRight = styled.div`
  height: 45rem;
  width: 55rem;
  margin: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 55rem;
  display: flex;
  justify-content: space-between;
`;

GameRoom.propTypes = {
  leaveRoom: PropTypes.func.isRequired,
  onReady: PropTypes.func.isRequired,
  offReady: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  requestGameStart: PropTypes.func.isRequired,
  requestNewTrack: PropTypes.func.isRequired
};

export default GameRoom;
