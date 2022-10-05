import produce from "immer";

const initialState = {
  locations: [],
  sports: [],
  matches: [],
  playgrounds: [],
  teams: [],
  matchFilterStatus: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITIALIZE_APP_SUCCESS":
      const { locations, playgrounds, sports } = action.payload;

      return produce(state, (draft) => {
        draft.locations = locations;
        draft.playgrounds = playgrounds;
        draft.sports = sports;
      });
    case "INITIALIZE_APP_FAIL":
      return state;
    case "LOAD_MATCH_SUCCESS":
      return produce(state, (draft) => {
        draft.matches = action.payload;
      });
    case "LOAD_MATCH_FAIL":
      return produce(state, (draft) => {
        draft.matches = [];
      });
    case "LOAD_TEAM_SUCCESS":
      return produce(state, (draft) => {
        draft.teams = action.payload;
      });
    case "LOAD_TEAM_FAIL":
      return produce(state, (draft) => {
        draft.teams = [];
      });
    case "SET_MESSAGE_FILTER":
      return produce(state, (draft) => {
        draft.matchFilterStatus = action.payload;
      });
    default:
      return state;
  }
};

export default appReducer;
