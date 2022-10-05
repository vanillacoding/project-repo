import { createGlobalStyle } from 'styled-components';
import * as colors from '../../lib/colors';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans KR';
    src: url('../assets/fonts/Ubuntu-Medium.ttf');
  }

  html {
    font-size: 10px;
  }

  body {
    min-height: 100vh;
    margin: 0;
    color: ${colors.DEFAULT_GLOBAL_FONT_COLOR};
    background-color: ${colors.DEFAULT_GLOBAL_FONT_COLOR};
  }

  * {
    box-sizing: border-box;
    font-family: 'Ubuntu', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  a, a:link, a:visited {
    text-decoration: none;
    color: ${colors.DEFAULT_GLOBAL_FONT_COLOR};
    margin: 0 1rem;
  }

  a:hover {
    color: ${colors.HIGHLIGHT_COLOR};
    transition: all 0.3s;
  }
`;

export default GlobalStyle;
