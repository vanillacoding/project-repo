import React, { ReactNode } from "react";
import styled from "styled-components";

import Header from "./Header";

interface Props {
  children: ReactNode;
}

function index({ children }: Props) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  height: calc(100vh - 1px - ${({ theme }) => theme.size.headerHeight});
  background-color: ${({ theme }) => theme.color.mainBackgroundColor};
  color: ${({ theme }) => theme.color.font};

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
`;

export default index;
