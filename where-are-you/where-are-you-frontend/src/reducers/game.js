import produce from "immer";

import * as type from "../constants/actionTypes";

const makeAnswer = (name, count) => {
  const result = {};
  for (let i = 1; i <= count; i++) {
    result[`${name}${i}`] = {
      answer: ""
    };

    if (name === "password") {
      result[`${name}${i}`].isUnlocked = false;
    }
  }

  return result;
};

export const initialState = {
  playerAnswer: makeAnswer("puzzle", 20),
  playerPassword: makeAnswer("password", 5),
  textBox: "테이블 위에 편지가 있다. 누가 쓴 거지? 읽어봐야겠다.",
  error: null
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case type.CHANGE_TEXTBOX:
      return produce(state, (draft) => {
        draft.textBox = action.text;
      });
    case type.CHANGE_PLAYER_ANSWER:
      return produce(state, (draft) => {
        draft.playerAnswer[action.puzzleName].answer = action.answer;
      });
    case type.CHANGE_PLAYER_PASSWORD:
      return produce(state, (draft) => {
        draft.playerPassword[action.passwordName].answer = action.answer;
      });
    case type.SOLVE_PASSWORD:
      return produce(state, (draft) => {
        draft.playerPassword[action.passwordName].isUnlocked = true;
      });
    case type.REMOVE_PLAYER_GAME_DATA:
      return produce(state, (draft) => {
        draft.playerAnswer = makeAnswer("puzzle", 20);
        draft.playerPassword = makeAnswer("password", 5);
        draft.textBox = "테이블 위에 편지가 있다. 누가 쓴 거지? 읽어봐야겠다.";
      });
    default:
      return state;
  }
};

export default game;
