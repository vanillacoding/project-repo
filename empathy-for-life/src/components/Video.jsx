import React, { useRef, useContext } from "react";

import { ReducerContext, selectors } from "../features/rootSlice";

import useVideoStreaming from "../hooks/useVideoStreaming";

import styles from "./styles/Video.module.css";
import InputButton from "./shared/InputButton";

const Video = () => {
  const { state } = useContext(ReducerContext);
  const isAdministrator = selectors.getIsAdministrator(state);
  const videoRef = useRef(null);
  const videoControllerRef = useRef(null);
  const buttonValue
    = videoControllerRef.current
      && videoControllerRef.current.lastChild.value;

  useVideoStreaming(videoRef, videoControllerRef);

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        muted
        autoPlay
        preload="auto"
        poster="/assets/images/standby.png"
      />
      {isAdministrator
        ? <div ref={videoControllerRef} className={styles.videoController}>
            <select
              id="cameraSelect"
              className={styles.cameraSelect}
              name="cameraSelect"
              disabled
            />
            <InputButton
              className={styles.streamingButton}
              type="button"
              name="streamingOn"
              value={buttonValue || "방송시작"}
            />
          </div>
        : null
      }
    </div>
  );
};

export default Video;
