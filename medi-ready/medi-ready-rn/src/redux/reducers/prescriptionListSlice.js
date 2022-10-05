import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  isLoading: false,
  prescriptionList: [],
};

export const prescriptionListSlice = createSlice({
  name: "prescriptionList",
  initialState,
  reducers: {
    getPrescriptionList: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    savePrescriptionList: (state, action) => {
      state.prescriptionList = action.payload;
      state.isLoading = false;
    },
    failGettingPrescriptionList: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  getPrescriptionList,
  savePrescriptionList,
  failGettingPrescriptionList,
} = prescriptionListSlice.actions;

export default prescriptionListSlice.reducer;
