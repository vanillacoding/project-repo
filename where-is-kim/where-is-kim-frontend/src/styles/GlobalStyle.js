import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
  ${reset};
  body {
    font-size: 14px;
    line-height: 1.6;
    min-width: 1280px;
  }
  * {
    font-size: inherit;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
  svg, img {
    vertical-align: top;
    max-width: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  h1, h2, h3 {
    margin-bottom: 21px;
  }
  h1 {
    font-size: 30px;
  }
  h2 {
    font-size: 25px;
  }
  h3 {
    font-size: 20px;
  }
`;
