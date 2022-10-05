import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");

const guideScale = Math.sqrt(width * height);
const scale = Math.sqrt(width * height) / guideScale;
const horiPer = width / width;
const vertiPer = height / height;

const verticalScale = (size) => horiPer * (size * height / 700);
const horizontalScale = (size) => vertiPer * (size * height / 700);
const moderateScale = (size) => scale * (size * height / 700);

export { moderateScale, verticalScale, horizontalScale };

export const color = {
  poplaceDark: "#453536",
  poplaceLight: "#766162",
  poplaceRed: "#f78582",
  poplaceErrorRed: "#fe4e4e",
  poplaceWhite: "#ffffff",
  poplaceLightGray: "#F2efef",
  poplaceMiddleGray: "#eaeaea",
  poplaceSilverGary: "#c3c6c7",
  poplaceGray: "gray",
};
