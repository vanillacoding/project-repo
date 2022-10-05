import ReseterCSS from "reseter.css";
import { css, createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  ${ReseterCSS};

  body {
    width: 100%;
    height: auto;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.color.background};
    font-family: "Gaegu", "Goudy Bookletter 1911", sans-serif;
  }

  img {
    user-select: none;
  }

  a {
    color: ${({ theme }) => theme.color.black};

    &:hover {
      text-decoration: none;
    }

    &:focus {
      outline: none;
    }
  }

  ul,
  ul li {
    list-style: none;
  }

  input {
    &:focus {
      background: rgba(247, 223, 2, 0.3);
      outline: none;
    }
  }

  .sr-only {
    width:1px;
    height:1px;
    position:absolute;
    left:-10000px;
    top:auto;
    overflow:hidden;
  }
`;

export const buttonStyle = css`
  width: auto;
  height: 40px;
  min-width: 120px;
  margin: 1rem 0 0 0;
  padding: 0 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid ${({ theme, color }) => theme.color[color]};
  text-align: center;
  cursor: pointer;
  transition: all 400ms cubic-bezier(0.77, 0, 0.175, 1);

  &::after {
    width: 100%;
    height: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
    background: ${({ theme, color }) => theme.color[color]};
    content: "";
    transition: inherit;
  }

  span {
    position: relative;
    z-index: 1;
  }

  &:hover {
    box-shadow: 1px 1px 15px 2px rgba(0, 0, 0, 0.1);
    color: #ffffff;

    &::after {
      height: 100%;
      top: 0;
    }

    span {
      color: #ffffff;
    }
  }

  &:focus {
    background: ${({ theme }) => theme.color.black};
    outline: none;
    color: #ffffff;
  }
`;

export default GlobalStyles;
