import * as actionTypes from "./actionTypes";

const viewLoginRequest = () => ({
  type: actionTypes.VIEW_LOGIN_REQUEST,
});

const hideLoginRequest = () => ({
  type: actionTypes.HIDE_LOGIN_REQUEST,
});

const viewInputAlert = () => ({
  type: actionTypes.VIEW_INPUT_ALERT,
});

const hideInputAlert = () => ({
  type: actionTypes.HIDE_INPUT_ALERT,
});

const viewMatchLoading = () => ({
  type: actionTypes.VIEW_MATCH_LOADING,
});

const hideMatchLoading = () => ({
  type: actionTypes.HIDE_MATCH_LOADING,
});

const viewRankLoading = () => ({
  type: actionTypes.VIEW_RANK_LOADING,
});

const hideRankLoading = () => ({
  type: actionTypes.HIDE_RANK_LOADING,
});

const viewMessageLoading = () => ({
  type: actionTypes.VIEW_MESSAGE_LOADING,
});

const hideMessageLoading = () => ({
  type: actionTypes.HIDE_MESSAGE_LOADING,
});

const viewHeaderRightLoading = () => ({
  type: actionTypes.VIEW_HEADER_RIGHT_LOADING,
});

const hideHeaderRightLoading = () => ({
  type: actionTypes.HIDE_HEADER_RIGHT_LOADING,
});

const viewCompletion = () => ({
  type: actionTypes.VIEW_COMPLETION,
});

const hideCompletion = () => ({
  type: actionTypes.HIDE_COMPLETION,
});

export {
  viewLoginRequest,
  hideLoginRequest,
  viewInputAlert,
  hideInputAlert,
  viewMatchLoading,
  hideMatchLoading,
  viewRankLoading,
  hideRankLoading,
  viewMessageLoading,
  hideMessageLoading,
  viewHeaderRightLoading,
  hideHeaderRightLoading,
  viewCompletion,
  hideCompletion,
};
