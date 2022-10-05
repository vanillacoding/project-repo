import produce from "immer";

import {
  FETCH_TODAY_GAME_SCHEDULE,
  FETCH_USER_RANKINGS,
  FETCH_PLAYER_RANKINGS,
  CATCH_API_ERROR,
} from "../constants/actionTypes";

const initialState = {
  schedule: [],
  userRankings: [],
  pitcherRankings: [],
  hitterRankings: [],
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODAY_GAME_SCHEDULE:
      return produce(state, (draft) => {
        draft.schedule = action.schedule;
      });
    case FETCH_USER_RANKINGS:
      return produce(state, (draft) => {
        draft.userRankings = action.userRankings;
      });
    case FETCH_PLAYER_RANKINGS:
      return produce(state, (draft) => {
        draft.pitcherRankings = action.pitcherRankings;
        draft.hitterRankings = action.hitterRankings;
      });
    case CATCH_API_ERROR:
      return produce(state, (draft) => {
        draft.error = action.error;
      });
    default:
      return state;
  }
};

export default reducer;
