import { createGlobalStyle } from "styled-components";
import theme from "./config/constants/theme";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
  }

  #root, body, html {
    width: 100%;
    height: 100%;
    background-color: ${theme.skyBlue};
  }
`;

export default GlobalStyle;
