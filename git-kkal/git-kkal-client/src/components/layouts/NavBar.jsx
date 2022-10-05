import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function NavBar({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.nav`
  width: 100%;
  height: ${({ theme: { size } }) => size.navBarHeight};
  background-color: ${({ theme: { background } }) => background.black};
  color: ${({ theme: { font } }) => font.color.grey};
`;

NavBar.defaultProps = {
  children: React.createElement('div'),
};

NavBar.propTypes = {
  children: PropTypes.node,
};
