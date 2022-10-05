import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Peer from "simple-peer";
import * as faceapi from 'face-api.js';

import Logo from '../Logo/Logo';
import MenuBar from '../MenuBar/MenuBar';
import PeerVideo from '../PeerVideo/PeerVideo';
import Chat from '../../components/Chat/Chat';
import MyVideo from '../../components/MyVideo/MyVideo';
import HostVideo from '../../components/HostVideo/HostVideo';
import GroupListInVideoRoom from '../GroupListInVideoRoom/GroupListInVideoRoom';

import { MENU_MODE, FACE_STATUS } from '../../constants/index';
import { socket } from '../../utils/socket';
import styles from './VideoConferenceRoom.module.css';

const VideoConferenceRoom = ({
  isHost,
  location,
  joinMember,
  addMessage,
  messageList,
  currentUser,
  memberInRoom,
  addSecretMessage,
  secretMessageList,
  deleteLeavingMember,
  audioMuted,
  setAudioMuted
}) => {
  const {
    INVITE,
    STUDENTS,
    PUBLIC_CHAT,
    SCREEN_SHARE,
    QUESTION_CHAT } = MENU_MODE;

  const {
    DEFAULT,
    NEUTRAL,
    HAPPY,
    SAD,
    ANGRY,
    DISGUSTED,
    FEARFUL,
    SURPRIZED
  } = FACE_STATUS;

  const { _id, nickname } = currentUser;
  const ROOM_ID = location.pathname.split('/').pop();

  const [mode, setMode] = useState(STUDENTS);
  const [peers, setPeers] = useState([]);
  const [streamForShare, setStreamForShare] = useState();

  const videoRef = useRef();
  const streamRef = useRef();
  const canvasRef = useRef();
  const peersRef = useRef({});
  const rightSideRef = useRef();

  const [initialized, setInitialized] = useState(false);
  const [hostId, setHostId] = useState('');

  const emojis = {
    default: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_sleep.png',
    neutral: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_kennim.png',
    happy: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_happy_emoji.png',
    sad: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_sad_emoji.png',
    angry: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_angry2_emoji.png',
    fearful: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_fearful_emoji.png',
    disgusted: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_disgusted_emoji.png',
    surprised: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_apple_surprised.png',
    noFace: 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/png_sleep.png'
  };

  const analyzeFace = () => {
    setInterval(async () => {
      if (!initialized) return;
      if (!videoRef.current) return;
      if (!canvasRef.current) return;

      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);

      const displaySize = {
        width: 500,
        height: 500
      };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvasRef.current.getContext('2d').clearRect(0, 0, 500, 500);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

      const context = canvasRef.current.getContext('2d');

      if (detections.length > 0) {
        const xCoord = resizedDetections[0]?.detection?._box?._x;
        const yCoord = resizedDetections[0]?.detection?._box?._y;

        console.log("X좌표", xCoord, "Y좌표", yCoord);

        detections.forEach(element => {
          console.log("HERE", element.expressions);
          let status = "";
          let valueStatus = 0.0;

          for (const [key, value] of Object.entries(element.expressions)) {
            console.log(element.expressions, '##', key, value, status);
            console.log("FACE_STATUS", status);

            if (value > valueStatus) {
              status = key;
              valueStatus = value;
            }
          }

          const { _x, _y } = resizedDetections[0].detection._box;
          const _width = resizedDetections[0].landmarks.imageWidth;
          const _height = resizedDetections[0].landmarks.imageHeight;

          const img = new Image();

          if (status === NEUTRAL) {
            img.src = emojis.neutral;
          } else if (status === HAPPY) {
            img.src = emojis.happy;
          } else if (status === SAD) {
            img.src = emojis.sad;
          } else if (status === ANGRY) {
            img.src = emojis.angry;
          } else if (status === DISGUSTED) {
            img.src = emojis.disgusted;
          } else if (status === FEARFUL) {
            img.src = emojis.fearful;
          } else if (status === SURPRIZED) {
            img.src = emojis.surprized;
          }

          context.drawImage(img, _x * 0.5, _y * 0.5, _width * 2, _height * 2);
        }
        );
      } else {
        console.log("No Faces");

        const context = canvasRef.current.getContext('2d');
        const img = new Image();
        img.src = emojis.noFace;
        context.drawImage(img, 0, 0, 500, 500);
      }
    }, 5000);
  };



  const handleVideoPlay = () => {
    //setVideoOnplay(true);
    analyzeFace();
  };

  useEffect(() => {
    if (!initialized) return;
    const useInterval = setInterval(analyzeFace, 5000);
    return (() => {
      clearInterval(useInterval);
      //setVideoOnplay(false);
    });
  }, [videoRef]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;

      setStreamForShare(stream);
      setInitialized(true);
    }
    catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadModels = () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/faceApiModels';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]).then(startVideo());
    };
    loadModels();
  }, []);


  useEffect(() => {
    socket.emit('join-room', { roomId: ROOM_ID, userId: _id, nickname, isHost });

    socket.on('joined', ({ members, host }) => {
      joinMember(members);
      setHostId(host);
    });

    socket.on('joined-newMember', newMember => {
      joinMember(newMember);
    });

    socket.on('user left', ({ socketId }) => {
      console.log('USER LEFT!!!!!!!', socketId);
      console.log(peersRef.current);
      console.log("$$$$$$$", peersRef.current[socketId]);
      deleteLeavingMember(socketId);
      delete peersRef.current[socketId];

      setPeers(peers => {
        console.log("지울거야...", peers);
        const targetPeer = peers.find(peer => peer.peerId === socketId);
        console.log(targetPeer);
        const rest = peers.filter(peer => peer.peerId !== socketId);
        if (targetPeer) targetPeer.peer.destroy();
        return [...rest];
      });
    });

    return () => {
      socket.off();
    };
  }, []);


  useEffect(() => {
    if (!initialized) return;

    for (let key in memberInRoom) {
      if (memberInRoom[key].roomId !== ROOM_ID) continue;

      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: streamRef.current
      });

      peer.on('signal', signal => {
        socket.emit('send signal', { signal, to: memberInRoom[key] });
      });

      peersRef.current[key] = peer;
      setPeers(peers => [...peers, { peerId: key, peer }]);
    }

    socket.on('return signal', ({ signal, from }) => {
      const initiator = from;

      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: streamRef.current,
      });

      peer.signal(signal);

      peer.on('signal', signal => {
        socket.emit('respond signal', { signal, to: initiator });
      });

      peersRef.current[initiator.socketId] = peer;

      setPeers(peers => [...peers, { peerId: from.socketId, peer }]);
    });

    socket.on('respond signal', ({ signal, from }) => {
      const targetPeer = peersRef.current[from.socketId];
      targetPeer.signal(signal);
    });

    return () => socket.off();

  }, [initialized]);

  const shareScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ cursor: true })
      .then(screenStream => {
        for (let key in peersRef.current) {
          peersRef.current[key].replaceTrack(streamForShare.getVideoTracks()[0], screenStream.getVideoTracks()[0], streamForShare);
        }
        videoRef.current.srcObject = screenStream;

        screenStream.getTracks()[0].onended = () => {
          for (let key in peersRef.current) {
            peersRef.current[key].replaceTrack(screenStream.getVideoTracks()[0], streamForShare.getVideoTracks()[0], streamForShare);
          }
          videoRef.current.srcObject = streamForShare;
        };
      });

    setMode(STUDENTS);
  };

  const [message, setMessage] = useState('');
  const [sendTo, setSendTo] = useState('');
  const targetMessage = mode === PUBLIC_CHAT ? messageList : secretMessageList;

  useEffect(() => {
    socket.on('message-public', message => {
      addMessage(message);
    });

    socket.on('message-secret', message => {
      const { from } = message;
      if (from !== nickname) addSecretMessage(message);
    });

    return () => {
      socket.off('message-public');
      socket.off('message-secret');
    };

  }, [messageList, secretMessageList]);

  const sendMessagePublic = (event) => {
    event.preventDefault();
    if (!message) return;

    const data = { text: message, from: nickname };

    socket.emit('message-public', data, () => {
      setMessage('');
      addMessage(data);
    });
  };

  const sendMessageSecretly = (event) => {
    event.preventDefault();
    if (!message) return;

    const data = { text: message, from: nickname, to: sendTo };

    setMessage('');
    addSecretMessage(data);
    socket.emit('message-secret', data);
  };

  const LeaveAndstopVideo = () => {
    socket.emit('leave room');
    videoRef.current.srcObject.getVideoTracks()[0].enabled = false;
    streamRef.current.getVideoTracks()[0].enabled = false;
  };

  const sendMessage = mode === PUBLIC_CHAT ? sendMessagePublic : sendMessageSecretly;

  const toggleAudio = () => {
    if (streamRef.current) {
      streamRef.current
        .getAudioTracks()
        .forEach(track => track.enabled = audioMuted);
    }

    setAudioMuted(!audioMuted);
  };

  return (
    <div className={styles.VideoConferenceRoom}>
      <div className={styles.LogoWrapper}>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      <div className={styles.Content}>
        <div className={styles.LeftSide}>
          <div className={styles.CanvasOnVideo}>
            {isHost ?
              <MyVideo isHost={isHost} videoRef={videoRef} canvasRef={canvasRef} audioMuted={audioMuted} handleVideoPlay={handleVideoPlay} /> :
              peers.length && <HostVideo peers={peers} hostId={hostId} handleVideoPlay={handleVideoPlay} />
            }
            <canvas
              className={styles.Canvas}
              ref={canvasRef}
            />
          </div>
          <div className={styles.MenuBar}>
            <MenuBar
              audioMuted={audioMuted}
              toggleAudio={toggleAudio}
              stopVideo={LeaveAndstopVideo}
              setMode={setMode}
            />
          </div>
        </div>
        <div className={styles.RightSide}>
          {
            isHost
              ? peers.map((peer, index) => {
                return (
                  <PeerVideo
                    calssName={styles.PeerVideo}
                    faceapi={faceapi}
                    analyzeFace={analyzeFace}
                    key={index}
                    peer={peer} />
                );
              })
              : <>
                <MyVideo isHost={isHost} videoRef={videoRef} canvasRef={canvasRef} audioMuted={audioMuted} handleVideoPlay={handleVideoPlay} />
                {
                  peers.slice(1).map((peer, index) => {
                    return (
                      <PeerVideo
                        className={styles.PeerVideo}
                        faceapi={faceapi}
                        analyzeFace={analyzeFace}
                        key={index}
                        peer={peer} />
                    );
                  })
                }
              </>
          }
          {
            <div
              className={`${styles.RightSideInnerOnMode}`}
              ref={rightSideRef} >
              {
                (() => {
                  switch (mode) {
                    case PUBLIC_CHAT:
                    case QUESTION_CHAT:
                      rightSideRef.current.style.display = "block";
                      return (
                        <Chat
                          mode={mode}
                          message={message}
                          nickname={nickname}
                          setMessage={setMessage}
                          sendMessage={sendMessage}
                          targetMessage={targetMessage}
                          setSendTo={setSendTo} />
                      );
                    case SCREEN_SHARE:
                      rightSideRef.current.style.display = "block";
                      return shareScreen();
                    case INVITE:
                      rightSideRef.current.style.display = "block";
                      return (
                        <GroupListInVideoRoom
                          className={styles.Invite}
                          groups={currentUser.groups}
                          sender={currentUser.email} />
                      );
                    case STUDENTS:
                    default:
                      if (rightSideRef.current) {
                        rightSideRef.current.style.display = "none";
                      }
                  }
                })()
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default VideoConferenceRoom;
