import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import usePlayers from '../../hooks/channel/usePlayers';

import { API } from '../../constants/api';

import ErrorBox from '../ErrorBox';

export default function Vote({ onShowResult }) {
  const {
    query: { channelId },
  } = useRouter();
  const { players, error } = usePlayers(channelId);
  const [playerId, setPlayerId] = useState('');

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  if (channelId == null || players == null) {
    return null;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      onShowResult();
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  async function selectCharacter({ currentTarget }) {
    setPlayerId(currentTarget.id);

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await fetch(`${API.URL}/channel/${channelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${user?.token}`,
        },
        body: JSON.stringify({
          state: 'voting',
          playerId: currentTarget.id,
        }),
      });

      const { result, message } = await response.json();

      if (result === 'error') {
        throw new Error(message);
      }
    } catch (err) {
      return <ErrorBox message={err.message} />;
    }
  }

  return (
    <Container>
      <h1 className="vote-title">최고의 캐릭터에게 투표해주세요</h1>
      <span className="vote-subtitle">투표는 한 번만 참여 가능합니다.</span>
      <div className="characters">
        {players.map((player) => (
          <Character
            className="character"
            key={player._id}
            id={player._id}
            onClick={selectCharacter}
          >
            <div className={`img ${playerId === player._id && 'border'}`}>
              <Image
                src={player.character?.imgUrl}
                alt="character-image"
                width={150}
                height={200}
              />
            </div>
            <span
              className={`character-name ${playerId === player._id && 'color'}`}
            >
              {player.character?.name}
            </span>
            <span className="user-name">{player.user?.name}</span>
          </Character>
        ))}
      </div>
    </Container>
  );
}

Vote.propTypes = {
  onShowResult: PropTypes.func.isRequired,
};

const Container = styled.div`
  width: 65%;
  color: white;

  .vote-title {
    margin: 20px 0 0 0;
    font-size: 2em;
  }

  .vote-subtitle {
    padding: 20px 0 0 0;
    font-weight: 200px;
    font-size: 1.5em;
    color: #898bf3;
  }

  .characters {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
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
    margin-bottom: 20px;
  }

  .character-name {
    display: block;
    margin-bottom: 20px;
    font-size: 1.4em;
  }

  .user-name {
    background-color: #898bf3;
    padding: 0px 10px;
    border-radius: 5px;
    font-weight: 700;
    font-size: 1.2em;
    color: black;
  }

  .color {
    color: ${({ theme }) => theme.pink};
  }

  .border {
    border: ${({ theme }) => '3px solid' + theme.pink};
  }
`;
