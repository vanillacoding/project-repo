import { takeLatest } from "@redux-saga/core/effects";

import { login } from "../../api";
import { createAuthorizePromiseSaga } from "../lib/sagaUtils";
import { ADD_MY_PROJECT_SUCCESS, DELETE_PROJECT_SUCCESS } from "./projects";

const BASE_PATH = "USER/";

// action types
export const CLEAR_USER = BASE_PATH + "CLEAR_USER";
const SET_USER = BASE_PATH + "SET_USER";

export const GET_TOKEN = BASE_PATH + "GET_TOKEN";
export const GET_TOKEN_SUCCESS = BASE_PATH + "GET_TOKEN_SUCCESS";
export const GET_TOKEN_ERROR = BASE_PATH + "GET_TOKEN_ERROR";

export const loginUser = (user) => ({ type: GET_TOKEN, payload: user, meta: user });
export const setUser = (userInfo) => ({ type: SET_USER, payload: userInfo });

const getTokenSaga = createAuthorizePromiseSaga(GET_TOKEN, login);

export function* userSaga() {
  yield takeLatest(GET_TOKEN, getTokenSaga);
}

const userInitialState = {
  id: "",
  email: "",
  avatar: "",
  username: "",
  myProjects: [],
  joinedProjects: [],
  isInterviewee: false,
};

const initialState = {
  loading: false,
  userData: userInitialState,
  token: "",
  error: null,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case CLEAR_USER: {
      return initialState;
    }
    case GET_TOKEN: {
      return {
        ...state,
        loading: true,
        token: "",
        error: null,
      };
    }
    case GET_TOKEN_SUCCESS: {
      return {
        loading: false,
        userData: { ...state.userData, ...action.payload.user },
        token: action.payload.token,
        error: null,
      };
    }
    case GET_TOKEN_ERROR: {
      return {
        loading: false,
        userData: null,
        token: "",
        error: action.payload,
      };
    }
    case ADD_MY_PROJECT_SUCCESS: {
      const id = action.payload.id;

      return {
        ...state,
        userData: {
          ...state.userData,
          myProjects: state.userData.myProjects.concat(id),
        },
      };
    }
    case DELETE_PROJECT_SUCCESS: {
      const id = action.payload;

      return {
        ...state,
        userData: {
          ...state.userData,
          myProjects: state.userData.myProjects.filter(
            (projectId) => projectId !== id
          ),
          joinedProjects: state.userData.joinedProjects.filter(
            (projectId) => projectId !== id
          ),
        },
      };
    }
    case SET_USER: {
      const userInfo = action.payload;
      return {
        ...state,
        userData: {
          ...state.userData,
          email: userInfo.email,
          username: userInfo.username,
          avatar: userInfo.avatar,
          isInterviewee: userInfo.isInterviewee,
        },
      };
    }
    default:
      return state;
  }
}
