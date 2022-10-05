import produce from "immer";

import {
  USER_LOGIN,
  USER_LOGOUT
} from "../constants/actionTypes";

const initialState = {
  user: {
    email: "",
    name: ""
  },
  isLogout: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN: {
      return produce(state, draft => {
        draft.user = action.payload;
        draft.isLogout = false;
      });
    }

    case USER_LOGOUT: {
      return {
        ...initialState,
        isLogout: true
      };
    }

    default: {
      return state;
    }
  }
}

export default userReducer;
