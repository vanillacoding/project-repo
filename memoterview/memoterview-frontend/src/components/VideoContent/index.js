import styled from "styled-components";

import VideoBlock from "../VideoBlock";

const VideoContentWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  align-items: center;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(2, auto);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  width: 48vw;
  height: 50vh;

  .videos {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

export default function VideoContent({ peers, user, isInterviewee }) {
  return (
    <VideoContentWrapper>
      <VideoBlock video={user} isUser={true} isInterviewee={isInterviewee}>
        {user.current?.username || "ME"}
      </VideoBlock>
      {peers?.map((peer) => (
        <VideoBlock 
          key={peer.peerID} 
          isVideoOn={peer.isVideoOn} 
          isUser={false} 
          video={peer.peer} 
          isInterviewee={peer.isInterviewee} 
          isAudioOn={peer.isAudioOn}
        >
          {peer.name}
        </VideoBlock>
      ))}
    </VideoContentWrapper>
  );
}
