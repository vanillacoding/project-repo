import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../lib/colors';

const Navbar = ({
  isAuthenticated,
  logo,
  children
}) => (
  <NavWrapper>
    <Link to={isAuthenticated ? '/waiting' : '/'}>
      <img src={logo} alt='logo'/>
    </Link>
    <LinkWrapper>
      {children}
    </LinkWrapper>
  </NavWrapper>
);

const NavWrapper = styled.nav`
  height: 10vh;
  width: 100%;
  background-color: transparent;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;

  img {
    height: 8vh;
  }
`;

const LinkWrapper = styled.div`
  font-size: 1.5rem;

  button {
    background-color: ${colors.MAIN_TEXT_COLOR};
    padding: 0.9rem 1.7rem;
    border: 0;
    border-radius: 2rem;
    cursor: pointer;
    font-size: 1.5rem;
  }

  button:hover {
    color: ${colors.MAIN_TEXT_COLOR};
    background-color: ${colors.HIGHLIGHT_COLOR};
  }

  a {
    background-color: ${colors.MAIN_TEXT_COLOR};
    padding: 0.9rem 1.7rem;
    border-radius: 2rem;
  }

  a:hover {
    color: ${colors.MAIN_TEXT_COLOR};
    background-color: ${colors.HIGHLIGHT_COLOR};
  }
`;

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logo: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Navbar;
