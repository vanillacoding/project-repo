import React from "react";
import styled from "styled-components";

type ButtonProps = {
  text?: string;
  className?: string;
  children?: JSX.Element | JSX.Element[] | string;
  onClick: () => void;
};

function Button({ children, className, onClick, text }: ButtonProps) {
  return (
    <DefaultButton className={className} onClick={onClick}>
      {children}
      {text}
    </DefaultButton>
  );
}

const DefaultButton = styled.button`
  cursor: pointer;
  outline: none;
`;

export default Button;
