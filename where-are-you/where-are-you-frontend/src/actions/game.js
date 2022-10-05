import * as type from "../constants/actionTypes";

export const changeTextBox = (text) => ({
  type: type.CHANGE_TEXTBOX,
  text
});

export const changePlayerAnswer = (puzzleName, answer) => ({
  type: type.CHANGE_PLAYER_ANSWER,
  puzzleName,
  answer
});

export const changePlayerPassword = (passwordName, answer) => ({
  type: type.CHANGE_PLAYER_PASSWORD,
  passwordName,
  answer
});

export const solvePassword = (passwordName) => ({
  type: type.SOLVE_PASSWORD,
  passwordName
});

export const removePlayerGameData = () => ({
  type: type.REMOVE_PLAYER_GAME_DATA
});
