import React from "react";
import styled from "styled-components";

const PageTitle = ({ children, className }) => {
  return (
    <Wrapper className={className}>{children}</Wrapper>
  );
};

const Wrapper = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

export default PageTitle;
