import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
  createStitches({
    theme: {
      colors: {
        blue: "#1A6DD9",
        lightBlue: "#1D8FF2",
        lightApricot: "#F2B988",
        apricot: "#e8a061",
        lightGray: "#f2f2f2",
        gray: "#737373",
        red: "#EA4435",
        white: "#ffffff",
        black: "#222222",
      },
    },
    media: {
      medium: "(max-width: 768px)",
      large: "(max-width: 1024px)",
    },
    utils: {
      marginX: (value) => ({ marginLeft: value, marginRight: value }),
    },
  });
