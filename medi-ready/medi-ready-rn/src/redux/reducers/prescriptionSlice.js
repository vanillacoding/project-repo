import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  isLoading: false,
};

export const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    deletePrescription: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    prescriptionDeleteSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    prescriptionDeleteFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  deletePrescription,
  prescriptionDeleteFail,
  prescriptionDeleteSuccess,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
