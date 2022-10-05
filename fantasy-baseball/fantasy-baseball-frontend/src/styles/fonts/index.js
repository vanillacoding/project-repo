import { createGlobalStyle } from "styled-components";

import BebasNeueWoff from "./BebasNeue/BebasNeue-Regular.woff";
import BebasNeueWoff2 from "./BebasNeue/BebasNeue-Regular.woff2";
import NanumBarunGothicBoldWoff from "./NanumBarunGothic/NanumBarunGothicBoldSubset.woff";
import NanumBarunGothicBoldWoff2 from "./NanumBarunGothic/NanumBarunGothicBoldSubset.woff2";
import NanumBarunGothicLightWoff from "./NanumBarunGothic/NanumBarunGothicLightSubset.woff";
import NanumBarunGothicLightWoff2 from "./NanumBarunGothic/NanumBarunGothicLightSubset.woff2";
import NanumBarunGothicWoff from "./NanumBarunGothic/NanumBarunGothicSubset.woff";
import NanumBarunGothicWoff2 from "./NanumBarunGothic/NanumBarunGothicSubset.woff2";
import NanumBarunGothicUltraLightWoff from "./NanumBarunGothic/NanumBarunGothicUltraLightSubset.woff";
import NanumBarunGothicUltraLightWoff2 from "./NanumBarunGothic/NanumBarunGothicUltraLightSubset.woff2";

const globalFonts = createGlobalStyle`
  @font-face {
    font-family: "Bebas Neue";
    font-style: normal;
    letter-spacing: 0.1em;
    src: local("Bebas Neue"), local("BebasNeue"),
      url(${BebasNeueWoff}) format("woff"),
      url(${BebasNeueWoff2}) format("woff2");
  }

  @font-face {
    font-family: "Nanum Barun Gothic";
    font-weight: 400;
    src: local("Nanum Barun Gothic"),
      url(${NanumBarunGothicWoff}) format("woff"),
      url(${NanumBarunGothicWoff2}) format("woff2");
  }

  @font-face {
    font-family: "Nanum Barun Gothic";
    font-weight: 700;
    src: local("Nanum Barun Gothic"),
      url(${NanumBarunGothicBoldWoff}) format("woff"),
      url(${NanumBarunGothicBoldWoff2}) format("woff2");
  }

  @font-face {
    font-family: "Nanum Barun Gothic";
    font-weight: 300;
    src: local("Nanum Barun Gothic"),
      url(${NanumBarunGothicLightWoff}) format("woff"),
      url(${NanumBarunGothicLightWoff2}) format("woff2");
  }

  @font-face {
    font-family: "Nanum Barun Gothic";
    font-weight: 200;
    src: local("Nanum Barun Gothic"),
      url(${NanumBarunGothicUltraLightWoff}) format("woff"),
      url(${NanumBarunGothicUltraLightWoff2}) format("woff2");
  }
`;

export default globalFonts;
