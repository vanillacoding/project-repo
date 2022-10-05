import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Player from "../Player";
import MyVideo from "../MyVideo";
import Setting from "../Setting";
import Chat from "../Chat";
import CardArea from "../CardArea";
import { MultiResult } from "../Result";
import useRoomStatus from "../../hooks/useRoomStatus";
import usePlayer from "../../hooks/usePlayer";
import { WAITING, PLAYING, ENDED } from "../../constants/playState";
import { READY, START, START_SELECT, SELECT_SUCCESS, GAME_OVER } from "../../constants/socketEvents";

function MultiRoom({ roomName, nickname, stream, streamSetting, socket }) {
  const pointPerSet = 3;
  const myStatusRef = useRef();
  const [myStream, setMyStream] = useState(stream);
  const [
    point, isReady, isSelector, hasPenalty,
    isLeader, setIsLeader] = usePlayer(socket);
  const [
    state,
    setState,
    players,
    peers,
    isAllReady,
    selectTime,
    result,
  ] = useRoomStatus(socket, myStream, setIsLeader);

  useEffect(() => {
    return () => {
      stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    peers.forEach(({ peer }) => {
      if (peer.streams[0].id !== myStream.id) {
        peer.removeStream(peer.streams[0]);
        peer.addStream(myStream);
      }
    });
  }, [myStream.id]);

  useEffect(() => {
    if (isReady) {
      myStatusRef.current.classList.add("ready");
    } else {
      myStatusRef.current.classList.remove("ready");
    }
  }, [isLeader, isReady]);

  useEffect(() => {
    if (isSelector) {
      myStatusRef.current.classList.add("selector");
    } else {
      myStatusRef.current.classList.remove("selector");
    }
  }, [isSelector]);

  const handleStartButton = () => {
    socket.emit(START, roomName);
  };

  const startButton = (
    <button
      type="button"
      onClick={handleStartButton}
      disabled={!isAllReady}
    >
      {isAllReady ? "START" : "WAITING"}
    </button>
  );

  const handleReadyButton = () => {
    if (!isReady) {
      socket.emit(READY, true, roomName);
    } else {
      socket.emit(READY, false, roomName);
    }
  };

  const readyButton = (
    <button type="button" onClick={handleReadyButton}>
      {isReady ? "WAITING" : READY}
    </button>
  );

  const waitingButton = isLeader ? startButton : readyButton;

  const handleSetButton = () => {
    socket.emit(START_SELECT, roomName);
  };

  const setText = hasPenalty ? "Can't SET" : "SET";

  const setButton = (
    <button disabled={selectTime || hasPenalty} onClick={handleSetButton}>
      {selectTime !== 0 ? selectTime : setText}
    </button>
  );

  const handleSuccess = () => {
    if (isSelector) {
      socket.emit(SELECT_SUCCESS, roomName, point + pointPerSet);
    }
  };

  const handleGameCompleted = () => {
    if (isLeader) {
      socket.emit(GAME_OVER, roomName);
    }
  };

  const handleRestartButton = () => {
    setState(WAITING);
  };

  const playerElements = players.map((player) => {
    const peer = peers.find(({ id }) => id === player.id);

    return (
      <Player
        key={player.id}
        socket={socket}
        peer={peer ? peer.peer : null}
        player={player}
      />
    );
  });

  return (
    <div>
      <div className="play">
        <div className="main">
          {state === WAITING
            && <Chat roomName={roomName} socket={socket} />}
          {state === PLAYING && !isSelector && <div className="protector" />}
          {state === PLAYING
            && <CardArea
              onSuccess={handleSuccess}
              onGameCompleted={handleGameCompleted}
              roomName={roomName}
              socket={socket}
              isLeader={isLeader}
            />}
          {state === ENDED
            && <MultiResult result={result} />}
        </div>
        <div className="sub">
          <div className="players">
            <Setting
              stream={myStream}
              defaultSetting={streamSetting}
              onStreamChange={setMyStream}
            />
            <div className="player" ref={myStatusRef} >
              <p>{nickname}</p>
              <MyVideo
                stream={myStream}
              />
              <div>
                {point || 0}
              </div>
            </div>
            {playerElements}
          </div>
        </div>
        <div className="button">
          {state === WAITING && waitingButton}
          {state === PLAYING && setButton}
          {state === ENDED
            && <button onClick={handleRestartButton}>RESTART</button>}
        </div>
        <div className="mobile-setting">
          <Setting
            stream={myStream}
            defaultSetting={streamSetting}
            onStreamChange={setMyStream}
          />
        </div>
      </div>
    </div>
  );
}

MultiRoom.propTypes = {
  roomName: PropTypes.string,
  nickname: PropTypes.string,
  stream: PropTypes.shape({
    id: PropTypes.string,
    getTracks: PropTypes.func,
  }),
  streamSetting: PropTypes.shape({
    isMuted: PropTypes.bool,
    isVideoOff: PropTypes.bool,
  }),
  socket: PropTypes.shape({
    emit: PropTypes.func,
  }),
};

export default MultiRoom;
