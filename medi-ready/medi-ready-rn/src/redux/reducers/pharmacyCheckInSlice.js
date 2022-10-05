import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  isLoading: false,
  hasPermission: null,
  scanned: false,
};

export const pharmacyCheckInSlice = createSlice({
  name: "pharmacy check in",
  initialState,
  reducers: {
    openScanner: (state, action) => {
      state.error = null;
      state.scanned = false;
      state.isLoading = true;
      state.hasPermission = null;
    },
    checkIn: (state, action) => {
      state.isLoading = true;
      state.scanned = false;
      state.error = null;
    },
    setScanned: (state, action) => {
      state.scanned = action.payload;
      state.isLoading = false;
    },
    setPermission: (state, action) => {
      state.hasPermission = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setError,
  checkIn,
  setScanned,
  openScanner,
  setPermission,
} = pharmacyCheckInSlice.actions;

export default pharmacyCheckInSlice.reducer;
