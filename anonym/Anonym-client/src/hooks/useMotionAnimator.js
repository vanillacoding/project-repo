import { useEffect, useRef } from "react";
import PoseDetector from "../poseAnimator/poseDetector";

const useMotionAnimator = () => {
  const avatarRef = useRef(null);
  const outputRef = useRef(null);
  const videoRef = useRef(null);
  const characterRef = useRef(null);

  useEffect(() => {
    new PoseDetector(avatarRef, outputRef, videoRef, characterRef);

    return () => {
      window.location.reload();
    };
  }, []);

  return { avatarRef, outputRef, videoRef, characterRef };
};

export default useMotionAnimator;
