import React, { useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import UserContainer from './UserContainer';
import WaitingContainer from './WaitingContainer';
import GameListContainer from './GameListContainer';
import Login from '../components/Login';
import Loading from '../components/Loading';
import NewGameForm from '../components/NewGameForm';
import { loadUser, setIsNative } from '../reducer/user';
import { createNewGame } from '../reducer/game';
import firebase from '../utils/firebase';
import { TYPE, emit } from '../utils/native';
import { updateData, gameComplete } from '../utils/socket';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const AppContainer = () => {
  const { isLoading, isInitialized, info, error } = useSelector((state) => state.user);
  const route = useSelector((state) => state.route);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => firebase.googleLogin();
  const handleCreateNewGame = (body) => dispatch(createNewGame(body));

  useEffect(() => {
    if (isInitialized) return;

    localStorage.getItem('token')
      ? dispatch(loadUser({ hasToken: true }))
      : dispatch(loadUser({ hasToken: false }));
  }, []);

  useEffect(() => {
    history.push(route);
  }, [route]);

  useEffect(() => {
    if (!info) return;

    const listenNative = ({ data }) => {
      if (typeof data !== 'string') return;

      const { type, payload } = JSON.parse(data);

      switch (type) {
        case TYPE.onNative: {
          emit(TYPE.setUser, info);
          dispatch(setIsNative(true));
          break;
        }
        case TYPE.updateGame: {
          updateData(payload);
          break;
        }
        case TYPE.completeGame: {
          gameComplete(payload);
          break;
        }
      }
    };

    window.addEventListener('message', listenNative);

    return () => window.removeEventListener('message', listenNative);
  }, [info]);

  return (
    <div>
      {error}
      {
        isLoading
          ? <Loading />
          : <Switch>
              <Route exact path={'/'}>
                <Login onLogin={handleLogin} />
              </Route>
              <Route exact path={'/games'}>
                <GameListContainer />
              </Route>
              <Route exact path={'/games/new'}>
                <NewGameForm onCreateNewGame={handleCreateNewGame} />
              </Route>
              <Route path={'/games/:game_id'}>
                <WaitingContainer />
              </Route>
              <Route path={'/user'}>
                <UserContainer />
              </Route>
              <Redirect to={'/games'} />
            </Switch>
      }
    </div>
  );
};

export default AppContainer;
