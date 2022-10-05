import React from 'react';
import { NoteListWrapper } from '../styledComponents/MainBody.styled';
import NoteListEntry from './NoteListEntry';

export default function NoteList({
  noteListEntryInfos,
  onNoteListEntryClick,
}) {
  function createBranchEntries() {
    return noteListEntryInfos.map((noteListEntryInfo, i) => (
      <NoteListEntry
        key={noteListEntryInfo.latestNote._id}
        onNoteListEntryClick={onNoteListEntryClick}
        entryInfos={noteListEntryInfo}
        count={i}
        creator={noteListEntryInfo.author.username}
      />
    ));
  }

  return (
    <NoteListWrapper>
      {noteListEntryInfos && createBranchEntries()}
    </NoteListWrapper>
  );
}
