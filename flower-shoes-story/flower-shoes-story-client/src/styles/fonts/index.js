import { createGlobalStyle } from "styled-components";

import DrukXCond from "./DrukXCond/DrukXCond-Super-Web.woff2";

const globalFonts = createGlobalStyle`
  @font-face {
    font-display: block;
    font-family: "Druk XCond Web";
    font-style: normal;
    font-weight: 500;
    src: local("DrukXCond"), url(${DrukXCond}) format("woff2");
  }

  @font-face {
    font-family: "adrianna";
    src:
      url("https://use.typekit.net/af/33d000/00000000000000003b9acff8/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
        format("woff2"),
      url("https://use.typekit.net/af/33d000/00000000000000003b9acff8/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
        format("woff"),
      url("https://use.typekit.net/af/33d000/00000000000000003b9acff8/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3")
        format("opentype");
    font-display: auto;
    font-style: normal;
    font-weight: 400;
  }

  @font-face {
    font-family: "adrianna";
    src:
      url("https://use.typekit.net/af/076674/00000000000000003b9acfbe/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3")
        format("woff2"),
      url("https://use.typekit.net/af/076674/00000000000000003b9acfbe/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3")
        format("woff"),
      url("https://use.typekit.net/af/076674/00000000000000003b9acfbe/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3")
        format("opentype");
    font-display: auto;
    font-style: normal;
    font-weight: 600;
  }

  @font-face {
    font-family: "adrianna-extended";
    src:
    url("https://use.typekit.net/af/c9f13d/00000000000000003b9acfe5/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3")
        format("woff2"),
      url("https://use.typekit.net/af/c9f13d/00000000000000003b9acfe5/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3")
        format("woff"),
      url("https://use.typekit.net/af/c9f13d/00000000000000003b9acfe5/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3")
        format("opentype");
    font-display: auto;
    font-style: normal;
    font-weight: 600;
  }

  @font-face {
    font-family: "adrianna-extended";
    src:
      url("https://use.typekit.net/af/dcb075/00000000000000003b9acfd1/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
        format("woff2"),
      url("https://use.typekit.net/af/dcb075/00000000000000003b9acfd1/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
        format("woff"),
      url("https://use.typekit.net/af/dcb075/00000000000000003b9acfd1/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3")
        format("opentype");
    font-display: auto;
    font-style: normal;
    font-weight: 700;
  }

  @font-face {
    font-family: "adrianna-extended";
    src:
      url("https://use.typekit.net/af/29a9e2/00000000000000003b9ad000/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n8&v=3")
        format("woff2"),
      url("https://use.typekit.net/af/29a9e2/00000000000000003b9ad000/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n8&v=3")
        format("woff"),
      url("https://use.typekit.net/af/29a9e2/00000000000000003b9ad000/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n8&v=3")
        format("opentype");
    font-display: auto;
    font-style: normal;
    font-weight: 800;
  }
`;

export default globalFonts;
