import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;900&display=swap');
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    font-size: 1rem;
    font-family: 'Montserrat', sans-serif;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  button {
    cursor: pointer;
    border-radius: 0.2rem;
  }

  a {
    text-decoration:none;
    color:inherit;
    cursor: pointer;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
    border: none;
  }

  input, button {
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
