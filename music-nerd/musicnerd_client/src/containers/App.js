import React, { useEffect, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HomeContainer from './Home.container';
import AuthContainer from './Auth.container';
import UserContainer from './User.container';
import WaitingContainer from './Waiting.container';
import GameContainer from './Game.container';

import ProtectedRoute from '../components/routes/ProtectedRoute';
import PageNotFound from '../components/PageNotFound';

import GlobalStyle from '../components/layout/GlobalStyle';

import { setTokenToHeader } from '../lib/auth';
import history from '../lib/history';

const App = ({ isAuthenticated }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    token && setTokenToHeader(token);
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route path='/auth' component={AuthContainer} />
          <ProtectedRoute path='/users' component={UserContainer} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path='/waiting' component={WaitingContainer} isAuthenticated={isAuthenticated} />
          <ProtectedRoute path='/games' component={GameContainer} isAuthenticated={isAuthenticated} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Router>
    </Fragment>
  );
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(App);
