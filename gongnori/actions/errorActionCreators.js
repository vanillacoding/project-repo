import * as actionTypes from "./actionTypes";

const setInitializeError = () => ({
  type: actionTypes.SET_INITIALIZE_ERROR,
});

const setTeamExistError = () => ({
  type: actionTypes.SET_TEAM_EXIST_ERROR,
});

export {
  setInitializeError,
  setTeamExistError,
};
