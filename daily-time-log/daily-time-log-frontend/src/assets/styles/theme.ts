import { DefaultTheme } from "styled-components";

const palette = {
  lightGray: "#e4e4e4",
  gray: "#212121",
  darkgray: "#181818",
  lightblue: "#90CAF9",
  blue: "#3576A1",
  darkblue: "#005078",
  lightpink: "rgb(204, 115, 225)",
  pink: "#f06595",
  darkpink: "rgb(219 89 131)",
  black: "rgba(0, 0, 0, 0.87)",
  white: "white",
};

const size = {
  headerHeight: "75px",
  large: { height: "3rem", fontSize: "1.25rem" },
  medium: { height: "2.25rem", fontSize: "1rem" },
  small: { height: "1.75rem", fontSize: "0.875rem" },
};

export const lightTheme: DefaultTheme = {
  palette,
  color: {
    backgroundColor: palette.white,
    mainBackgroundColor: palette.white,
    scheduleBackground: palette.lightpink,
    border: palette.lightGray,
    title: palette.gray,
    buttonFont: palette.white,
    font: palette.black,
  },
  size,
};

export const darkTheme: DefaultTheme = {
  palette,
  color: {
    backgroundColor: palette.gray,
    mainBackgroundColor: palette.darkgray,
    scheduleBackground: palette.lightpink,
    border: "#383838",
    title: palette.white,
    buttonFont: palette.white,
    font: palette.white,
  },
  size,
};
