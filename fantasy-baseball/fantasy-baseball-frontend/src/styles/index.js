import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul,
  ul li{
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input,
  textarea,
  button,
  section,
  main,
  div,
  article {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  body {
    width: 100%;
    height: auto;
    background: ${({ theme }) => theme.color.black};
    font-family: "Nanum Barun Gothic", "Bebas Neue", sans-serif;
    font-size: 16px;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Nanum Barun Gothic", sans-serif;
    font-size: ${({ theme }) => theme.fontSize.bigger};
    color: ${({ theme }) => theme.color.white};
  }

  .english-title {
    font-family: "Bebas Neue", "Nanum Barun Gothic", sans-serif;
    letter-spacing: 0.05em;
    transform: scale(1, 0.9);
  }

  .hidden {
    width: 1px;
    height: 1px;
    margin: -1px;
    position: absolute;
    overflow: hidden;
    clip-path: polygon(0 0, 0 0, 0 0);
  }
`;

export default GlobalStyles;
