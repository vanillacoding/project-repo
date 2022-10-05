import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Photo from "./Photo";
import useAudio from "../../hooks/useAudio";

const PlayButton = styled.div`
  border: 0;
  background: transparent;
  box-sizing: border-box;
  height: 19px;
  border-color: transparent transparent transparent #525252;
  transition: 100ms all ease;
  cursor: pointer;

  border-style: solid;
  border-width: 10px 0 10px 18px;

  &:hover {
    border-color: transparent transparent transparent #818181;
  }

  ${({ isPlaying }) => isPlaying && css`
    border-style: double;
    border-width: 0px 0 0px 15px;
  `}
`;

const AudioTitle = styled.div`
  text-align: center;
  height: 2rem;
  font-size: 1em;
`;

const AudioContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #f0eeee;
`;

const PhotoContainer = styled.div`
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  max-width: 20vw;
  max-height: 25vh;
  border-radius: 5px;
  overflow-y: hidden;
`;

const ProfilePhoto = styled(Photo)`
  width: 100%;
  height: auto;
`;

function Profile({
  name,
  description,
  photoURL,
  musicURL,
}) {
  const { isPlaying, playAudio } = useAudio();

  return (
    <>
      <h3>{name}</h3>
      <div>{description}</div>
      <PhotoContainer>
        <ProfilePhoto src={photoURL} alt="profilePhoto" />
      </PhotoContainer>
      <ReactPlayer
        url={musicURL}
        playing={isPlaying}
        width={0}
        height={0}
      />
      <AudioContainer>
        <AudioTitle>
          {`📀  ${name}의 BGM`}
        </AudioTitle>
        <PlayButton type="button" onClick={playAudio} isPlaying={isPlaying} />
      </AudioContainer>
    </>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  musicURL: PropTypes.string.isRequired,
};

export default Profile;
