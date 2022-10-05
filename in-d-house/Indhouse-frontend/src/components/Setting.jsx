import React from "react";
import styled from "styled-components";

import Title from "./shared/Title";
import Profile from "./Profile";
import LogoutButton from "./buttons/LogoutButton";

import { title } from "../constants";

const Wrapper = styled.div`
  .setting-container {
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30rem;
    height: 30rem;
    margin-left: 3rem;
    padding: 1rem;
    border-radius: 0.2rem;
  }
`;

const Setting = () => {
  return (
    <Wrapper>
      <Title title={title.setting} />
      <div className="setting-container" >
        <Profile />
        <LogoutButton />
      </div>
    </Wrapper>
  );
};

export default Setting;
