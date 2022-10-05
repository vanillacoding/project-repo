import { BarCodeScanner } from "expo-barcode-scanner";

import { PERMISSION_RESULT } from "../constants/device";

const requestCameraPermissions = async () => {
  const { status } = await BarCodeScanner.requestPermissionsAsync();

  return status === PERMISSION_RESULT.GRANTED ? true : false;
};

export default requestCameraPermissions;
