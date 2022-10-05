import {
  faChevronLeft,
  faFile,
  faQuestion,
  faVideo,
  faVideoSlash,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import CircleButton from "../../components/CircleButton";
import InterviewButton from "../../components/InterviewButton";
import IntervieweeResume from "../../components/IntervieweeResume";
import InterviewMenuButton from "../../components/InterviewMenuButton";
import InterviewQuestionModalView from "../../components/InterviewQuestionModalView";
import InterviewTab from "../../components/InterviewTab";
import InterviewTotalEvaluationModalView from "../../components/InterviewTotalEvaluationModalView";
import Modal from "../../components/Modal";
import QuestionBoard from "../../components/QuestionBoard";
import ScriptBox from "../../components/ScriptBox";
import StyledLeftSideBar from "../../components/shared/StyledLeftSideBar";
import StyledRightSideBar from "../../components/shared/StyledRightSideBar";
import StyledVideoBottomBar from "../../components/shared/StyledVideoBottomBar";
import Timer from "../../components/Timer";
import VideoContent from "../../components/VideoContent";
import { INTERVIEW_STATE } from "../../constants/recordState";

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
  background: ${({ theme }) => `linear-gradient(50deg, ${theme.Arsenic}, ${theme.Arsenic}) fixed}` } ;
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

export default function Interview({
  user,
  questionTranscript,
  answer,
  intervieweeData,
  peers,
  isButtonDisabled,
  recordStateType,
  isInterviewee,
  onProcessBtnClick,
  onQuestionRateChange,
  project,
  onTotalRateChange,
  onFilterRateChange,
  onCommentChange,
  onResultSubmit,
  onTotalResultModalClose,
  isQuestionModalOn,
  isTotalResultModalOn,
  onBackButtonClick,
  questionList,
  onQuestionSubmit,
  time,
  isVideoOn,
  isAudioOn,
  onAudioBtnClick,
  onVideoBtnClick,
  onRefresh,
  onScriptBoardClick,
  isScriptBoardOpened,
  onQuestionBoardClick,
  isQuestionBoardOpened,
  onResumeBoardClick,
  isResumeOpened,
}) {
  return (
    <>
      {isTotalResultModalOn && (
        <Modal onBackgroundClick={onTotalResultModalClose}>
          <InterviewTotalEvaluationModalView
            filters={project?.filters}
            onTotalRateChange={onTotalRateChange}
            onFilterRateChange={onFilterRateChange}
            onCommentChange={onCommentChange}
            onResultSubmit={onResultSubmit}
          />
        </Modal>
      )}
      {isQuestionModalOn && (
        <Modal>
          <InterviewQuestionModalView
            onRateChange={onQuestionRateChange}
            onResultSubmit={onQuestionSubmit}
          />
        </Modal>
      )}
      <PageWrapper>
        <StyledLeftSideBar>
          <InterviewMenuButton
            name="BACK"
            onClick={onBackButtonClick}
            icon={faChevronLeft}
          />
          <InterviewTab
            isLeft={true}
            tabName="Script"
            tabIcon={faFile}
            onClick={onScriptBoardClick}
            isOpened={isScriptBoardOpened}
          >
            <ScriptBox answer={answer} question={questionTranscript}/>
          </InterviewTab>
          <InterviewTab
            isLeft={true}
            tabName="Recommendation"
            tabIcon={faQuestion}
            onClick={onQuestionBoardClick}
            isOpened={isQuestionBoardOpened}
          >
            <QuestionBoard
              questions={questionList}
              onChange={onRefresh}
            />
          </InterviewTab>
        </StyledLeftSideBar>
        <Timer time={time} />
        <InterviewContent>
          <VideoContent peers={peers} user={user} isInterviewee={isInterviewee} />
          <StyledVideoBottomBar>
            <CircleButton
              onClick={onAudioBtnClick}
              isClicked={isAudioOn}
              clickedState={faVolumeMute}
              unClickedState={faVolumeUp}
            />
            {!isInterviewee &&
              <InterviewButton
                isButtonDisabled={isButtonDisabled}
                onClick={onProcessBtnClick}
                state={INTERVIEW_STATE[recordStateType]}
              />
            }
            <CircleButton
              onClick={onVideoBtnClick}
              isClicked={isVideoOn}
              clickedState={faVideoSlash}
              unClickedState={faVideo}
            />
          </StyledVideoBottomBar>
        </InterviewContent>
        <StyledRightSideBar>
          <InterviewTab
            isLeft={false}
            tabName="Resume"
            tabIcon={faFile}
            onClick={onResumeBoardClick}
            isOpened={isResumeOpened}
          >
            <IntervieweeResume resume={intervieweeData?.resumePath} />
          </InterviewTab>
        </StyledRightSideBar>
      </PageWrapper>
    </>
  );
}
