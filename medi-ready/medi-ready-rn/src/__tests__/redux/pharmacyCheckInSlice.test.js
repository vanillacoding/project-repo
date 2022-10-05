import pharmacyCheckInReducer from "../../redux/reducers/pharmacyCheckInSlice";
import {
  setError,
  checkIn,
  setScanned,
  openScanner,
  setPermission,
} from "../../redux/reducers/pharmacyCheckInSlice";

describe("Pharmacy Check In Slice Test", () => {
  it("set error", () => {
    const prevState = {
      error: null,
      isLoading: true,
    };

    const result = pharmacyCheckInReducer(prevState, setError("test error"));

    expect(result.error).toEqual("test error");
    expect(result.isLoading).toEqual(false);
  });

  it("check-in", () => {
    const prevState = {
      isLoading: false,
    };

    const result = pharmacyCheckInReducer(prevState, checkIn());

    expect(result.isLoading).toEqual(true);
  });

  it("set scanned", () => {
    const prevState = {
      scanned: false,
      isLoading: true,
    };

    const result = pharmacyCheckInReducer(prevState, setScanned(true));

    expect(result.scanned).toEqual(true);
    expect(result.isLoading).toEqual(false);
  });

  it("open scanner", () => {
    const prevState = {
      isLoading: false,
    };

    const result = pharmacyCheckInReducer(prevState, openScanner());

    expect(result.isLoading).toEqual(true);
  });

  it("set permission", () => {
    const prevState = {
      hasPermission: null,
      isLoading: true,
    };

    const result = pharmacyCheckInReducer(prevState, setPermission(true));

    expect(result.hasPermission).toEqual(true);
    expect(result.isLoading).toEqual(false);
  });
});
