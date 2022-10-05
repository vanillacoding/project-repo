import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CharacterSelection as S } from './styles';
import CharacterCanvas from '../CharacterCanvas';
import { setUserCharacter } from '../../reducers/userSlice';
import { hideModal } from '../../reducers/modalSlice';

export default function CharacterSelection({ isFirstSelect }) {
  const currentRoom = useSelector(state => state.rooms.currentRoom);
  const user = useSelector(state => state.user.data);
  const selectedCharacter = useRef(user?.character);
  const dispatch = useDispatch();
  const history = useHistory();

  function handleCancelButton() {
    dispatch(hideModal());
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await dispatch(setUserCharacter({
      selectedCharacter: selectedCharacter.current,
      nickname: event.target.childNodes[0].value,
    }));

    if (isFirstSelect) {
      dispatch(hideModal());
      history.push(`/room/${currentRoom}`);
    } else {
      dispatch(hideModal());
    }

  }

  return (
    <S.Container>
      <S.TitleWrapper>
        <h1>캐릭터를 선택하세요</h1>
      </S.TitleWrapper>
      <S.Form onSubmit={handleSubmit}>
        <S.Input type="text" defaultValue={user?.nickname} />
        <S.CanvasWrapper>
          <CharacterCanvas selectedCharacter={selectedCharacter}/>
        </S.CanvasWrapper>
        <S.ButtonWrapper>
          <S.Button onClick={handleCancelButton}>
            <span>
              취소
            </span>
          </S.Button>
          <S.Button>
            <span>
              {isFirstSelect === true ? '입장' : '선택'}
            </span>
          </S.Button>
        </S.ButtonWrapper>
      </S.Form>
    </S.Container>
  );
}
