import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function BranchBar({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  width: ${({ theme: { size } }) => size.branchBarWidth};
  height: 100%;
  background-color: ${({ theme: { background } }) => background.grey3};
  color: ${({ theme: { font } }) => font.color.white};
`;

BranchBar.propTypes = {
  children: PropTypes.node.isRequired,
};
