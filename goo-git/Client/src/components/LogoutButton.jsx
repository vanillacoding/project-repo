import React from 'react';
import Button from './Button';
import { logoutButtonTheme } from '../styledComponents/Button.styled';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function LogoutButton({ onClick }) {
  function clickHandler() {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      return onClick();
    }
  }

  return (
    <Button theme={logoutButtonTheme} onClick={clickHandler}>
      <ExitToAppIcon />
    </Button>
  );
}
