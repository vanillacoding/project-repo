import { SERVER_URL } from "@env";

import {
  GET,
  POST,
  PATCH,
  DELETE
} from "../constants/httpMethod";

export async function postNewWorryPost(postInfo, accessToken) {
  const response = await fetch(`${SERVER_URL}/post`, {
    method: POST,
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    },
    body: JSON.stringify(postInfo)
  });

  return await response.json();
}

export async function getCategoryPosts(categoryInfo) {
  const {
    page,
    category,
    accessToken
  } = categoryInfo;

  const response = await fetch(`${SERVER_URL}/post/category/${category}`, {
    method: GET,
    headers: {
      "page": page,
      "Authorization": accessToken
    }
  });

  return await response.json();
}

export async function patchComment(commentInfo, accessToken) {
  const response = await fetch(`${SERVER_URL}/post/comments`, {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    },
    body: JSON.stringify(commentInfo)
  });

  return await response.json();
}

export async function patchPostLike(likeInfo, accessToken) {
  const response = await fetch(`${SERVER_URL}/post/like`, {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    },
    body: JSON.stringify(likeInfo)
  });

  return await response.json();
}

export async function patchPostCommentLike(likeInfo, accessToken) {
  const response = await fetch(`${SERVER_URL}/post/comments/like`, {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    },
    body: JSON.stringify(likeInfo)
  });

  return await response.json();
}

export async function getDetailPost(postId, accessToken) {
  const response = await fetch(`${SERVER_URL}/post/${postId}`, {
    method: GET,
    headers: {
      "Authorization": accessToken
    }
  });

  return await response.json();
}

export async function patchPost(postInfo, accessToken) {
  const response = await fetch(`${SERVER_URL}/post`, {
    method: PATCH,
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessToken
    },
    body: JSON.stringify(postInfo)
  });

  return await response.json();
}

export async function deletePost({ postId, accessToken }) {
  const response = await fetch(`${SERVER_URL}/post/${postId}`, {
    method: DELETE,
    headers: {
      "Authorization": accessToken
    }
  });

  return await response.json();
}

export async function getPostComments(postId, accessToken) {
  const response = await fetch(`${SERVER_URL}/post/comments/${postId}`, {
    method: GET,
    headers: {
      "Authorization": accessToken
    }
  });

  return await response.json();
}
