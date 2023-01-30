import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import Header from '../header';
import flexCenter from '../shared/flexcentercontainer';

import { currentUserInfo } from '../../store/states';
import { login } from '../../service/auth';
import googleDocsIcon from '../../public/images/btn_google_signin_light_pressed_web@2x.png';

export default function Login() {
  const router = useRouter();

  const saveUserData = useSetRecoilState(currentUserInfo);

  const clickLoginHandler = async () => {
    const response = await login();
    if (!response?.user) {
      return;
    }
    const { _id, username, email, profile } = response.user;
    saveUserData({
      _id,
      username,
      email,
      profile,
    });
    if (response.result === 'ok') {
      router.push('/');
    }
  };

  return (
    <Wrapper>
      <Header />
      <IconWrapper>
        <Title>Sign in with</Title>
        <Title>Google</Title>

        <Image
          src={googleDocsIcon}
          alt="google-docs-icon"
          className="googleLoginButton"
          onClick={clickLoginHandler}
          placeholder="empty"
        />
      </IconWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 30px;
  text-align: left;
`;

const IconWrapper = styled(flexCenter)`
  align-items: flex-start;
  min-width: 10rem;
  height: 80vh;
  transform: translateY(-30px);

  .googleLoginButton {
    width: 100%;
    margin-top: 3rem;
    transition: 0.1s all;
    cursor: pointer;

    &:hover {
      transform: scale(1.02);
    }
  }
`;
