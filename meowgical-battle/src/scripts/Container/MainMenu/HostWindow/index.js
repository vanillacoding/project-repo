import * as PIXI from "pixi.js";
import Peer from "simple-peer";
import InvitationCodeBox from "./InvitationCodeBox";
import PlayerBox from "../../shared/PlayerBox";
import Battle from "../../Battle";
import globalStore from "../../../globalStore";
import socket from "../../../socket";
import { canvasSize } from "../../../config";
import { actionsInRoom } from "../../../constants";
import createButton from "../../../pixiUtils/createButton";

export default class HostWindow {
  constructor(playerId, unmountCallback) {
    this.playerId = playerId;
    this.unmountCallback = unmountCallback;
    this.isConnected = false;
    this.peer = null;

    this.container = new PIXI.Container();
    this.playerBox = null;
    this.opponentBox = null;
    this.backButton = null;
    this.gameStartButton = null;
    this.createPlayerBox();
    this.createOpponentBox();
    this.createBackButton();
    this.createGameStartButton();

    this.render();
  }

  createPlayerBox() {
    this.playerBox = new PlayerBox(true, "나");
  }

  createOpponentBox() {
    if (this.isConnected) {
      this.opponentBox = new PlayerBox(false, "상대");
    } else {
      this.opponentBox = new InvitationCodeBox(this.playerId);
    }
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

  createGameStartButton() {
    this.gameStartButton = createButton(
      {
        width: 200,
        height: 100,
        x: canvasSize.width / 2,
        y: canvasSize.height - 120,
        color: this.isConnected ? 0x3a8ec7 : 0x6e6e6e,
      },
      "게임시작",
      {
        fontFamily: "sans-serif",
        fontSize: 40,
        align: "center",
        fill: 0xffffff,
      },
      this.handleGameStartButtonClick.bind(this)
    );

    if (!this.isConnected) {
      const buttonBox = this.gameStartButton.children[0];
      buttonBox.interactive = false;
      buttonBox.buttonMode = false;
    }
  }

  render() {
    this.container.addChild(this.playerBox.container);
    this.container.addChild(this.opponentBox.container);
    this.container.addChild(this.backButton);
    this.container.addChild(this.gameStartButton);

    this.containerDidMount();
  }

  remove() {
    this.containerWillUnmount();
    this.container.removeChildren();
    this.unmountCallback(this);
  }

  containerDidMount() {
    socket.createGame(this.playerId);
    socket.subscribeRoomState(
      this.handleRoomStateListen.bind(this)
    );
  }

  rerenderOpponentBox() {
    this.container.removeChild(this.opponentBox.container);
    this.createOpponentBox();
    this.container.addChild(this.opponentBox.container);
  }

  rerenderGameStartButton() {
    this.container.removeChild(this.gameStartButton);
    this.createGameStartButton();
    this.container.addChild(this.gameStartButton);
  }

  handleBackButtonClick() {
    this.remove();
  }

  containerWillUnmount() {
    socket.unsubscribeRoomState();
    socket.removeGame(this.playerId);
  }

  handleRoomStateListen(data) {
    const { action, payload } = data;

    switch (action) {
      case actionsInRoom.ENTER:
        this.isConnected = payload;
        this.rerenderOpponentBox();
        this.rerenderGameStartButton();
        break;
      case actionsInRoom.SEND_PEER:
        this.receivePeerSignal(payload);
        break;
      default:
        break;
    }
  }

  handleGameStartButtonClick() {
    this.sendPeerSignal();
  }

  sendPeerSignal() {
    this.peer = new Peer({
      initiator: true,
      trickle: false,
      objectMode: true,
    });

    this.peer.on("error", (err) => {
      if (process.env.NODE_ENV !== "production") {
        console.error(err);
      }

      this.sendPeerSignal();
    });

    this.peer.on("connect", () => {
      this.startGame();
    });

    this.peer.on("signal", (hostSignal) => {
      if (process.env.NODE_ENV !== "production") {
        console.log("host signal", hostSignal);
      }

      socket.broadcastAction({
        action: actionsInRoom.SEND_PEER,
        payload: hostSignal,
        from: this.playerId,
      });
    });
  }

  receivePeerSignal(receivedSignal) {
    if (process.env.NODE_ENV !== "production") {
      console.log("host receive", receivedSignal);
    }

    this.peer.signal(receivedSignal);
  }

  startGame() {
    socket.broadcastAction({
      action: actionsInRoom.START_GAME,
      from: this.playerId,
    });

    this.containerWillUnmount();
    globalStore.setStore(
      "scene",
      new Battle(true, this.peer)
    );
  }
}
