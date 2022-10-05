import React from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login/Login';
import { SET_CURRENT_USER } from '../constants/actionTypes';

const LoginContainer = ({ setCurrentUser, history }) => (
  <Login setCurrentUser={setCurrentUser} history={history} />
);

const mapDispatchToProps = dispatch => ({
  setCurrentUser(user) {
    dispatch({ type: SET_CURRENT_USER, payload: user });
  }
});

export default connect(null, mapDispatchToProps)(LoginContainer);
