import { useEffect, useRef } from "react";
import PitchDetector from "../utils/PitchDetector";

/**
 *
 * @param {boolean} isAudioUse state of audio
 * @param {object} audioContextRef ref of audioContext
 * @returns Ref of pitchDetector
 *
 */
const usePitchDetector = ({ isAudioUse, audioContextRef }) => {
  const pitchDetectorRef = useRef(null);

  useEffect(() => {
    if (isAudioUse) {
      const pitchDetector = new PitchDetector(audioContextRef.current);

      pitchDetectorRef.current = pitchDetector;
    }

    return (() => {
      pitchDetectorRef.current?.mediaStreamSource?.mediaStream.getTracks()[0].stop();
    });
  }, [isAudioUse, audioContextRef]);

  return pitchDetectorRef;
};

export default usePitchDetector;
