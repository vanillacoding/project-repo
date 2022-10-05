import { SERVER_URL } from "@env";

import {
  GET,
  PUT,
  POST,
  PATCH
} from "../constants/httpMethod";

export async function postSignup(userInfo) {
  const response = await fetch(`${SERVER_URL}/auth`, {
    method: POST,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  });

  return await response.json();
}

export async function putLogin(userInfo) {
  const response = await fetch(`${SERVER_URL}/auth`, {
    method: PUT,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userInfo)
  });

  return await response.json();
}

export async function addFriend(friendInfo, accessToken) {
  const response = await fetch(`${SERVER_URL}/auth/friend`, {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    },
    body: JSON.stringify(friendInfo)
  });

  return await response.json();
}

export async function acceptPendingFriend(friendInfo) {
  const response = await fetch(`${SERVER_URL}/auth/waitingFriend`, {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
      "Authorization": friendInfo.accessToken
    },
    body: JSON.stringify(friendInfo)
  });

  return await response.json();
}

export async function rejectPendingFriend(friendInfo) {
  const response = await fetch(`${SERVER_URL}/auth/rejectFriend`, {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
      "Authorization": friendInfo.accessToken
    },
    body: JSON.stringify(friendInfo)
  });

  return await response.json();
}

export async function getFriends(accessToken) {
  const response = await fetch(`${SERVER_URL}/auth/friend`, {
    method: GET,
    headers: {
      "Authorization": accessToken
    }
  });

  return await response.json();
}

export async function getWaitingFriends(accessToken) {
  const response = await fetch(`${SERVER_URL}/auth/waitingFriend`, {
    method: GET,
    headers: {
      "Authorization": accessToken
    }
  });

  return await response.json();
}

export async function getMyPosts(accessToken) {
  const response = await fetch(`${SERVER_URL}/auth/posts`, {
    method: GET,
    headers: {
      "Authorization": accessToken
    }
  });

  return await response.json();
}
