/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Button({ width, height, handleClick, children }) {
  return (
    <ButtonContainer width={width} height={height} onClick={handleClick}>
      {children}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 0;
  border: 0;
  background-color: transparent;
  border: 3px solid white;
  color: white;
  cursor: pointer;
`;

Button.defaultProps = {
  width: 200,
  height: 100,
  handleClick: () => {},
};

Button.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  handleClick: PropTypes.func,
  children: PropTypes.element.isRequired,
};
