import { useCallback, useEffect, useRef, useState } from "react";

import { RECORD_STATE_TYPE } from "../constants/recordState";
import useSpeechRecognition from "./useSpeechRecognition";

export default function useInterviewRecord({
  socket,
  isInterviewee,
  userId,
  setTimerActive,
  onInterviewStart = () => {},
  onQuestionStart = () => {},
  onQuestionEnd = () => {},
  onAnswerStart = () => {},
  onAnswerEnd = () => {},
  onError = () => {},
}) {
  const { recogText, startRecognition, stopRecognition } = useSpeechRecognition();
  const [isDisabled, setIsDisabled] = useState(true);
  const recordsGlobalsRef = useRef({
    recogText,
    questionText: "",
    isInterviewee,
    userId,
  });
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [visibilityRecordStateType, setVisibilityRecordStateType] = useState(RECORD_STATE_TYPE.INTERVIEW_BEFORE);
  const [recordStateType, setRecordStateType] = useState(
    RECORD_STATE_TYPE.INTERVIEW_BEFORE
  );

  const handleQuestionTranscriptRecog = useCallback((transcript) => {
    socket.emit("onQuestionRecog", { transcript });
  }, [socket]);

  const setNextRecordStateType = useCallback(() => {
    switch (recordStateType) {
      case RECORD_STATE_TYPE.INTERVIEW_BEFORE:
        setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
        socket.emit("startInterview");
        break;
      case RECORD_STATE_TYPE.QUESTION_BEFORE:
        setRecordStateType(RECORD_STATE_TYPE.QUESTIONING);
        startRecognition({ onTranscriptRecog: handleQuestionTranscriptRecog });
        socket.emit("question", { userId: recordsGlobalsRef.current.userId });
        break;
      case RECORD_STATE_TYPE.QUESTIONING:
        setRecordStateType(RECORD_STATE_TYPE.ANSWER_BEFORE);
        stopRecognition();
        setQuestion(recordsGlobalsRef.current.recogText);
        socket.emit("endQuestion");
        break;
      case RECORD_STATE_TYPE.ANSWER_BEFORE:
        setRecordStateType(RECORD_STATE_TYPE.ANSWERING);
        socket.emit("requestAnswer");
        break;
      case RECORD_STATE_TYPE.ANSWERING:
        setRecordStateType(RECORD_STATE_TYPE.SAVING);
        socket.emit("endAnswer");
        break;
      case RECORD_STATE_TYPE.SAVING:
        setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
        socket.emit("startSaving");
        break;
      default:
        setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
        break;
    }
  }, [recordStateType, socket, startRecognition, stopRecognition]);

  function uploadComplete() {
    socket.emit("uploadComplete");
    setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
    setVisibilityRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
  }

  useEffect(() => {
    socket.on("preventButton", () => {
      setIsDisabled(true);
    });

    socket.on("onQuestionRecog", ({ questionerId, transcript }) => {
      setQuestion(transcript);
    });

    socket.on("onAnswerRecog", ({ questionerId, transcript }) => {
      if (!recordsGlobalsRef.current.isInterviewee) {
        setAnswer(transcript);
      }
    });

    socket.on("questionerReceiveAnswer", ({ questionerId, answer }) => {
      if (questionerId === recordsGlobalsRef.current.userId) {
        setAnswer(answer);
      }
    });

    socket.on("enableButton", () => {
      setIsDisabled(false);
    });

    socket.on("error", ({ message }) => {
      onError(message);
    });
  }, [socket]);

  const handleAnswerTranscriptRecog = useCallback((transcript) => {
    socket.emit("onAnswerRecog", { transcript });
  }, [socket]);

  useEffect(() => {
    function handleIntervieweeStartAnswerOccur() {
      if (recordsGlobalsRef.current.isInterviewee) {
        startRecognition({ onTranscriptRecog: handleAnswerTranscriptRecog });
      }
    }

    socket.on("intervieweeStartAnswer", handleIntervieweeStartAnswerOccur);

    return () => {
      socket.off("intervieweeStartAnswer", handleIntervieweeStartAnswerOccur);
    };
  }, [handleAnswerTranscriptRecog, socket, startRecognition]);

  useEffect(() => {
    function handleIntervieweeEndAnswerOccur() {
      if (recordsGlobalsRef.current.isInterviewee) {
        stopRecognition();
        socket.emit("sendAnswer", {
          answer: recogText,
        });
      }
    }

    socket.on("intervieweeEndAnswer", handleIntervieweeEndAnswerOccur);

    return () => {
      socket.off("intervieweeEndAnswer", handleIntervieweeEndAnswerOccur);
    };
  }, [recogText, socket, stopRecognition]);

  useEffect(() => {
    function handleStartInterviewOccur() {
      setVisibilityRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
      if (!recordsGlobalsRef.current.isInterviewee) {
        setRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
      }

      onInterviewStart();

      setTimerActive(true);
    }

    socket.on("startInterview", handleStartInterviewOccur);

    return () => {
      socket.off("startInterview", handleStartInterviewOccur);
    };
  }, [onInterviewStart, setTimerActive, socket]);

  useEffect(() => {
    function handleStartQuestionOccur() {
      setVisibilityRecordStateType(RECORD_STATE_TYPE.QUESTIONING);
      onQuestionStart();
    }

    function handleEndQuestionOccur() {
      setVisibilityRecordStateType(RECORD_STATE_TYPE.ANSWER_BEFORE);
      onQuestionEnd();
    }

    function handleStartAnswerOccur() {
      setVisibilityRecordStateType(RECORD_STATE_TYPE.ANSWERING);
      onAnswerStart();
    }

    function handleEndAnswerOccur() {
      setVisibilityRecordStateType(RECORD_STATE_TYPE.SAVING);
      onAnswerEnd();
    }

    function handleUploadCompleteOccur() {
      setVisibilityRecordStateType(RECORD_STATE_TYPE.QUESTION_BEFORE);
      onAnswerEnd();
    }

    socket.on("startQuestion", handleStartQuestionOccur);
    socket.on("endQuestion", handleEndQuestionOccur);
    socket.on("startAnswer", handleStartAnswerOccur);
    socket.on("endAnswer", handleEndAnswerOccur);
    socket.on("uploadComplete", handleUploadCompleteOccur);

    return () => {
      socket.off("startQuestion", handleStartQuestionOccur);
      socket.off("endQuestion", handleEndQuestionOccur);
      socket.off("startAnswer", handleStartAnswerOccur);
      socket.off("endAnswer", handleEndAnswerOccur);
      socket.off("uploadComplete", handleUploadCompleteOccur);
    };

  }, [onAnswerEnd, onAnswerStart, onQuestionEnd, onQuestionStart, socket]);

  useEffect(() => {
    recordsGlobalsRef.current.recogText = recogText;
  }, [recogText]);

  useEffect(() => {
    recordsGlobalsRef.current.isInterviewee = isInterviewee;
  }, [isInterviewee]);

  function clearScripts() {
    setQuestion("");
    setAnswer("");
  }

  return { isDisabled, recordStateType, visibilityRecordStateType, recogText, setNextRecordStateType, uploadComplete, answer, question, clearScripts };
}
