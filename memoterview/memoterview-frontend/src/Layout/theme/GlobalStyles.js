import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap");
  body {
    margin: 0;
    padding: 0;
    font-family: 'Gothic A1', 'Ubuntu', sans-serif;

    @media (max-width: 575.98px) {
      font-size: 10px;
    }

    @media (min-width: 576px) and (max-width: 767.98px) {
      font-size: 11px;
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      font-size: 12px;
    }

    @media (min-width: 992px) and (max-width: 1199.98px) {
      font-size: 13px;
    }

    @media (min-width: 1200px) and (max-width: 1499.98px) {
      font-size: 14px;
    }

    @media (min-width: 1500px) {
      font-size: 16px;
    }
  }

  .hidden {
    overflow: hidden;
  }
`;

export default GlobalStyle;
