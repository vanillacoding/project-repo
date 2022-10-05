import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import logo from '../assets/logo';

import LoginButton from '../components/LoginButton';
import { flexCenter } from '../components/styles/mixin';
import { selectUserId } from '../features/user/selectors';

export default function MainPage() {
  const history = useHistory();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    if (!userId) return;

    history.push('/menu');
  }, [userId]);

  return (
    <>
      <LogoWrapper>
        <MainLogo />
      </LogoWrapper>
      <LoginButtonWrapper>
        <LoginButton />
      </LoginButtonWrapper>
    </>
  );
}

const MainLogo = styled.div`
  width: 400px;
  height: 300px;
  margin-top: 150px;
  background-size: cover;
  background-image: url(${logo});
`;

const LogoWrapper = styled.div`
  ${flexCenter}
  height: 55%;
`;

const LoginButtonWrapper = styled.div`
  ${flexCenter}
  padding-top: 100px;
`;
