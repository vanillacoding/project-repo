import React, { useEffect, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { ToastContainer, Slide } from 'react-toastify';

import { delay } from '../utils/delay';

import Lobby from './Lobby';
import Login from './Login';
import ErrorBox from './ErrorBox';
import Loading from './Loading';
import MyPageButton from './MyPageButton';

import theme from './styles/theme';
import GlobalStyle from './styles/globalStyle';
import 'react-toastify/dist/ReactToastify.css';

const RoomContainer = lazy(async () => {
  await delay(1600);
  return import('../containers/RoomContainer');
});

function App({ user, loginUserWithToken, loginUserWithGoogle }) {
  useEffect(() => {
    loginUserWithToken();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <ToastContainer autoClose={1600} transition={Slide} />
      {user && <MyPageButton user={user} />}
      <Switch>
        <Route exact path='/'>
          {user ? <Lobby /> : <Login onLogin={loginUserWithGoogle} />}
        </Route>
        <Route path='/rooms/:room_id'>
          {user ?
            <Wrapper>
              <Suspense fallback={<Loading />}>
                <RoomContainer />
              </Suspense>
            </Wrapper>
            :
            <ErrorBox message='로그인 해주세요..' text='로그인 화면으로' />
          }
        </Route>
        <Redirect to='/' />
      </Switch>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export default App;

App.propTypes = {
  user: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  loginUserWithToken: PropTypes.func.isRequired,
  loginUserWithGoogle: PropTypes.func.isRequired,
};
