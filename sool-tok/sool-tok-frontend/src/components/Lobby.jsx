import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { roomSocket } from '../utils/socket';

import Table from './Table';
import ModalPortal from './ModalPortal';
import Modal from './Modal';
import CreateRoomForm from './CreateRoomForm';
import JoinRoomForm from './JoinRoomForm';
import Button from './Button';

import theme from './styles/theme';
import beerVideo from '../assets/beer.mp4';
import logo from '../assets/logo.png';

function Lobby() {
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setmodalContent] = useState(null);

  useEffect(() => {
    roomSocket.updateRoomList();
    roomSocket.listenUpdateRoomList(({ rooms }) => setTables(rooms));

    return () => roomSocket.cleanUpLobbyListener();
  }, []);

  const moveToRoom = roomId => history.push(`rooms/${roomId}`);

  const createRoom = roomData => {
    roomSocket.createRoom({ roomData }, ({ roomId }) => moveToRoom(roomId));
  };

  const openModal = modalContent => {
    setmodalContent(modalContent);
    setModalOpen(true);
  };

  return (
    <Container>
      <img src={logo} alt='logo' />
      <Tables>
        {tables.map(table => (
          <Table key={table._id} id={table._id} title={table.title} />
        ))}
      </Tables>
      <h1>오늘 밤 친구와 술톡에서!🍺</h1>
      <Wrapper>
        <Button
          onClick={() => openModal(<CreateRoomForm onSubmit={createRoom} />)}
          color={theme.orange}>
          테이블 잡기🍷
        </Button>
        <Button
          onClick={() => openModal(<JoinRoomForm onSubmit={moveToRoom} />)}
          color={theme.emerald}>
          URL로 참여하기
        </Button>
      </Wrapper>
      {isModalOpen &&
        <ModalPortal>
          <Modal setModalOpen={setModalOpen}>{modalContent}</Modal>
        </ModalPortal>
      }
      <video
        type='video/mp4'
        src={beerVideo}
        width='300px'
        autoPlay
        loop
        muted
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.purple};

  img {
    z-index: 15;
    position: fixed;
    top: 24px;
    left: 24px;
    width: 100px;
  }

  h1 {
    z-index: 15;
    font-size: 72px;
    font-weight: 700;
    color: ${({ theme }) => theme.orange};
  }

  video {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    object-fit: cover;
    opacity: 0.2;
  }
`;

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  left: 24px;
  bottom: 24px;

  button {
    color: ${({ theme }) => theme.purple};
    margin-right: 16px;
  }
`;

const Tables = styled.div`
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  position: absolute;
  top: 60px;
  left: 0;

  a {
    text-decoration: none;
  }
`;

export default Lobby;
