import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  doseHistoryList: [],
  selectedDoseHistory: {},
};

export const doseHistorySlice = createSlice({
  name: "doseHistory",
  initialState,
  reducers: {
    setDoseHistories: (state, action) => {
      state.doseHistoryList = action.payload;
    },
    updateDoseHistories: (state, action) => {
      const { doseHistoryId, newDoseHistory } = action.payload;

      const newDoseHistoryList = state.doseHistoryList.map((history) => {
        if (history.dose_history_id === doseHistoryId) {
          return newDoseHistory;
        }

        return history;
      });

      state.doseHistoryList = newDoseHistoryList;
    },
    setSelectedDoseHistory: (state, action) => {
      state.selectedDoseHistory = action.payload;
    },
    failDoseHistoryUpdate: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDoseHistories,
  updateDoseHistories,
  failDoseHistoryUpdate,
  setSelectedDoseHistory,
} = doseHistorySlice.actions;

export default doseHistorySlice.reducer;
