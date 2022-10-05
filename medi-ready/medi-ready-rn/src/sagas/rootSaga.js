import { all, takeLatest, throttle } from "@redux-saga/core/effects";

import { deletePrescription } from "../redux/reducers/prescriptionSlice";
import { updateDoseHistories } from "../redux/reducers/doseHistorySlice";
import { getPrescriptionList } from "../redux/reducers/prescriptionListSlice";
import { openScanner, checkIn } from "../redux/reducers/pharmacyCheckInSlice";
import { saveAlarm, getAlarmTime } from "../redux/reducers/alarmSettingSlice";
import { login, logout, checkAuthentication } from "../redux/reducers/userSlice";
import { registerPushNotification } from "../redux/reducers/pushNotificationSlice";

import { handlePrescriptionList } from "./handlers/prescriptionList";
import { handleUpdateDoseHistories } from "./handlers/doseHistory";
import { handlePrescriptionDelete } from "./handlers/prescription";
import { handleLogin, handleAuthCheck, handleLogout } from "./handlers/auth";
import { handlePushNotificationPermission } from "./handlers/pushNotification";
import { handleCameraPermission, handlePharmacyCheckIn } from "./handlers/checkIn";
import { handleAlarmSetting, handleLoginAlarmSetting } from "./handlers/alarmSetting";

export function* watcherSaga() {
  yield all([
    takeLatest(login.type, handleLogin),
    takeLatest(logout.type, handleLogout),
    takeLatest(checkAuthentication.type, handleAuthCheck),

    throttle(500, saveAlarm.type, handleAlarmSetting),
    takeLatest(getAlarmTime.type, handleLoginAlarmSetting),

    takeLatest(checkIn.type, handlePharmacyCheckIn),
    takeLatest(openScanner.type, handleCameraPermission),

    takeLatest(deletePrescription, handlePrescriptionDelete),
    takeLatest(getPrescriptionList.type, handlePrescriptionList),

    takeLatest(updateDoseHistories, handleUpdateDoseHistories),

    takeLatest(registerPushNotification, handlePushNotificationPermission),
  ]);
}
