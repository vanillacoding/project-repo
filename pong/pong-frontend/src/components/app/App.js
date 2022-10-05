import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { socket } from "../../config/socket";
import Home from "../home/Home";
import Login from "../login/Login";
import Battle from "../battle/Battle";
import Nav from "../nav/Nav";
import Ranking from "../ranking/Ranking";
import styles from "./App.module.css";
import { ROUTES } from "../../constants/index";

const App = () => {
  const email = useSelector(state => state.user.email);

  return (
    <div className={styles.wrapper} >
      {!email && <Redirect to="/auth/login" />}
      <Nav socket={socket} />
      <Switch>
        <Route path={ROUTES.HOME} exact>
          <Home socket={socket} />
        </Route>
        <Route path={ROUTES.LOGIN}>
          <Login />
        </Route>
        <Route path={ROUTES.BATTLE}>
          <Battle socket={socket} />
        </Route>
        <Route path={ROUTES.RANKING}>
          <Ranking />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
