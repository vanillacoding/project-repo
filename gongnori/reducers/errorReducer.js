import produce from "immer";

const initialState = {
  initializeError: false,
  teamExistError: false,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INITIALIZE_ERROR":
      return produce(state, ((draft) => {
        draft.initializeError = true;
      }));
    case "SET_TEAM_EXIST_ERROR":
      return produce(state, ((draft) => {
        draft.teamExistError = true;
      }));
    default:
      return state;
  }
};

export default errorReducer;
