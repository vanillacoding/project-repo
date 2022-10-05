import Phaser from "phaser";

import addButtonEvent from "./ButtonEvent";
import { sceneEvents } from "../events/EventsManager";

export default class LogOutButton extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, image: string) {
    super(scene, x, y, image);

    this.setInteractive().setOrigin(0, 0);

    addButtonEvent(this, () => {
      sceneEvents.emit("logout");
    });

    scene.add.existing(this);
  }
}
