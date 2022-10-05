import "webrtc-adapter";
import { socket } from "./socket";

const pc_config = {
  "iceServers": [
    {
      urls: "stun:stun.l.google.com:19302",
    }
  ],
};
const peer = {
  sendPC: RTCPeerConnection,
  receivePCs: {},
  intervalIDs: {},
};

const createSenderPeerConnection = (localStream, characterRef) => {
  const pc = new RTCPeerConnection(pc_config);

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("senderCandidate", {
        streamerID: socket.id,
        candidate: event.candidate,
      });
    }
  };

  if (localStream) {
    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream);
    });
  }

  const dc = pc.createDataChannel("sender");

  dc.onopen = () => {
    peer.intervalIDs[socket.id] = setInterval(() => {
      const sgvSrc = characterRef.current;

      dc.send(sgvSrc);
    }, 100);
  };
  dc.onclose = () => {
    clearInterval(peer.intervalIDs[socket.id]);
    delete peer.intervalIDs[socket.id];
  };

  return pc;
};

const createSenderOffer = async (roomID) => {
  try {
    const localSdp = await peer.sendPC.createOffer({
      offerToReceiveAudio: false,
      offerToReceiveVideo: false,
    });
    await peer.sendPC.setLocalDescription(new RTCSessionDescription(localSdp));

    socket.emit("senderOffer", {
      remoteSdp: localSdp,
      streamerID: socket.id,
      roomID,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const createReceiverPeerConnection = (viewerID, setStream, streamingRef) => {
  const pc = new RTCPeerConnection(pc_config);
  peer.receivePCs[viewerID] = pc;

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("receiverCandidate", {
        viewerID,
        candidate: event.candidate,
      });
    }
  };

  pc.ontrack = (event) => {
    if (setStream) {
      setStream(event.streams[0]);
    }
  };

  const dc = pc.createDataChannel("receiver");

  dc.onopen = () => {
    peer.intervalIDs[socket.id] = setInterval(() => {
      dc.send("get image");
    }, 50);
  };
  dc.onclose = () => {
    clearInterval(peer.intervalIDs[socket.id]);
    delete peer.intervalIDs[socket.id];
  };
  dc.onmessage = (event) => {
    let blob = new Blob([event.data], { type: "image/svg+xml" });
    let url = URL.createObjectURL(blob);

    streamingRef.current.src = url;
    blob = null;
    url = null;
  };

  return pc;
};

const createReceiverOffer = async (pc, roomID, viewerID) => {
  try {
    const localSdp = await pc.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: false,
    });
    await pc.setLocalDescription(new RTCSessionDescription(localSdp));

    socket.emit("receiverOffer", {
      remoteSdp: localSdp,
      viewerID,
      roomID,
    });
  } catch (err) {
    throw new Error(err);
  }
};

const createReceivePC = (roomID, viewerID, setStream, streamingRef) => {
  try {
    const pc = createReceiverPeerConnection(viewerID, setStream, streamingRef);
    createReceiverOffer(pc, roomID, viewerID);
  } catch (err) {
    throw new Error(err);
  }
};

export const receiveStreaming = (updateStream, streamingRef) => {
  try {
    socket.on("receive streaming", ({ roomID }) => {
      createReceivePC(roomID, socket.id, updateStream, streamingRef);
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const leaveStreaming = (viewerID) => {
  try {
    socket.emit("leave streaming", viewerID);
    peer.receivePCs[viewerID].close();
    delete peer.receivePCs[viewerID];
  } catch (err) {
    throw new Error(err);
  }
};

export const sendStreaming = (localStream, roomID, characterRef) => {
  try {
    peer.sendPC = createSenderPeerConnection(localStream, characterRef);
    createSenderOffer(roomID);
  } catch (err) {
    throw new Error(err);
  }
};

export const endStreaming = (roomID) => {
  try {
    peer.sendPC.close();
    delete peer.sendPC;

    socket.emit("end streaming", { streamerID: socket.id, roomID });
  } catch (err) {
    throw new Error(err);
  }
};

socket.on("getSenderCandidate", async ({ candidate }) => {
  try {
    if (!candidate) {
      return;
    }

    peer.sendPC.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (err) {
    throw new Error(err);
  }
});

socket.on("getReceiverCandidate", async ({ viewerID, candidate }) => {
  try {
    const pc = peer.receivePCs[viewerID];

    if (!candidate) {
      return;
    }

    pc.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (err) {
    throw new Error(err);
  }
});

socket.on("getSenderAnswer", async ({ sdp }) => {
  try {
    await peer.sendPC.setRemoteDescription(new RTCSessionDescription(sdp));
  } catch (err) {
    throw new Error(err);
  }
});

socket.on("getReceiverAnswer", async ({ viewerID, sdp }) => {
  try {
    const pc = peer.receivePCs[viewerID];
    await pc.setRemoteDescription(sdp);
  } catch (err) {
    throw new Error(err);
  }
});
