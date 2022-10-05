import Phaser from "phaser";

import addButtonEvent from "./ButtonEvent";
import { SCENE } from "../../constants";
import { sceneEvents } from "../events/EventsManager";

export default class GoBackButton extends Phaser.GameObjects.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    image: string,
    game: string,
  ) {
    super(scene, x, y, image);
    scene.add.existing(this);

    this.setInteractive();

    addButtonEvent(this, () => {
      const sceneManager = this.scene;

      sceneManager.scene.stop(game);
      sceneManager.scene.stop(SCENE.STATUS_BAR);

      sceneManager.scene.start(SCENE.LOBBY);

      const user = sceneManager.registry.get("user");
      sceneManager.scene.run(SCENE.LOBBY_STATUS_BAR, { user });
    });

    sceneEvents.on("gameover", this.disableButton, this);
  }

  private disableButton() {
    this.off("pointerdown");
  }
}
