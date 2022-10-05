let stream;

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  return stream;
};

const get = () => stream;

const remove = () => {
  if (!stream) return;

  stream.getVideoTracks().forEach(track => {
    track.stop();
    stream.removeTrack(track);
  });
};

const audioOption = {
  on: () => {
    stream.getAudioTracks().forEach(track => (track.enabled = true));
  },
  off: () => {
    stream.getAudioTracks().forEach(track => (track.enabled = false));
  },
};

const videoOption = {
  on: () => {
    stream.getVideoTracks().forEach(track => (track.enabled = true));
  },
  off: () => {
    stream.getVideoTracks().forEach(track => (track.enabled = false));
  },
};

export { init, get, remove, audioOption, videoOption };
