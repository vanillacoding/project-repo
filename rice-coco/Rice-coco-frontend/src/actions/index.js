import * as types from '../constants/actionTypes';

export const setUserInfo = userInfo => ({
  type: types.SET_USER_INFO,
  payload: userInfo,
});

export const setPromiseAmount = amount => ({
  type: types.SET_USER_PROMISE,
  payload: amount,
});

export const setUserLocation = location => ({
  type: types.SET_LOCATION,
  payload: location,
});

export const setWaitingMeetings = meetings => ({
  type: types.SET_WAITING_MEETINGS,
  payload: meetings,
});

export const setSelectedMeeting = meeting => ({
  type: types.SET_SELECTED_MEETING,
  payload: meeting,
});

export const setCurrentMeeting = meeting => ({
  type: types.SET_CURRENT_MEETING,
  payload: meeting,
});

export const resetMeeting = () => ({
  type: types.RESET_MEETING,
});

export const resetUserInfo = () => ({
  type: types.RESET_USER_INFO,
});
