import { useState, useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { RiGamepadFill } from 'react-icons/ri';
import { IoCaretBack } from 'react-icons/io5';
import styled from 'styled-components';
import useSound from 'use-sound';

import { changeMessage } from '../../store/quizSlice';
import { saveRoomData, saveRoomId } from '../../store/battleSlice';
import { bounce, pounding } from '../../styles/share/animation';
import { flexCenter, flexCenterColumn } from '../../styles/share/common';
import { Container, RoomHeader } from '../../styles/share/roomStyle';
import { ROUTE, ROOMS } from '../../constants/game';
import { BATTLE, RESET } from '../../constants/messages';

import Message from '../share/Message';
import Button from '../share/Button';
import BarSpinner from '../share/LoadingSpinner/BarSpinner';

const Portal = lazy(() => import('../Portal'));
const Modal = lazy(() => import('../Modal'));
const CreateRoomModal = lazy(() => import('../Modal/CreateRoomModal'));
const EnterRoomModal = lazy(() => import('../Modal/EnterRoomModal'));

function Rooms() {
  const dispatch = useDispatch();
  const history = useHistory();
  const rooms = useSelector((state) => state.battle?.rooms);
  const roomId = useSelector((state) => state.battle?.roomId);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [enterModalOpen, setEnterModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [play] = useSound('/audio/click.mp3');

  useEffect(() => {
    dispatch(changeMessage(BATTLE.WAITING));

    const cleanUp = onValue(ref(getDatabase(), ROOMS), (snapshot) => {
      const rooms = snapshot.val();

      if (!rooms) setLoading(true);

      dispatch(saveRoomData(rooms));
      setLoading(true);
    });

    return () => {
      dispatch(changeMessage(RESET));
      dispatch(saveRoomId(''));
      cleanUp();
    };
  }, [dispatch, history]);

  const enterRoom = (roomId) => {
    play();
    dispatch(saveRoomId(roomId));
    openEnterModal();
  };

  const openEnterModal = () => {
    play();
    setEnterModalOpen(true);
    dispatch(changeMessage(RESET));
  };

  const closeEnterModal = () => {
    play();
    setEnterModalOpen(false);
    dispatch(changeMessage(RESET));
  };

  const openCreateModal = () => {
    play();
    setCreateModalOpen(true);
    dispatch(changeMessage(RESET));
  };

  const closeCreateModal = () => {
    play();

    if (roomId) {
      set(ref(getDatabase(), `${ROOMS}/${roomId}`), null);
    }

    setCreateModalOpen(false);
    dispatch(changeMessage(RESET));
  };

  return (
    <Container>
      <RoomHeader>
        <h1 className="title">
          BREAKER <br />
          BATTLE
        </h1>
        <Link to={ROUTE.MENU}>
          <BackButton type="button">
            <IoCaretBack />
          </BackButton>
        </Link>
      </RoomHeader>
      <Message />
      <RoomList>
        {rooms
          ? Object.entries(rooms).map(([id, room]) => {
              return room.onBattle ? (
                <RoomItem
                  key={id}
                  onClick={() => enterRoom(id)}
                  active={room.active}
                >
                  {room.active ? null : (
                    <span className="on-battle">
                      <RiGamepadFill />
                    </span>
                  )}
                  <div className="breaker-box">
                    <span className="breaker-order">BREAKER1</span>
                    <span className="breaker-name">
                      {room.breakers[0].name !== ''
                        ? room.breakers[0].name
                        : '?'}
                    </span>
                  </div>
                  <div className="vs">vs</div>
                  <div className="breaker-box">
                    <span className="breaker-order">BREAKER2</span>
                    <span className="breaker-name">
                      {room.breakers[1].name !== ''
                        ? room.breakers[1].name
                        : '?'}
                    </span>
                  </div>
                </RoomItem>
              ) : null;
            })
          : null}
      </RoomList>
      <RoomFooter>
        <Button
          text="방 ID로 입장"
          size="medium"
          backgroundColor="skyBlue"
          onClick={openEnterModal}
        />
        {enterModalOpen && (
          <Suspense fallback={null}>
            <Portal>
              <Modal onClose={closeEnterModal}>
                <EnterRoomModal onClose={closeEnterModal} />
              </Modal>
            </Portal>
          </Suspense>
        )}
        <Button
          text="방 만들기"
          size="medium"
          backgroundColor="pink"
          onClick={openCreateModal}
        />
        {createModalOpen && (
          <Suspense fallback={null}>
            <Portal>
              <Modal onClose={closeCreateModal}>
                <CreateRoomModal onClose={closeCreateModal} />
              </Modal>
            </Portal>
          </Suspense>
        )}
      </RoomFooter>
      {!loading ? <BarSpinner /> : null}
    </Container>
  );
}

export default Rooms;

const BackButton = styled.button`
  position: absolute;
  top: 5px;
  left: 0;
  font-size: 30px;
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.purple};
  transition: all 100ms ease-out;
  animation: ${pounding} 1.2s infinite;

  &:hover {
    transform: scale(1.2);
    color: ${({ theme }) => theme.deepPink};
  }
`;

const RoomList = styled.div`
  height: 50%;
  padding: 15px 30px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 13px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 30px;
    background-color: ${({ theme }) => theme.skyBlue};

    &:hover {
      background-color: ${({ theme }) => theme.white};
      border: none;
    }
  }
`;

const RoomItem = styled.li`
  ${flexCenter}
  position: relative;
  height: 70px;
  margin-bottom: 15px;
  border: 3px solid
    ${({ theme, active }) => (active ? theme.white : theme.lightGray)};
  border-radius: 20px;
  border-style: dashed;
  cursor: pointer;
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
  font-family: 'Do hyeon';
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme, active }) =>
    active ? theme.lightPink : theme.purple};
  transition: transform 100ms ease-out;

  .breaker-box {
    ${flexCenterColumn}
    font-size: 16px;
    width: 60%;
  }

  .vs {
    font-size: 24px;
    color: ${({ active, theme }) => (active ? theme.deepBlue : theme.skyBlue)};
  }

  .breaker-order {
    color: ${({ theme }) => theme.deepGray};
  }

  .breaker-name {
    margin-top: 5px;
    font-size: 20px;
    color: ${({ active, theme }) => (active ? theme.white : theme.lightGray)};
  }

  &:hover {
    background-color: ${({ theme }) => theme.skyBlue};
    transform: scale(1.01);
  }

  .on-battle {
    position: absolute;
    top: -10px;
    left: -17px;
    width: 38px;
    height: 28px;
    padding-bottom: 10px;
    font-size: 34px;
    border-radius: 30%;
    background-color: ${({ theme }) => theme.deepGray};
    color: ${({ theme }) => theme.skyBlue};
    transform: rotate(180deg);
    animation: ${bounce} 1.3s infinite;
  }
`;

const RoomFooter = styled.div`
  ${flexCenter}
  height: 25%;

  button {
    margin: 10px;
    font-family: 'Do hyeon';

    &:first-child {
      animation: ${pounding} 1.2s 600ms infinite ease-in;
    }

    &:last-child {
      animation: ${pounding} 1.2s infinite ease-in;
    }
  }
`;
