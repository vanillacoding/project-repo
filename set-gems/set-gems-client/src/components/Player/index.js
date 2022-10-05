import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./Player.css";
import usePlayer from "../../hooks/usePlayer";

function Player({ socket, peer, player }) {
  const [point, isReady, isSelector] = usePlayer(socket, player);
  const playerRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if (!peer) {
      return;
    }

    peer.on("stream", (stream) => {
      videoRef.current.srcObject = stream;
    });

    return () => {
      videoRef.current = null;
    };
  }, [peer]);

  useEffect(() => {
    if (isReady) {
      playerRef.current.classList.add("ready");
    } else {
      playerRef.current.classList.remove("ready");
    }
  }, [isReady]);

  useEffect(() => {
    if (isSelector) {
      playerRef.current.classList.add("selector");
    } else {
      playerRef.current.classList.remove("selector");
    }
  }, [isSelector]);

  return (
    <div className="player" ref={playerRef}>
      <p>{player.nickname}</p>
      <video ref={videoRef} autoPlay playsInline />
      <div>
        {point || 0}
      </div>
    </div>
  );
};

Player.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func,
    emit: PropTypes.func,
    removeEventListener: PropTypes.func,
  }),
  peer: PropTypes.shape({
    on: PropTypes.func,
  }),
  player: PropTypes.shape({
    id: PropTypes.string,
    nickname: PropTypes.string,
    point: PropTypes.number,
    isReady: PropTypes.bool,
    isSelector: PropTypes.bool,
    isLeader: PropTypes.bool,
  }),
};

export default Player;
