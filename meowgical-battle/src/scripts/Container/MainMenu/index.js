import * as PIXI from "pixi.js";
import Menu from "./Menu";
import HostWindow from "./HostWindow";
import GuestWindow from "./GuestWindow";
import InvitationCodeInput from "./InvitationCodeInput";
import globalStore from "../../globalStore";

export default class MainMenu {
  constructor(playerId) {
    this.playerId = playerId;

    this.container = new PIXI.Container();

    this.backgroundTexture = globalStore
      .getItem("resources")
      .mainMenuBackground
      .texture;

    this.menu = null;
    this.hostWindow = null;
    this.guestWindow = null;
    this.inputInvitationCode = null;

    this.createBackground();
    this.createMenu();
  }

  createBackground() {
    const background = new PIXI.Sprite(this.backgroundTexture);
    this.container.addChild(background);
  }

  createMenu() {
    if (!this.menu) {
      this.menu = new Menu(
        {
          offsetX: 0,
          offsetY: -280,
        },
        {
          text: "게임 생성",
          borderColor: 0x82c9f5,
          event: this.handleCreateGameClick.bind(this),
        },
        {
          text: "게임 참가",
          borderColor: 0x82c9f5,
          event: this.handleJoinGameClick.bind(this),
        }
      );
    }

    this.container.addChild(this.menu.container);
  }

  createHostWindow() {
    this.hostWindow = new HostWindow(
      this.playerId,
      this.goToMenu.bind(this)
    );

    this.container.addChild(this.hostWindow.container);
  }

  createGuestWindow(roomCode) {
    this.guestWindow = new GuestWindow(
      roomCode,
      this.playerId,
      this.goToMenu.bind(this)
    );

    this.container.addChild(this.guestWindow.container);
  }

  createInvitationCodeInput() {
    this.inputInvitationCode = new InvitationCodeInput(
      this.playerId,
      this.goToMenu.bind(this),
      this.goToGuestWindow.bind(this)
    );

    this.container.addChild(this.inputInvitationCode.container);
  }

  goToMenu(scene) {
    this.container.removeChild(scene.container);
    this.createMenu();
  }

  goToGuestWindow(roomCode) {
    this.removeMenu();
    this.createGuestWindow(roomCode);
  }

  removeMenu() {
    this.container.removeChild(this.menu.container);
  }

  handleCreateGameClick() {
    this.removeMenu();
    this.createHostWindow();
  }

  handleJoinGameClick() {
    this.removeMenu();
    this.createInvitationCodeInput();
  }
}
