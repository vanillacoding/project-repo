import React, { useState } from 'react';
import YouTube from "react-youtube";
import styled, { css } from "styled-components";
import { ipcRenderer, shell } from 'electron';
import { color } from '../css/color';

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const VideoWrapper = styled.div`
  display: flex;
  width: 100%;
  height: ${props => props.content ? 'calc(100vh - 200px)' : '100vh'};

  div {
    width: 100%;
    height: 100%;
  }
`;

const BannerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
`;

const Banner = styled.img`
  width: 100%;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${color.SUB};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 1;

  ${props =>
    css`
      transition: all ${props.speed} ${props.delay} ease;
    `}

  ${props =>
    props.hide &&
    css`
      top: -100%;
      opacity: 0;
    `}

  p {
    margin: 0 0 1em 0;
    font-size: 5em;
    color: ${color.BOLD};
  }
`;

export default function VideoPopup({ videoUrl, campaignId, content, campaignUrl }) {
  const [test, setTest] = useState(false);

  setTimeout(() => {
    setTest(true);
  }, 2000);

  let videoCode;

  if (videoUrl) {
    videoCode = videoUrl.split('v=')[1].split('&')[0];
  }

  const checkElapsedTime = (event) => {
    if (event.data === 0) {
      ipcRenderer.send('closevideo');
    }
  };

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1
    }
  };

  function handleClickBanner(event) {
    event.preventDefault();

    ipcRenderer.send('clickBanner', campaignId);
    shell.openExternal(campaignUrl);
  }

  return (
    <PopupWrapper>
      <LoadingWrapper hide={test} speed={"1s"} delay={"1.5s"}>
        <p>스트레칭 시간입니다!!</p>
      </LoadingWrapper>
      <VideoWrapper content={content}>
        <YouTube
          videoId={videoCode}
          allow="fullscreen;"
          containerClassName="embed embed-youtube"
          onStateChange={(event) => checkElapsedTime(event)}
          opts={opts}
        />
      </VideoWrapper>
      {content && (
        <BannerWrapper>
          <Banner
            src={content}
            onClick={handleClickBanner}
          />
        </BannerWrapper>
      )}
    </PopupWrapper>
  );
}
