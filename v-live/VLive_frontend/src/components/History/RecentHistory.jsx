import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useChannel from '../../hooks/channel/useChannel';

import ErrorBox from '../ErrorBox';

export default function RecentHistory() {
  const {
    query: { historyId },
  } = useRouter();
  const { channel, error } = useChannel(historyId);

  if (error) {
    return <ErrorBox message={error.message} />;
  }

  if (historyId == null || channel == null) {
    return null;
  }

  const { name, episode, players } = channel;

  return (
    <Container>
      <header>
        <h4 className="user-name">{name}</h4>
        <h3 className="episode-title">{episode.title}</h3>
      </header>
      <VideoWrapper>
        <div className="video"></div>
      </VideoWrapper>
      <ResultWrapper>
        {players?.map((player) => (
          <div key={player._id} className="player-profile">
            <Image
              src={player.character.imgUrl}
              alt="character image"
              width={70}
              height={70}
            />
            <div>{player.user.name}</div>
            <div>{player.character.name}</div>
            <div>{player.voteCount}</div>
          </div>
        ))}
      </ResultWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 20px;

  .user-name {
    margin-bottom: 10px;
    margin-top: 0px;
    text-align: left;
    font-size: 1.2em;
    font-weight: 200;
    color: #ffffff;
  }

  .episode-title {
    margin-top: 10px;
    margin-bottom: 0px;
    text-align: left;
    font-size: 1.3em;
    font-weight: 500;
    color: #ffffff;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 55%;
  padding-top: 10px;

  .video {
    width: 100%;
    height: 350px;
    background-image: url('/images/background.jpg');
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  margin-top: 55px;
  margin-bottom: 30px;
  width: auto;
  height: 130px;

  .player-profile {
    margin-left: auto;
    margin-right: auto;
    border: 1px solid black;
    color: #ffffff;
  }
`;
