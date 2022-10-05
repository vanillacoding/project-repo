import React from "react";
import FormField from "../../components/FormField/FormField";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonWrap } from "../../components/LoginForm/LoginForm";

export default function Signup({
  onSubmit,
  username,
  email,
  password,
  fileInput,
}) {
  return (
    <Wrapper>
      <div>
        <h3>RESISTER</h3>
        <form onSubmit={onSubmit}>
          <FormField
            title="Name"
            type="text"
            controller={username}
            placeholder="Type your name"
          />
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
          <legend style={{ fontSize: "16px", margin: "21px 0 10px" }}>
            Profile Picture
          </legend>
          <input type="file" ref={fileInput} />
          <ButtonWrap>
            <button>Resigter</button>
            <Link to="/">Back</Link>
          </ButtonWrap>
        </form>
      </div>
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  width: 600px;
  height: 100%;
  margin: auto;
  display: flex;
  & > div {
    width: 100%;
    align-self: center;
  }
`;
