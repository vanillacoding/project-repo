import { postRefresh } from "../api/auth";

const REFRESH_TOKEN = "refreshToken";
const REFRESH_EXPIRED_AT = "refreshToken-expiredAt";
const ACCESS_TOKEN = "accessToken";
const ACCESS_EXPIRED_AT = "accessToken-expiredAt";

function checkExpired(exp) {
  const ONE_SECOND_IN_MILL = 1000;

  return exp < (Date.now() / ONE_SECOND_IN_MILL);
}

function storeUserInfos({ accessToken, refreshToken }) {
  localStorage.setItem(ACCESS_TOKEN, accessToken.token);
  localStorage.setItem(ACCESS_EXPIRED_AT, accessToken.exp);
  localStorage.setItem(REFRESH_TOKEN, refreshToken.token);
  localStorage.setItem(REFRESH_EXPIRED_AT, refreshToken.exp);
}

function removeUserInfos() {
  localStorage.clear();
}

function getTokens() {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN),
    accessTokenExp: Number(localStorage.getItem(ACCESS_EXPIRED_AT)),
    refreshToken: localStorage.getItem(REFRESH_TOKEN),
    refreshTokenExp: Number(localStorage.getItem(REFRESH_EXPIRED_AT)),
  };
}

function checkTokenValid() {
  const {
    accessToken, accessTokenExp, refreshToken, refreshTokenExp,
  } = getTokens();
  const isAccessValid = !!accessToken && !checkExpired(accessTokenExp);
  const isRefreshValid = !!refreshToken && !checkExpired(refreshTokenExp);

  return isAccessValid || isRefreshValid;
}

async function updateAccessToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  const accessToken = await postRefresh(refreshToken);

  localStorage.setItem(ACCESS_TOKEN, accessToken.token);
  localStorage.setItem(ACCESS_EXPIRED_AT, accessToken.exp);
}

export {
  checkExpired,
  storeUserInfos,
  removeUserInfos,
  getTokens,
  checkTokenValid,
  updateAccessToken,
};
