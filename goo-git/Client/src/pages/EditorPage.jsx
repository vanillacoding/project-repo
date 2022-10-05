import React, { useState, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import EditorPageHeader from '../components/EditorPageHeader';
import Editor from '../components/Editor';
import requestCreateBranch from '../api/requestCreateBranch';
import requestCreateNote from '../api/requestCreateNote';
import requestDeleteBranch from '../api/requestDeleteBranch';
import requestNote from '../api/requestNote';
import checkHasWritingPermission from '../utils/checkHasWritingPermission';
import compareNoteChanges from '../utils/compareNoteChanges';
import { createEditor, Transforms } from 'slate';
import { withReact } from 'slate-react';
import { emitJoinRoom, emitLeaveRoom, emitTyping, listenForTyping } from '../services/socket';
import dateFormatter from '../utils/dateFormatter';
import uuid from 'uuid-random';

export default function EditorPage({
  currentUser,
  isShowModificationsMode,
  onShowModificationsModeToggle,
  isModified,
  onNoteModify,
  newBlocksCandidate,
  onCreateBranch,
  onSave,
  currentNote,
  currentBranch,
  onNoteChange,
  sharedUsers,
  onSharedUsersLoad,
  onHomeButtonClick,
  onDeleteBranch,
  onSharedUsersPermissionUpdate,
}) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const history = useHistory();
  const [hasWritingPermission, setHasWritingPermission] = useState(null);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
      idLookingForwards: uuid(),
    },
  ]);

  useEffect(() => {
    emitJoinRoom(currentBranch?._id);
    listenForTyping(setValue);

    return () => emitLeaveRoom(currentBranch?._id);
  }, [currentBranch]);

  const currentNoteUpdatedAt = useMemo(() => {
    if (!currentNote) return;

    return dateFormatter(currentNote.updated_at);
  }, []);

  useEffect(() => {
    if (!currentNote) return;

    setValue(currentNote.blocks);
  }, [currentNote]);

  async function onShowModificationsModeButtonClick() {
    if (!isShowModificationsMode) {
      onShowModificationsModeToggle();
      emitJoinRoom(currentBranch._id);

      let comparedNoteValue
        = JSON.parse(localStorage.getItem('googit-compared-note-value')) || null;

      if (comparedNoteValue) {
        Transforms.select(editor, [0]);
        setValueAfterInitializingSelect(comparedNoteValue);

        return;
      }

      const previousNote
        = await requestNote(currentUser._id, currentNote.previous_version);

      comparedNoteValue = compareNoteChanges(previousNote, currentNote);

      setValueAfterInitializingSelect(comparedNoteValue);
      localStorage.setItem('googit-compared-note-value', JSON.stringify(comparedNoteValue));

    } else {
      onShowModificationsModeToggle();
      setValueAfterInitializingSelect(currentNote.blocks);
      emitLeaveRoom(currentBranch._id);
    }
  }

  function setValueAfterInitializingSelect(value) {
    Transforms.select(editor, [0]);
    setValue(value);
  }

  async function homeButtonClickHandler() {
    onHomeButtonClick();
    history.push('/');
  }

  async function submitHandler() {
    const isBrandNew = !currentNote;

    let branchCreationResponse;

    if (isBrandNew) {
      branchCreationResponse = await requestCreateBranch(currentUser);

      if (!branchCreationResponse) return;
    }

    const branchId
      = isBrandNew
        ? branchCreationResponse.newBranch._id
        : currentNote.parent;

    const noteCreateResponse
      = await requestCreateNote(newBlocksCandidate, currentUser, branchId);

    if (!noteCreateResponse) return;

    if (isBrandNew) {
      onCreateBranch(branchCreationResponse.updatedUser);
    }

    onSave(noteCreateResponse.newNote, noteCreateResponse.updatedBranch);
  }

  async function deleteButtonClickHandler() {
    const isDeleteConfirmed
      = window.confirm('정말 삭제합니까? 수정기록도 지워집니다.');

    if (!isDeleteConfirmed) return;

    const branchDeleteResponse
      = await requestDeleteBranch(currentUser, currentBranch);

    onDeleteBranch(branchDeleteResponse.updatedUser);

    history.push('/');
  }

  function noteValueChangeHandler(newValue) {
    if (newValue === value) return;

    setValue(newValue);
    onNoteModify(newValue, isModified);
    emitTyping(currentBranch?._id, newValue);
  };

  useEffect(() => {
    checkHasWritingPermission(
      currentUser,
      currentNote,
      currentBranch,
      setHasWritingPermission
    );
  }, [currentNote]);

  return (
    <>
      <EditorPageHeader
        currentUser={currentUser}
        currentNote={currentNote}
        currentBranch={currentBranch}
        isShowModificationsMode={isShowModificationsMode}
        onShowModificationsModeButtonClick={onShowModificationsModeButtonClick}
        isModified={isModified}
        onHomeButtonClick={homeButtonClickHandler}
        onSubmit={submitHandler}
        onNoteChange={onNoteChange}
        sharedUsers={sharedUsers}
        onSharedUsersLoad={onSharedUsersLoad}
        onDeleteButtonClick={deleteButtonClickHandler}
        currentNoteUpdatedAt={currentNoteUpdatedAt}
        onSharedUsersPermissionUpdate={onSharedUsersPermissionUpdate}
      />
      <Editor
        editor={editor}
        value={value}
        hasWritingPermission={hasWritingPermission}
        onNoteValueChange={noteValueChangeHandler}
      />
    </>
  );
}
