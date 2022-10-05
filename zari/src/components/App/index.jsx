import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Room from '../../pages/Room';
import WaitingArea from '../../pages/WaitingArea';
import Home from '../../pages/Home';
import PrivateRoute from '../../helpers/PrivateRoute';
import { imageLoader } from '../../pixi';

export default function App() {
  useEffect(() => {
    imageLoader();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute path="/waitingarea">
          <WaitingArea />
        </PrivateRoute>
        <PrivateRoute path="/room/:roomId">
          <Room />
        </PrivateRoute>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}
