import React from 'react';
import { Link } from 'react-router-dom';
import { NoteListEntryWrapper } from '../styledComponents/MainBody.styled';
import dateFormatter from '../utils/dateFormatter';

export default function NoteListEntry({
  entryInfos,
  count,
  onNoteListEntryClick,
  creator,
}) {
  const isShared = !!entryInfos.branch.sharing_infos.length;
  const title = entryInfos.latestNote.blocks[0].children[0].text;
  const updatedAt = entryInfos.branch.updated_at;
  // const date = updatedAt.substring(0, 10);
  // const time = updatedAt.substring(11, 16);

  function NoteListEntryClickHandler(note, branch) {
    onNoteListEntryClick(note, branch);
  }

  return (
    <Link
      to={`/notes/${entryInfos.branch.latest_note}`}
      style={{
        textDecoration: 'none',
        color: 'black',
      }}>

      <NoteListEntryWrapper
        data-testid='NoteListEntryWrapper'
        onClick={NoteListEntryClickHandler.bind(null, entryInfos.latestNote, entryInfos.branch)}
      >
        <div data-testid='count'>{count + 1}</div>
        <div data-testid='title'>{title}</div>
        <div data-testid='creator'>{creator}</div>
        <div data-testid='updatedAt'>{`${dateFormatter(updatedAt)}`}</div>
        <div data-testid='isShared'>{isShared ? 'O' : 'X'}</div>
      </NoteListEntryWrapper>
    </Link>
  );
}
