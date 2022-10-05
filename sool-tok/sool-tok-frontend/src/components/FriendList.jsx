import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import AddFriendForm from './AddFriendForm';
import Button from './Button';
import FriendCell from './FriendCell';

import theme from './styles/theme';

function FriendList({ setModalOpen, user, list, isRequestList, openModal, onSubmit }) {
  return (
    <Wrapper>
      {!isRequestList &&
        <Button
          onClick={() => openModal(<AddFriendForm setModalOpen={setModalOpen} userId={user._id} />)}
          color={theme.orange}>
          친구 추가하기
        </Button>
      }
      {list.map(member => (
        <FriendCell
          key={member._id}
          name={member.name}
          photoUrl={member.photoUrl}
          isOnline={member.isOnline}>
          {isRequestList &&
            <RequestContolBox>
              <Button
                onClick={() => {
                  onSubmit(user._id, true, member._id);
                  toast('친구 요청을 수락했습니다.', { type: toast.TYPE.DARK });
                }}
                color={theme.green}>
                <IoMdCheckmark size={20} />
              </Button>
              <Button
                onClick={() => {
                  onSubmit(user._id, false, member._id);
                  toast('친구 요청을 거절했습니다.', { type: toast.TYPE.DARK });
                }}
                color={theme.pink}>
                <IoMdClose size={20} />
              </Button>
            </RequestContolBox>
          }
        </FriendCell>
      ))}
      {!list.length &&
        <div>
          {!isRequestList ? '친구를 추가해보세요!☀️' : '친구 요청 목록이 없습니다..😢'}
        </div>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: inherit;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  color: ${({ theme }) => theme.orange};

  &::-webkit-scrollbar {
    display: none;
  }

  button {
    margin-bottom: 12px;
    color: black;
  }
`;

const RequestContolBox = styled.div`
  position: absolute;
  right: 10px;
  display: flex;

  button {
    margin: 0;
    padding: 4px;
    width: 20px;
    height: 20px;
  }
  button:nth-child(1) {
    margin-right: 8px;
  }
`;

export default FriendList;

FriendList.propTypes = {
  user: PropTypes.object,
  list: PropTypes.array.isRequired,
  isRequestList: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
