import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  isLoading: false,
  pushNotificationList: [],
  pushNotificationBadge: 0,
};

export const pushNotificationSlice = createSlice({
  name: "pushNotification",
  initialState,

  reducers: {
    registerPushNotification: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    successNotificationRegister: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    failNotificationRegister: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    savePushNotification: (state, action) => {
      state.pushNotificationList.push(action.payload);
      state.pushNotificationBadge++;
    },
    deleteAllNotification: (state, action) => {
      state.pushNotificationBadge = 0;
      state.pushNotificationList = [];
    },
    deletePushNotification: (state, action) => {
      const index = state.pushNotificationList.findIndex((notification) => {
        return notification.id === action.payload;
      });

      state.pushNotificationList.splice(index, 1);
      state.pushNotificationBadge--;
    },
  },
});

export const {
  savePushNotification,
  deleteAllNotification,
  deletePushNotification,
  registerPushNotification,
  failNotificationRegister,
  successNotificationRegister,
} = pushNotificationSlice.actions;

export default pushNotificationSlice.reducer;
