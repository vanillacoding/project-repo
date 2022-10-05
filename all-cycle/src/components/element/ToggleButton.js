import styled, { css } from "styled-components";

const color = css`
  ${({ isclicked }) => {
    if (isclicked) {
      return css`
      color: ${(props) => props.theme.white.color};
      background-color: ${(props) => props.theme.primary.color};
    `;
    }

    return css`
    color: ${(props) => props.theme.primary.color};
    background-color: ${(props) => props.theme.white.color};
  `;
  }}
`;

const ToggleButton = styled.button`
  border: 1px solid ${(props) => props.theme.primary.color};
  border-radius: 2vw;
  padding: 0.5em 2em;
  font-size: ${(props) => `${props.size}em`};
  margin: 0.5em;
  text-transform: uppercase;

  ${color}
`;

export default ToggleButton;
