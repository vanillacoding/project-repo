import {
  faChevronLeft,
  faVideo,
  faVideoSlash,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styled from "styled-components";

import CircleButton from "../../components/CircleButton";
import InterviewMenuButton from "../../components/InterviewMenuButton";
import StyledSideBar from "../../components/shared/StyledLeftSideBar";
import StyledVideoBottomBar from "../../components/shared/StyledVideoBottomBar";
import Timer from "../../components/Timer";
import VideoContent from "../../components/VideoContent";

const PageWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0;
  justify-content: center;
  justify-items: center;
  align-items: center;
  overflow: hidden;
  background: ${({ theme }) => `linear-gradient(50deg, ${theme.Arsenic}, ${theme.Arsenic}) fixed}` };
`;

const InterviewContent = styled.div`
  position: fixed;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  height: calc(100vh - 250px);
  background: #39425d2e;

  border-radius: 10px;
`;

export default function InterviewInterviewee({
  user,
  peers,
  onAudioBtnClick,
  onVideoBtnClick,
  onBackButtonClick,
  time,
  isInterviewee,
  isAudioOn,
  isVideoOn,
}) {
  return (
    <>
      <PageWrapper>
        <StyledSideBar>
          <InterviewMenuButton
            name="BACK"
            onClick={onBackButtonClick}
            icon={faChevronLeft}
          />
        </StyledSideBar>
        <Timer time={time} />
        <InterviewContent>
          <VideoContent peers={peers} user={user} isInterviewee={isInterviewee} />
        </InterviewContent>
        <StyledVideoBottomBar>
          <CircleButton
            onClick={onAudioBtnClick}
            isClicked={isAudioOn}
            clickedState={faVolumeMute}
            unClickedState={faVolumeUp}
          />
          <CircleButton
            onClick={onVideoBtnClick}
            isClicked={isVideoOn}
            clickedState={faVideoSlash}
            unClickedState={faVideo}
          />
        </StyledVideoBottomBar>
      </PageWrapper>
    </>
  );
}
