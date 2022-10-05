import { call, put } from "redux-saga/effects";

import { requestPrescriptionList } from "../../api/index";
import { failGettingPrescriptionList, savePrescriptionList } from "../../redux/reducers/prescriptionListSlice";

export function* handlePrescriptionList() {
  try {
    let prescriptionList = [];

    const { result, data } = yield call(requestPrescriptionList);

    if (result === "success") {
      prescriptionList = data;
    }

    yield put(savePrescriptionList(prescriptionList));
  } catch (error) {
    yield put(failGettingPrescriptionList({ message: error.message }));
  }
}
