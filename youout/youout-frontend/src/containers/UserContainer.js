import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from '../components/Header';
import UserPage from '../components/UserPage';
import DetailPage from '../components/DetailPage';
import HistoryDetail from '../components/HistoryDetail';
import GameDetail from '../components/GameDetail';
import NewGameForm from '../components/NewGameForm';
import { loadUserPage } from '../reducer/user';
import { updateGame, deleteGame } from '../reducer/game';
import { setRoute } from '../reducer/route';
import api from '../utils/api';
import { sliceDocs } from '../utils';
import HEADER_TITLE from '../constants/headerTitle';

const UserContainer = () => {
  const {
    info,
    histories,
    games,
    isInitializedUserPage,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleUpdateGame = (body, gameId) => dispatch(updateGame({ body, gameId }));
  const handleDeleteGame = () => dispatch(deleteGame({ gameId }));
  const handleRenderGameForm = () => dispatch(setRoute(`/user/games/${gameId}/update`));

  const [gameId, setGameId] = useState('');
  const [quizList, setQuizList] = useState([]);
  const [gameInfo, setGameInfo] = useState({
    name: '',
    address: '',
    addressDetail: '',
    location: {},
    timeLimit: 0,
  });
  const [historyInfo, setHistoryInfo] = useState({
    game: { name: '' },
    users: [],
  });

  const navigation = {
    moreHistories: () => dispatch(setRoute('/user/histories')),
    moreGames: () => dispatch(setRoute('/user/games')),
    showDetailGame: async (gameId) => {
      const path = `/games/${gameId}`;
      const response = await api.get({ path });

      setGameId(gameId);
      setGameInfo(response);
      setQuizList(response.quizList);
      dispatch(setRoute(`/user/games/${gameId}`));
    },
    showDetailHistory: async (historyId) => {
      const path = `/histories/${historyId}`;
      const response = await api.get({ path });

      setHistoryInfo(response);
      dispatch(setRoute(`/user/histories/${historyId}`));
    },
  };

  useEffect(() => {
    if (!info) return dispatch(setRoute('/'));

    dispatch(loadUserPage());
  }, []);

  return (
    <>
      <Header title={HEADER_TITLE.user}>
        <Switch>
          <Route exact path='/user'>
            <UserPage
              image={info.image}
              name={info.name}
              email={info.email}
              histories={sliceDocs(histories.docs, 0, 4)}
              games={sliceDocs(games.docs, 0, 4)}
              navigation={navigation}
            />
          </Route>
          <Route exact path='/user/histories'>
            <DetailPage
              list={histories.docs}
              onClick={navigation.showDetailHistory}
              title='내가 플레이한 방'
            />
          </Route>
          <Route exact path='/user/games'>
            <DetailPage
              list={games.docs}
              onClick={navigation.showDetailGame}
              title='내가 만든 방'
            />
          </Route>
          <Route exact path='/user/games/:game_id'>
            <GameDetail
              quizList={quizList}
              gameInfo={gameInfo}
              handleRenderGameForm={handleRenderGameForm}
              handleDeleteGame={handleDeleteGame}
            />
          </Route>
          <Route exact path='/user/histories/:history_id'>
            <HistoryDetail historyInfo={historyInfo}/>
          </Route>
          <Route path='/user/games/:game_id/update'>
            <NewGameForm onCreateNewGame={handleUpdateGame}/>
          </Route>
        </Switch>
      </Header>
    </>
  );
};

export default UserContainer;
