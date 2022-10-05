import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import FONTS from "../constants/webFontUrl";

const GlobalStyle = createGlobalStyle`
  ${reset};

  html, body {
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  a {
    text-decoration: none;
  }

  @font-face {
    font-family: "Nanum Gothic", sans-serif;
    src: url(${FONTS.NANUM_GOTHIC});
  }

  @font-face {
    font-family: "Carrois Gothic SC", sans-serif;
    src: url(${FONTS.CARROIS_GOTHIC_SC});
  }

  ::-webkit-scrollbar {
    width: 0.4em;
    height: 0.4em;
    border: 0.5em solid transparent;
    background: transparent;
  }

  * {
    font-family: "Nanum Gothic", sans-serif;
  }

  h1, h2 {
    margin: 10px 30px 30px 30px;
    color: #539A92;
    text-align: left;
  }

  h1 {
    font-size: 3rem;
  }

  h2 {
    font-size: 2rem;
  }

  button {
    font-family: "Carrois Gothic SC", sans-serif;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.5em;
    background-color: #B0B0B0;
  }

  ::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 0.5em;
  }

  ::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 0.5em;
  }

  ::-webkit-scrollbar-corner {
    display: none;
  }

  @media screen and (max-width: 640px) {
    h1, h2 {
      margin: 10px 30px 10px 30px;
    }
  }
`;

export default GlobalStyle;
