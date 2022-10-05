import { useEffect, useContext } from "react";

import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";
import socket from "../socket/socket";
import {
  ReducerContext,
  selectors,
} from "../features/rootSlice";

const useVideoStreaming = (videoRef, navRef) => {
  const { state } = useContext(ReducerContext);
  const isAdministrator = selectors.getIsAdministrator(state);

  useEffect(() => {
    const $video = videoRef.current;
    const iceServers = {
      iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" },
      ],
    };
    const rtcPeerConnections = {};

    if (isAdministrator) {
      let $cameraSelect, $streamingOnBtn
      let isOnStreaming = false;

      for (const element of navRef.current.children) {
        switch (element.name) {
          case "cameraSelect":
            $cameraSelect = element;
            break;
          case "streamingOn":
            $streamingOnBtn = element;
            break;
          default:
        }
      }

      const streamConstraints = {
        audio: true,
        video: {
          facingMode: "environment",
        },
      };

      $streamingOnBtn.onclick = () => {

        if (!isOnStreaming) {
          if ($video.srcObject) {
            return;
          }

          $cameraSelect.style.display = "block";
          isOnStreaming = true;
          $streamingOnBtn.value = "방송 종료";
          navigator?.mediaDevices
          .getUserMedia(streamConstraints)
          .then((stream) => {
            $video.srcObject = stream;
            navigator.mediaDevices
              .enumerateDevices()
              .then(devices => {
                devices.forEach((device) => {
                  if (device.kind === "videoinput") {
                    const option = document.createElement("option");
                    option.value = device.deviceId;
                    option.text = device.label
                      || `camera ${$cameraSelect.length + 1}`;
                    $cameraSelect.appendChild(option);
                  }
                });
                socket.emit("start streaming", socket.id);
              });
          })
          .catch((error) => {
            isOnStreaming = false;
            $streamingOnBtn.innerText = "방송 시작";
          });

          $cameraSelect.onchange = () => {
            const stream = $video.srcObject;
            const videoSource = $cameraSelect.value;

            if (stream && videoSource) {
              streamConstraints.video = videoSource ? { exact: videoSource } : true;
              navigator.mediaDevices
                .getUserMedia(streamConstraints)
                .then((stream) => {
                  $video.srcObject = stream;
                })
                .catch((error) => {
                  logWarnOrErrInDevelopment(error);
                });

            }
          };
        } else {
          isOnStreaming = false;
          $streamingOnBtn.value = "방송 시작";
          $cameraSelect.style.display = "none";
          Object
            .keys(rtcPeerConnections)
            .forEach((key) => {
              rtcPeerConnections[key].close();
              delete rtcPeerConnections[key];
            });
          const stream = $video.srcObject;
          stream
            .getTracks()
            .forEach((track) => track.stop());
          $video.srcObject = null;
          const cameraOptions = Array.prototype.slice.call($cameraSelect.children);
          cameraOptions.forEach((option) => {
            if (option.value) {
              $cameraSelect.removeChild(option);
            }
          });

          socket.emit("stop streaming", socket.id);
        }
      };

      socket.on(
        "new viewers",
        (viewers) => {
          viewers.forEach(({ id }) => {
            rtcPeerConnections[id] = new RTCPeerConnection(iceServers);

            const stream = $video.srcObject;
            stream
              .getTracks()
              .forEach((track) => rtcPeerConnections[id].addTrack(track, stream));

            rtcPeerConnections[id].onicecandidate = (event) => {
              if (event.candidate) {
                socket.emit(
                  "candidate",
                  id,
                  {
                    type: "candidate",
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                  },
                );
              }
            };
            rtcPeerConnections[id]
              .createOffer({
                offerToReceiveAudio: 1,
                offerToReceiveVideo: 1,
              })
              .then((sessionDescription) => {
                rtcPeerConnections[id].setLocalDescription(sessionDescription);
                socket.emit(
                  "offer",
                  id,
                  {
                    type: "offer",
                    sdp: sessionDescription,
                  },
                );
              })
              .catch((error) => {
                logWarnOrErrInDevelopment(error);
              });
          });
        },
      );
      socket.on(
        "answer",
        (viewerId, sdp) => {
          rtcPeerConnections[viewerId]
            .setRemoteDescription(new RTCSessionDescription(sdp));
        },
      );
      socket.on(
        "left viewer",
        (viewerId) => {
          rtcPeerConnections[viewerId].close();
          delete rtcPeerConnections[viewerId];
        },
      );
    }

    socket.on(
      "offer",
      (broadcasterId, sdp) => {
        $video.style.zIndex = 2;
        $video.controls = true;
        rtcPeerConnections[broadcasterId] = new RTCPeerConnection(iceServers);
        rtcPeerConnections[broadcasterId].setRemoteDescription(sdp);
        rtcPeerConnections[broadcasterId]
          .createAnswer()
          .then((sessionDescription) => {
            rtcPeerConnections[broadcasterId].setLocalDescription(sessionDescription);
            socket.emit(
              "answer",
              {
                type: "answer",
                sdp: sessionDescription,
              }
            );
          });

        rtcPeerConnections[broadcasterId].ontrack = (event) => {
          $video.srcObject = event.streams[0];
        };
        rtcPeerConnections[broadcasterId].onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit(
              "candidate",
              broadcasterId,
              {
                type: "candidate",
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate,
              }
            );
          }
        };

      },
    );
    socket.on(
      "candidate",
      (id, { label, candidate: recievedCandidate }) => {
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: label,
          candidate: recievedCandidate,
        });
        rtcPeerConnections[id].addIceCandidate(candidate);
      },
    );
    socket.on(
      "close streaming",
      (broadcasterId) => {
        $video.style.zIndex = 0;
        $video.controls = false;
        const stream = $video.srcObject;
        stream?.getTracks().forEach((track) => track.stop());
        $video.srcObject = null;
        rtcPeerConnections[broadcasterId]?.close();
        delete rtcPeerConnections[broadcasterId];
      },
    );

    if (!isAdministrator) {
      socket.emit("register as viewer");
    }

    return () => {
      Object
        .keys(rtcPeerConnections)
        .forEach((key) => {
          rtcPeerConnections[key].close();
          delete rtcPeerConnections[key];
        });

      ["new viewers", "answer", "offer", "candidate"]
        .forEach((socketEvent) => socket.off(socketEvent));
    };
  }, [videoRef, isAdministrator, navRef]);

};

export default useVideoStreaming;
