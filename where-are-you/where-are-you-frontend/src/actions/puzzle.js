import * as type from "../constants/actionTypes";

export const savePuzzles = (puzzles) => ({
  type: type.SAVE_PUZZLES,
  puzzles
});
