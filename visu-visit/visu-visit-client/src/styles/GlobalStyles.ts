import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { theme } from "./theme";

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    font-family: Noto Sans KR, Montserrat, sans-serif;
    background-color: ${theme.color.gray};
    height: 100vh;
    min-width: 1000px;
    overflow: hidden;

    #root {
      height: 100%;
    }

    a {
      text-decoration: none;
      color: black;
    }

    button {
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export default GlobalStyles;
