import React from 'react';
import {
  SharedUserListWrapper,
  PermissionUpdateForm,
  SharedUserListMain,
  SharedListHeader,
} from '../styledComponents/EditorPageHeader.styled';
import Button from './Button';
import { permissionHandleButtonTheme } from '../styledComponents/Button.styled';

export default function SharedUserList({
  sharedUsers,
  submitHandler,
  onClick,
}) {
  function clickHandler(event) {
    onClick(event.target.value);
  }

  return (
    <SharedUserListWrapper>
      <SharedListHeader>공유받은 이용자 목록</SharedListHeader>
      <SharedUserListMain>
        {
          sharedUsers
          && sharedUsers.map(user => (
            <PermissionUpdateForm key={user._id} onSubmit={submitHandler}>
              <input
                name='email'
                value={user.sharedUser.email}
                disabled
              />
              <select name='permission'>
                <option>{user.permission}</option>
                <option>{user.permission === 'write' ? 'read only' : 'write'}</option>
              </select>
              <div>
                <Button
                  theme={permissionHandleButtonTheme}
                  onClick={clickHandler}
                  name='update'
                  value='update'
                >
                  수정
                </Button>
                <Button
                  theme={permissionHandleButtonTheme}
                  onClick={clickHandler}
                  name='delete'
                  value='delete'
                >
                  삭제
              </Button>
              </div>
            </PermissionUpdateForm>
          ))
        }
      </SharedUserListMain>
    </SharedUserListWrapper>
  );

}
