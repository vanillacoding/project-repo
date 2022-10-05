import React from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { setHeader } from '../lib/auth';
import { fetchPostUser } from '../lib/api/user';
import { SET_CURRENT_USER } from '../constants/actionTypes';
import App from '../components/App/App';

const AppContainer = ({ setCurrentUser }) => {
  if (localStorage.tokenId && localStorage.accessToken) {
    try {
      const { tokenId, accessToken } = localStorage;
      const decodedProfile = jwtDecode(tokenId);
      const isValid = (decodedProfile.exp * 1000) - Date.now() > 0;
      const profile = (isValid) ? decodedProfile : {};
      const token = (isValid) ? accessToken : null;
      console.log(`token 만료!!!! ${new Date(decodedProfile.exp * 1000)}`);

      if (!isValid) {
        localStorage.clear();
        return;
      }

      setHeader(token);
      fetchPostUser(profile, user => {
        setCurrentUser(user);
      });
    } catch (err) {
      console.log(err);
      setHeader(null);
      localStorage.clear();
    }
  }
  return (
    <App />
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser(user) {
    dispatch({ type: SET_CURRENT_USER, payload: user });
  }
});

export default connect(null, mapDispatchToProps)(AppContainer);
