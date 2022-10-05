import React from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import { IslandWrapper } from '../styledComponents/IslandWrapper.styled';
import GoogleAuthButton from './GoogleAuthButton';
import { auth, provider } from '../config/firebase';
import { POST } from '../constants/httpMethods';
import { FAILURE } from '../constants/responseResults';
import { ROOT, LOGIN, SIGNUP } from '../constants/paths';
import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';

export default function Entrance({ onLogin }) {
  const history = useHistory();
  const { pathname } = useLocation();

  async function googleAuthClickHandler() {
    try {
      await auth.signInWithPopup(provider);

      const {
        uid,
        email,
        displayName,
        photoURL,
      } = auth.currentUser;

      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}${pathname}`, {
        method: POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          email,
          displayName,
          photoURL,
        }),
      });

      const response = await res.json();

      if (response.result === FAILURE) {
        alert(response.message);

        if (response.message === '이미 가입했어요') {
          history.push(LOGIN);
        }

        return;
      }

      if (pathname === SIGNUP) {
        history.push(LOGIN);

        return;
      }

      if (pathname === LOGIN) {
        const { user, token } = response;

        localStorage.setItem(GOOGIT_LOGIN_TOKEN, token);

        history.push(ROOT);

        onLogin(user);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <IslandWrapper>
      <h1>구깃</h1>
      <GoogleAuthButton
        signupOrLogin={pathname === LOGIN ? 'Login' : 'Sign Up'}
        onClick={googleAuthClickHandler}
      />
      <Link to={pathname === LOGIN ? SIGNUP : LOGIN}>
        <h3>{pathname === LOGIN ? '가입하러 가기' : '로그인하러 가기'}</h3>
      </Link>
    </IslandWrapper>
  );
}
