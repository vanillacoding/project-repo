import React from 'react';
import Button from './Button';
import { coralButtonTheme } from '../styledComponents/Button.styled';

export default function PrivateNotesToggleButton({ buttonMode, onClick }) {
  const content = buttonMode ? '모두 보기' : '나만의 쪽지 보기';

  function clickHandler() {
    onClick();
  };

  return (
    <Button
      theme={coralButtonTheme}
      onClick={clickHandler}
    >
      {content}
    </Button>
  );
}
