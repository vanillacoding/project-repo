import { useEffect, useState } from "react";

import createPeer from "../helper/createPeer";
import { WAITING, PLAYING, ENDED } from "../constants/playState";
import {
  JOINED, SIGNAL, NEW_PLAYER, PLAYER_LEFT,
  ALL_READY, START, COUNTDOWN, SELECT_SUCCESS, GAME_OVER,
} from "../constants/socketEvents";

function useRoomStatus(socket, stream, onChangeIsLeader) {
  const [state, setState] = useState(WAITING);
  const [players, setPlayers] = useState([]);
  const [peers, setPeers] = useState([]);
  const [isAllReady, setIsAllReady] = useState(false);
  const [selectTime, setSelectTime] = useState(0);
  const [result, setResult] = useState([]);

  useEffect(() => {
    return () => {
      setState(WAITING);
      setPeers((prev) => {
        prev.forEach(({ peer }) => {
          peer.destroy();
        });

        return [];
      });
      setPlayers([]);
      setIsAllReady(false);
      setSelectTime(0);
      setResult([]);
    };
  }, []);

  useEffect(() => {
    if (!players.length) {
      setIsAllReady(false);
    }
  }, [players.length]);

  useEffect(() => {
    const handleNewPlayer = (player) => {
      const peer = createPeer(socket, stream, player.id, false);
      const newPeer = { id: player.id, peer };

      setPlayers((prev) => [...prev, player]);
      setPeers((prev) => [...prev, newPeer]);
      setIsAllReady(false);
    };

    const handleStart =  () => {
      setState(PLAYING);
      setResult([]);
    };

    const handleCountdown = (selectTime) => setSelectTime(selectTime);
    const handleSelectSuccess = () => setSelectTime(0);
    const handleGameOver = (result) => {
      setState(ENDED);
      setResult(result);
      setIsAllReady(false);
    };

    socket.on(JOINED, (roomMembers) => {
      if (roomMembers.length) {
        const peers = roomMembers.map(({ id }) => {
          const peer = createPeer(socket, stream, id);
          return { id, peer };
        });

        setPeers(peers);
        setPlayers(roomMembers);
      } else {
        onChangeIsLeader(true);
      }
    });

    socket.on(ALL_READY, setIsAllReady);

    socket.on(PLAYER_LEFT, (playerId) => {
      setPeers((prev) => {
        const peer = prev.find(({ id }) => id === playerId);

        if (peer) {
          peer.peer.destroy();
        }

        return prev.filter(({ id }) => id !== playerId);
      });

      setPlayers((prev) => prev.filter(({ id }) => id !== playerId));
    });

    socket.on(NEW_PLAYER, handleNewPlayer);
    socket.on(START, handleStart);
    socket.on(COUNTDOWN, handleCountdown);
    socket.on(SELECT_SUCCESS, handleSelectSuccess);
    socket.on(GAME_OVER, handleGameOver);

    return () => {
      socket.removeAllListeners(JOINED);
      socket.removeAllListeners(ALL_READY);
      socket.removeAllListeners(PLAYER_LEFT);

      socket.off(NEW_PLAYER, handleNewPlayer);
      socket.off(START, handleStart);
      socket.off(COUNTDOWN, handleCountdown);
      socket.off(SELECT_SUCCESS, handleSelectSuccess);
      socket.off(GAME_OVER, handleGameOver);
    };
  }, [socket.id]);

  useEffect(() => {
    socket.on(SIGNAL, (data, playerId) => {
      const peer = peers.find(({ id }) => id === playerId);

      if (peer) {
        peer.peer.signal(data);
      }
    });

    return () => socket.removeAllListeners(SIGNAL);
  }, [peers.length]);

  return [state, setState, players, peers, isAllReady, selectTime, result];
}

export default useRoomStatus;
