import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-family:
      -apple-system,
      system-ui,
      BlinkMacSystemFont,
      "Segoe UI",
      Roboto,
      "Helvetica Neue",
      Arial,sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input {
    appearance: none;
    outline: none;
  }

  input, button {
    border: none;
    outline: none;
  }

  button {
    background-color: transparent;
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6{
    font-family: "Maven Pro", sans-serif;
    letter-spacing: 0.04em;
  }

  h1 {
    font-size: 20px;
    font-weight: 600;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
    width: 100%;
  }

  .sr-only {
    overflow: hidden;
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
  }
`;

export default GlobalStyle;
