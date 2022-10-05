import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  top: 0;
  padding: 1rem 10%;

  a {
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  .nav-link a {
    margin-left: 1.5rem;
  }
`;

const LandingNav = () => {
  return (
    <Nav>
      <Link to="/">In-d house</Link>
      <div className="nav-link">
        <a href="https://www.vanillacoding.co/">Vaco</a>
        <a href="https://github.com/In-d-house">Git hub</a>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
      </div>
    </Nav>
  );
};

export default LandingNav;
