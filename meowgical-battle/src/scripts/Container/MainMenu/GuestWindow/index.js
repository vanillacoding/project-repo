import * as PIXI from "pixi.js";
import Peer from "simple-peer";
import PlayerBox from "../../shared/PlayerBox";
import Battle from "../../Battle";
import globalStore from "../../../globalStore";
import socket from "../../../socket";
import { canvasSize } from "../../../config";
import { actionsInRoom } from "../../../constants";
import createButton from "../../../pixiUtils/createButton";

export default class GuestWindow {
  constructor(roomCode, playerId, unmountCallback) {
    this.unmountCallback = unmountCallback;
    this.roomCode = roomCode;
    this.playerId = playerId;

    this.container = new PIXI.Container();
    this.playerBox = null;
    this.opponentBox = null;
    this.backButton = null;
    this.createPlayerBox();
    this.createOpponetBox();
    this.createBackButton();

    this.peer = null;

    this.render();
  }

  createPlayerBox() {
    this.playerBox = new PlayerBox(false, "나");
  }

  createOpponetBox() {
    this.opponentBox = new PlayerBox(true, "상대");
  }

  createBackButton() {
    this.backButton = createButton(
      {
        width: 200,
        height: 100,
        x: 200,
        y: canvasSize.height - 300,
        color: 0x32b3a2,
      },
      "돌아가기",
      {
        fontFamily: "sans-serif",
        fontSize: 40,
        align: "center",
        fill: 0xffffff,
      },
      this.handleBackButtonClick.bind(this)
    );
  }

  render() {
    this.container.addChild(this.playerBox.container);
    this.container.addChild(this.opponentBox.container);
    this.container.addChild(this.backButton);
    this.containerDidMount();
  }

  remove() {
    this.containerWillUnmount();
    this.container.removeChildren();
    this.unmountCallback(this);
  }

  containerDidMount() {
    socket.subscribeRoomState(
      this.handleRoomStateListen.bind(this)
    );
  }

  handleBackButtonClick() {
    this.remove();
  }

  containerWillUnmount() {
    socket.leaveGame(this.playerId, this.roomCode);
    socket.unsubscribeRoomState();
  }

  handleRoomStateListen(data) {
    const { action, payload } = data;

    switch (action) {
      case actionsInRoom.ENTER:
        if (!payload) {
          this.handleBackButtonClick();
        }
        break;
      case actionsInRoom.START_GAME:
        this.startGame();
        break;
      case actionsInRoom.SEND_PEER:
        this.receiveAndSendPeer(payload);
        break;
      default:
        break;
    }
  }

  receiveAndSendPeer(receivedSignal) {
    this.peer = new Peer({
      initiator: false,
      trickle: false,
      objectMode: true,
    });

    this.peer.on("error", (err) => {
      if (process.env.NODE_ENV !== "production") {
        console.error(err);
      }
    });

    this.peer.on("connect", () => {
      if (process.env.NODE_ENV !== "production") {
        console.log("connect complete");
      }
    });

    this.peer.on("signal", (guestSignal) => {
      if (process.env.NODE_ENV !== "production") {
        console.log("guest signal", guestSignal);
      }

      socket.broadcastAction({
        action: actionsInRoom.SEND_PEER,
        payload: guestSignal,
        from: this.playerId,
      });
    });

    this.peer.signal(receivedSignal);
    if (process.env.NODE_ENV !== "production") {
      console.log("guest recive", receivedSignal);
    }
  }

  startGame() {
    this.containerWillUnmount();
    globalStore.setStore(
      "scene",
      new Battle(false, this.peer)
    );
  }
}
