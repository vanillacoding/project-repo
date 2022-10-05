import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';

import Button from '../Button';

export default function LogoutButton({ setLogoutError, onLogout }) {
  async function signOutGoogle() {
    try {
      await firebase.auth().signOut();
    } catch (err) {
      setLogoutError(err.message);
    }

    window.sessionStorage.removeItem('user');
    onLogout();
  }

  return (
    <Button
      onClick={signOutGoogle}
      width="60%"
      bgColor={theme.pink}
      hoverBgColor={theme.blue}
    >
      로그아웃
    </Button>
  );
}

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
  setLogoutError: PropTypes.func.isRequired,
};
