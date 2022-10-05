const http = require("http");
const app = require("../../app");
const server = http.createServer(app);
const wrtc = require("wrtc");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const receiverPCs = {};
const senderPCs = {};
const streamings = {};
const pc_config = {
  "iceServers": [
    {
      urls: "stun:stun.l.google.com:19302",
    }
  ],
};

const createReceiverPeerConnection = (socket, streamerID, roomID) => {
  try {
    const pc = new wrtc.RTCPeerConnection(pc_config);
    receiverPCs[streamerID] = pc;

    pc.onicecandidate = (event) => {
      socket.to(streamerID).emit("getSenderCandidate", {
        candidate: event.candidate,
      });
    };

    pc.ontrack = (event) => {
      streamings[roomID] = {
        id: streamerID,
        stream: event.streams[0],
      };
    };

    pc.ondatachannel = (event) => {
      const dc = event.channel;

      dc.onmessage = (event) => {
        streamings[roomID].detection = event.data;
      };
    };

    return pc;
  } catch (err) {
    console.log(err);
  }
};

const createSenderPeerConnection = (viewerID, socket, roomID) => {
  try {
    const pc = new wrtc.RTCPeerConnection(pc_config);
    senderPCs[viewerID] = pc;

    pc.onicecandidate = (event) => {
      socket.to(viewerID).emit("getReceiverCandidate", {
        viewerID,
        candidate: event.candidate,
      });
    };

    const targetStreaming = streamings[roomID];

    targetStreaming.stream.getTracks().forEach(track => {
      pc.addTrack(track, targetStreaming.stream);
    });

    pc.ondatachannel = (event) => {
      const dc = event.channel;

      dc.onmessage = (event) => {
        const target = streamings[roomID];

        if (target) {
          dc.send(target.detection);
        }
      };
    };

    return pc;
  } catch (err) {
    console.log(err);
  }
};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    socket.join(roomID);

    socket.on("chat", (chat) => {
      socket.broadcast.to(roomID).emit("other user chat", chat);
    });
  });

  socket.on("leave room", (roomID) => {
    socket.leave(roomID);
  });

  socket.on("join streaming", ({ viewerID, roomID }) => {
    try {
      io.to(viewerID).emit("receive streaming", { roomID });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("leave streaming", ({ viewerID }) => {
    try {
      senderPCs[viewerID].close();
      delete senderPCs[viewerID];
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("end streaming", ({ streamerID, roomID }) => {
    try {
      receiverPCs[streamerID].close();
      delete receiverPCs[streamerID];

      streamings[roomID].stream.getTracks().forEach((track) => {
        track.stop();
      });
      delete streamings[roomID];
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("senderCandidate", async ({ streamerID, candidate }) => {
    try {
      const pc = receiverPCs[streamerID];
      await pc.addIceCandidate(new wrtc.RTCIceCandidate(candidate));
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("senderOffer", async ({ remoteSdp, streamerID, roomID }) => {
    try {
      const pc = createReceiverPeerConnection(socket, streamerID, roomID);
      await pc.setRemoteDescription(remoteSdp);

      const sdp = await pc.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false,
      });
      await pc.setLocalDescription(sdp);

      socket.join(roomID);
      io.to(streamerID).emit("getSenderAnswer", { sdp });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("receiverCandidate", async ({ viewerID, candidate }) => {
    try {
      const senderPC = senderPCs[viewerID];
      await senderPC.addIceCandidate(new wrtc.RTCIceCandidate(candidate));
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("receiverOffer", async ({ remoteSdp, viewerID, roomID }) => {
    try {
      const pc = createSenderPeerConnection(viewerID, socket, roomID);
      await pc.setRemoteDescription(remoteSdp);

      const sdp = await pc.createAnswer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });
      await pc.setLocalDescription(sdp);

      io.to(viewerID).emit("getReceiverAnswer", { viewerID, sdp });
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = server;
