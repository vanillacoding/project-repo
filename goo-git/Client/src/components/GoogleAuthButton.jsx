import React from 'react';
import { StyledGoogleAuthButton } from '../styledComponents/Entrance.styled';
import { G_LOGO } from '../constants/paths';

export default function GoogleAuthButton({
  signupOrLogin,
  onClick,
}) {
  function clickHandler() {
    onClick();
  }

  return (
    <StyledGoogleAuthButton onClick={clickHandler}>
      <img
        className='icon'
        src={G_LOGO}
        alt='G-logo'
      />
      <span className='buttonText'>{signupOrLogin} with Google</span>
    </StyledGoogleAuthButton>
  );
}
