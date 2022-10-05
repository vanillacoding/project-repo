import React, { useEffect } from 'react';
import MainHeader from '../components/MainHeader';
import MainBody from '../components/MainBody';
import requestNoteList from '../api/requestNoteList';

export default function MainPage({
  onLogout,
  isPrivateMode,
  togglePrivateMode,
  currentUser,
  handleInput,
  noteListEntryInfos,
  onNoteListEntryClick,
  onPrivateNotesToggleClick,
  skip,
  keyword,
  onUpdateNoteList,
  onSetNoteList,
  sharedUsers,
}) {
  useEffect(() => {
    if (!currentUser) return;

    loadNoteList();

    async function loadNoteList() {
      const response
        = await requestNoteList(currentUser, isPrivateMode, skip, keyword);

      if (!response) return;

      return (skip)
        ? onUpdateNoteList(response)
        : onSetNoteList(response);
    }
  }, [currentUser, isPrivateMode, skip, keyword, sharedUsers]);

  return (
    <>
      <MainHeader
        isPrivateMode={isPrivateMode}
        togglePrivateMode={togglePrivateMode}
        onPrivateNotesToggleClick={onPrivateNotesToggleClick}
        onLogout={onLogout}
        handleInput={handleInput}
        currentUser={currentUser}
      />
      <MainBody
        isPrivateMode={isPrivateMode}
        currentUser={currentUser}
        noteListEntryInfos={noteListEntryInfos}
        onNoteListEntryClick={onNoteListEntryClick}
      />
    </>
  );
}
