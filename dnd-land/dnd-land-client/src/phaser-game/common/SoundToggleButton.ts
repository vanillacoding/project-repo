import Phaser from "phaser";

import { SOUND } from "../../constants";
import { sceneEvents } from "../events/EventsManager";
import addButtonEvent from "./ButtonEvent";

export default class SoundToggleButton extends Phaser.GameObjects.Sprite {
  private music: Phaser.Sound.BaseSound;

  constructor(scene: Phaser.Scene, x: number, y: number, image: string) {
    super(scene, x, y, image);

    scene.add.existing(this);

    this.music = this.scene.sound.get(SOUND.BACKGROUND_MUSIC);
    this.setInteractive().setOrigin(0, 0);

    addButtonEvent(this, () => {
      sceneEvents.emit("toggleBackgroundMusic");

      this.setTextureImage();
    });
  }

  setTextureImage() {
    this.music.isPlaying
      ? this.setTexture("sound-on")
      : this.setTexture("sound-off");
  }
}
