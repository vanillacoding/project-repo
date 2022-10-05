import { createGlobalStyle } from "styled-components";

import AnonymousProBoldWoff from "./AnonymousPro/anonymous-pro-v14-latin-700.woff";
import AnonymousProBoldWoff2 from "./AnonymousPro/anonymous-pro-v14-latin-700.woff2";
import AnonymousProRegularWoff from "./AnonymousPro/anonymous-pro-v14-latin-regular.woff";
import AnonymousProRegularWoff2 from "./AnonymousPro/anonymous-pro-v14-latin-regular.woff2";
import GaeguBoldWoff from "./Gaegu/Gaegu-Bold.woff";
import GaeguBoldWoff2 from "./Gaegu/Gaegu-Bold.woff2";
import GaeguLightWoff from "./Gaegu/Gaegu-Light.woff";
import GaeguLightWoff2 from "./Gaegu/Gaegu-Light.woff2";
import GaeguRegularWoff from "./Gaegu/Gaegu-Regular.woff";
import GaeguRegularWoff2 from "./Gaegu/Gaegu-Regular.woff2";
import GoudyBookletterWoff from "./GoudyBookletter1911/goudy-bookletter-1911-v10-latin-regular.woff";
import GoudyBookletterWoff2 from "./GoudyBookletter1911/goudy-bookletter-1911-v10-latin-regular.woff2";

const globalFonts = createGlobalStyle`
  @font-face {
    font-display: block;
    font-family: "Anonymous Pro";
    font-style: normal;
    font-weight: 400;
    src: local("Anonymous Pro"), local("AnonymousPro"),
      url(${AnonymousProRegularWoff}) format("woff"),
      url(${AnonymousProRegularWoff2}) format("woff2");
  }

  @font-face {
    font-display: block;
    font-family: "Anonymous Pro";
    font-style: normal;
    font-weight: 700;
    src: local("Anonymous Pro"), local("AnonymousPro"),
      url(${AnonymousProBoldWoff}) format("woff"),
      url(${AnonymousProBoldWoff2}) format("woff2");
  }

  @font-face {
    font-display: block;
    font-family: "Gaegu";
    font-style: normal;
    font-weight: 400;
    src: local("Gaegu"),
      url(${GaeguRegularWoff}) format("woff"),
      url(${GaeguRegularWoff2}) format("woff2");
  }

  @font-face {
    font-display: block;
    font-family: "Gaegu";
    font-style: normal;
    font-weight: 300;
    src: local("Gaegu"),
      url(${GaeguLightWoff}) format("woff"),
      url(${GaeguLightWoff2}) format("woff2");
  }

  @font-face {
    font-display: block;
    font-family: "Gaegu";
    font-style: normal;
    font-weight: 700;
    src: local("Gaegu"),
      url(${GaeguBoldWoff}) format("woff"),
      url(${GaeguBoldWoff2}) format("woff2");
  }

  @font-face {
    font-display: block;
    font-family: "Goudy Bookletter 1911";
    font-style: normal;
    font-weight: 700;
    src: local("Goudy Bookletter 1911"), local("GoudyBookletter1911"),
      url(${GoudyBookletterWoff}) format("woff"),
      url(${GoudyBookletterWoff2}) format("woff2");
  }
`;

export default globalFonts;
