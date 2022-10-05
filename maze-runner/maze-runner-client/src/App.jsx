import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MazeRunner from './features/mazeRunner/MazeRunner';

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/maze" />
      </Route>
      <Route exact path="/maze">
        <MazeRunner />
      </Route>
      <Route path="/maze/:mazeId">
        <MazeRunner />
      </Route>
    </Switch>
  );
};

export default App;
