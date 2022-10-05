import ERROR_MESSAGES from "../constants/errorMessage";

const getUserEmail = () =>
  new Promise((resolve, reject) => {
    chrome.identity.getProfileUserInfo((result) => {
      if (chrome.runtime.lastError) {
        reject(ERROR_MESSAGES.GET_PROFILE_USER_INFO);
      }

      resolve(result.email);
    });
  });

const getAccessToken = () =>
  new Promise((resolve, reject) => {
    if (!chrome.identity) {
      chrome.runtime.sendMessage("getAccessToken", (response) => {
        if (chrome.runtime.lastError) {
          reject(ERROR_MESSAGES.GET_TOKENS);
        }

        if (response.result === "ok") {
          resolve(response.data);
        }
      });
    } else {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (chrome.runtime.lastError) {
          reject(ERROR_MESSAGES.GET_TOKENS);
        }

        resolve(token);
      });
    }
  });

export default { getUserEmail, getAccessToken };
