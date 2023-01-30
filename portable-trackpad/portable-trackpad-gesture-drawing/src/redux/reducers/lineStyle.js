import { createSlice } from "@reduxjs/toolkit";

export const lineStyle = createSlice({
  name: "lineStyle",
  initialState: {
    lineColor: "black",
    lineWidth: 5,
  },
  reducers: {
    setLineColor(state, action) {
      state.lineColor = action.payload;
    },
    setLineWidth(state, action) {
      state.lineWidth = action.payload;
    },
  },
});

export const { setLineColor, setLineWidth } = lineStyle.actions;

export default lineStyle.reducer;
