import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { PageTitle } from "../Base";

const Error = ({ error }) => {
  return (
    <Wrapper>
      <PageTitle>Error</PageTitle>
      <p>{String(error)}</p>
      <StyledLink to="/">home</StyledLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 230px;
  display: block;
  width: calc(100vw - 230px);
  height: 100vw;
  padding: 96px 40px;
  background: #fff;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  min-width: 80px;
  height: 45px;
  margin-top: 10px;
  border-radius: 8px;
  background-color: #2f49d1;
  text-align: center;
  font-size: 14px;
  line-height: 45px;
  color: #fff;
  vertical-align: middle;
`;

export default Error;
