import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import Button from './Button';
import ModalPortal from './ModalPortal';
import Modal from './Modal';
import FriendList from './FriendList';
import Loading from './Loading';

import theme from './styles/theme';

function MyPage({
  loading,
  error,
  user,
  friendList,
  friendRequestList,
  addFriendList,
  addFriendRequestList,
  logoutUser,
  onSubmit,
}) {
  const [isRequestList, setIsRequestList] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setmodalContent] = useState(null);

  useEffect(() => {
    addFriendList(user._id);
  }, []);

  useEffect(() => {
    if (!error) return;

    toast(error.message, { type: toast.TYPE.DARK });
  }, [error]);

  const toggleFriendList = ev => {
    if (isRequestList) {
      addFriendList(user._id);
      setIsRequestList(false);
    } else {
      addFriendRequestList(user._id);
      setIsRequestList(true);
    }
  };

  const openModal = element => {
    setModalOpen(true);
    setmodalContent(element);
  };

  return (
    <Container>
      {isModalOpen &&
        <ModalPortal>
          <Modal setModalOpen={setModalOpen}>{modalContent}</Modal>
        </ModalPortal>
      }
      <MyInfo>
        <MyInfoWrapper>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </MyInfoWrapper>
        <Button onClick={() => logoutUser(user._id)} color={theme.lightGray}>
          로그아웃
        </Button>
      </MyInfo>
      {loading ?
        <Loading />
        :
        <FriendList
          user={user}
          list={!isRequestList ? friendList : friendRequestList}
          isRequestList={isRequestList}
          openModal={openModal}
          setModalOpen={setModalOpen}
          onSubmit={onSubmit}
        />
      }
      <ListToggle onClick={toggleFriendList}>
        {isRequestList ? '친구 목록 보기' : '요청 목록 보기'}
      </ListToggle>
    </Container>
  );
}

const Container = styled.div`
  z-index: 20;
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 300px;
  height: 600px;
  padding-bottom: 64px;
  border-radius: 24px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.darkPurple};
`;

const MyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 18px;
  margin-bottom: 20px;
`;

const MyInfoWrapper = styled.div`
  color: ${({ theme }) => theme.orange};

  h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
  }
`;

const ListToggle = styled.a`
  position: absolute;
  bottom: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  color: ${({ theme }) => theme.purple};
  background-color: ${({ theme }) => theme.orange};

  &:hover {
    filter: brightness(0.7);
  }
`;

export default MyPage;

MyPage.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  friendList: PropTypes.array,
  friendRequestList: PropTypes.array,
  addFriendList: PropTypes.func.isRequired,
  addFriendRequestList: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
