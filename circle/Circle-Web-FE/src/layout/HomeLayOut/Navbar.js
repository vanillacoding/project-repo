import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHeadphones } from "react-icons/fa";

import useLogin from "../../hooks/useLogin";
import theme from "../../config/constants/theme";

export default function Navbar() {
  const handleOnLogin = useLogin();

  return (
    <>
      <Container>
        <HomeLink to="/">
          <HomeIcon />
          <HomeTitle>Circle</HomeTitle>
        </HomeLink>
        <RightItems>
          <GuideLink to="/guide">GUIDE</GuideLink>
          <LoginButton onClick={handleOnLogin}>LOGIN</LoginButton>
        </RightItems>
      </Container>
      <NavHelper />
    </>
  );
}

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 60px;
  padding: 0px 20px;
  background-color: ${theme.white};
  font-weight: 400;
`;

const HomeLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${theme.blue};
`;

const HomeIcon = styled(FaHeadphones)`
  margin-right: 5px;
  font-size: 26px;
`;

const HomeTitle = styled.span`
  font-size: 28px;
`;

const RightItems = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
`;

const GuideLink = styled(Link)`
  display: block;
  text-decoration: none;
  font-size: 24px;
  color: ${theme.black};
`;

const LoginButton = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const NavHelper = styled.div`
  height: 60px;
`;
