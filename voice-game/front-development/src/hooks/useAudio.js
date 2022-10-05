import { useEffect, useRef, useState } from "react";
import getAudioContext from "../utils/getAudioContext";

/**
 *
 * @param {object} contextOption option for audioContext
 * @returns audioState, audioContext Ref
 */
const useAudio = (contextOption) => {
  const [isAudioUse, setIsAudioUse] = useState(false);
  const audioContextRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = getAudioContext(contextOption);
    setIsAudioUse(true);
  }, [contextOption]);

  return {
    isAudioUse,
    audioContextRef,
  };
};

export default useAudio;
