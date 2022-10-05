import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function FloatingButton({ onClick, children }) {
  return (<StyledFloatingButton onClick={onClick}>{children}</StyledFloatingButton>);
}

const StyledFloatingButton = styled.button`
  all: unset;
  cursor: pointer;
  z-index: 999;
  padding: 10px;
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 48px;
  position: fixed;
  right: 24px;
  bottom: 24px;
  font-size: 36px;
  background-color: ${({ theme }) => theme.pink};
  color: ${({ theme }) => theme.purple};
  transition: 0.6s;

  &:hover {
    filter: brightness(0.7);
  }
`;

export default FloatingButton;

FloatingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
