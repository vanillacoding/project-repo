import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledButton } from '../styledComponents/Button.styled';

export default function Button({
  children,
  onClick,
  name,
  value,
  theme,
}) {
  return (
    <ThemeProvider theme={theme}>
      <StyledButton name={name} value={value} onClick={onClick}>
        {children}
      </StyledButton>
    </ThemeProvider>
  );
}
