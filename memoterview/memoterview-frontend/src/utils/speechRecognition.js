const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const notUseErrorMessage =
  "Speech recognition not supported 😢 (Use Chrome Browser)";

let isRecording = false;
let recognition = null;

export const startSpeechRecognition = ({
  onError,
  onRecognitionStart,
  onRecognitionResult,
  onTranscriptRecog = () => {},
}) => {
  if (!SpeechRecognition) {
    console.error(notUseErrorMessage);
    onError && onError(notUseErrorMessage);

    return;
  }

  if (isRecording) {
    return;
  }

  const recognitionInstance = new SpeechRecognition();

  recognitionInstance.lang = "ko";
  recognitionInstance.continuous = true;
  recognitionInstance.interimResults = true;

  recognitionInstance.onstart = () => {
    onRecognitionStart();
    // setRecogText([]);
  };

  recognitionInstance.onresult = (event) => {
    const transcript = [...event.results].reduce(
      (acc, result) => acc + result[0].transcript,
      ""
    );

    onRecognitionResult(transcript);
    onTranscriptRecog(transcript);
    // setRecogText(recogText.concat(transcript));
  };

  recognitionInstance.start();

  recognition = recognitionInstance;
  isRecording = true;
};

export const stopSpeechRecognition = () => {
  isRecording = false;
  recognition && recognition.stop();
  recognition = null;
};
