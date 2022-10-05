import React from 'react';
import { Link } from 'react-router-dom';
import { MainBodyWrapper } from '../styledComponents/MainBody.styled';
import NoteListHeader from './NoteListHeader';
import NoteList from './NoteList';
import Button from './Button';
import { createNewBranchTheme } from '../styledComponents/Button.styled';

export default function MainBody({
  noteListEntryInfos,
  onNoteListEntryClick,
}) {
  return (
    <MainBodyWrapper>
      <NoteListHeader />
      <Link to='/notes/new'>
        <Button theme={createNewBranchTheme}>
          새로운 쪽지 만들기 +
        </Button>
      </Link>
      <NoteList
        noteListEntryInfos={noteListEntryInfos}
        onNoteListEntryClick={onNoteListEntryClick}
      />
    </MainBodyWrapper>
  );
}
