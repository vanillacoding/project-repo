import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { buttons, buttonSizes, buttonColors } from '../assets/styles/theme';

export default function TextButton({ ...props }) {
  return (
    <StyledButton {...props}>
      {props.icon && <props.icon size="24" />}
      {props.label}
    </StyledButton>
  );
}

TextButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  icon: PropTypes.func,
  size: PropTypes.string,
  label: PropTypes.string.isRequired,
};

TextButton.defaultProps = {
  type: 'button',
  size: 'large',
  color: 'white',
};

const StyledButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: ${({ variant, color }) =>
    variant === 'outline'
      ? `-5px 5px 0px 0px ${buttonColors[color].shadow}`
      : 'none'};
  border-style: solid;
  border-width: ${({ variant }) => buttons[variant].borderWidth};
  border-color: ${({ color }) => buttonColors[color].border};
  width: ${({ size }) => buttonSizes[size].width};
  height: ${({ size }) => buttonSizes[size].height};
  padding: ${({ size }) => buttonSizes[size].padding};
  font-size: ${({ size }) => buttonSizes[size].fontSize};
  line-height: ${({ size }) => buttonSizes[size].lineHeight};
  font-weight: ${({ size }) => buttonSizes[size].fontWeight};
  color: ${({ color }) => buttonColors[color].text};
  border-radius: ${({ variant, size }) =>
    variant === 'rounded' && buttonSizes[size].height};
  background-color: ${({ color }) => buttonColors[color].background};
  &:active {
    box-shadow: none;
    ${({ variant }) =>
      variant === 'outline' ? `transform: translate(-5px)` : 'transform: none'};
  }

  svg {
    margin-right: 1.2rem;
  }
`;
