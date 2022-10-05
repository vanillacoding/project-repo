import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${reset}

  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    overflow: hidden;
    font-family: 'Rammetto One', 'Do Hyeon';
    background: linear-gradient(180deg, #7cd0ff 0%, rgba(207, 218, 255, 0.36) 100%);

    input {
      border: none;
      outline: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    button {
      border: none;
    }

    li {
      list-style: none;
    }

    cursor: url('/hammer.png') 10 30, auto;
  }
`;

export default GlobalStyle;
