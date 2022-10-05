import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '../../styles/theme';

import { socketClient } from '../../hooks/socket/useSocket';

import { API } from '../../constants/api';
import { EVENTS } from '../../constants/socketEvent';

import { getRequest, putRequest, postRequest } from '../../../remote/remotes';

import ErrorBox from '../ErrorBox';
import Button from '../Button';

export default function CreateChannel({ isModalOpen, onClose }) {
  const [episodes, setEpisodes] = useState([]);
  const [inputValue, setInputValue] = useState({
    name: '',
    episodeId: '',
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const response = await getRequest(`${API.URL}/episode`, user);
        const { result, data, message } = await response.json();

        if (result === 'error') {
          return alert(message);
        }

        setEpisodes(data);
      } catch (err) {
        return <ErrorBox message={err.message} />;
      }
    }

    fetchData();
  }, [isModalOpen]);

  async function submitData(ev) {
    ev.preventDefault();

    const { name, episodeId } = inputValue;

    try {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const response = await postRequest(
        `${API.URL}/channel`,
        user,
        JSON.stringify({ name, episodeId, host: user._id }),
      );
      const { result, data, message } = await response.json();
      const channelId = data._id;

      if (result === 'error') {
        throw new Error(message);
      }

      const res = await putRequest(
        `${API.URL}/channel/${channelId}`,
        user,
        JSON.stringify({
          state: 'enter',
          userId: user._id,
        }),
      );
      const { result: putResult, message: pusMessage } = await res.json();

      if (putResult === 'error') {
        throw new Error(pusMessage);
      }

      socketClient.emit(EVENTS.CREATE_CHANNEL, data);
      router.push(`/channel/${channelId}`);
    } catch (err) {
      return <ErrorBox message={err.message} />;
    }
  }

  function handleClick({ currentTarget }) {
    const { id } = currentTarget;

    setInputValue({
      ...inputValue,
      episodeId: id,
    });
  }

  function handleChange({ target }) {
    const { name, value } = target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  }

  return (
    <Container>
      <div className="header">
        <span className="title">채널개설 하기</span>
        <Button className="exit-button" onClick={onClose}>
          나가기
        </Button>
      </div>
      <CreatingForm>
        <ChannelName>
          <span className="channel-name">채널 이름을 입력하세요</span>
          <input
            type="text"
            name="name"
            placeholder="ex) 저랑 연기배틀 하실 분 들어오세요"
            value={inputValue.name}
            onChange={handleChange}
          />
        </ChannelName>
        <EpisodeOptions>
          <span className="episode-select">연기할 작품을 선택하세요</span>
          <ul className="episode-list">
            {episodes.map((episode) => (
              <EpisodeOption
                key={episode._id}
                id={episode._id}
                onClick={handleClick}
              >
                <span
                  className={`episode-title ${
                    inputValue.episodeId === episode._id && 'color'
                  }`}
                >
                  {episode.title}
                </span>
                <Image
                  src={episode.thumbnail}
                  alt="episode-thumbnail"
                  id={episode._id}
                  width={180}
                  height={200}
                />
              </EpisodeOption>
            ))}
          </ul>
        </EpisodeOptions>
        <div className="button">
          <Button
            type="submit"
            onClick={submitData}
            bgColor={theme.blue}
            color={theme.white}
          >
            채널 개설
          </Button>
        </div>
      </CreatingForm>
    </Container>
  );
}

CreateChannel.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.darkNavy}90;
  color: ${({ theme }) => theme.white};

  .exit-button {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: transparent;
    border: 1px solid white;
    color: ${({ theme }) => theme.white};
    cursor: pointer;

    :hover {
      opacity: 0.7;
    }
  }

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
  }
`;

const CreatingForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 90%;
  padding: 30px 50px;
  box-sizing: border-box;
  text-align: left;

  .channel-name {
    display: block;
    font-size: 1.1em;
    color: ${({ theme }) => theme.white};
  }

  .button {
    margin: 10px auto 0 auto;
  }
`;

const ChannelName = styled.div`
  height: 80px;

  .channel-name {
    font-size: 16px;
  }

  input {
    width: 300px;
    margin-top: 10px;
    padding: 5px 10px;
  }
`;

const EpisodeOptions = styled.div`
  margin-top: 10px;
  height: 180px;

  .episode-select {
    font-size: 1.1em;
    color: ${({ theme }) => theme.white};
  }

  .episode-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }
`;

const EpisodeOption = styled.li`
  display: flex;
  flex-direction: column;
  height: 110px;
  margin: 0 60px 0 0;
  font-size: 12px;
  list-style: none;
  cursor: pointer;

  .episode-title {
    margin-bottom: 10px;
    font-size: 1.2em;
  }

  .color {
    color: ${({ theme }) => theme.pink};
  }
`;
