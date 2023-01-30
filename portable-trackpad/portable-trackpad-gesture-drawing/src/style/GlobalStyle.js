import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'SDSamliphopangche_Basic';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Basic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  * {
    box-sizing : border-box;
    margin: 0;
    padding: 0;
    font-family: 'GmarketSansMedium';
    color: #333;
  }

  body{
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

export default GlobalStyle;
