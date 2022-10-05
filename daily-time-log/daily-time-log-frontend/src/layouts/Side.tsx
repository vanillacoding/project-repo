import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

function Side({ children }: Props) {
  return <SideWrap>{children}</SideWrap>;
}

const SideWrap = styled.aside`
  width: 60%;
  border-right: 1px solid ${({ theme }) => theme.color.border};

  @media only screen and (max-width: 768px) {
    width: 80%;
    border-right: none;
  }
`;

export default Side;
