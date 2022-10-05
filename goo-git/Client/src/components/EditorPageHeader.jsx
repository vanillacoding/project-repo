import React, { useState, useEffect } from 'react';
import {
  Header,
  Arrow,
  Blank,
  ArrowsWrapper,
  ArrowWrapper,
  ModifyRecordWrapper,
  ShowChangesButtonWrapper,
  LeftWrapper,
  RightWrapper,
  DeleteButtonWrapper,
  ShareButtonWrapper,
  SaveButtonWrapper,
} from '../styledComponents/EditorPageHeader.styled';
import Button from './Button';
import {
  deleteButtonTheme,
  coralButtonTheme,
  saveButtonTheme,
} from '../styledComponents/Button.styled';
import requestNoteAuthor from '../api/requestNoteAuthor';
import requestNote from '../api/requestNote';
import requestBranch from '../api/requestBranch';
import ShareButton from './ShareButton';
import HomeButton from './HomeButton';

export default function EditorPageHeader({
  currentUser,
  isShowModificationsMode,
  currentNoteUpdatedAt,
  onShowModificationsModeButtonClick,
  isModified,
  currentNote,
  currentBranch,
  onHomeButtonClick,
  onSubmit,
  onNoteChange,
  sharedUsers,
  onSharedUsersLoad,
  onDeleteButtonClick,
  onSharedUsersPermissionUpdate,
}) {
  const [authorName, setAuthorName] = useState(null);

  useEffect(() => {
    if (!currentNote) return;

    getNoteAuthorName();

    async function getNoteAuthorName() {
      setAuthorName(
        await requestNoteAuthor(
          currentUser._id,
          currentNote.created_by
        )
      );
    }
  }, [currentNote]);

  async function displayLinkedNote(version) {
    const note
      = version === 'previous'
        ? await requestNote(currentUser._id, currentNote.previous_version)
        : await requestNote(currentUser._id, currentNote.next_version);

    if (!note) return;

    const branch
      = await requestBranch(currentUser._id, note.parent);

    if (!branch) return;

    onNoteChange(note, branch);
  }

  function homeButtonClickHandler() {
    onHomeButtonClick();
  }

  function showModificationmodeToggleClickHandler() {
    onShowModificationsModeButtonClick();
  }

  function deleteButtonClickHandler() {
    onDeleteButtonClick();
  }

  function submitHandler() {
    onSubmit();
  }

  return (
    <Header>
      <LeftWrapper>
        <HomeButton onClick={homeButtonClickHandler} />
        <ArrowsWrapper>
          <ArrowWrapper>
            {
              currentNote?.previous_version && !isModified
              && <Arrow
                direction='left'
                onClick={displayLinkedNote.bind(null, 'previous')}
              />
            }
          </ArrowWrapper>
          <Blank />
          <ArrowWrapper>
            {
              currentNote?.next_version
              && <Arrow
                direction='right'
                onClick={displayLinkedNote.bind(null, 'next')}
              />
            }
          </ArrowWrapper>
        </ArrowsWrapper>
        <ShowChangesButtonWrapper>
          {
            currentNote?.previous_version && !isModified
            && <Button
              theme={coralButtonTheme}
              onClick={showModificationmodeToggleClickHandler}
            >
              {
                isShowModificationsMode
                  ? '수정사항 숨기기'
                  : '수정사항 보기'
              }
            </Button>
          }
        </ShowChangesButtonWrapper>
      </LeftWrapper>
      <ModifyRecordWrapper>
        {
          isShowModificationsMode
            ? `${authorName}님이 ${currentNoteUpdatedAt}에 수정함`
            : null
        }
      </ModifyRecordWrapper>
      <RightWrapper>
        <DeleteButtonWrapper>
          {
            currentNote
            && (currentUser._id === currentNote.created_by)
            && (currentNote._id === currentBranch.latest_note)
            && <Button
              theme={deleteButtonTheme}
              onClick={deleteButtonClickHandler}
            >
              삭제
              </Button>
          }
        </DeleteButtonWrapper>
        <ShareButtonWrapper>
          {
            currentNote
            && <ShareButton
              currentUser={currentUser}
              currentNote={currentNote}
              sharedUsers={sharedUsers}
              onSharedUsersLoad={onSharedUsersLoad}
              onSharedUsersPermissionUpdate={onSharedUsersPermissionUpdate}
              authorName={authorName}
            >
              공유
            </ShareButton>
          }
        </ShareButtonWrapper>
        <SaveButtonWrapper>
          {
            isModified
            && <Button
              theme={saveButtonTheme}
              onClick={submitHandler}
            >
              저장
            </Button>
          }
        </SaveButtonWrapper>
      </RightWrapper>
    </Header>
  );
}

