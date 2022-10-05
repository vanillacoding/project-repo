async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");

    return cameras;
  } catch(err) {
    throw Error(err.message);
  }
}

async function getStream(hasVideoError, cameraId) {
  const initialConstraints = {
    audio: true,
    video: !hasVideoError ? { facingMode: "user" } : false,
  };

  const cameraConstraints = {
    audio: true,
    video: { deviceId: { exact: cameraId } },
  };

  try {
    const myStream = await navigator.mediaDevices.getUserMedia(
      cameraId ? cameraConstraints : initialConstraints,
    );

    return myStream;
  } catch(err) {
    if (err.message === "Could not start video source") {
      return getStream(true);
    }

    throw err;
  }
}

function getCameraId(stream) {
  const currentCamera = stream.getVideoTracks()[0];
  const cameraId = currentCamera ? currentCamera.getSettings().deviceId : "";

  return cameraId;
}

export { getCameras, getStream, getCameraId };
