import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

import { useSocket } from '../../hooks/socket/useSocket';
import usePlayers from '../../hooks/channel/usePlayers';
import useChannel from '../../hooks/channel/useChannel';

import { EVENTS } from '../../constants/socketEvent';
import { API } from '../../constants/api';

import { putRequest } from '../../../remote/remotes';

import Button from '../Button';
import ErrorBox from '../ErrorBox';

export default function PlayerEntryButton({ channelId, isActive }) {
  const [isButtonActive, setIsButtonActive] = useState(true);
  const { channel, error } = useChannel(channelId);
  const { players, mutate } = usePlayers(channelId);

  useEffect(() => {
    if (channel == null) {
      return null;
    }

    const { episode } = channel;

    setIsButtonActive(episode.characters.length > players.length);
  }, [players]);

  useSocket(EVENTS.LISTEN_ENTER_CHANNEL, (user) => {
    if (user.channelId === channelId) {
      mutate((prev) => ({ ...prev, players: [...prev.players, { user }] }));
    }
  });

  useSocket(
    EVENTS.LISTEN_EXIT_CHANNEL,
    ({ userId, channelId: exitChannelId }) => {
      if (exitChannelId === channelId) {
        const newPlayers = players.filter(
          (player) => player.user._id !== userId,
        );
        mutate((prev) => ({ ...prev, players: newPlayers }));
      }
    },
  );

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  if (channelId == null || channel == null) {
    return null;
  }

  async function onButtonClick(channelId) {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await putRequest(
        `${API.URL}/channel/${channelId}`,
        user,
        JSON.stringify({
          state: 'enter',
          userId: user?._id,
        }),
      );
      const { result, message } = await response.json();

      if (result === 'error') {
        throw new Error(message);
      }
    } catch (err) {
      return <ErrorBox message={err.message} />;
    }
  }

  return (
    <Wrapper isActive={isActive}>
      <Link
        href={isActive && isButtonActive ? `/channel/${channelId}` : '#'}
        key={channelId}
        passHref
      >
        <a className={!isActive || !isButtonActive ? 'disable' : null}>
          <Button
            className="entry-button"
            onClick={() => onButtonClick(channelId)}
            bgColor={!isActive ? 'gray' : theme.blue}
            hoverBgColor={theme.pink}
            width="100px"
            height="50px"
          >
            <span className="entry-text">PLAY</span>
            <span className="entry-count">
              {players.length} / {channel.episode.characters.length}
            </span>
          </Button>
        </a>
      </Link>
    </Wrapper>
  );
}

PlayerEntryButton.propTypes = {
  channelId: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const Wrapper = styled.div`
  line-height: 2px;

  a {
    text-decoration: none;
  }

  .entry-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .entry-text {
      padding: 5%;
      font-size: 1.6em;
      font-weight: 800;
      color: ${({ isActive, theme }) =>
        !isActive ? theme.darkNavy : theme.white};
    }

    .entry-count {
      padding: 3%;
      font-size: 1.1em;
      font-weight: 700;
      color: ${({ isActive, theme }) =>
        !isActive ? theme.darkNavy : theme.navy};
    }
  }

  .disable {
    cursor: not-allowed;
    pointer-events: none;
  }
`;
