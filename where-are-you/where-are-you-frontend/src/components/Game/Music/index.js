import React, { useState, useRef } from "react";

import styled from "styled-components";

import backgroundMusic from "../../../assets/common/the_waltzing_cat.mp3";
import volumeOff from "../../../assets/common/volume_off.png";
import volumeOn from "../../../assets/common/volume_on.png";
import IconButton from "../../Shared/IconButton";

const Audio = styled.audio`
  width: 0;
  height: 0;
`;

const MusicInfo = styled.p`
  position: absolute;
  top: -2.5rem;
  right: 0;
  color: rgba(0, 0, 0, 0.4);
`;

function Music() {
  const [volumeIcon, setVolumeIcon] = useState(volumeOn);
  const [iconName, setIconName] = useState("음악 재생");
  const audioRef = useRef();

  const controlMusic = () => {
    if (volumeIcon === volumeOn) {
      audioRef.current.play();
      audioRef.current.muted = false;

      setIconName("음악 멈춤");
      setVolumeIcon(volumeOff);
      return;
    }

    audioRef.current.muted = true;

    setIconName("음악 재생");
    setVolumeIcon(volumeOn);
  };

  return (
    <>
      <Audio
        ref={audioRef}
        loop
        crossOrigin="anonymous"
        preload="auto"
      >
        <source src={backgroundMusic} type="audio/mp3" />
      </Audio>
      <IconButton
        type="button"
        name={iconName}
        icon={volumeIcon}
        top="40px"
        handleClick={controlMusic}
      />
      <MusicInfo>
        BGM: The Waltzing Cat - Leroy Anderson
      </MusicInfo>
    </>
  );
}

export default Music;
