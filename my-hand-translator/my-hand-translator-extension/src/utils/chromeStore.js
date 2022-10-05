import ERROR from "../constants/errorMessage";

const get = (key) => {
  return new Promise((res, rej) => {
    chrome.storage.sync.get([key], (data) => {
      if (chrome.runtime.lastError) {
        rej(ERROR.GET_CHROME_STORAGE);
      }

      res(data[key]);
    });
  });
};

const set = (key, data) => {
  return new Promise((res, rej) => {
    chrome.storage.sync.set({ [key]: data }, () => {
      if (chrome.runtime.lastError) {
        rej(ERROR.SET_CHROME_STORAGE);
      }

      res(data);
    });
  });
};

export default { get, set };
