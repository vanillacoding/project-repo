import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, update } from 'firebase/database';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { takeSelectedItem, changeMessage } from '../../../store/quizSlice';
import itemCokeWeb from '../../../asset/itemCoke.webp';
import { rightAndLeft } from '../../../styles/share/animation';
import { flexCenter } from '../../../styles/share/common';
import { ROOMS, ITEM } from '../../../constants/game';
import { USE_ITEM } from '../../../constants/messages';

import Message from '../../share/Message';

function ItemModal({ onClose }) {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const opponentId = useSelector((state) => state.battle.opponentId);
  const itemsCount = useSelector((state) => state.quiz.itemsCount);

  const useItem2Coke = () => {
    if (!roomId) return dispatch(changeMessage(USE_ITEM.ONLY_BATTLE));
    if (itemsCount < 2) return dispatch(changeMessage(USE_ITEM.NOPE));

    update(ref(getDatabase(), `${ROOMS}/${roomId}/breakers/${opponentId}`), {
      attack: 'REDUCE',
    });

    dispatch(takeSelectedItem(ITEM.EFFECT.REDUCE_OPPONENT_TIME));
    onClose();
  };

  const useItem1Coke = () => {
    if (itemsCount === 0) return dispatch(changeMessage(USE_ITEM.NOPE));

    dispatch(takeSelectedItem(ITEM.EFFECT.ADD_USER_TIME));
    onClose();
  };

  return (
    <Container>
      <MessageArea>
        <Message height="15" />
      </MessageArea>
      <Item>
        <div className="cokes">
          <img
            src={itemCokeWeb}
            alt="coke"
            width="40px"
            height="75px"
            onClick={useItem1Coke}
          />
        </div>
        <span className="hint-comment">정답 맞추는 시간 +10초</span>
      </Item>
      <Item>
        <div className="cokes">
          {Array(2)
            .fill(null)
            .map((_, i) => (
              <img
                key={i}
                src={itemCokeWeb}
                alt="coke"
                width="40px"
                height="75px"
                onClick={useItem2Coke}
              />
            ))}
        </div>
        <span className="item-comment">상대브레이커 시간 -5초</span>
      </Item>
    </Container>
  );
}

export default ItemModal;

ItemModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const Container = styled.div`
  height: 100%;
  padding-bottom: 5px;
  font-family: 'Do Hyeon';
  text-align: center;
`;

const MessageArea = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 26%;

  .message {
    width: 80%;
    height: 30px;
    margin: auto;
    font-size: 17px;
    line-height: 30px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.deepGray};
    color: ${({ theme }) => theme.white};
  }
`;

const Item = styled.div`
  ${flexCenter}
  height: 37%;
  padding: 0 15px;

  .cokes {
    ${flexCenter}
    display: flex;
    text-align: center;
    width: 40%;

    img {
      transform: rotate(20deg);
      animation: ${rightAndLeft} 1.1s infinite ease-in;
    }
  }

  .item-comment {
    width: 60%;
    font-size: 18px;
    color: ${({ theme }) => theme.deepGray};
  }
`;
