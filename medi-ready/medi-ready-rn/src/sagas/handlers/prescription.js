import { call, put } from "redux-saga/effects";

import { deletePrescription } from "../../api/index";
import { prescriptionDeleteFail, prescriptionDeleteSuccess } from "../../redux/reducers/prescriptionSlice";

export function* handlePrescriptionDelete(action) {
  try {
    const prescriptionId = action.payload;

    const { result } = yield call(deletePrescription, prescriptionId);

    result === "success"
      ? yield put(prescriptionDeleteSuccess())
      : yield put(prescriptionDeleteFail());
  } catch (error) {
    yield put(prescriptionDeleteFail({ message: error.message }));
  }
}
