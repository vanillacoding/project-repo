import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function DiffBox({ children }) {
  return <Wrapper>{children || null}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme: { background } }) => background.black};
  color: ${({ theme: { font } }) => font.color.white};
`;

DiffBox.propTypes = {
  children: PropTypes.node.isRequired,
};
