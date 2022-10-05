import {
  GET_TOKEN_PENDING,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  INITIALIZE_USER,
  REGISTER_TEAM_PENDING,
  UPDATE_USER_TEAM,
  REGISTER_TEAM_FAILURE,
  INITIALIZE_TEAM,
  WORK_ON_PENDING,
  WORK_ON_SUCCESS,
  WORK_ON_FAILURE,
  WORK_OFF_PENDING,
  WORK_OFF_SUCCESS,
  WORK_OFF_FAILURE,
  UPDATE_ACTIVE_USERS,
  UPDATE_THREADS,
  UPDATE_CURRENT_PAGE,
  UPDATE_RECORDS,
  SEND_INVITING_MAIL_PENDING,
  SEND_INVITING_MAIL_SUCCESS,
  SEND_INVITING_MAIL_FAILURE,
  UPDATE_THREAD_LIKES,
  UPDATE_THREAD_COMMENT,
  LOGOUT,
  UPDATE_IS_ADMIN,
} from "../constants";

export const getTokenPending = () => ({ type: GET_TOKEN_PENDING });
export const getTokenSuccess = () => ({ type: GET_TOKEN_SUCCESS });
export const getTokenFailure = () => ({ type: GET_TOKEN_FAILURE });
export const initializeUser = (user) => ({
  type: INITIALIZE_USER,
  payload: user,
});
export const initializeTeam = (team) => ({
  type: INITIALIZE_TEAM,
  payload: team,
});
export const registerTeamPending = () => ({ type: REGISTER_TEAM_PENDING });
export const updateUserTeam = (team) => ({
  type: UPDATE_USER_TEAM,
  payload: team,
});
export const registerTeamFailure = () => ({ type: REGISTER_TEAM_FAILURE });
export const workOnPending = () => ({ type: WORK_ON_PENDING });
export const workOnSuccess = (userId) => ({
  type: WORK_ON_SUCCESS,
  payload: userId,
});
export const workOnFailure = () => ({ type: WORK_ON_FAILURE });
export const workOffPending = () => ({ type: WORK_OFF_PENDING });
export const workOffSuccess = (userId) => ({
  type: WORK_OFF_SUCCESS,
  payload: userId,
});
export const workOffFailure = () => ({ type: WORK_OFF_FAILURE });
export const updateActiveUsers = (ids) => ({
  type: UPDATE_ACTIVE_USERS,
  payload: ids,
});
export const updateThreads = (threads) => ({
  type: UPDATE_THREADS,
  payload: threads,
});
export const updateCurrentPage = (page) => ({
  type: UPDATE_CURRENT_PAGE,
  payload: page,
});
export const updateRecords = (records) => ({
  type: UPDATE_RECORDS,
  payload: records,
});
export const sendInvitingMailPending = () => ({
  type: SEND_INVITING_MAIL_PENDING,
});
export const sendInvitingMailSuccess = () => ({
  type: SEND_INVITING_MAIL_SUCCESS,
});
export const sendInvitingMailFailure = () => ({
  type: SEND_INVITING_MAIL_FAILURE,
});
export const updateThreadLikes = (id, likes) => ({
  type: UPDATE_THREAD_LIKES,
  payload: { id, likes },
});
export const updateThreadComments = (id, comments) => ({
  type: UPDATE_THREAD_COMMENT,
  payload: { id, comments },
});
export const logout = () => ({
  type: LOGOUT,
});
export const updateIsAdmin = (bool) => ({
  type: UPDATE_IS_ADMIN,
  payload: bool,
});
