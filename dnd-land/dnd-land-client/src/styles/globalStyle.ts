import { normalize } from "styled-normalize";
import { createGlobalStyle } from "styled-components";

import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    background-color: ${theme.colors.background};
    overflow: hidden;
  }

  * {
    font-family: 'Do Hyeon', sans-serif;
    box-sizing: border-box;
    animation: fadeIn 0.3s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
