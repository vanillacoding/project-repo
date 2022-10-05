import { createGlobalStyle } from 'styled-components';
import NanumBarunGothicBold from './NanumBarunGothicBold.woff';
import NanumBarunGothic from './NanumBarunGothic.woff';

export const HeaderFont = createGlobalStyle`
  @font-face {
  font-family: 'Nanum Barun Gothic Bold';
  src: local('Nanum Barun Gothic Bold');
  src: url(${NanumBarunGothicBold}) format('woff');
  font-weight: 600;
  font-style: normal;
}
`;

export const ArticleFont = createGlobalStyle`
  @font-face {
  font-family: 'Nanum Barun Gothic';
  src: local('Nanum Barun Gothic');
  src: url(${NanumBarunGothic}) format('woff');
  font-weight: 600;
  font-style: normal;
}
`;
