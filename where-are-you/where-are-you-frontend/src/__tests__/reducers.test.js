import {
  changeTextBox,
  changePlayerAnswer,
  removePlayerGameData
} from "../actions/game";
import { savePuzzles } from "../actions/puzzle";
import game, { initialState } from "../reducers/game";
import puzzle from "../reducers/puzzle";

describe("puzzle reducer", () => {
  const initialState = {
    byName: {},
    allNames: []
  };
  const puzzles = [{
    name: "puzzle1",
    title: "puzzle",
    content: "content"
  }];

  it("should return the initial state", () => {
    expect(puzzle(undefined, {})).toEqual(initialState);
  });

  it("should handle SAVE_PUZZLES", () => {
    expect(puzzle(initialState, savePuzzles(puzzles))).toEqual({
      byName: {
        "puzzle1": puzzles[0]
      },
      allNames: ["puzzle1"]
    });
  });
});

describe("game reducer", () => {
  const gameData = {
    playerAnswer: "answer",
    playerPassword: "password",
    textBox: "text",
    error: null
  };

  it("should handle CHANGE_TEXTBOX", () => {
    const text = "text";

    expect(game(initialState, changeTextBox(text))).toEqual({
      ...initialState,
      textBox: text
    });
  });

  it("should handle CHANGE_PLAYER_ANSWER", () => {
    const puzzleName = "puzzle1";
    const answer = "answer";

    expect(game(initialState, changePlayerAnswer(puzzleName, answer))).toEqual({
      ...initialState,
      playerAnswer: {
        ...initialState.playerAnswer,
        "puzzle1": { answer }
      }
    });
  });

  it("should handle REMOVE_PLAYER_GAME_DATA", () => {
    expect(game(gameData, removePlayerGameData())).toEqual(initialState);
  });
});
