import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Modal from '../layout/Modal';
import Form from '../layout/Form';
import FormInput from '../layout/FormInput';
import Loading from '../layout/Loading';
import Button from '../layout/Button';
import GameCard from './GameCard';

import * as colors from '../../lib/colors';

const WatingRoom = ({
  userId,
  gameList,
  loading,
  createGameLoading,
  getGameListError,
  createGameError,
  createGame,
  enterGame,
}) => {
  const [ shouldModalOpen, setShouldModalOpen ] = useState(false);
  const [ gameTitle, setGameTitle ] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    createGame(userId, gameTitle);
  };

  const closeModal = () => {
    setGameTitle('');
    setShouldModalOpen(false);
  };

  if (getGameListError) {
    return <h1>{getGameListError}</h1>;
  }

  return (
    <Fragment>
      <Modal
        loading={loading}
        shouldModalOpen={shouldModalOpen}
        closeModal={closeModal}
        title='Create Room'
      >
        <Form style={{ height: '30vh' }} onSubmit={onSubmit}>
          {createGameLoading ?
            <Loading color='black' /> :
            <Fragment>
              <FormInput type='text' onChange={e => setGameTitle(e.target.value)} value={gameTitle} />
              <ErrorMessage>{createGameError ? createGameError : null}</ErrorMessage>
              <SubmitButton type='submit' value='Create' />
            </Fragment>}
        </Form>
      </Modal>
      <GameListWrapper>
        <GameListNav>
          <Button onClick={() => setShouldModalOpen(true)}>방 만들기</Button>
        </GameListNav>
        <GameCardWrapper loading={loading ? 1 : 0}>
          {loading && <Loading />}
          {!loading && !gameList.length ?
            <h1 style={{ margin: '0 auto', fontSize: '4rem' }}>Please create a game room.</h1> :
              gameList.map(game => {
                const {
                  _id: gameId,
                  is_playing: isPlaying,
                  players,
                  game_title: gameTitle,
                  thumbnail_url: thumbnailUrl
                } = game;

                return (
                  <GameCard
                    key={gameId}
                    gameId={gameId}
                    isPlaying={isPlaying}
                    players={players}
                    gameTitle={gameTitle}
                    thumbnailUrl={thumbnailUrl}
                    enterGame={enterGame}
                  />
                );
            })}
        </GameCardWrapper>
      </GameListWrapper>
    </Fragment>
  );
};

const GameListWrapper = styled.div`
  width: 80vw;
  height: 80vh;
  margin: 12vh 0 5vh 0;
  padding: 2rem;
  background-color: ${colors.DEFAULT_GLOBAL_FONT_COLOR};
  box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem #303030;
  color: ${colors.MAIN_TEXT_COLOR};
  justify-content: center;
`;

const GameListNav = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const GameCardWrapper = styled.div`
  width: 100%;
  height: 90%;
  overflow-x: scroll;
  display: flex;
  justify-content: ${props => props.loading ? 'center' : 'flex-start'};
  align-items: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ErrorMessage = styled.p`
  margin: 2rem 0;
  font-size: 1.6rem;
  height: 3rem;
  width: 70%;
  text-align: center;
  color: ${colors.ERROR_TEXT_COLOR};
`;

const SubmitButton = styled.input`
  border: none;
  border-radius: 2rem;
  background-color: ${colors.HIGHLIGHT_COLOR};
  color: ${colors.MAIN_TEXT_COLOR};
  font-size: 2rem;
  padding: 1rem 1.5rem;
  width: 50%;
  cursor: pointer;

  &:hover {
    box-shadow: 0.3rem 0.3rem 0.3rem #52b7ff;
    transition: all 0.3s;
  }
`;

WatingRoom.propTypes = {
  userId: PropTypes.string.isRequired,
  gameList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  createGameLoading: PropTypes.bool.isRequired,
  getGameListError: PropTypes.string,
  createGameError: PropTypes.string,
  createGame: PropTypes.func.isRequired,
  enterGame: PropTypes.func.isRequired,
};

export default WatingRoom;
