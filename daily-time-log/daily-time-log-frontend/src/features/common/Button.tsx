/* eslint-disable @typescript-eslint/no-empty-function */
import React, { MouseEventHandler } from "react";
import styled, { css } from "styled-components";
import { boxShadow as boxShadowCss } from "../../assets/styles/utilsStyled";

interface Sizes {
  large: {
    height: string;
    fontSize: string;
  };
  medium: {
    height: string;
    fontSize: string;
  };
  small: {
    height: string;
    fontSize: string;
  };
}

interface Props {
  children: React.ReactNode;
  color?: "blue" | "pink";
  size: keyof Sizes;
  fullWidth?: boolean;
  background?: boolean;
  boxShadow?: boolean;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}

function Button({
  children,
  color,
  size,
  fullWidth,
  background,
  boxShadow,
  disabled,
  onClick,
}: Props) {
  return (
    <ButtonStyled
      color={color}
      size={size}
      fullWidth={fullWidth}
      background={background}
      boxShadow={boxShadow}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonStyled>
  );
}

const boxShadowStyles = css<Props>`
  ${({ boxShadow }) => {
    return boxShadow && boxShadowCss;
  }};
`;

const fullWidthStyles = css<Props>`
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

const colorStyles = css<Props>`
  ${({ theme, color, background, disabled }) => {
    const selected = theme.palette[color];

    if (!background) {
      return css`
        border: none;
        background: none;
      `;
    }

    if (disabled) {
      return;
    }

    return css`
      background: ${selected};
      color: ${theme.color.buttonFont};

      :hover {
        background: ${theme.palette[`dark${color}`]};
      }
    `;
  }}
`;

const sizes: Sizes = {
  large: { height: "3rem", fontSize: "1.25rem" },
  medium: { height: "2.25rem", fontSize: "1rem" },
  small: { height: "1.75rem", fontSize: "0.875rem" },
};

const sizeStyles = css<Props>`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  ${colorStyles}
  ${sizeStyles}
  ${fullWidthStyles}
  ${boxShadowStyles}
`;

Button.defaultProps = {
  onClick: () => {},
  color: "blue",
  background: true,
  fullWidth: false,
  boxShadow: false,
  disabled: false,
};

export default Button;
