import React from "react";
import styled from "styled-components";

import Button from "./Button";

type ButtonProps = {
  onClick: () => void;
};

function StartButton({ onClick }: ButtonProps) {
  return <StyledButton text="시작하기" onClick={onClick} />;
}

const StyledButton = styled(Button)<{ onClick: () => void }>`
  position: absolute;
  left: 50%;
  bottom: 12%;
  transform: translate(-50%, -15%);

  padding: 0.4em 1em;
  width: 40%;

  font-size: 3.5vmin;
  letter-spacing: 5px;
  color: ${({ theme }) => theme.colors.darkblue};

  background-color: ${({ theme }) => theme.colors.yellow};
  border: 3px solid ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  transition: 200ms;

  &:hover {
    transform: translate(-52%, -25%);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;
  }
`;

export default StartButton;
