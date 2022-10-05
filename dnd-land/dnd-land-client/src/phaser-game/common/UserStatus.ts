import Phaser from "phaser";

import { IUser } from "../scenes/LobbyStatusBar";

export default class UserInformation extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    image: string,
    user: IUser,
  ) {
    super(scene, x, y, image);

    scene.add.existing(this);
    this.setInteractive()
      .setOrigin(0, 0)
      .setDisplaySize(260 + (user.email.length - 19) * 12, 45);

    scene.add
      .text(x + 25, y + 10, user.email, {
        fontSize: "20px",
        color: "#fff",
        fontFamily: "Arial",
      })
      .setOrigin(0, 0);
  }
}
