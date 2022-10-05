import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Background from './components/common/Background';

import MainPage from './pages/MainPage';
import MenuPage from './pages/MenuPage';
import GameMakingPage from './pages/GameMakingPage';
import GameLoadingPage from './pages/GameLoadingPage';
import GamePlayingPage from './pages/GamePlayingPage';
import GameJoiningPage from './pages/GameJoiningPage';
import GameResultPage from './pages/GameResultPage';
import LoginLoadingPage from './pages/LoginLoadingPage';

function App() {
  return (
    <Switch>
      <Background>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/login/loading">
          <LoginLoadingPage />
        </Route>
        <Route path="/menu">
          <MenuPage />
        </Route>
        <Route path="/game/joining">
          <GameJoiningPage />
        </Route>
        <Route path="/game/making">
          <GameMakingPage />
        </Route>
        <Route path="/game/loading">
          <GameLoadingPage />
        </Route>
        <Route path="/game/playing">
          <GamePlayingPage />
        </Route>
        <Route path="/game/result">
          <GameResultPage />
        </Route>
        <Redirect to="/" />
      </Background>
    </Switch>
  );
}

export default App;
