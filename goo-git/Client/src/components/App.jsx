import React, { useEffect, useState } from 'react';
import { useHistory, Switch, Route } from 'react-router-dom';
import Entrance from './Entrance';
import MainPage from '../pages/MainPage';
import Loading from './Loading';
import EditorPage from '../containers/EditorContainer';
import requestCurrentUser from '../api/requestCurrentUser';
import { throttle } from 'lodash';
import { ROOT, LOGIN, NOTES } from '../constants/paths';
import { SKIP } from '../constants/stringsAndNumbers';

export default function App({
  hasToken,
  currentUser,
  onLogin,
  onLogout,
  onCreateBranch,
  togglePrivateMode,
  isPrivateMode,
  onSetNoteList,
  onUpdateNoteList,
  noteListEntryInfos,
  currentNote,
  onNoteListEntryClick,
  sharedUsers,
  onHomeButtonClick,
}) {
  const history = useHistory();
  const [keyword, setKeyword] = useState('');
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (!hasToken) {
      history.push(LOGIN);

      return;
    }

    loadCurrentUser();

    async function loadCurrentUser() {
      const currentUser = await requestCurrentUser();

      if (!currentUser) return;

      onLogin(currentUser);
    };
  }, []);

  useEffect(() => {
    const throttledScrollHandler = throttle(scrollHandler, 2000);

    function scrollHandler() {
      const { offsetHeight, scrollTop, scrollHeight } = document.documentElement;

      if (offsetHeight + scrollTop > scrollHeight * .3) {
        setSkip(skip + SKIP);
      }
    }

    window.addEventListener('scroll', throttledScrollHandler);

    return (() => {
      window.removeEventListener('scroll', throttledScrollHandler);
    });
  }, [noteListEntryInfos]);

  function skipInitializer() {
    if (!skip) return;

    setSkip(0);
  }

  function handleInput(event) {
    const userInput = event.target.keyword.value;

    if (!userInput) return;

    setKeyword(userInput);
  }

  return (
    <>
      {
        !hasToken
        && <Entrance onLogin={onLogin} />
      }
      {
        hasToken && !currentUser
        && <Loading text='정보를 불러오고 있어요' />
      }
      {
        hasToken && currentUser
        && <Switch>
          <Route exact path={ROOT}>
            <MainPage
              onLogout={onLogout}
              isPrivateMode={isPrivateMode}
              togglePrivateMode={togglePrivateMode}
              currentUser={currentUser}
              handleInput={handleInput}
              noteListEntryInfos={noteListEntryInfos}
              onLoad={onSetNoteList}
              onNoteListEntryClick={onNoteListEntryClick}
              skipInitializer={skipInitializer}
              onPrivateNotesToggleClick={skipInitializer}
              keyword={keyword}
              skip={skip}
              onUpdateNoteList={onUpdateNoteList}
              onSetNoteList={onSetNoteList}
              sharedUsers={sharedUsers}
            />
          </Route>
          <Route path={NOTES}>
            <EditorPage
              currentNote={currentNote}
              onCreateBranch={onCreateBranch}
              onHomeButtonClick={onHomeButtonClick.bind(null, skipInitializer)}
            />
          </Route>
        </Switch>
      }
    </>
  );
}
