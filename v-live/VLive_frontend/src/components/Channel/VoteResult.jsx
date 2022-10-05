import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styled from '@emotion/styled';

import usePlayers from '../../hooks/channel/usePlayers';
import { socketClient } from '../../hooks/socket/useSocket';

import { API } from '../../constants/api';
import { EVENTS } from '../../constants/socketEvent';

import { putRequest } from '../../../remote/remotes';

import ErrorBox from '../ErrorBox';

export default function VoteResult() {
  const {
    query: { channelId },
  } = useRouter();
  const router = useRouter();
  const { players, error } = usePlayers(channelId);
  const [winners, setWinners] = useState('');

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/main');
    }, 6000);

    return () => {
      clearTimeout(timer);
      deactivateChannel();

      socketClient.emit(EVENTS.END_CHANNEL, channelId);
      socketClient.off(EVENTS.LISTEN_ENTER_CHANNEL);
      socketClient.off(EVENTS.LISTEN_NEW_CHAT);
    };
  }, []);

  useEffect(() => {
    const voteCounts = players.map((player) => player.voteCount);
    const winnerNames = [];

    players.forEach((player) => {
      if (player.voteCount === Math.max(...voteCounts)) {
        winnerNames.push(`, ${player.user.name}님`);
      }
    });

    setWinners(winnerNames.join(' ').slice(2));
  }, [players]);

  async function deactivateChannel() {
    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await putRequest(
        `${API.URL}/channel/${channelId}`,
        user,
        JSON.stringify({
          state: 'end',
          channelId,
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

  function checkWinner(name) {
    return winners?.includes(name);
  }

  return (
    <Wrapper>
      <h1 className="result-title">투표 결과</h1>
      <span className="result-subtitle">{winners && winners} 축하합니다!</span>
      <div className="characters">
        {winners &&
          players.map((player) => {
            return (
              <Character
                key={player._id}
                id={player._id}
                iswinner={checkWinner(player.user.name)}
              >
                <div className="img">
                  <Image
                    src={player.character?.imgUrl}
                    alt="character-image"
                    width={150}
                    height={200}
                  />
                </div>
                <span className="character-name">{player.character?.name}</span>
                <span className="user-name">{player.user?.name}</span>
                <span className="voting-result">{player.voteCount} 표</span>
              </Character>
            );
          })}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 65%;
  height: 100%;
  background-color: black;

  .result-title {
    margin: 0;
    padding: 30px 0 10px 0;
    font-size: 2em;
    color: white;
  }

  .result-subtitle {
    padding: 30px 0 30px 0;
    font-weight: 200px;
    font-size: 1.5em;
    color: ${({ theme }) => theme.pink || 'white'};
  }

  .characters {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
`;

const Character = styled.div`
  margin: 0 20px;
  cursor: pointer;
  transition: all 100ms ease-out;

  &:hover {
    transform: scale(1.02);
  }

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 153px;
    height: 203px;
    border: ${({ iswinner, theme }) =>
      iswinner ? '3px solid' + theme.pink : 'none'};
  }

  .character-name {
    display: block;
    padding: 10px 0;
    font-size: 18px;
    color: ${({ iswinner, theme }) => (iswinner ? theme.pink : 'white')};
  }

  .user-name {
    background-color: #898bf3;
    padding: 1px 4px;
    border-radius: 5px;
    font-weight: 700;
    font-size: 18px;
    color: ${({ iswinner }) => (iswinner ? 'white' : 'black')};
  }

  .voting-result {
    display: block;
    padding: 30px 0;
    font-size: 24px;
    color: ${({ iswinner, theme }) => (iswinner ? theme.pink : 'white')};
  }

  .clicked {
    color: ${({ theme }) => theme.pink};
  }
`;
