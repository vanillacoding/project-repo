import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GameRoom from '../components/game/GameRoom';

import {
  updateGameHost,
  updatePlayersAndReadyStatus,
  updateReadyStatus,
  updateChatMessages,
  updateGameStatus,
  updateCurrentTrack,
  updateScoreAndPlayLog,
  updatePlayLog,
  updateFinalScore,
  resetGameState,
} from '../actions/game.actions';

import {
  joinRoom,
  requestGameHost,
  disconnectSocket
} from '../lib/socket';

const GameContainer = ({
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
  loading,
  error,
  updatePlayersAndReadyStatus,
  updateReadyStatus,
  updateGameHost,
  updateChatMessages,
  updateCurrentTrack,
  updateScoreAndPlayLog,
  updatePlayLog,
  updateFinalScore,
  updateGameStatus,
  resetGameState
}) => {
  useEffect(() => {
    if (userId && gameId) {
      joinRoom(userId, gameId);
      requestGameHost(gameId);
    }

    // eslint-disable-next-line
  }, [ userId, gameId ]);

  useEffect(() => {
    updateGameHost();
    updatePlayersAndReadyStatus();
    updateReadyStatus();
    updateChatMessages();
    updateGameStatus();
    updateCurrentTrack();
    updateScoreAndPlayLog();
    updateFinalScore();

    return () => {
      disconnectSocket();
      resetGameState();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Route path={`/games/${gameId}`}>
      <GameRoom
        userId={userId}
        gameId={gameId}
        gameHost={gameHost}
        players={players}
        readyStatus={readyStatus}
        chatMessages={chatMessages}
        score={score}
        playLog={playLog}
        isGameReady={isGameReady}
        currentTrack={currentTrack}
        isGameEnded={isGameEnded}
        loading={loading}
        error={error}
        updatePlayLog={updatePlayLog}
      />
    </Route>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  gameId: state.waiting.gameId,
  gameHost: state.game.gameHost,
  players: state.game.players,
  readyStatus: state.game.readyStatus,
  chatMessages: state.game.chatMessages,
  score: state.game.score,
  playLog: state.game.playLog,
  isGameReady: state.game.isGameReady,
  currentTrack: state.game.currentTrack,
  isGameEnded: state.game.isGameEnded,
  loading: state.game.loading,
  error: state.game.error
});

const mapDispatchToProps = dispatch => ({
  updateGameHost: updateGameHost(dispatch),
  updatePlayersAndReadyStatus: updatePlayersAndReadyStatus(dispatch),
  updateReadyStatus: updateReadyStatus(dispatch),
  updateChatMessages: updateChatMessages(dispatch),
  updateGameStatus: updateGameStatus(dispatch),
  updateCurrentTrack: updateCurrentTrack(dispatch),
  updateScoreAndPlayLog: updateScoreAndPlayLog(dispatch),
  updatePlayLog: updatePlayLog(dispatch),
  updateFinalScore: updateFinalScore(dispatch),
  resetGameState: resetGameState(dispatch)
});

GameRoom.propTypes = {
  userId: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  gameHost: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  readyStatus: PropTypes.object.isRequired,
  chatMessages: PropTypes.array.isRequired,
  score: PropTypes.object.isRequired,
  playLog: PropTypes.array.isRequired,
  isGameReady: PropTypes.bool.isRequired,
  currentTrack: PropTypes.any,
  isGameEnded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  updatePlayersAndReadyStatus: PropTypes.func,
  updateReadyStatus: PropTypes.func,
  updateGameHost: PropTypes.func,
  updateChatMessages: PropTypes.func,
  updateCurrentTrack: PropTypes.func,
  updateScoreAndPlayLog: PropTypes.func,
  updatePlayLog: PropTypes.func,
  updateFinalScore: PropTypes.func,
  updateGameStatus: PropTypes.func,
  resetGameState: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
