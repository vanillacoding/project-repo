import { SERVER_URL } from "@env";

import {
  GET,
  PATCH,
  DELETE
} from "../constants/httpMethod";

export async function getMyComments(accessToken) {
  const response = await fetch(`${SERVER_URL}/comment`, {
    method: GET,
    headers: {
      "Authorization": accessToken
    }
  });

  return await response.json();
}

export async function patchCommentLike(commentLikeInfo, accessToken) {
  const response = await fetch(`${SERVER_URL}/comment/like`, {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    },
    body: JSON.stringify(commentLikeInfo)
  });

  return await response.json();
}

export async function patchComment({ commentInfo, accessToken }) {
  const response = await fetch(`${SERVER_URL}/comment`, {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    },
    body: JSON.stringify(commentInfo)
  });

  return await response.json();
}

export async function deleteComment({ commentId, accessToken }) {
  const response = await fetch(`${SERVER_URL}/comment/${commentId}`, {
    method: DELETE,
    headers: {
      "Authorization": accessToken
    }
  });

  return await response.json();
}
