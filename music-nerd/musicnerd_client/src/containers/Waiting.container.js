import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Navbar from '../components/layout/Navbar';
import DefaultLayout from '../components/layout/DefaultLayout';
import WatingRoom from '../components/waiting/WatingRoom';
import logo from '../assets/logo.png';

import { setTokenToHeader } from '../lib/auth';
import { connectSocket, disconnectSocket } from '../lib/socket';

import { logout } from '../actions/auth.actions';
import { createGame, getGames, enterGame, clearCreateGameError } from '../actions/waiting.actions';

const WatingContainer = ({
  isAuthenticated,
  userId,
  gameList,
  loading,
  createGameLoading,
  getGameListError,
  createGameError,
  joinGameError,
  logout,
  getGames,
  createGame,
  enterGame,
  clearCreateGameError,
}) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    setTokenToHeader(token);
  }, []);

  useEffect(() => {
    connectSocket();
    getGames();

    return () => disconnectSocket();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (joinGameError) {
      window.alert(joinGameError);
    }
  }, [ joinGameError ]);

  useEffect(() => {
    let errorTimeout;
    if (createGameError) {
      errorTimeout = window.setTimeout(() => clearCreateGameError(), 3000);
    }

    return () => clearTimeout(errorTimeout);

    // eslint-disable-next-line
  }, [ createGameError ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to={`/users/${userId}/profile`}>Profile</Link>
        {isAuthenticated ? <button onClick={logout}>Logout</button> : <Link to='/auth/login'>Login</Link>}
      </Navbar>
      <DefaultLayout>
        <WatingRoom
          userId={userId}
          gameList={gameList}
          loading={loading}
          createGameLoading={createGameLoading}
          getGameListError={getGameListError}
          createGameError={createGameError}
          createGame={createGame}
          enterGame={enterGame}
          clearCreateGameError={clearCreateGameError}
        />
      </DefaultLayout>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.auth.userId,
  socket: state.waiting.socket,
  gameList: state.waiting.gameList,
  loading: state.waiting.loading,
  createGameLoading: state.waiting.createGameLoading,
  getGameListError: state.waiting.getGameListError,
  createGameError: state.waiting.createGameError,
  joinGameError: state.waiting.joinGameError
});

const mapDispatchToProps = dispatch => ({
  logout: logout(dispatch),
  getGames: getGames(dispatch),
  createGame: createGame(dispatch),
  enterGame: enterGame(dispatch),
  clearCreateGameError: clearCreateGameError(dispatch)
});

WatingContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  gameList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  createGameLoading: PropTypes.bool.isRequired,
  getGameListError: PropTypes.string,
  createGameError: PropTypes.string,
  joinGameError: PropTypes.string,
  logout: PropTypes.func.isRequired,
  getGames: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  enterGame: PropTypes.func.isRequired,
  clearCreateGameError: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(WatingContainer);
