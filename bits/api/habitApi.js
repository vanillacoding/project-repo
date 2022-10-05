import { SERVER_URL } from '@env';
import generateHeaderOption from '../utils/generateHeaderOption';
import { ROUTES } from '../constants/index';

/**
 * Patch users habit like status
 * @param {Object} updateHabitInput - Infos to update target user
 * @returns Response data from server
 */

export const patchHabitLike = async (updateHabitInput) => {
  const url = `${SERVER_URL}${ROUTES.HABIT}${ROUTES.LIKE}`;
  const headers = await generateHeaderOption();

  const response  = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      habitId: updateHabitInput.habitId,
      userId: updateHabitInput.userId
    })
  });

  return await response.json();
};

/**
 * Post user registered habit in database
 * @param {Object} registerInput - Register habit info
 * @returns Response data from server
 */

export const postHabit = async (registerInput) => {
  const url = `${SERVER_URL}${ROUTES.HABIT}`;
  const headers = await generateHeaderOption();

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(registerInput)
  });

  return await response.json();
};

/**
 * Patch habit status when habit finished
 * @param {Object} updateInput - Update habit info
 * @returns Response data from server
 */

export const patchHabit = async (updateInput) => {
  const url = `${SERVER_URL}${ROUTES.HABIT}`;
  const headers = await generateHeaderOption();

  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(updateInput)
  });

  return await response.json();
};

/**
 * Delete target habit in database
 * @param {Object} deleteInput - Delete target habit info
 * @returns Response data from server
 */

export const deleteHabit = async (deleteInput) => {
  const url = `${SERVER_URL}${ROUTES.HABIT}`;
  const headers = await generateHeaderOption();

  const response = await fetch(url, {
    method: 'DELETE',
    headers,
    body: JSON.stringify({
      targetIndex: deleteInput.targetIndex
    })
  });

  return await response.json();
};
