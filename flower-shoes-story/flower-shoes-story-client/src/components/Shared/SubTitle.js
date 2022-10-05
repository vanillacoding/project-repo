import React from "react";
import styled from "styled-components";

const SubTitle = ({ children }) => {
  return (
    <Wrapper>{children}</Wrapper>
  );
};

const Wrapper = styled.h3`
  display: block;
  height: auto;
  margin: 0 auto;
  border-bottom: 0;
  font-size: 17px;
  line-height: 1.5em;
  font-family: 'adrianna';
`;

export default SubTitle;
