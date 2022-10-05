import React from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { useSocket } from '../../hooks/socket/useSocket';
import usePlayers from '../../hooks/channel/usePlayers';

import { EVENTS } from '../../constants/socketEvent';

import PlayerItem from './PlayerItem';
import ErrorBox from '../ErrorBox';

export default function PlayerContainer() {
  const {
    query: { channelId },
  } = useRouter();
  const { players, error, mutate } = usePlayers(channelId);

  useSocket(EVENTS.LISTEN_ENTER_CHANNEL, (user) => {
    mutate((prev) => {
      return { ...prev, players: [...prev.players, { user }] };
    });
  });

  useSocket(EVENTS.LISTEN_EXIT_CHANNEL, (userId) => {
    const newPlayers = players.filter((player) => player.user._id !== userId);

    mutate((prevPlayers) => ({ ...prevPlayers, newPlayers }));
  });

  useSocket(EVENTS.LISTEN_PLAYER_READY, (user) => {
    const readyPlayers = players.map((player) => {
      if (player.user._id === user._id) {
        player.character = user.userRole.character;
      }

      return player;
    });

    mutate((prevPlayers) => ({ ...prevPlayers, readyPlayers }));
  });

  if (channelId == null || players == null) {
    return null;
  }

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  return (
    <Wrapper>
      {players.map((player) => (
        <PlayerItem key={player.user._id} player={player} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 15%;
  height: 100%;
  padding-bottom: 30px;
  color: white;
`;
