import * as Device from "expo-device";
import { Dimensions } from "react-native";

const OS = Device.osName;
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export {
  OS,
  WIDTH,
  HEIGHT,
};
