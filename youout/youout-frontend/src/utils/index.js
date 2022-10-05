export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position, err) => {
      if (err) reject(err);

      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  });
};

export const convertMsToMinutes = (milliseconds) => {
  return Math.floor((milliseconds / (1000 * 60)));
};

export const convertMsToSeconds = (milliseconds) => {
  return (milliseconds % 60000) / 1000;
};

export const convertTimeToMs = (minutes, seconds) => {
  const minutesToMs = minutes * 60 * 1000;
  const secondsToMs = seconds * 1000;

  return minutesToMs + secondsToMs;
};

export const convertTimeFormat = (minutes, seconds) => {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

export const sliceDocs = (docs, from, to) => {
  return docs.slice(from, to);
};

export const format = (string) => {
  return string.toLowerCase().replace(/(\s*)/g, '');
};
