import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function GraphBox({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ theme: { size } }) => `calc(100% - ${size.branchBarWidth})`};
  height: 100%;
  background-color: ${({ theme: { background } }) => background.black};
  color: ${({ theme: { font } }) => font.color.white};
`;

GraphBox.propTypes = {
  children: PropTypes.node.isRequired,
};
