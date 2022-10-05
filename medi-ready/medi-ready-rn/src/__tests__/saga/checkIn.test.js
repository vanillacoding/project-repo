import { call } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

import pharmacyCheckInReducer from "../../redux/reducers/pharmacyCheckInSlice";

import { queuePharmacy } from "../../api";
import { handlePharmacyCheckIn } from "../../sagas/handlers/checkIn";

describe("pharmacy check in saga test", () => {
  it("pharmacy check in => ", () => {
    const response = {
      result: "success",
    };

    const pharmacyId = "test-pharmacyId";

    return expectSaga(handlePharmacyCheckIn, { payload: pharmacyId })
      .withReducer(pharmacyCheckInReducer)
      .put({ type: "pharmacy check in/setScanned", payload: true })
      .provide([[call(queuePharmacy, pharmacyId), response]])
      .hasFinalState({
        error: null,
        isLoading: false,
        hasPermission: null,
        scanned: true,
      })
      .silentRun();
  });
});
