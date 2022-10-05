import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import Peer from "simple-peer";
import PropTypes from "prop-types";

import {
  STREAM,
  SIGNAL,
  USER_JOINED,
  USER_LEFT,
  RECEIVING_RETURNED_SIGNAL,
  SENDING_SIGNAL,
  RETURNING_SIGNAL
} from "../../../constants/socketEvents";

const CamWindowContainer = styled.div`
  position: absolute;
  bottom: 20%;
  right: 22%;
  background: none;
  z-index: 9;

  .cam-video {
    width: 15em;
    height: 11.3em;
  }

  .participant {
    display: none;
    position: absolute;
    z-index: -3;
    background: none;
  }
`;

let localStream;

function Video({ peer, isOwner }) {
  const ref = useRef();

  useEffect(() => {
    peer.on(STREAM, stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      className={`${isOwner || "participant"} cam-video`}
    />
  );
}

function CamWindow({
  currentUser,
  participants,
  socket,
  roomId,
  isVideoStopped
}) {
  const [isReady, setIsReady] = useState(false);
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);

  window.addEventListener("beforeunload", () => {
    socket.off(USER_JOINED);
    socket.off(RECEIVING_RETURNED_SIGNAL);
    socket.off(USER_LEFT);
    peers && peers.forEach(peer => {
      peer.removeAllListeners(SIGNAL);
      peer.destroy();
    });
    peersRef.current = [];
  });

  const createPeer = useCallback((
    userToSignal,
    isOwner,
    callerID,
    stream
  ) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on(SIGNAL, (signal) => {
      socket.emit(SENDING_SIGNAL, {
        userToSignal,
        isOwner,
        callerID,
        signal
      });
    });

    return peer;
  }, []);

  const addPeer = useCallback((
    incomingSignal,
    callerID,
    stream
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    peer.on(SIGNAL, (signal) => {
      socket.emit(RETURNING_SIGNAL, { signal, callerID })
    });

    peer.signal(incomingSignal);

    return peer;
  }, []);

  useEffect(() => {
    if (!isReady) return;

    if (isVideoStopped) {
      localStream && localStream
        .getTracks()
        .forEach((val) => val.enabled = false);

      return;
    }

    localStream && localStream
      .getTracks()
      .forEach((val) => val.enabled = true);
  }, [isVideoStopped, isReady]);

  useEffect(() => {
    if (isReady) return;

    const user = participants.find(
      (participant) => participant.email === currentUser.email
    );

    if (!user) return;

    if (currentUser && participants.length) {
      setIsReady(true);

      navigator.mediaDevices.getUserMedia({ video: true , audio: true }).then((stream) => {
        localStream = stream;
        userVideo.current.srcObject = stream;
        userVideo.current.className = user.isOwner ? "owner cam-video" : "participant cam-video";

        const peers = [];
        const participantsWithoutMe = participants.filter(
          (participant) => participant.email !== currentUser.email
        );

        participantsWithoutMe.forEach((userInfo) => {
          const peer = createPeer(userInfo.socketId, user.isOwner, socket.id, stream);

          peersRef.current.push({
            peerID: userInfo.socketId,
            peer
          });

          peers.push({
            peerID: userInfo.socketId,
            isOwner: userInfo.isOwner,
            peer
          });
        });

        setPeers(peers);

        socket.on(USER_JOINED, (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          const isPeerExist = peersRef.current.some(
            (peerObj) => peerObj.peerID === payload.callerID
          );

          if (!isPeerExist) {
            peersRef.current.push({
              peerID: payload.callerID,
              peer
            });

            setPeers((peers) => (
              [
                ...peers,
                {
                  peerID: payload.callerID,
                  isOwner: payload.isOwner,
                  peer
                }
              ]
            ));
          }
        });

        socket.on(RECEIVING_RETURNED_SIGNAL, (payload) => {
          const item = peersRef.current.find(
            p => p.peerID === payload.id
          );

          item.peer.signal(payload.signal);
        });

        socket.on(USER_LEFT, (targetUser) => {
          peersRef.current = peersRef.current.filter((peerObj) => (
            peerObj.peerID !== targetUser.socketId
          ));

          setPeers((peers) => {
            const targetPeer = peers.find(
              (peerObj) => peerObj.peerID === targetUser.socketId
            );
            const restPeers = peers.filter(
              (peerObj) => peerObj.peerID !== targetUser.socketId
            );

            if (targetPeer) {
              targetPeer.peer.removeAllListeners(SIGNAL);
              targetPeer.peer.destroy();
            }

            return [...restPeers];
          });
        });
      });
    }
  }, [currentUser, isReady, participants, isVideoStopped, roomId]);

  useEffect(() => {
    return () => {
      socket.off(USER_JOINED);
      socket.off(RECEIVING_RETURNED_SIGNAL);
      socket.off(USER_LEFT);
      localStream && localStream.getTracks().forEach((val) => val.stop());
      peers && peers.forEach((peer) => {
        peer.peer.removeAllListeners(SIGNAL);
        peer.peer.destroy();
      });
      peersRef.current = [];
    }
  }, []);

  return (
    <CamWindowContainer>
      <video
        ref={userVideo}
        autoPlay
        playsInline
        muted="muted"
      />
      {
        peers.map((peerObj) => {
          return (
            <Video
              key={peerObj.peerID}
              isOwner={peerObj.isOwner}
              peer={peerObj.peer}
            />
          );
        })
      }
    </CamWindowContainer>
  );
}

CamWindow.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  participants: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  isVideoStopped: PropTypes.bool.isRequired
};

export default React.memo(CamWindow);
