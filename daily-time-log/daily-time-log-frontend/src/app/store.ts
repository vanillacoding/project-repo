import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import logger from "redux-logger";

import authReducer from "../features/auth/authSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import schedulesReducer from "../features/schedules/schedulesSlice";
import milestonesReducer from "../features/milestones/milestonesSlice";
import timeLogReducer from "../features/timeLog/timeLogSlice";
import settingReducer from "../features/setting/settingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    calendar: calendarReducer,
    schedules: schedulesReducer,
    milestones: milestonesReducer,
    timeLog: timeLogReducer,
    setting: settingReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return process.env.REACT_APP_NODE_ENV !== "production"
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware();
  },
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
