import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import GameList from "../GameList/GameList";
import GameRoomList from "../GameRoomList/GameRoomList";
import GameRoom from "../GameRoom/GameRoom";
import ErrorPage from "../ErrorPage/ErrorPage";

import { checkAuthorization } from "../../actions/authActionCreators";

const App = ({ authService }) => {
  const { isAuthorized, isUnAuthMode } = useSelector(
    (state) => state.authReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isUnAuthMode) {
      dispatch(checkAuthorization());
    }

    if (window.performance) {
      if (performance.navigation.type === 1) {
        history.push("/");
      }
    }
  }, [dispatch, history, isUnAuthMode]);

  return (
    <Switch>
      {!isUnAuthMode && !isAuthorized ? (
        <Login authService={authService} />
      ) : (
        <>
          <Route exact path="/">
            <GameList />
          </Route>

          <Route exact path="/games">
            <GameList />
          </Route>

          <Route exact path="/games/littleForest">
            <GameRoomList />
          </Route>

          <Route path="/games/littleForest/:roomId">
            <GameRoom />
          </Route>

          <Route exact path="/games/monsterEscape">
            <GameRoomList />
          </Route>

          <Route path="/games/monsterEscape/:roomId">
            <GameRoom />
          </Route>

          <Route exact path="/games/energyBattle">
            <GameRoomList />
          </Route>

          <Route path="/games/energyBattle/:roomId">
            <GameRoom />
          </Route>

          <Route path="/logout">
            <Logout authService={authService} />
          </Route>

          <Route path="/error">
            <ErrorPage />
          </Route>
        </>
      )}
    </Switch>
  );
};

App.propTypes = {
  authService: PropTypes.object.isRequired,
};

export default App;
