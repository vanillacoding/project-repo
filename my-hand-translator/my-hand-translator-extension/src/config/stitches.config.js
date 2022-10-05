import { createStitches } from "@stitches/react";

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      blue: "#1A6DD9",
      lightBlue: "#1D8FF2",
      apricot: "#F2B988",
      white: "#f2f2f2",
      black: "#737373",
      red: "#EA4435",
    },
  },
  media: {
    tabMedium: "(max-width: 768px)",
    tabLarge: "(max-width: 1024px)",
  },
});
