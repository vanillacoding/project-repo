import { createAction, createReducer } from "@reduxjs/toolkit";
import SEQUENCES, { SEQUENCE_FLOW } from "../config/constants/sequences";

export const initializeSequence = createAction("initializeSequence");
export const changePreviousSequence = createAction("changePreviousSequence");
export const changeSequence = createAction("changeSequence");
export const changeNextSequence = createAction("changeNextSequence");

const sequenceReducer = createReducer(SEQUENCES.INITIAL_SEQUENCE, {
  [changeSequence]: (state, action) => {
    return action.payload;
  },
  [changeNextSequence]: (state) => {
    const currentIndex = SEQUENCE_FLOW.indexOf(state);
    const nextIndex =
      currentIndex === SEQUENCE_FLOW.length ? 0 : currentIndex + 1;

    return SEQUENCE_FLOW[nextIndex];
  },
  [changePreviousSequence]: (state) => {
    const currentIndex = SEQUENCE_FLOW.indexOf(state);
    const previousIndex =
      currentIndex === 0 ? SEQUENCE_FLOW.length - 1 : currentIndex - 1;

    return SEQUENCE_FLOW[previousIndex];
  },
  [initializeSequence]: (state) => {
    return SEQUENCES.INITIAL_SEQUENCE;
  },
});

export default sequenceReducer;
