import { createGlobalStyle } from "styled-components";
import THEME_COLORS from "../config/constants/themeColors";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: ${THEME_COLORS.FONT_COLOR};
    user-select: none;
  }

  body {
    background: ${THEME_COLORS.MAIN_BACKGROUND};
    font: 16px "GMarket", "sans-serif";
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
