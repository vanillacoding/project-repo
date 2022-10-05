import styled, { css } from "styled-components";

interface InputProps {
  fullWidth?: boolean;
  active?: boolean;
  border?: boolean;
  sized: "small" | "medium" | "large";
}

const fullWidthStyles = css<InputProps>`
  ${({ fullWidth }) => {
    return (
      fullWidth &&
      css`
        width: 100%;
        justify-content: center;
      `
    );
  }}
`;

const sizeStyles = css<InputProps>`
  ${({ theme, sized }) => {
    return css`
      height: ${theme.size[sized].height};
      font-size: ${theme.size[sized].fontSize};
    `;
  }}
`;

export const Input = styled.input<InputProps>`
  box-sizing: border-box;
  padding: 0 7px;
  border: none;
  border-bottom: ${({ active, border, theme }) =>
    border && `2px solid ${active ? theme.palette.blue : theme.palette.lightGray}`};
  background-color: ${({ theme }) => theme.color.backgroundColor};
  color: ${({ theme }) => theme.color.font};
  transition: 0.2s all ease;
  outline: none;

  ${fullWidthStyles}
  ${sizeStyles}

  &:focus,
  &:active {
    border: none;
    border-bottom: ${({ theme, border }) => border && `2px solid ${theme.palette.blue}`};
  }
`;
