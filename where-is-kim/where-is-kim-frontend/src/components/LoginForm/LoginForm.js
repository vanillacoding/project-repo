import React from "react";
import { Link } from "react-router-dom";
import FormField from "../FormField/FormField";
import styled from "styled-components";

export default function LoginForm({ onSubmit, email, password }) {
  return (
    <form onSubmit={onSubmit}>
      <FormField
        title="Email"
        type="email"
        controller={email}
        placeholder="Account Email"
      />
      <FormField
        title="Password"
        type="password"
        controller={password}
        placeholder="Password"
      />
      <ButtonWrap>
        <button>Login</button>
        <Link to="/signup">Signup</Link>
      </ButtonWrap>
    </form>
  );
}

export const ButtonWrap = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  & * {
    width: calc(50% - 10px);
    background-color: #eee;
    border: 0;
    vertical-align: top;
    line-height: 35px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    text-transform: uppercase;
  }
  & button {
    background-color: #4cd3c2;
  }
  & a {
    background-color: #ea6227;
  }
`;
