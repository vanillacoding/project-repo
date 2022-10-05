import { createSlice } from '@reduxjs/toolkit';
import sampleSize from 'lodash-es/sampleSize';

import {
  QUIZ,
  QUIZ_LENGTH,
  SCORES,
  GAME_STATUS,
  ANSWER_TIME,
  BREAKING_TIME,
  INITIAL_ITEMS_COUNTS,
  ITEM,
  ATTACK,
} from '../constants/game';
import { RESET, BREAK, ANSWER } from '../constants/messages';

const name = QUIZ;

const initialState = {
  quizCollection: { byId: {}, allIds: [] },
  currentQuizIndex: 0,
  gameStatus: GAME_STATUS.BEFORE_START,
  isGamePaused: false,
  remainingTime: 0,
  userInput: '',
  score: 0,
  itemsCount: 5,
  message: {
    type: '',
    text: '',
  },
  warningMessage: '',
};

const quizSlice = createSlice({
  name,
  initialState,
  reducers: {
    saveQuizCollection(state, action) {
      if (action.payload.length === QUIZ_LENGTH) {
        state.quizCollection.byId = { ...action.payload };
      } else {
        state.quizCollection.byId = {
          ...sampleSize(action.payload, QUIZ_LENGTH),
        };
      }

      state.quizCollection.allIds = Array(QUIZ_LENGTH)
        .fill(null)
        .map((v, i) => v + i);
    },
    replaceQuestions(state, action) {
      state.quizCollection = action.payload;
    },
    changeGameStatus(state, action) {
      state.gameStatus = action.payload;

      if (
        action.payload ===
        (GAME_STATUS.ICE_BREAKING_TIME || GAME_STATUS.BEFORE_START)
      ) {
        state.remainingTime = BREAKING_TIME[state.currentQuizIndex + 1];
        state.message = BREAK[state.currentQuizIndex + 1];
      } else if (action.payload === GAME_STATUS.ANSWER_GUESS_TIME) {
        state.remainingTime = ANSWER_TIME;
        state.message = ANSWER[state.currentQuizIndex + 1];
      } else if (action.payload === GAME_STATUS.END) {
        state.currentQuizIndex = 0;
        state.isGamePaused = false;
        state.remainingTime = 0;
        state.userInput = '';
        state.itemsCount = INITIAL_ITEMS_COUNTS;
        state.message = RESET;
        state.warningMessage = '';
      }
    },
    decreaseTime(state) {
      state.remainingTime -= 1;
    },
    pauseGameProgress(state, action) {
      state.isGamePaused = action.payload;
    },
    changeMessage(state, action) {
      const { type, text } = action.payload;
      state.message.type = type;
      state.message.text = text;
    },
    saveUserAnswer(state, action) {
      state.userInput = action.payload;
    },
    addScore(state) {
      state.score += SCORES[state.currentQuizIndex + 1];
    },
    takeSelectedItem(state, action) {
      if (action.payload === ITEM.EFFECT.ADD_USER_TIME) {
        state.remainingTime += 10;
        state.itemsCount -= 1;
      } else if (action.payload === ITEM.EFFECT.REDUCE_OPPONENT_TIME) {
        state.itemsCount -= 2;
      }
    },
    receiveAttack(state, action) {
      if (state.gameStatus === GAME_STATUS.ANSWER_GUESS_TIME) {
        state.remainingTime =
          state.remainingTime < 5 ? 0 : state.remainingTime - 5;
        state.warningMessage = ATTACK[action.payload].message;
      }
    },
    updateWarningMessage(state, action) {
      if (action.payload === 'RESET') {
        state.warningMessage = '';
      } else {
        state.warningMessage = action.payload;
      }
    },
    goToNextStep(state) {
      state.currentQuizIndex += 1;
      state.gameStatus = GAME_STATUS.BEFORE_START;
      state.userInput = '';
      state.message = RESET;
    },
    resetQuizForGameOver(state) {
      state.currentQuizIndex = 0;
      state.gameStatus = GAME_STATUS.BEFORE_START;
      state.remainingTime = 0;
      state.score = 0;
      state.message = RESET;
    },
  },
});

export const {
  saveQuizCollection,
  replaceQuestions,
  changeGameStatus,
  decreaseTime,
  pauseGameProgress,
  changeMessage,
  saveUserAnswer,
  addScore,
  takeSelectedItem,
  receiveAttack,
  updateWarningMessage,
  goToNextStep,
  resetQuizForGameOver,
} = quizSlice.actions;

export default quizSlice.reducer;
