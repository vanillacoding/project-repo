import { faMicrophoneAlt, faMicrophoneAltSlash, faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import MainVideo from "../MainVideo";
import VideoContentTag from "../shared/StyledVideoContentTag";
import SubVideo from "../SubVideo";

const Video = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .video-button {
    margin-right: 10px;
  }
`;

const VideoIcon = styled.div`
  position: absolute;
  top: 5%;
  right: 5%;
  color: rgba(254, 254, 254, 0.8);
  z-index: 2;
`;

export default function VideoBlock({ video, isUser, isInterviewee, isAudioOn, children, isVideoOn = true }) {
  return (
    <Video>
      {isUser 
        ? <MainVideo videoRef={video} /> 
        : <SubVideo peer={video} />
      }
      {
        !isVideoOn && (
          <VideoIcon>
            <FontAwesomeIcon
              icon={faVideoSlash}
            />
          </VideoIcon>
        )
      }
      <VideoContentTag color={isInterviewee ? "#D3635E" : "#61B153"}>
        {
          !isUser && (
            <FontAwesomeIcon
              icon={isAudioOn ? faMicrophoneAlt : faMicrophoneAltSlash}
              className="video-button"
            />
          )
        }
        {children}
      </VideoContentTag>
    </Video>
  );
}
