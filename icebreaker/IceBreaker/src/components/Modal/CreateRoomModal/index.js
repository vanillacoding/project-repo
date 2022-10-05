import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, set, get, child } from '@firebase/database';
import sampleSize from 'lodash-es/sampleSize';
import useSound from 'use-sound';
import PropTypes from 'prop-types';

import { changeMessage } from '../../../store/quizSlice';
import { saveRoomId, saveUserName } from '../../../store/battleSlice';
import { copyToClipboard } from '../../../utils/copyToClipboard';
import {
  MODAL_TITLE,
  ROOMS,
  ROUTE,
  QUIZ,
  QUIZ_LENGTH,
} from '../../../constants/game';
import { MAKE_ROOM, RESET } from '../../../constants/messages';
import { ERROR } from '../../../constants/error';

import Message from '../../share/Message';
import Button from '../../share/Button';
import {
  Container,
  MessageArea,
  Title,
  Form,
} from '../../../styles/share/modalStyle';

function CreateRoomModal({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef();
  const roomId = useSelector((state) => state.battle.roomId);
  const userName = useSelector((state) => state.battle.userName);
  const [title, setTitle] = useState(MODAL_TITLE.INPUT_HOST_NAME);
  const [userNameInput, setUserNameInput] = useState('');
  const [play] = useSound('/audio/click.mp3');

  useEffect(() => {
    return () => {
      dispatch(saveRoomId(''));
      dispatch(changeMessage(RESET));
    };
  }, [dispatch]);

  const enterRoom = async (userName, roomId, ev) => {
    ev.preventDefault();
    play();

    try {
      const totalQuizCollection = (
        await get(child(ref(getDatabase()), QUIZ))
      ).val();
      const newQuizCollection = sampleSize(totalQuizCollection, QUIZ_LENGTH);

      set(ref(getDatabase(), `${ROOMS}/${roomId}`), {
        quizCollection: newQuizCollection,
        active: true,
        isAllReady: false,
        onBattle: true,
        breakers: [
          {
            name: userName,
            isReady: false,
            level: 1,
            score: 0,
          },
          {
            name: '',
            isReady: false,
            level: 1,
            score: 0,
          },
        ],
      });
    } catch (err) {
      history.push(ROUTE.ERROR, {
        error: ERROR.LOAD_DATA,
      });
    }

    history.push(`${ROUTE.ROOM}/${roomId}`);
  };

  const makeRoom = (ev) => {
    play();
    ev.preventDefault();

    if (userNameInput.length === 0) {
      setUserNameInput('');
      return dispatch(changeMessage(MAKE_ROOM.FILL_BLANK));
    }

    const roomId = Date.now();

    dispatch(saveUserName(userNameInput));
    window.sessionStorage.setItem(
      'userName',
      JSON.stringify({ userName: userNameInput }),
    );

    setUserNameInput(roomId);
    copyToClipboard(roomId);

    dispatch(saveRoomId(roomId));
    dispatch(changeMessage(MAKE_ROOM.URL_COPIED));

    inputRef.current.setAttribute('readOnly', true);
    setTitle(MODAL_TITLE.PASS_ROOM_ID);
  };

  const handleInputByUserName = (ev) =>
    setUserNameInput(ev.target.value.trim());

  return (
    <Container>
      <MessageArea>
        <Message height="10" />
      </MessageArea>
      <Title className="title">{title}</Title>
      <Form
        onSubmit={roomId ? enterRoom.bind(null, userName, roomId) : makeRoom}
      >
        <input
          className="input"
          type="text"
          value={userNameInput}
          onChange={handleInputByUserName}
          ref={inputRef}
          maxLength={roomId ? null : '7'}
          autoFocus
        />
        <div className="button-area">
          <Button
            text={roomId ? '방 삭제하기' : '뒤로 가기'}
            size="small"
            backgroundColor="purple"
            onClick={onClose}
          />
          <Button
            text={roomId ? '입장하기' : '방 만들기'}
            type="submit"
            size="small"
            backgroundColor="purple"
            onClick={play}
          />
        </div>
      </Form>
    </Container>
  );
}

export default CreateRoomModal;

CreateRoomModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
