import * as types from '../constants/actionTypes';

export const loginUser = (jwtoken) => ({
  type: types.LOGIN_USER,
  jwtoken
});
export const logoutUser = () => ({
  type: types.LOGOUT_USER
});

export const getProjectListSuccess = (data, page) => ({
  type: types.GET_PROJECT_LIST_SUCCESS,
  ...data,
  page
});
export const getProjectListFailure = () => ({
  type: types.GET_PROJECT_LIST_FAILURE
});

export const openModal = () => ({
  type: types.OPEN_MODAL
});
export const closeModal = () => ({
  type: types.CLOSE_MODAL
});

export const postNewProjectFailure = (message) => ({
  type: types.POST_NEW_PROJECT_FAILURE,
  message
});

export const getProjectDetailPending = () => ({
  type: types.GET_PROJECT_DETAIL_PENDING
});
export const getProjectDetailSuccess = (data, page, sort) => ({
  type: types.GET_PROJECT_DETAIL_SUCCESS,
  ...data,
  page,
  sort
});
export const getProjectDetailFailure = () => ({
  type: types.GET_PROJECT_DETAIL_FAILURE
});
