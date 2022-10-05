import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Header from '../Header';
import UserProfile from './UserProfile';
import Preview from './Preview';
import ChannelList from './ChannelList';

export default function Main() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!!sessionStorage.getItem('user'));
  }, []);

  return (
    <>
      <Header />
      <MainContainer>
        <ChannelList loginStatus={isLogin} />
        <SideBox>
          <UserProfile
            onLogin={() => setIsLogin(true)}
            onLogout={() => setIsLogin(false)}
            loginStatus={isLogin}
          />
          <Preview />
        </SideBox>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  height: 90vh;
  display: flex;
  width: 100%;
`;

const SideBox = styled.div`
  position: relative;
  display: inline-block;
  width: 30%;
  min-width: 300px;
  text-align: center;
  background-size: cover;
  background-image: linear-gradient(
      rgba(5, 3, 19, 0.801),
      rgba(5, 3, 19, 0.788),
      rgba(5, 3, 19, 0.568),
      rgba(5, 3, 19, 0.788),
      rgba(5, 3, 19, 0.801)
    ),
    url('/images/11.jpg');

  .disable {
    cursor: not-allowed;
    pointer-events: none;
  }
`;
