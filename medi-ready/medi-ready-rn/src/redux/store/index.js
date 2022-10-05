import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";

import { watcherSaga } from "../../sagas/rootSaga";

import userReducer from "../reducers/userSlice";
import doseHistoryReducer from "../reducers/doseHistorySlice";
import alarmSettingReducer from "../reducers/alarmSettingSlice";
import prescriptionReducer from "../reducers/prescriptionSlice";
import pharmacyCheckInReducer from "../reducers/pharmacyCheckInSlice";
import pushNotificationReducer from "../reducers/pushNotificationSlice";
import prescriptionListReducer from "../reducers/prescriptionListSlice";

const sagaMiddleware = createSagaMiddleware();

const middleware = process.env.NODE_ENV === "development"
  ? [logger, sagaMiddleware]
  : (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware);

const store = configureStore({
  reducer: {
    user: userReducer,
    doseHistory: doseHistoryReducer,
    prescription: prescriptionReducer,
    alarmSetting: alarmSettingReducer,
    pharmacyCheckIn: pharmacyCheckInReducer,
    prescriptionList: prescriptionListReducer,
    pushNotification: pushNotificationReducer,
  },
  middleware,
});

sagaMiddleware.run(watcherSaga);

export default store;
