import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Peer from "simple-peer";

import { leaveVideoChat } from '../../reducers/videoChatSlice';
import { socket, socketApi } from '../../utils/socket';
import { RoomVideos as S } from './styles';

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2
};

export default function RoomVideos({ roomId }) {
  const dispatch = useDispatch();
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;

      socketApi.joinVideoChat(roomId);

      socket.on("all users", users => {
        const onlinePeers = [];

        users.forEach(userID => {
          const newPeer = createPeer(userID, socket.id, stream);

          peersRef.current.push({
            peerID: userID,
            peer: newPeer,
          });
          onlinePeers.push({
            peerID: userID,
            peer: newPeer,
          });
        });

        setPeers(onlinePeers);
      });

      socket.on("user joined", payload => {
        const newPeer = addPeer(payload.signal, payload.callerID, stream);
        const peerObj = {
          peerID: payload.callerID,
          peer: newPeer,
        };

        peersRef.current.push(peerObj);

        setPeers(peers => [...peers, peerObj]);
      });

      socket.on("receiving returned signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);

        item.peer.signal(payload.signal);
      });

      socket.on('user left', id => {
        const peerObj = peersRef.current.find(p => p.peerID === id);
        const peers = peersRef.current.filter(p => p.peerID !== id);

        peersRef.current = peers;

        if (peerObj) {
          peerObj.peer.destroy();
        }

        setPeers(peers => peers.filter(peer => peer.peerID !== id));
      });
    }).catch(err => console.log(err));

    return () => {
      peersRef.current = [];

      dispatch(leaveVideoChat());

      socket.removeAllListeners("all users");
      socket.removeAllListeners("user joined");
      socket.removeAllListeners("receiving returned signal");
      socket.removeAllListeners("user left");
      socketApi.leaveVideoChat();
    }
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketApi.sendingVideoChatSignal({ userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.signal(incomingSignal);
    peer.on("signal", signal => {
      socketApi.returningSignal({ signal, callerID })
    });

    return peer;
  }

  return (
    <S.Container>
      <S.StyledVideo ref={userVideo} autoPlay playsInline muted/>
      {peers.map((peer) => {
        return (
          <Video key={peer.peerID} peer={peer.peer} />
        );
      })}
    </S.Container>
  );
}

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });

    return () => {
      ref.current = null;
    }
  }, []);

  return (
    <S.StyledVideo autoPlay playsInline ref={ref} />
  );
};
