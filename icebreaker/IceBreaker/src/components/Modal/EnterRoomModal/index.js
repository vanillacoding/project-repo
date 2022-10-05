import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDatabase, ref, get, child, update } from 'firebase/database';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { changeMessage } from '../../../store/quizSlice';
import { saveRoomId } from '../../../store/battleSlice';
import { ENTER_ROOM, RESET } from '../../../constants/messages';
import { ROUTE, ROOMS } from '../../../constants/game';
import { ERROR } from '../../../constants/error';

import Message from '../../share/Message';
import Button from '../../share/Button';
import {
  Container,
  MessageArea,
  Title,
  Form,
} from '../../../styles/share/modalStyle';

function EnterRoomModal({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const rooms = useSelector((state) => state.battle.rooms);
  const roomId = useSelector((state) => state.battle.roomId);
  const [sharedRoomId, setSharedRoomId] = useState('');
  const [userName, setUserNameInput] = useState('');

  useEffect(() => () => dispatch(changeMessage(RESET)), [dispatch]);

  const handleInputByUserName = (ev) =>
    setUserNameInput(ev.target.value.trim());

  const handleInputBySharedRoomId = (ev) =>
    setSharedRoomId(ev.target.value.trim());

  const enterRoom = async (ev) => {
    ev.preventDefault();

    if (userName.length === 0) {
      setUserNameInput('');
      return dispatch(changeMessage(ENTER_ROOM.FILL_NAME));
    }

    try {
      const snapshot = await get(
        child(ref(getDatabase()), `${ROOMS}/${roomId}/breakers/0/name`),
      );

      if (snapshot.val() === userName) {
        setUserNameInput('');
        return dispatch(changeMessage(ENTER_ROOM.EXIST_NAME));
      }
    } catch (err) {
      history.push(ROUTE.ERROR, {
        error: ERROR.LOAD_DATA,
      });
    }

    window.sessionStorage.setItem('userName', JSON.stringify({ userName }));

    update(ref(getDatabase(), `${ROOMS}/${roomId}/breakers`), {
      1: {
        name: userName,
        isReady: false,
        level: 1,
        score: 0,
        isWinner: false,
      },
    });

    history.push(`${ROUTE.ROOM}/${roomId}`);
  };

  const checkRoomId = (ev) => {
    ev.preventDefault();

    if (sharedRoomId.length === 0) {
      return dispatch(changeMessage(ENTER_ROOM.FILL_BLANK));
    }

    if (!rooms[sharedRoomId]) {
      setSharedRoomId('');
      return dispatch(changeMessage(ENTER_ROOM.INVALID_ID));
    }

    dispatch(saveRoomId(sharedRoomId));
    setSharedRoomId('');
  };

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Title className="title">
        {roomId
          ? '입장할 닉네임을 입력해주세요'
          : '전달받은 방 ID를 입력해주세요'}
      </Title>
      <Form onSubmit={roomId ? enterRoom : checkRoomId}>
        <input
          className="input"
          type={roomId ? 'text' : 'number'}
          value={roomId ? userName : sharedRoomId}
          pattern={roomId ? null : '[0-9]*'}
          onChange={roomId ? handleInputByUserName : handleInputBySharedRoomId}
          maxLength={roomId ? '7' : null}
          autoFocus
        />
        <div className="button-area">
          <Button
            text="뒤로가기"
            size="small"
            backgroundColor="purple"
            onClick={onClose}
          />
          <Button
            text={roomId ? '입장하기' : 'ID확인'}
            type="submit"
            size="small"
            backgroundColor="purple"
          />
        </div>
      </Form>
    </Container>
  );
}

export default EnterRoomModal;

EnterRoomModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
