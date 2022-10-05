import axios from "axios";
import axiosInstance from "./axiosInstance";
import { ERROR } from "../constants/messages";

const baseURL = process.env.REACT_APP_API_SERVER_URI;

async function postLogin(idToken) {
  try {
    const res = await axios.post(`${baseURL}/login`,
      null,
      { headers: { authorization: `Bearer ${idToken}` } });

    const { accessToken, refreshToken } = res.data;

    return { accessToken, refreshToken };
  } catch (err) {
    throw new Error(ERROR.LOGIN_FAIL);
  }
}

async function postRefresh(refreshToken) {
  try {
    const res = await axios.post(`${baseURL}/refresh`,
      null,
      { headers: { authorization: `Bearer ${refreshToken}` } });

    return res.data.accessToken;
  } catch (err) {
    throw new Error(ERROR.TOKEN_REFRESH_FAIL);
  }
}

async function postGoogleToken(userId, googleAccessToken) {
  const res = await axiosInstance.post(`/${userId}/googleFit`, {
    googleAccessToken,
  });

  if (res) {
    return res;
  }
}

async function getUserInfos() {
  const res = await axiosInstance.get("/");

  if (res) {
    return res;
  }
}

export {
  postLogin, postRefresh, postGoogleToken, getUserInfos,
};
