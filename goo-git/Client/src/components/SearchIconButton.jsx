import React from 'react';
import Button from './Button';
import { iconButtonTheme } from '../styledComponents/Button.styled';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchIconButton() {
  return (
    <Button theme={iconButtonTheme} type='submit'>
      <SearchIcon />
    </Button>
  );
}
