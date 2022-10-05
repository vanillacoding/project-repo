import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Peer from "simple-peer";
import styles from "./Webcam.module.css";

const Webcam = ({ socket, isMatched }) => {
  const partner = useSelector(state => state.roomMatch.partner);
  const {
    isCalling,
    isCallAccepted,
    callerSignal,
  } = useSelector(state => state.roomMatch.webcam);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const signalCallStatus = useRef();

  useEffect(() => {
    (async () => {
      const stream = await navigator
        .mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        });

      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }

      if (isCalling) {
        const peer = new Peer({
          initiator: true,
          trickels: false,
          stream: stream,
        });

        peer.on("signal", data => {
          if (!signalCallStatus.current) {
            socket.emit("callUser", {
              partnerSocketId: partner.socketId,
              signalData: data,
            });

            signalCallStatus.current = true;
          }
        });

        peer.on("stream", stream => {
          partnerVideo.current.srcObject = stream;
        });

        socket.on("acceptCall", signal => {
          peer.signal(signal);
        });

        socket.on("destroyPeer", () => {
          stream && stream.getTracks().forEach(track => track.stop());
          peer.removeStream(stream);
          peer.removeAllListeners("signal");
          peer.destroy();
        });
      }

      if (isCallAccepted) {
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });

        peer.on("signal", data => {
          if (!signalCallStatus.current) {
            socket.emit("acceptCall", {
              signalData: data,
              partnerSocketId: partner.socketId,
            });

            signalCallStatus.current = true;
          }
        });

        peer.on("stream", stream => {
          partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);

        socket.on("destroyPeer", () => {
          stream && stream.getTracks().forEach(track => track.stop());
          peer.removeStream(stream);
          peer.removeAllListeners("signal");
          peer.destroy();
        });
      }
    })();

    return () => {
      socket.off("destroyPeer");
    };
  }, [isCalling, isCallAccepted]);

  return (
    <div className={styles.wrapper}>
      {isMatched &&
        <div className={styles.videoContainer}>
          <video
            className={styles.videoTop}
            ref={userVideo}
            playsInline
            autoPlay
            muted
          />
          <video
            className={styles.videoBot}
            ref={partnerVideo}
            playsInline
            autoPlay
            muted
          />
        </div>}
    </div>
  );
};

export default React.memo(Webcam);

Webcam.propTypes = {
  socket: PropTypes.object.isRequired,
  isMatched: PropTypes.bool.isRequired,
};
