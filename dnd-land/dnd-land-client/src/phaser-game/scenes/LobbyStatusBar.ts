import Phaser from "phaser";

import { COLOR, SCENE } from "../../constants";
import { IUserStatus } from "../../types/user";

import LogOutButton from "../common/LogOutButton";
import SoundToggleButton from "../common/SoundToggleButton";

export default class StagesStatusBar extends Phaser.Scene {
  private user!: IUserStatus;

  constructor() {
    super(SCENE.LOBBY_STATUS_BAR);
  }

  init() {
    this.user = this.registry.get("user");
  }

  create() {
    this.createStatusBarElements();
  }

  private createStatusBarElements() {
    this.add.rectangle(0, 0, 800, 60, COLOR.GREEN).setOrigin(0, 0);

    this.add
      .text(25, 12, this.user.email, {
        fontSize: "18px",
        color: COLOR.WHITE_HEX,
        fontFamily: "Arial",
        backgroundColor: COLOR.RED_HEX,
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      })
      .setOrigin(0, 0);

    new LogOutButton(this, 730, 10, "logout");
    new SoundToggleButton(this, 680, 10, "sound-on");
  }
}
