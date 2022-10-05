import { DefaultTheme } from "@react-navigation/native";

export const LIGHT_THEME = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF",
    border: "#FFF",
    primary: "#000",
  },
};
