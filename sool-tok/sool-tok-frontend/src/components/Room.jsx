import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Peer from 'simple-peer';

import { roomSocket, peerSocket, getMySocketId } from '../utils/socket';
import * as controlStream from '../utils/controlStream';

import bomb from '../assets/bomb.png';
import explosion from '../assets/explosion.gif';

import { BsUnlockFill, BsLockFill } from 'react-icons/bs';

import ChatContainer from '../containers/ChatContainer';
import Video, { StyledVideo } from './Video';
import SpeechGame from './SpeechGame';
import Button from './Button';
import UtilityBox from './UtilityBox';
import ActionFilter from './ActionFilter';
import Canvas from './Canvas';
import ErrorBox from './ErrorBox';

function Room({
  user,
  room,
  renderRoom,
  destroyRoom,
  addMember,
  deleteMember,
  updateRoomLockingStatus,
  turnOnFilter,
  turnOffFilter,
}) {
  const { room_id: roomId } = useParams();

  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  const [peers, setPeers] = useState({});
  const peersRef = useRef({});
  const myVideoRef = useRef();

  const [isFinalGame, setIsFinalGame] = useState(false);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [currentTurn, setCurrentTurn] = useState('');

  useEffect(() => {
    roomSocket.joinRoom({ roomId, user }, async ({ room, message }) => {
      if (!room) return setError(message);

      renderRoom(room);
      toast('방에 입장했습니다.', { type: toast.TYPE.DARK });

      try {
        const stream = await controlStream.init();
        myVideoRef.current.srcObject = stream;
        setIsStreaming(true);
      } catch (error) {
        setError(error.message);
      }
    });

    roomSocket.listenMemberJoined(({ newMember }) => addMember(newMember));
    roomSocket.listenMemberLeaved(({ socketId }) => {
      delete peersRef.current[socketId];
      setPeers(peers => {
        const { [socketId]: targetPeer, ...restPeers } = peers;
        if (targetPeer) targetPeer.destroy();
        return restPeers;
      });

      deleteMember(socketId);
    });

    roomSocket.listenUpdateRoomLockingStatus(({ isLocked }) =>
      updateRoomLockingStatus(isLocked),
    );

    roomSocket.listenRenderFilter(({ isFilterOn, filter }) => {
      if (isFilterOn) {
        turnOnFilter(filter);
      } else {
        turnOffFilter();
      }
    });

    return () => {
      roomSocket.leaveRoom({ roomId });
      roomSocket.cleanUpRoomListener();

      destroyRoom();
      controlStream.remove();
    };
  }, []);

  useEffect(() => {
    if (!isStreaming || !room) return;

    for (const member of room.memberList) {
      if (user._id === member._id) continue;

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: controlStream.get(),
      });

      peer.on('signal', signal => {
        peerSocket.sendingSignal({ signal, receiver: member });
      });

      peersRef.current[member.socketId] = peer;
      setPeers(prev => ({ ...prev, [member.socketId]: peer }));
    }

    peerSocket.listenSendingSignal(({ initiator, signal }) => {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: controlStream.get(),
      });
      peer.signal(signal);

      peer.on('signal', signal => {
        peerSocket.returnSignal({ signal, receiver: initiator });
      });

      peersRef.current[initiator.socketId] = peer;
      setPeers(prev => ({ ...prev, [initiator.socketId]: peer }));
    });

    peerSocket.listenReturningSignal(({ returner, signal }) => {
      const peer = peersRef.current[returner.socketId];
      peer.signal(signal);
    });

    return () => {
      peerSocket.cleanUpPeerListener();
    };
  }, [isStreaming]);

  useEffect(() => {
    if (!isFinalGame) return;
    setTimeout(() => setIsFinalGame(false), 2000);
  }, [isFinalGame]);

  const copyRoomUrl = useCallback(() => {
    const temp = document.createElement('textarea');
    temp.value = window.location.href;
    document.body.appendChild(temp);

    temp.select();
    document.execCommand('copy');
    toast('Url이 복사되었습니다', { type: toast.TYPE.DARK });
    document.body.removeChild(temp);
  }, []);

  if (!room || error) {
    return <ErrorBox message={error} text='메인으로' />;
  }

  return (
    <Container>
      <ActionFilter roomId={roomId} isFilterOn={!!room.filter} />
      <ChatContainer />
      <Header>
        <div>
          <h1>{room.title}</h1>
          <span>{room.isLocked ? <BsLockFill /> : <BsUnlockFill />}</span>
        </div>
        <Button onClick={copyRoomUrl}>URL 복사</Button>
      </Header>
      <Wrapper>
        <GameBox isMyTurn={isMyTurn}>
          <SpeechGame
            roomId={roomId}
            isMyTurn={isMyTurn}
            setIsMyTurn={setIsMyTurn}
            currentTurn={currentTurn}
            setCurrentTurn={setCurrentTurn}
            setIsFinalGame={setIsFinalGame}
          />
        </GameBox>
        <MemberList>
          {room.memberList.map(member => (
            <MemberBlock key={member.socketId}>
              {currentTurn === member.socketId && (isFinalGame ?
                <img className='explosion' src={explosion} alt='explosion' />
                :
                <img src={bomb} alt='bomb' />
              )}
              {room.filter && <Canvas emoji={room.filter} />}
              {member.socketId === getMySocketId() ?
                <StyledVideo
                  ref={myVideoRef}
                  autoPlay
                  playsInline
                  muted
                />
                :
                <Video
                  peer={peers[member.socketId]}
                />
              }
              <h3>{member.name}</h3>
            </MemberBlock>
          ))}
        </MemberList>
      </Wrapper>
      <UtilityBox room={room} />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.purple};

  & > button {
    z-index: 999;
    width: 36px;
    height: 36px;
    padding: 12px;
    position: fixed;
    bottom: 24px;
    right: 100px;
    text-align: center;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 92%;
`;

const Header = styled.header`
  width: inherit;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
  }

  h1 {
    margin: 0 16px 0 24px;
    font-size: 28px;
    color: ${({ theme }) => theme.orange};
  }

  span {
    font-size: 21px;
    color: ${({ theme }) => theme.red};
  }

  button {
    background-color: rgba(0, 0, 0, 0);
    margin-right: 24px;
    color: ${({ theme }) => theme.green};
    text-decoration: underline;
  }
`;

const GameBox = styled.div`
  min-width: 400px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MemberList = styled.div`
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MemberBlock = styled.div`
  position: relative;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h3 {
    margin-top: 24px;
    font-size: 18px;
    color: ${({ theme }) => theme.orange};
  }

  img {
    z-index: 20;
    position: absolute;
    top: -94px;
    left: -2px;
    width: 129%;
  }

  img.explosion {
    left: -36px;
    mix-blend-mode: screen;
  }
`;

export default Room;

Room.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
  }).isRequired,
  room: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    memberList: PropTypes.array.isRequired,
    maxNum: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    isLocked: PropTypes.bool.isRequired,
    isHost: PropTypes.bool.isRequired,
    filter: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  }),
  renderRoom: PropTypes.func.isRequired,
  destroyRoom: PropTypes.func.isRequired,
  addMember: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  updateRoomLockingStatus: PropTypes.func.isRequired,
  turnOnFilter: PropTypes.func.isRequired,
  turnOffFilter: PropTypes.func.isRequired,
};
