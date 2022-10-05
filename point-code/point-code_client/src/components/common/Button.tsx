import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const buttonStyle = css`
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  background: ${props => props.theme.color.green[4]};
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.color.green[3]};
  }
  &:disabled {
    background: ${props => props.theme.color.gray[3]};
    color: ${props => props.theme.color.gray[6]};
    cursor: not-allowed;
  }  
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props: any) => (
  props.to ? (
    <StyledLink {...props} />
  ) : (
    <StyledButton {...props} />
  )
);

export default Button;

