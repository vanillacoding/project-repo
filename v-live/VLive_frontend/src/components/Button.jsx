import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export default function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
};

Button.defaultProps = {
  type: 'button',
};

const StyledButton = styled.button`
  all: unset;
  width: ${({ width }) => width || '130px'};
  height: ${({ height }) => height || '20px'};
  padding: 15px 20px;
  font-size: ${({ fontSize }) => fontSize || '15px'};
  line-height: ${({ fontSize }) => fontSize || '14px'};
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  text-align: center;
  cursor: pointer;
  border-radius: ${({ borderRadius }) => borderRadius || '20px'};
  background-color: ${({ bgColor, theme }) => bgColor || theme.gray};
  transition-property: scale, translateY;
  transition: scale 300ms ease-in;
  color: ${({ color, theme }) => color || theme.black};

  &:hover {
    transform: scale(0.97);
    opacity: 80%;
    background-color: ${({ hoverBgColor, theme }) =>
      hoverBgColor || theme.white};
    color: ${({ hoverColor, theme }) => hoverColor || theme.darkNavy};
  }
`;
