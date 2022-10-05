import { call, put, delay } from "redux-saga/effects";
import { queuePharmacy } from "../../api";
import { setError, setPermission, setScanned } from "../../redux/reducers/pharmacyCheckInSlice";
import requestCameraPermissions from "../../utils/requestCameraPermission";

export function* handleCameraPermission() {
  try {
    const status = yield call(requestCameraPermissions);

    yield delay(500);

    yield put(setPermission(status));
  } catch (error) {
    yield put(setError({ message: error.message }));
  }
}

export function* handlePharmacyCheckIn(action) {
  try {
    const pharmacyId = action.payload;

    if (!pharmacyId) {
      yield put(setScanned(false));
    }

    yield put(setScanned(true));

    const { result } = yield call(queuePharmacy, pharmacyId);

    if (result === "fail") {
      yield put(setScanned(false));
    }
  } catch (error) {
    yield put(setError({ message: error.message }));
  }
}
