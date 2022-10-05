import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0 0 100px 0;
  }

  :root {
    --caret-color: #8877E8;
    --color-gray: #8E9093;
    --color-notification-tap: #FDFAFF;
    --color-following-tap: #F9F7F7;
    --color-message: #543FD3;
    --color-mint-focus: #26BFA6;
    --color-saving-background: #F3F2F9;
  }
`;

export default GlobalStyle;
