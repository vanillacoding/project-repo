import { createSlice } from "@reduxjs/toolkit";

export const selectedTool = createSlice({
  name: "selectedTool",
  initialState: { selectedTool: "drawing" },
  reducers: {
    setSelectedTool(state, action) {
      state.selectedTool = action.payload;
    },
  },
});

export const { setSelectedTool } = selectedTool.actions;

export default selectedTool.reducer;
