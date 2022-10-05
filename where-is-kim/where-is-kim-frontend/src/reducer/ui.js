import {
  WORK_ON_PENDING,
  WORK_ON_SUCCESS,
  WORK_ON_FAILURE,
  WORK_OFF_PENDING,
  WORK_OFF_SUCCESS,
  WORK_OFF_FAILURE,
  UPDATE_CURRENT_PAGE,
  GET_TOKEN_PENDING,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  LOGOUT,
  UPDATE_IS_ADMIN,
} from "../constants";

export const initialState = {
  currentPage: "",
  lobby: {
    isLogin: false,
    isLoading: false,
  },
  record: {
    isLoading: false,
  },
  admin: {
    isAdmin: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_IS_ADMIN:
      return {
        ...state,
        admin: {
          isAdmin: action.payload,
        },
      };
    case GET_TOKEN_PENDING:
      return {
        ...state,
        lobby: {
          ...state.lobby,
          isLoading: true,
        },
      };
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        lobby: {
          ...state.lobby,
          isLoading: false,
          isLogin: true,
        },
      };
    case GET_TOKEN_FAILURE:
      return {
        ...state,
        lobby: {
          ...state.lobby,
          isLoading: false,
        },
      };
    case LOGOUT:
      return {
        ...state,
        lobby: {
          isLogin: false,
        },
      };
    case WORK_ON_PENDING:
    case WORK_OFF_PENDING:
      return {
        ...state,
        record: {
          isLoading: true,
        },
      };

    case WORK_ON_SUCCESS:
    case WORK_ON_FAILURE:
    case WORK_OFF_SUCCESS:
    case WORK_OFF_FAILURE:
      return {
        ...state,
        record: {
          isLoading: false,
        },
      };

    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
