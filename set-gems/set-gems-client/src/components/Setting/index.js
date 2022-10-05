import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  BsFillVolumeMuteFill, BsFillVolumeUpFill,
  BsCameraVideoOffFill, BsCameraVideoFill,
} from "react-icons/bs";

import "./Setting.css";
import { getCameras, getStream, getCameraId } from "../../helper/video";
import setTemporaryMessage from "../../helper/setTemporaryMessage";

function Setting({ stream, defaultSetting, onStreamChange }) {
  const [cameras, setCameras] = useState([]);
  const [isMuted, setIsMuted] = useState(defaultSetting.isMuted);
  const [isVideoOff, setIsVideoOff] = useState(defaultSetting.isVideoOff);
  const [message, setMessage] = useState("");
  const cameraId = useMemo(() => getCameraId(stream), [stream.id]);

  useEffect(() => {
    async function loadCameras() {
      try {
        const cameras = await getCameras();
        setCameras(cameras);
      } catch(err) {
        setTemporaryMessage(err.message, setMessage);
      }
    }

    loadCameras();
  }, []);

  useEffect(() => {
    if (!stream) {
      return;
    }

    const audioTracks = stream.getAudioTracks();

    audioTracks.forEach((track) => track.enabled = !isMuted);
  }, [stream.id, isMuted]);

  useEffect(() => {
    if (!stream) {
      return;
    }

    const videoTracks = stream.getVideoTracks();

    videoTracks.forEach((track) => track.enabled = !isVideoOff);
  }, [stream.id, isVideoOff]);

  const handleMuteButton = () => {
    setIsMuted(isMuted => !isMuted);
  };

  const handleVideoButton = () => {
    setIsVideoOff(isVideoOff => !isVideoOff);
  };

  const handleCameraSelect = async ({ target }) => {
    const cameraId = target.value;
    const newStream = await getStream(false, cameraId);
    onStreamChange(newStream);
  };

  const cameraOptions = cameras.map((camera) => {
    return (
      <option
        key={camera.deviceId}
        value={camera.deviceId}
      >{camera.label}</option>
    );
  });

  return (
    <div className="setting">
      <div className="setting-button">
        <button onClick={handleMuteButton}>
          {isMuted ? <BsFillVolumeUpFill /> : <BsFillVolumeMuteFill />}
        </button>
        <button onClick={handleVideoButton}>
          {isVideoOff ? <BsCameraVideoFill /> : <BsCameraVideoOffFill />}
        </button>
      </div>
      <div>
        {message ? <p>{message}</p>
          : <select
            defaultValue={cameraId}
            onChange={handleCameraSelect}>
            {cameraOptions}
          </select>}
      </div>
    </div>
  );
};

Setting.propTypes = {
  stream: PropTypes.shape({
    id: PropTypes.string,
    getVideoTracks: PropTypes.func,
    getAudioTracks: PropTypes.func,
  }),
  defaultSetting: PropTypes.shape({
    isMuted: PropTypes.bool,
    isVideoOff: PropTypes.bool,
  }),
  onStreamChange: PropTypes.func,
};

export default React.memo(Setting);
