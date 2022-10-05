import { DefaultTheme } from "styled-components";

const color = {
  green: "#4caf50",
  purple: "#9c27b0",
  gray: "#eee",
};

const boxShadow = "0 4px 20px 0 rgb(0 0 0 / 14%), 0 7px 10px -5px rgb(128 128 128 / 40%)";

const gradient = {
  orange: "linear-gradient(60deg,#ffa726,#fb8c00)",
  hotPink: "linear-gradient(60deg,#ec407a,#d81b60)",
  gray: "linear-gradient(60deg,#ffffff,#acacac)",
};

const theme: DefaultTheme = {
  color,
  gradient,
  boxShadow,
};

export { theme };
