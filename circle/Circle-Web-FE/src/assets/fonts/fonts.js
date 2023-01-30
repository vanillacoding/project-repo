import { createGlobalStyle } from "styled-components";
import Pretendard from "./Pretendard-Regular.woff";

export default createGlobalStyle`
  font-face {
    font-family: 'Pretendard-Regular';
    src: url(${Pretendard}) format('woff');
    font-weight: 400;
    font-style: normal;
  }
`;
