import React from 'react';
import { MainHeaderWrapper } from '../styledComponents/MainHeader.styled';
import { useHistory } from 'react-router-dom';
import { auth } from '../config/firebase';
import PrivateNotesToggleButton from './PrivateNotesToggleButton';
import SearchBar from './SearchBar';
import LogoutButton from './LogoutButton';
import HomeButton from './HomeButton';
import { LOGIN } from '../constants/paths';
import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';

export default function MainHeader({
  onLogout,
  isPrivateMode,
  handleInput,
  currentUser,
  onPrivateNotesToggleClick,
  togglePrivateMode,
}) {
  const history = useHistory();

  async function logoutClickHandler() {
    await auth.signOut();
    localStorage.removeItem(GOOGIT_LOGIN_TOKEN);
    onLogout();
    history.push(LOGIN);
  }

  function privateNotesToggleHandler() {
    onPrivateNotesToggleClick();
    togglePrivateMode();
  }

  function searchHandler() {
    onPrivateNotesToggleClick();
  }

  function homeButtonClickHandler() {
    window.location.reload();
  }

  return (
    <MainHeaderWrapper>
      <section>
        <HomeButton onClick={homeButtonClickHandler} />
        <PrivateNotesToggleButton
          buttonMode={isPrivateMode}
          onClick={privateNotesToggleHandler}
        />
        <SearchBar
          handleInput={handleInput}
          currentUser={currentUser}
          onSubmit={searchHandler}
        />
        <LogoutButton onClick={logoutClickHandler} />
      </section>
    </MainHeaderWrapper>
  );
}
