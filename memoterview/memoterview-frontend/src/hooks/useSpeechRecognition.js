import { useState } from "react";

import { startSpeechRecognition, stopSpeechRecognition } from "../utils/speechRecognition";

export default function useSpeechRecognition() {
  const [recogText, setRecogText] = useState();

  function handleRecognitionStart() {
    setRecogText("");
  }

  function handleRecognitionResult(transcript) {
    setRecogText(transcript);
  }

  function startRecognition(props) {
    startSpeechRecognition({
      onRecognitionStart: handleRecognitionStart,
      onRecognitionResult: handleRecognitionResult,
      onTranscriptRecog: props?.onTranscriptRecog,
    });
  };

  return { recogText, startRecognition, stopRecognition: stopSpeechRecognition };
}
