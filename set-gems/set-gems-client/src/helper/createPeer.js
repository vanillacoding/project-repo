import Peer from "simple-peer";
import { SIGNAL } from "../constants/socketEvents";

function createPeer(socket, stream, id, isInitiator = true) {
  const peer = new Peer({
    initiator: isInitiator,
    stream: stream,
  });

  peer.on("signal", (data) => {
    socket.emit(SIGNAL, data, id);
  });

  return peer;
}

export default createPeer;
