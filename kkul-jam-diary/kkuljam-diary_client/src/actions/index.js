import * as types from '../constants/actionTypes';

export const receiveSleepPending = () => ({
  type: types.FETCH_LATELY_SLEEP_PENDING
});

export const receiveSleepSuccess = sleep => ({
  type: types.FETCH_LATELY_SLEEP_SUCCESS,
  sleep
});

export const receiveSleepError = () => ({
  type: types.FETCH_LATELY_SLEEP_ERROR
});
