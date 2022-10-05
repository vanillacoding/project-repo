import { SERVER_URL } from '@env';
import generateHeaderOption from '../utils/generateHeaderOption';
import { ROUTES } from '../constants';

/**
 * Post login user generate token
 * @param {Object} loginInput - Login user info
 * @returns Response data from server
 */

export const requestSignin = async (loginInput) => {
  const url = `${SERVER_URL}${ROUTES.USER}${ROUTES.LOGIN}`;
  const headers = await generateHeaderOption();

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(loginInput)
  });

  return await response.json();
};

/**
 * Get all users in database
 * @returns Response data from server
 */

export const getUsers = async () => {
  const url = `${SERVER_URL}${ROUTES.USER}${ROUTES.ALL}`;
  const headers = await generateHeaderOption();

  const response = await fetch(url, {
    method: 'GET',
    headers
  });

  return await response.json();
};

/**
 * Patch when follow button pressed
 * @param {Object} followingInfo - follow user info
 * @returns Response data from server
 */

export const patchUserFollow = async (followingInfo) => {
  const url = `${SERVER_URL}${ROUTES.USER}${ROUTES.FOLLOW}`;
  const headers = await generateHeaderOption();

  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      followId: followingInfo.followId
    })
  });

  return await response.json();
};

/**
 * Update user image uri
 * @param {Object} imageUriPayload - img uri with user data
 * @returns Response data from server
 */

export const patchImageUri = async (imageUriPayload) => {
  const url = `${SERVER_URL}${ROUTES.USER}${ROUTES.IMAGE}`;
  const headers = await generateHeaderOption();

  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      uri: imageUriPayload.uri
    })
  });

  return await response.json();
};

/**
 * Get push tokens from followers
 * @returns Response data from server
 */

export const getPushTokens = async () => {
  const url = `${SERVER_URL}${ROUTES.USER}${ROUTES.PUSH_TOKENS}`;
  const headers = await generateHeaderOption();

  const response = await fetch(url, {
    method: 'GET',
    headers
  });

  return await response.json();
};

/**
 * Get following users info in array
 * @returns Response data from server
 */

export const getFollowingHabits = async () => {
  const url = `${SERVER_URL}${ROUTES.USER}${ROUTES.FOLLOWING}`;
  const headers = await generateHeaderOption();

  const response = await fetch(url, {
    method: 'GET',
    headers
  });

  return await response.json();
};

/**
 * Post signed up user in database
 * @param {Object} signupInput - signup user info
 * @returns Response data from server
 */

export const requestSignup = async (signupInput) => {
  const url =`${SERVER_URL}${ROUTES.USER}${ROUTES.SIGNUP}`;
  const headers = await generateHeaderOption();

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(signupInput)
  });

  return await response.json();
};
