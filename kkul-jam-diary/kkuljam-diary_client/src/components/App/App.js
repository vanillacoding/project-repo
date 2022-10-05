import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { checkAuth } from '../../lib/auth';
import LoginContainer from '../../containers/LoginContainer';
import HomeContainer from '../../containers/HomeContainer';
import ChartContainer from '../../containers/ChartContainer';
import WriteContainer from '../../containers/WriteContainer';
import SleepListContainer from '../../containers/SleepListContainer';
import DetailContainer from '../../containers/DetailContainer';
// import PropTypes from 'prop-types';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={props => checkAuth(<HomeContainer {...props} />, true)} />
        <Route path="/login" render={props => <LoginContainer {...props} />} />
        <Route path="/home" render={props => checkAuth(<HomeContainer {...props} />)} />
        <Route path="/write" render={props => checkAuth(<WriteContainer {...props} />)} />
        <Route path="/list" render={props => checkAuth(<SleepListContainer {...props} />)} />
        <Route path="/chart" render={props => checkAuth(<ChartContainer {...props} />)} />
        <Route path="/detail" render={props => checkAuth(<DetailContainer {...props} />)} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}
