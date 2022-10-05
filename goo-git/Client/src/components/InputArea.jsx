import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledInputArea } from '../styledComponents/InputArea.styled';

export default function InputArea({
  onChange,
  value,
  placeholder,
  name,
  theme
}) {
  function textChangeHandler(event) {
    onChange(event);
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledInputArea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={textChangeHandler}
      />
    </ThemeProvider>
  );
}

export const searchBarTheme = {
  border: 'none'
};
