import React, { useReducer } from "react";

import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";

const initiateState = {
  user: {
    id: null,
    name: null,
    isAdministrator: false,
    character: null,
    accessTime: null,
  },
  isPassedAdminAuth: false,
};

const reducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case "adminAuthPassed":
      return { ...state, isPassedAdminAuth: true };
    case "userAdded":
      return { ...state, user: { ...state.user, ...payload }};
    case "userDeleted":
      return payload;
    default:
      logWarnOrErrInDevelopment(
        new Error("There is no match action type"),
        "warn",
      );
      return state;
  }
};

const ReducerContext = React.createContext(null);
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initiateState);
  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </ReducerContext.Provider>
  );
};


const actionCreators = {
  adminAuthPassed: () => {
    return { type: "adminAuthPassed" };
  },
  userAdded: (user) => {
    return { type: "userAdded", payload: user };
  },
  userDeleted: () => {
    return { type: "userDeleted", payload: initiateState };
  },
};

const selectors = {
  getUserId: (state) => {
    return state.user.id;
  },
  getUserName: (state) => {
    return state.user.name;
  },
  getAccessTime: (state) => {
    return state.user.accessTime;
  },
  getUserCharacter: (state) => {
    return state.user.character;
  },
  getIsAdministrator: (state) => {
    return state.user.isAdministrator;
  },
  getIsPassedAdminAuth: (state) => {
    return state.isPassedAdminAuth;
  },
};

export {
  ReducerContext,
  Provider,
  actionCreators,
  selectors,
};
