import dotenv from "dotenv";
dotenv.config();

import { auth, firebase } from "./firebase";
import { IUserData } from "./../types/user";
import { USER, GAME } from "../constants";

const offlineUser: IUserData = {
  data: {
    accessToken: USER.OFFLINE,
    user: {
      email: USER.OFFLINE_MESSAGE,
      displayName: USER.OFFLINE,
      lastStage: GAME.TOTAL_STAGE,
    },
  },
};

export async function googleLogin() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const data = await auth.signInWithPopup(provider);

    const { email, displayName } = data?.user;

    const response = await login<IUserData>({ email, name: displayName });
    localStorage.setItem("accessToken", response.data.accessToken);

    await firebase.auth().signOut();

    return response.data;
  } catch (err) {
    return offlineUser.data;
  }
}

async function login<T>(data: { email: string; name: string }): Promise<T> {
  const url = `${process.env.REACT_APP_SERVER_URL}/api/auth/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}

async function getData() {
  const url = `${process.env.REACT_APP_SERVER_URL}/api/user`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });

  return response;
}

export async function getUserData() {
  try {
    const response = await getData();

    if (!response.ok) {
      throw new Error("login fail");
    }

    const responseBody = await response.json();

    return responseBody.data.user;
  } catch (err) {
    return offlineUser.data.user;
  }
}

export async function updateFinalStageRecord(game: string) {
  try {
    const data = { game };
    const url = `${process.env.REACT_APP_SERVER_URL}/api/user`;

    const response = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (err) {
    return true;
  }
}
