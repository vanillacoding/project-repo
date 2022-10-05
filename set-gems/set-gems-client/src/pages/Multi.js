import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";

import EnterForm from "../components/EnterForm";
import MultiRoom from "../components/MultiRoom";
import setTemporaryMessage from "../helper/setTemporaryMessage";
import { getStream } from "../helper/video";
import {
  CONNECT_ERROR, CONNECT_FAILED, DISCONNECT, EXIT_ROOM,
  FULL_ROOM, INVALID_NICKNAME, JOIN_ROOM, KNOCK,
} from "../constants/socketEvents";

function Multi({ onHomeButtonClick }) {
  const [roomName, setRoomName] = useState("");
  const [nickname, setNickname] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [myStream, setMyStream] = useState(null);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_SERVER_URL,
      { reconnection: false },
    );

    const handleSocketError = () => {
      setTemporaryMessage(
        "현재 같이하기 모드를 사용할 수 없습니다",
        setMessage,
        onHomeButtonClick(),
      );
    };

    socket.on(CONNECT_ERROR, handleSocketError);
    socket.on(CONNECT_FAILED, handleSocketError);
    socket.on(DISCONNECT, handleSocketError);

    socket.on(FULL_ROOM, () => {
      setTemporaryMessage("정원초과로 들어갈 수 없는 방입니다", setMessage);
    });

    socket.on(INVALID_NICKNAME, (message) => {
      setTemporaryMessage(message, setMessage);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEnterForm = (values) => {
    const { roomName, nickname, isMuted, isVideoOff } = values;

    setIsMuted(isMuted);
    setIsVideoOff(isVideoOff);

    async function enterRoom (nickname) {
      const myStream = await getStream();

      setMyStream(myStream);
      setRoomName(roomName);
      setNickname(nickname);
      socket.emit(JOIN_ROOM, roomName);
    }

    socket.emit(KNOCK, roomName, nickname, enterRoom);
  };

  const handleExitRoom = () => {
    myStream.getTracks().forEach(track => track.stop());

    setRoomName("");
    setNickname("");
    setIsMuted(false);
    setIsVideoOff(false);
    setMyStream(null);
    socket.emit(EXIT_ROOM, roomName);
  };

  const exitButton = (
    <button type="button" onClick={handleExitRoom}>
      방에서 나가기
    </button>
  );

  const homeButton = (
    <button type="button" onClick={onHomeButtonClick}>
      home
    </button>
  );

  return (
    <div>
      <div className="header">
        <h1>{roomName ? roomName : "같이하기"}</h1>
        {roomName ? exitButton : homeButton}
      </div>
      {message && <p className="message">{message}</p>}
      {!roomName
        ? <EnterForm onSubmit={handleEnterForm} />
        : <MultiRoom
          roomName={roomName}
          nickname={nickname}
          stream={myStream}
          streamSetting={{ isMuted, isVideoOff }}
          socket={socket}
        />}
    </div>
  );
}

Multi.propTypes = {
  onHomeButtonClick: PropTypes.func,
};

export default Multi;
