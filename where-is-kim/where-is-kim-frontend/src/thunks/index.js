import {
  getTokenPending,
  getTokenFailure,
  getTokenSuccess,
  initializeUser,
  workOnPending,
  workOnSuccess,
  workOnFailure,
  workOffPending,
  workOffSuccess,
  workOffFailure,
  sendInvitingMailPending,
  sendInvitingMailSuccess,
  sendInvitingMailFailure,
} from "../actions";
import { getTokenAPI, workOnAPI, workOffAPI, inviteUserAPI } from "../api";
import { emitAddThread } from "../socket";

export const getToken = (email, password) => async (dispatch) => {
  try {
    dispatch(getTokenPending());

    const response = await getTokenAPI(email, password);
    const {
      result: { token, loggedInUser: user },
    } = await response.json();

    if (token) {
      localStorage.setItem("token", token);
      dispatch(getTokenSuccess());
      dispatch(initializeUser(user));
    } else {
      dispatch(getTokenFailure());
    }
  } catch (err) {
    dispatch(getTokenFailure());
  }
};

export const workOn = (teamId, userId) => async (dispatch) => {
  try {
    dispatch(workOnPending());

    const response = await workOnAPI(teamId, userId);
    await response.json();

    dispatch(workOnSuccess(userId));
    emitAddThread();
  } catch (err) {
    dispatch(workOnFailure());
  }
};

export const workOff = (teamId, userId) => async (dispatch) => {
  try {
    dispatch(workOffPending());

    const response = await workOffAPI(teamId, userId);
    await response.json();

    dispatch(workOffSuccess(userId));
    emitAddThread();
  } catch (err) {
    dispatch(workOffFailure());
  }
};

export const sendInvitingMail = (teamId, email) => async (dispatch) => {
  try {
    dispatch(sendInvitingMailPending());
    await inviteUserAPI(teamId, email);
    dispatch(sendInvitingMailSuccess());
  } catch {
    dispatch(sendInvitingMailFailure());
  }
};
