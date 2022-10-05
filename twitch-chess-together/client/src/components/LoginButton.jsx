import React from 'react';
import { FaTwitch } from 'react-icons/fa';
import styled from 'styled-components';

import { flexCenter } from './styles/mixin';

const LOGIN_WITH_TWITCH = 'Login with Twitch';

export default function LoginButton() {
  const scope = 'chat:edit+chat:read+user:read:email';
  const redirectUri = process.env.REACT_APP_TWITCH_REDIRECT_URI;
  const clientId = process.env.REACT_APP_TWITCH_CLIENT_ID;

  const oAuthLink = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

  return (
    <LoginLinkButton href={oAuthLink}>
      <ButtonContextWrapper>
        <TwitchLoginIconWrapper>
          <FaTwitch size={60} />
        </TwitchLoginIconWrapper>
        <TwitchLoginTextWrapper>{LOGIN_WITH_TWITCH}</TwitchLoginTextWrapper>
      </ButtonContextWrapper>
    </LoginLinkButton>
  );
}

const LoginLinkButton = styled.a`
  width: 600px;
  height: 100px;
  padding: 0;
  border: 0;
  text-decoration: none;
  color: white;
  border-radius: 3px;
`;

const ButtonContextWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin-top: 0px;
  background-color: #6441a5;
`;

const TwitchLoginIconWrapper = styled.div`
  ${flexCenter}
  width: 150px;
  height: 100%;
  padding-top: 0px;
  background-color: #6441a5;
`;

const TwitchLoginTextWrapper = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100%;
  background-color: #6441a5;
  font-size: 50px;
`;
