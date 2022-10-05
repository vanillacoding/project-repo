import { useEffect, useRef } from "react";
import PoseDetector from "../poseAnimator/poseDetector";

const usePoseDetector = () => {
  const avatarRef = useRef(null);
  const outputRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    new PoseDetector(avatarRef, outputRef, videoRef);

    return () => {
      window.location.reload();
    };
  }, []);

  return { avatarRef, outputRef, videoRef };
};

export default usePoseDetector;
