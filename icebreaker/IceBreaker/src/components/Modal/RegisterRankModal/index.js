import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, get, set, child } from '@firebase/database';
import useSound from 'use-sound';
import PropTypes from 'prop-types';

import { changeMessage } from '../../../store/quizSlice';
import {
  Container,
  MessageArea,
  Title,
  Form,
} from '../../../styles/share/modalStyle';
import { ROUTE, RANKERS } from '../../../constants/game';
import { GAME } from '../../../constants/messages';
import { ERROR } from '../../../constants/error';

import Message from '../../share/Message';
import Button from '../../share/Button';

function RegisterRankModal({ onClose, hasRank }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const score = useSelector((state) => state.quiz.score);
  const [name, setName] = useState('');
  const [play] = useSound('/audio/click.mp3');

  const handleInput = (ev) => setName(ev.target.value.trim());

  const submitName = async (ev) => {
    ev.preventDefault();
    play();

    if (!name) {
      dispatch(changeMessage(GAME.FILL_BLANK));
      return setName('');
    }

    try {
      const rankedName = (
        await get(child(ref(getDatabase()), `${RANKERS}/${name}`))
      ).val();

      if (rankedName !== null) {
        dispatch(changeMessage(GAME.EXIST_RANK));
        return setName('');
      }
    } catch (err) {
      history.push(ROUTE.ERROR, {
        error: ERROR.LOAD_DATA,
      });
    }

    set(ref(getDatabase(), `${RANKERS}/${name}`), {
      name,
      score,
    });

    hasRank(true);
    onClose();
  };

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Title>랭킹에 등록할 이름을 등록해주세요</Title>
      <Form onSubmit={submitName}>
        <input
          className="input"
          type="text"
          maxLength="7"
          value={name}
          onChange={handleInput}
          autoFocus
        />
        <div className="button-area">
          <Button
            text="뒤로가기"
            size="small"
            backgroundColor="lightGray"
            onClick={onClose}
          />
          <Button
            text="등록하기"
            type="submit"
            size="small"
            backgroundColor="red"
          />
        </div>
      </Form>
    </Container>
  );
}

export default RegisterRankModal;

RegisterRankModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  hasRank: PropTypes.func.isRequired,
};
