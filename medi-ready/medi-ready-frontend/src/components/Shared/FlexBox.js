import React from "react";
import styled from "styled-components";

const FlexBox = ({ children, className }) => {
  return <FlexDiv className={className}>{children}</FlexDiv>;
};

const FlexDiv = styled.div`
  position: relative;
  display: flex;
  flex: 1;

  > * {
    margin-top: 20px;
    width: 50%;
  }
`;

export default FlexBox;
