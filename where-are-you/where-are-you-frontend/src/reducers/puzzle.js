import produce from "immer";

import * as type from "../constants/actionTypes";

const initialState = {
  byName: {},
  allNames: []
};

const puzzle = (state = initialState, action) => {
  switch (action.type) {
    case type.SAVE_PUZZLES:
      return produce(state, (draft) => {
        const puzzles = {};

        for (let i = 0; i < action.puzzles.length; i++) {
          const puzzle = action.puzzles[i];
          puzzles[puzzle.name] = puzzle;
          draft.allNames.push(puzzle.name);
        }

        draft.byName = puzzles;
      });
    default:
      return state;
  }
};

export default puzzle;
