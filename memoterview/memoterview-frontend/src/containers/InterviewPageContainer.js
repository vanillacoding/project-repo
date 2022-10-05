import "react-toastify/dist/ReactToastify.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Peer from "simple-peer";
import { io } from "socket.io-client";

import { getQuestions, updateIntervieweeAnswer } from "../api";
import {
  INTERVIEWEE_TOAST_MESSAGE,
  INTERVIEWER_TOAST_MESSAGE,
  RECORD_STATE_TYPE,
} from "../constants/recordState";
import useInterviewRecord from "../hooks/useInterviewRecord";
import useTimer from "../hooks/useTimer";
import useToken from "../hooks/useToken";
import Interview from "../pages/Interview";
import InterviewInterviewee from "../pages/InterviewInterviewee";
import { finishInterview } from "../redux/reducers/interviewees";
import { getProjectById } from "../redux/reducers/projects";
import { mediaOptions, mediaStream } from "../utils/media";
import genUuid from "../utils/uuid";
import { validateInput, validateResultSubmit } from "../utils/validation";

export default function InterviewPageContainer() {
  const socket = useMemo(
    () => io.connect(process.env.REACT_APP_INTERVIEW_SOCKET_SERVER),
    []
  );

  const history = useHistory();
  const { intervieweeId, projectId } = useParams();

  const dispatch = useDispatch();
  const { userData } = useSelector(({ user }) => ({ userData: user.userData }));
  const { byId } = useSelector(({ interviewees }) => ({
    byId: interviewees.byId,
  }));
  const { project } = useSelector(({ projects }) => ({
    project: getProjectById(projects, projectId),
  }));
  const intervieweeData = byId[intervieweeId];

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [filterScores, setFilterScores] = useState({});
  const [questionRate, setQuestionRate] = useState(0);
  const [totalRate, setTotalRate] = useState(0);
  const [comment, setComment] = useState("");
  const [peers, setPeers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [questionModalFlag, setQuestionModalFlag] = useState(false);
  const [totalResultModalFlag, setTotalResultModalFlag] = useState(false);
  const [stream, setStream] = useState(null);
  const [questionList, setQuestionList] = useState([]);
  const [isResumeOpened, setIsResumeOpened] = useState(false);
  const [isQuestionBoardOpened, setIsQuestionBoardOpened] = useState(false);
  const [isScriptBoardOpened, setIsScriptBoardOpened] = useState(false);

  const userVideo = useRef();
  const peersRef = useRef([]);

  const { timeSecond, time, setIsActive } = useTimer();
  const { token } = useToken();

  const {
    recordStateType,
    visibilityRecordStateType,
    recogText,
    setNextRecordStateType,
    answer,
    question,
    clearScripts,
    uploadComplete,
    isDisabled,
  } = useInterviewRecord({
    socket,
    userId: userData.isInterviewee ? genUuid() : userData.id,
    isInterviewee: userData.isInterviewee,
    setTimerActive: setIsActive,
  });

  useEffect(() => {
    (async function getStreaming() {
      try {
        const localStream = await mediaStream();

        userVideo.current.srcObject = localStream;
        userVideo.current.username = userData.username;

        setStream(localStream);
        setIsStreaming(true);
      } catch (error) {
        setErrorMessage(error);
      }
    })();

    setQuestions();
  }, []);

  useEffect(() => {
    const toastMsg = getToastMessage(
      userData.isInterviewee,
      visibilityRecordStateType
    );

    toast(toastMsg);

    if (visibilityRecordStateType === RECORD_STATE_TYPE.QUESTION_BEFORE) {
      clearScripts();
    }
  }, [userData.isInterviewee, visibilityRecordStateType]);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    socket.emit("requestJoinRoom", {
      roomID: intervieweeId,
      userData,
    });

    socket.on("joinSuccess", (targetUsers) => {
      targetUsers.forEach((user) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream,
        });

        peer.on("signal", (signal) => {
          socket.emit("sendSignal", {
            isInterviewee: userData.isInterviewee,
            callee: user.socketID,
            caller: socket.id,
            signal,
            name: userData.username,
          });
        });

        const settedPeer = {
          peer,
          peerID: user.socketID,
          name: user.username,
          isInterviewee: user.isInterviewee,
          isVideoOn: true,
          isAudioOn: true,
        };

        setPeers((prev) => [
          ...prev,
          settedPeer
        ]);

        peersRef.current.push(settedPeer);
      });
    });

    socket.on("joinNewUser", ({ signal, caller, isInterviewee, name }) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on("signal", (signal) => {
        socket.emit("returnSignal", { signal, caller });
      });

      peer.signal(signal);

      const settedPeer = {
        peer,
        peerID: caller,
        name,
        isInterviewee,
        isVideoOn: true,
        isAudioOn: true,
      };

      setPeers((prev) => [...prev, settedPeer]);

      peersRef.current.push(settedPeer);
    });

    socket.on("receiveReturnSignal", ({ id, signal }) => {
      const { peer } = peersRef.current.find((peer) => peer.peerID === id);

      peer.signal(signal);
    });

    socket.on("successToLeaveOtherUser", ({ id }) => {
      const [currentPeer] = peersRef.current.filter(
        (peer) => peer.peerID === id
      );

      currentPeer?.peer.destroy();

      const filteredPeers = peersRef.current.filter(
        (peer) => peer.peerID !== id
      );

      peersRef.current = filteredPeers;

      setPeers(filteredPeers);
    });

    socket.on("someUserVideoOff", (userID) => {
      peersRef.current.forEach((peer) => { // 리팩토링 하며 HOF로 만들기
        if (peer.peerID === userID) {
          peer.isVideoOn = false;
        }
      });
      setPeers(peersRef.current);
    });

    socket.on("someUserVideoOn", (userID) => {
      peersRef.current.forEach((peer) => {
        if (peer.peerID === userID) {
          peer.isVideoOn = true;
        }
      });

      setPeers(peersRef.current);
    });

    socket.on("someUserAudioOff", (userID) => {
      peersRef.current.forEach((peer) => {
        if (peer.peerID === userID) {
          peer.isAudioOn = false;
        }
      });

      setPeers(peersRef.current);
    });

    socket.on("someUserAudioOn", (userID) => {
      peersRef.current.forEach((peer) => {
        if (peer.peerID === userID) {
          peer.isAudioOn = true;
        }
      });

      setPeers(peersRef.current);
    });

    return () => {
      if (isStreaming) {
        socket.disconnect();
        mediaOptions.stop(stream);
      }
    };
  }, [isStreaming]);

  function handleOpenScriptBoardButton() {
    setIsScriptBoardOpened((prev) => !prev);
  }

  function handleOpenResumeButton() {
    setIsResumeOpened((prev) => !prev);
  }

  function handleOpenQuestionBoard() {
    setIsQuestionBoardOpened((prev) => !prev);
  }

  async function setQuestions() {
    const questions = await getQuestions({ token, category: project?.category });

    setQuestionList(questions);
  }

  function closeTotalResultModal() {
    setTotalResultModalFlag(false);
  }

  function closeQuestionModal() {
    setQuestionModalFlag(false);
  }

  function handleBackBtn() {
    if (userData.isInterviewee) {
      return history.push("/interviewEnd");
    }

    setTotalResultModalFlag(true);
  }

  const ProcessInterview = useCallback(() => {
    if (isDisabled) {
      switch (recordStateType) {
        case RECORD_STATE_TYPE.INTERVIEW_BEFORE:
          return toast.error("아직 면접자가 오지 않았습니다.");
        case RECORD_STATE_TYPE.QUESTION_BEFORE:
          return toast.error("다른사람의 질의 응답중에는 질문할 수 없습니다.");
        default:
          return toast.error("질문할 수 없습니다.");
      }
    }

    if (RECORD_STATE_TYPE.ANSWERING === recordStateType) {
      setQuestionModalFlag(true);
    }

    setNextRecordStateType();
  }, [isDisabled, recordStateType, setNextRecordStateType]);

  function handleProcessBtnClick() {
    ProcessInterview();
  }

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === " " || event.key === "Spacebar") {
        ProcessInterview();
      }
    },
    [ProcessInterview]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDisabled]);

  function handleFilterRate(rateOption, value) {
    setFilterScores((prev) => ({ ...prev, [rateOption]: value }));
  }

  function handleTotalRate(_, value) {
    setTotalRate(value);
  }

  function handleQuestionRate(_, value) {
    setQuestionRate(value);
  }

  function handleCommentChange({ target: { value } }) {
    setComment(value);
  }

  function handleResultSubmit(event) {
    event.preventDefault();

    if (!validateResultSubmit({ filterScores, totalRate, comment })) {
      setErrorMessage("모든 항목에 체크해주세요!"); // 일괄 적용 필요함

      return;
    }

    dispatch(
      finishInterview({
        token,
        projectId,
        intervieweeId,
        interviewee: {
          filterScores,
          comments: {
            comment,
            score: totalRate,
            commenter: userData.id,
          },
          interviewDuration: timeSecond,
        },
      })
    );
    history.push(`/projects/${projectId}`); // 결과 페이지로 바꿔야함
  }

  async function handleQuestionSubmit(event) {
    event.preventDefault();

    if (!validateInput(questionRate)) {
      setErrorMessage("점수를 체크해주세요!"); // error message 형식 임의..

      return;
    }

    await updateIntervieweeAnswer({
      intervieweeId,
      projectId,
      token,
      question: {
        title: question,
        answer,
        score: Number(questionRate),
        interviewer: userData.id,
        category: project.category,
      },
    });

    uploadComplete();
    setQuestionModalFlag(false);
  }

  function handleVideo() {
    if (isVideoOn) {
      mediaOptions.videoOff(stream);

      socket.emit("videoOff");
    } else {
      mediaOptions.videoOn(stream);
      
      socket.emit("videoOn");
    }

    setIsVideoOn(!isVideoOn);
  }

  function handleAudio() {
    if (isAudioOn) {
      mediaOptions.audioOff(stream);

      socket.emit("audioOff");
    } else {
      mediaOptions.audioOn(stream);

      socket.emit("audioOn");
    }

    setIsAudioOn(!isAudioOn);
  }


  function getToastMessage(isInterviewee, recordState) {
    if (isInterviewee) {
      return INTERVIEWEE_TOAST_MESSAGE[recordState];
    }

    return INTERVIEWER_TOAST_MESSAGE[recordState];
  }

  return (
    <>
      {userData.isInterviewee ? (
        <InterviewInterviewee
          user={userVideo}
          isInterviewee={userData.isInterviewee}
          peers={peers}
          isVideoOn={isVideoOn}
          isAudioOn={isAudioOn}
          onAudioBtnClick={handleAudio}
          onVideoBtnClick={handleVideo}
          onBackButtonClick={handleBackBtn}
          time={time}
        />
      ) : (
        <Interview
          isInterviewee={userData.isInterviewee}
          onScriptBoardClick={handleOpenScriptBoardButton}
          isScriptBoardOpened={isScriptBoardOpened}
          onQuestionBoardClick={handleOpenQuestionBoard}
          isQuestionBoardOpened={isQuestionBoardOpened}
          onResumeBoardClick={handleOpenResumeButton}
          isResumeOpened={isResumeOpened}
          questionList={questionList}
          onRefresh={setQuestions}
          isVideoOn={isVideoOn}
          isAudioOn={isAudioOn}
          onAudioBtnClick={handleAudio}
          onVideoBtnClick={handleVideo}
          time={time}
          intervieweeData={intervieweeData}
          isQuestionModalOn={questionModalFlag}
          isTotalResultModalOn={totalResultModalFlag}
          onTotalResultModalClose={closeTotalResultModal}
          project={project}
          user={userVideo}
          userData={userData}
          recogText={recogText}
          questionTranscript={question}
          answer={answer}
          peers={peers}
          isButtonDisabled={isDisabled}
          recordStateType={recordStateType}
          visibilityRecordStateType={visibilityRecordStateType}
          onProcessBtnClick={handleProcessBtnClick}
          onTotalRateChange={handleTotalRate}
          onFilterRateChange={handleFilterRate}
          onQuestionRateChange={handleQuestionRate}
          onCommentChange={handleCommentChange}
          onResultSubmit={handleResultSubmit}
          onBackButtonClick={handleBackBtn}
          onQuestionModalClose={closeQuestionModal}
          onQuestionSubmit={handleQuestionSubmit}
        />
      )}
    </>
  );
}
