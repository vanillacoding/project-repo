import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Lobby from "./Lobby/Container";
import Signup from "./Signup/Container";
import Team from "./Team/Container";
import RegisterTeam from "./RegisterTeam/Container";
import Confirm from "./Confirm/Container";

const BeforeLogin = () => {
  return (
    <Switch>
      <Route exact path="/" component={Lobby} />
      <Route path="/signup" component={Signup} />
      <Route path="/verify/:token" component={Confirm} />
      <Redirect to="/" />
    </Switch>
  );
};

const AfterLogin = () => {
  return (
    <Switch>
      <Route exact path="/" component={Lobby} />
      <Route path="/team/new" component={RegisterTeam} />
      <Route path="/team/:name" component={Team} />
      <Route path="/verify/:token" component={Confirm} />
      <Redirect to="/" />
    </Switch>
  );
};

export default function Routes({ isLogin }) {
  return isLogin ? <AfterLogin /> : <BeforeLogin />;
}
