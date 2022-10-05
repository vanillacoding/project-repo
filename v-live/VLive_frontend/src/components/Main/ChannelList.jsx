import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import { useSocket } from '../../hooks/socket/useSocket';
import useChannels from '../../hooks/channel/useChannels';

import ChannelItem from './ChannelItem';
import ErrorBox from '../ErrorBox';

const { EVENTS } = require('../../constants/socketEvent');

export default function ChannelList({ loginStatus }) {
  const { activeChannels, error, mutate } = useChannels();

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  useSocket(EVENTS.LISTEN_CREATE_CHANNEL, (channel) => {
    const newChannel = Object.assign(channel, { isNew: true });
    mutate((prev) => [...prev, newChannel]);
  });

  useSocket(EVENTS.LISTEN_END_CHANNEL, (channelId) => {
    const newActiveChannels = activeChannels.filter(
      (activeChannel) => activeChannel._id !== channelId,
    );

    mutate(newActiveChannels);
  });

  useSocket(EVENTS.LISTEN_READY_TO_START, (id) => {
    const isStartChannels = activeChannels.map((activeChannel) => {
      if (activeChannel._id === id) {
        activeChannel.isPlaying = true;
      }

      return activeChannel;
    });

    mutate(isStartChannels);
  });

  return (
    <List>
      {activeChannels?.map((channel) => (
        <ChannelItem
          key={channel._id}
          channel={channel}
          loginStatus={loginStatus}
        />
      ))}
    </List>
  );
}

ChannelList.propTypes = {
  loginStatus: PropTypes.bool.isRequired,
};

const List = styled.div`
  display: inline-block;
  width: 75%;
  min-width: 500px;
  height: 100%;
  margin: auto;
  padding: 20px 60px;
  overflow-y: scroll;
  background-image: linear-gradient(
      rgba(5, 3, 19, 0.801),
      rgba(5, 3, 19, 0.788),
      rgba(5, 3, 19, 0.568),
      rgba(5, 3, 19, 0.788),
      rgba(5, 3, 19, 0.801)
    ),
    url(/images/background.jpg);

  &::-webkit-scrollbar {
    width: 13px;
    background-color: ${({ theme }) => theme.darkNavy};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.blue};

    &:hover {
      background-color: ${({ theme }) => theme.white};
      border: none;
    }
  }
`;
