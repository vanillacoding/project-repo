import React, { useEffect, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DefaultLayout from '../components/layout/DefaultLayout';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';
import Navbar from '../components/layout/Navbar';
import logo from '../assets/logo.png';

import history from '../lib/history';
import { requestSignup, requestLogin, clearError, logout } from '../actions/auth.actions';

const AuthContainer = ({
  userId,
  hasSignedUp,
  isAuthenticated,
  error,
  loading,
  requestSignup,
  requestLogin,
  logout,
  clearError
}) => {
  useEffect(() => {
    hasSignedUp && history.push('/auth/login');

    let errorTimeout;
    if (error) {
      errorTimeout = window.setTimeout(() => clearError(), 2000);
    }

    return () => clearTimeout(errorTimeout);
    // eslint-disable-next-line
  }, [ hasSignedUp, error ]);

  useEffect(() => {
    isAuthenticated && history.push(`/users/${userId}/favorites`);

    // eslint-disable-next-line
  }, [ userId, isAuthenticated ]);

  return (
    <Fragment>
      <Navbar logo={logo}>
        <Link to='/auth/signup'>Sign Up</Link>
        {isAuthenticated ? <button onClick={logout}>Logout</button> : <Link to='/auth/login'>Login</Link>}
      </Navbar>
      <DefaultLayout>
        <Switch>
          <Route exact path='/auth/signup'>
            <Signup
              error={error}
              loading={loading}
              requestSignup={requestSignup}
            />
          </Route>
          <Route exact path='/auth/login'>
            <Login
              error={error}
              loading={loading}
              requestLogin={requestLogin}
            />
          </Route>
        </Switch>
      </DefaultLayout>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userId,
  hasSignedUp: state.auth.hasSignedUp,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.auth.error,
  loading: state.auth.loading
});

const mapDispatchToProps = dispatch => ({
  requestSignup: requestSignup(dispatch),
  requestLogin: requestLogin(dispatch),
  logout: logout(dispatch),
  clearError: clearError(dispatch)
});

AuthContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  hasSignedUp: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  requestSignup: PropTypes.func.isRequired,
  requestLogin: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
