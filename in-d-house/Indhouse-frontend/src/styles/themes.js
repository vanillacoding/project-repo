const calcRem = size => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(20),
  musicTitle: calcRem(25),
  medium: calcRem(30),
  lg: calcRem(35),
  xl: calcRem(40),
  miniTitleSize: calcRem(50),
  tasteTitleSize: calcRem(80),
  titleSize: calcRem(150),
};

const fontWeights = {
  medium: 600,
  strong: 800,
};

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  gray: "#BEBFC2",
  red: "#FF006E",
  blue: "#509BF5",
  yellow: "#F7E32D",
  indigo: "#121A2C",
  lightIndigo: "#1F273A",
};

const themes = {
  fontSizes,
  fontWeights,
  colors,
};

export default themes;
