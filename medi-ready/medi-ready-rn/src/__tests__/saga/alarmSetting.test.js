import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from 'redux-saga-test-plan/providers';

import alarmSettingReducer from "../../redux/reducers/alarmSettingSlice";

import { getAlarmTime, setAlarmTime } from "../../api/index";
import { handleLoginAlarmSetting, handleAlarmSetting } from "../../sagas/handlers/alarmSetting";

describe("alarm setting saga test", () => {
  it("alarm setting upon login => ", () => {
    const response = {
      result: "success",
      data: {
        morning: "09:30",
        lunch: "12:00",
        dinner: "18:00",
        before_bed: "22:00",
      },
    };

    const {
      morning,
      lunch,
      dinner,
      before_bed: beforeBed,
    } = response.data;

    const alarmTime = {
      morning,
      lunch,
      dinner,
      beforeBed,
    };

    return expectSaga(handleLoginAlarmSetting)
      .withReducer(alarmSettingReducer)
      .provide([[call(getAlarmTime), response]])
      .put({
        type: "alarmSetting/completeAlarmSetting",
        payload: alarmTime,
      })
      .hasFinalState({
        error: null,
        isLoading: false,
        alarmTimes: {
          morning: "09:30",
          lunch: "12:00",
          dinner: "18:00",
          beforeBed: "22:00",
        },
      })
      .silentRun();
  });

  it("error on login alarm setting => ", () => {
    const error = new Error("test error");

    return expectSaga(handleLoginAlarmSetting)
      .withReducer(alarmSettingReducer)
      .provide([[call(getAlarmTime), throwError(error)]])
      .put({
        type: "alarmSetting/failAlarmSetting",
        payload: error.message,
      })
      .hasFinalState({
        error: "test error",
        isLoading: false,
        alarmTimes: {
          morning: "08:00",
          lunch: "12:00",
          dinner: "18:00",
          beforeBed: "22:00",
        },
      })
      .silentRun();
  });

  it("update alarm time=> ", () => {
    const newTime = {
      morning: "09:30",
      lunch: "12:00",
      dinner: "18:00",
      beforeBed: "22:00",
    };

    const response = {
      result: "success",
      data: {
        morning: "09:30",
        lunch: "12:00",
        dinner: "18:00",
        beforeBed: "22:00",
      },
    };

    return expectSaga(handleAlarmSetting, { payload: newTime })
      .withReducer(alarmSettingReducer)
      .provide([[call(setAlarmTime, newTime), response]])
      .put({
        type: "alarmSetting/completeAlarmSetting",
        payload: newTime,
      })
      .hasFinalState({
        error: null,
        isLoading: false,
        alarmTimes: {
          morning: "09:30",
          lunch: "12:00",
          dinner: "18:00",
          beforeBed: "22:00",
        },
      })
      .silentRun();
  });

  it("error on new alarm setting => ", () => {
    const newTime = {
      morning: "09:30",
      lunch: "12:00",
      dinner: "18:00",
      beforeBed: "22:00",
    };

    const error = new Error("test error");

    return expectSaga(handleAlarmSetting, { payload: newTime })
      .withReducer(alarmSettingReducer)
      .provide([[call(setAlarmTime, newTime), throwError(error)]])
      .put({
        type: "alarmSetting/failAlarmSetting",
        payload: error.message,
      })
      .hasFinalState({
        error: "test error",
        isLoading: false,
        alarmTimes: {
          morning: "08:00",
          lunch: "12:00",
          dinner: "18:00",
          beforeBed: "22:00",
        },
      })
      .silentRun();
  });
});
