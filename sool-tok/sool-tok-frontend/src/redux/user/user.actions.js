import types from './user.actionTypes';

/* Login */
export const loginUserStart = loginType => ({
  type: types.LOGIN_USER_START,
  payload: { loginType },
});

export const loginUserSuccess = user => ({
  type: types.LOGIN_USER_SUCCESS,
  payload: { user },
});

export const loginUserFailure = error => ({
  type: types.LOGIN_USER_FAILURE,
  payload: { error },
});

/* Logout */
export const logoutUserStart = userId => ({
  type: types.LOGOUT_USER_START,
  payload: { userId },
});

export const logoutUserSuccess = () => ({
  type: types.LOGOUT_USER_SUCCESS,
});

export const logoutUserFailure = error => ({
  type: types.LOGOUT_USER_FAILURE,
  payload: { error },
});

/* FriendList */
export const addFriendListStart = userId => ({
  type: types.ADD_FRIEND_LIST_START,
  payload: { userId },
});

export const addFriendListSuccess = friendList => ({
  type: types.ADD_FRIEND_LIST_SUCCESS,
  payload: { friendList },
});

export const addFriendListFailure = error => ({
  type: types.ADD_FRIEND_LIST_FAILURE,
  payload: { error },
});

/* FriendRequestList */
export const addFriendRequestListStart = userId => ({
  type: types.ADD_FRIEND_REQUEST_LIST_START,
  payload: { userId },
});

export const addFriendRequestListSuccess = friendRequestList => ({
  type: types.ADD_FRIEND_REQUEST_LIST_SUCCESS,
  payload: { friendRequestList },
});

export const addFriendRequestListFailure = error => ({
  type: types.ADD_FRIEND_REQUEST_LIST_FAILURE,
  payload: { error },
});

/* ResponseFriendRequest */
export const responseFriendRequestStart = (userId, isAccepted, targetUserId) => ({
  type: types.RESPONSE_FRIEND_REQUEST_START,
  payload: { userId, isAccepted, targetUserId },
});

export const responseFriendRequestSuccess = friendRequestList => ({
  type: types.RESPONSE_FRIEND_REQUEST_SUCCESS,
  payload: { friendRequestList },
});

export const responseFriendRequestFailure = error => ({
  type: types.RESPONSE_FRIEND_REQUEST_FAILURE,
  payload: { error },
});
