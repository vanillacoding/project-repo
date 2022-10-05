import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

import useChannel from '../../hooks/channel/useChannel';
import { socketClient } from '../../hooks/socket/useSocket';

import { EVENTS } from '../../constants/socketEvent';
import { API } from '../../constants/api';
import { ALERT_MSG } from '../../constants/alertMessage';

import { getRequest, putRequest } from '../../../remote/remotes';

import Button from '../Button';
import ErrorBox from '../ErrorBox';

export default function CharacterSelection({
  isModalOpen,
  onClose,
  selectedCharacters,
}) {
  const [episode, setEpisode] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const {
    query: { channelId },
  } = useRouter();
  const { channel, error } = useChannel(channelId);

  if (channelId == null || channel == null) {
    return null;
  }

  if (error || fetchError) {
    if (error) {
      return <ErrorBox message={error.message} />;
    }

    return <ErrorBox message={fetchError.message} />;
  }

  useEffect(() => {
    (async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const response = await getRequest(
          `${API.URL}/episode/${channel.episode._id}`,
          user,
        );
        const { result, data, message } = await response.json();

        if (result === 'error') {
          throw new Error(message);
        }

        setEpisode(data);
      } catch (err) {
        setFetchError(err);
      }
    })();
  }, [isModalOpen]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!currentCharacter) {
      return alert(ALERT_MSG.SELECTION_REQUIRED);
    }

    const user = JSON.parse(sessionStorage.getItem('user'));

    try {
      const response = await putRequest(
        `${API.URL}/channel/${channelId}`,
        user,
        JSON.stringify({
          state: 'character',
          userId: user?._id,
          characterId: currentCharacter,
        }),
      );
      const { result, message } = await response.json();

      if (result === 'error') {
        throw new Error(message);
      }

      socketClient.emit(EVENTS.PLAYER_READY, {
        userId: user?._id,
        characterId: currentCharacter,
        channelId,
        episode,
      });

      onClose();
    } catch (err) {
      setFetchError(err);
    }
  }

  function handleSelectCharacter({ currentTarget: { id } }) {
    if (selectedCharacters.includes(id)) {
      return alert(ALERT_MSG.SELECTION_FAIL);
    }

    setCurrentCharacter(id);
  }

  return (
    <Container>
      <div className="header">
        <span className="title">역할고르기</span>
        <Button className="exit-button" onClick={onClose}>
          나가기
        </Button>
      </div>
      <ReadyForm onSubmit={handleSubmit}>
        <span className="description">연기할 배역을 선택하세요</span>
        <div className="episode-title">{episode.title}</div>
        <ReadyOptions>
          <ul className="character-list">
            {episode.characters?.map((character) => (
              <ReadyOption
                key={character._id}
                id={character._id}
                onClick={handleSelectCharacter}
              >
                <span className="character-name">{character.name}</span>
                <div
                  className={
                    currentCharacter === character._id ? 'select' : null
                  }
                >
                  <Image
                    src={character.imgUrl}
                    alt="character-img"
                    width={90}
                    height={100}
                    layout="responsive"
                  />
                </div>
              </ReadyOption>
            ))}
          </ul>
        </ReadyOptions>
        <div className="button">
          <Button type="submit" bgColor={theme.blue} color={theme.white}>
            배역 고르기
          </Button>
        </div>
      </ReadyForm>
    </Container>
  );
}

CharacterSelection.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  selectedCharacters: PropTypes.array.isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.darkNavy}90;
  color: ${({ theme }) => theme.white};

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    margin-top: 25px;
    padding: 0 50px;

    .title {
      font-size: 24px;
      line-height: 24px;
      color: ${({ theme }) => theme.blue};
    }

    .exit-button {
      padding: 5px 10px;
      border-radius: 10px;
      background-color: transparent;
      border: 1px solid white;
      color: ${({ theme }) => theme.white};
      cursor: pointer;
    }

    :hover {
      opacity: 0.7;
    }
  }
`;

const ReadyForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 90%;
  padding: 30px 50px;
  box-sizing: border-box;
  text-align: left;

  .channel-name {
    display: block;
  }

  .button {
    margin: 15px auto 0 auto;
  }
`;

const ReadyOptions = styled.div`
  margin-top: 10px;

  .description {
    font-size: 16px;
  }

  .character-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 170px));
    padding: 0;
  }

  .select {
    border: 2px solid ${theme.pink};
  }

  .image {
    margin-top: 10px;
  }
`;

const ReadyOption = styled.li`
  display: flex;
  flex-direction: column;
  height: 150px;
  margin: 0 15px 20px 0;
  font-size: 12px;
  list-style: none;
  cursor: pointer;

  .character-name {
    margin-bottom: 5px;
    font-size: 1.2em;
  }
`;
