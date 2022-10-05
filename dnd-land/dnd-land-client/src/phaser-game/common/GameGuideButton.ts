import Phaser from "phaser";
import addButtonEvent from "./ButtonEvent";

export default class GameGuideButton extends Phaser.GameObjects.Sprite {
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
      const newScene = game + "-guide";

      sceneManager.scene.run(newScene);
    });
  }
}
