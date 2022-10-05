import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonWrap } from "../../components/LoginForm/LoginForm";

export default function Confirm({ isPending, message }) {
  return (
    <Wrapper>
      <Box>
        <h3>{isPending ? "Loading" : message}</h3>
        <ConfirmButtonWrap>
          <Link to="/">Home</Link>
        </ConfirmButtonWrap>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
`;
const Box = styled.div`
  align-self: center;
  text-align: center;
  border: 1px solid #eee;
  width: 100%;
  max-width: 50%;
  padding: 40px;
`;
const ConfirmButtonWrap = styled(ButtonWrap)`
  justify-content: center;
`;
