import { call, put } from "redux-saga/effects";

import { getAlarmTime, setAlarmTime } from "../../api/index";
import { failAlarmSetting, completeAlarmSetting } from "../../redux/reducers/alarmSettingSlice";

export function* handleLoginAlarmSetting() {
  try {
    const { result, data } = yield call(getAlarmTime);

    if (result === "success") {
      const {
        morning,
        lunch,
        dinner,
        before_bed: beforeBed,
      } = data;

      yield put(completeAlarmSetting({ morning, lunch, dinner, beforeBed }));
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    yield put(failAlarmSetting(error.message));
  }
};

export function* handleAlarmSetting(action) {
  try {
    const { result, data } = yield call(setAlarmTime, action.payload);

    if (result === "success") {
      const {
        morning,
        lunch,
        dinner,
        beforeBed,
      } = data;

      yield put(completeAlarmSetting({ morning, lunch, dinner, beforeBed }));
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    yield put(failAlarmSetting(error.message));
  }
}
