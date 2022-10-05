import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import useChannel from '../../hooks/channel/useChannel';

import ChannelMain from './ChannelMain';
import ChannelSide from './ChannelSide';
import ErrorBox from '../ErrorBox';

export default function Channel() {
  const {
    query: { channelId },
  } = useRouter();
  const { channel, error } = useChannel(channelId);

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  if (channelId == null || channel == null) {
    return null;
  }

  const { name, episode } = channel;

  return (
    <Container>
      <ChannelHeader>
        <h2 className="channel-name">{name}</h2>
        <h3 className="episode-title">{episode?.title}</h3>
      </ChannelHeader>
      <ChannelMain />
      <ChannelSide />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
`;

const ChannelHeader = styled.div`
  height: 8vh;
  padding: 10px 20px;
  text-align: left;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.darkNavy};
  box-shadow: ${({ theme }) => theme.whiteShadow};

  .channel-name {
    margin: 0px;
    font-size: 1em;
    font-weight: 200;
  }

  .episode-title {
    margin: 0px;
    font-size: 1.1em;
    font-weight: 500;
  }
`;
