import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingState {
  themeMode: string;
}

interface SettingPayload {
  themeMode?: string;
}

const initialState: SettingState = {
  themeMode: "light",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<SettingPayload>) => {
      state.themeMode = action.payload.themeMode;
    },
  },
});

export const { changeMode } = settingSlice.actions;

export default settingSlice.reducer;
