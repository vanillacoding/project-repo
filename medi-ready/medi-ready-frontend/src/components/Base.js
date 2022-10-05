import React from "react";
import styled from "styled-components";

export const PageTitle = ({ children, className }) => {
  return (
    <PageTitleWrapper className={className}>{children}</PageTitleWrapper>
  );
};

export const PageContent = ({ children, className }) => {
  return (
    <PageContentWrapper className={className}>{children}</PageContentWrapper>
  );
};

const PageTitleWrapper = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const PageContentWrapper = styled.article`
  position: relative;
  height: calc(100% - 115px);
  padding: ${({ theme }) => theme.padding.big};
`;
