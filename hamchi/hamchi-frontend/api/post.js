import { SERVER_URL } from '@env';
import { readCredentials } from './secureStore';

const requestGetPosts = async (page, type) => {
  const filterType = type.reduce((acc, type) =>
    (acc + '&type=' + type), '')
    .substring(1);
  const url = `${SERVER_URL}/posts/?${encodeURI(filterType)}`;
  const credentials = await readCredentials();
  const body = JSON.stringify({ page });

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': credentials.token
    },
    body: body
  });

  return await response.json();
};

const requestGetMyPosts = async (userId) => {
  const url = `${SERVER_URL}/posts/${userId}`;
  const credentials = await readCredentials();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': credentials.token
    }
  });

  return await response.json();
};

const requestCreatePost = async (postInput) => {
  const url = `${SERVER_URL}/posts/new`;
  const credentials = await readCredentials();
  const body = JSON.stringify(postInput);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': credentials.token
    },
    body: body
  });

  return await response.json();
};

const requestClosePost = async (postId) => {
  const url = `${SERVER_URL}/posts/close/${postId}`;
  const credentials = await readCredentials();
  const body = JSON.stringify({ postId });

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': credentials.token
    },
    body: body
  });

  return await response.json();
};

const postAPI = {
  requestGetPosts,
  requestGetMyPosts,
  requestCreatePost,
  requestClosePost
};

export default postAPI;
