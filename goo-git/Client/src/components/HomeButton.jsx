import React from 'react';
import { HomeButtonWrapper } from '../styledComponents/HomeButton.styled';
import Button from './Button';
import { homeButtonTheme } from '../styledComponents/Button.styled';

export default function HomeButton({ onClick }) {
  function homeButtonClickHandler() {
    onClick();
  }

  return (
    <HomeButtonWrapper>
      <Button
        theme={homeButtonTheme}
        onClick={homeButtonClickHandler}
      >
        구깃
      </Button>
    </HomeButtonWrapper>
  );
}
