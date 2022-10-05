import Phaser from "phaser";
import { COLOR } from "../../constants";

class PreviewCricle extends Phaser.GameObjects.Arc {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 10, 0, 360, true, COLOR.RED);
  }
}

export default class ShotPreview {
  private total = 7;
  private scene: Phaser.Scene;
  private _previews: PreviewCricle[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  showPreview(
    x: number,
    y: number,
    vector: Phaser.Math.Vector2,
    radius: number,
  ) {
    for (let i = 0; i < this.total; i++) {
      const preview = new PreviewCricle(this.scene, x, y);

      this.scene.add.existing(preview);
      this.previews.push(preview);
    }

    const distance = 50;
    const vectorX = vector.x;
    const vectorY = vector.y;

    let alpha = 1;

    x += vectorX * radius;
    y += vectorY * radius;

    for (let i = 0; i < this.total; i++) {
      const newX = x + vectorX * distance;
      const newY = y + vectorY * distance;

      x = newX;
      y = newY;

      const preview = this.previews[i];

      preview.x = newX;
      preview.y = newY;

      alpha *= 0.75;
      preview.alpha = alpha;
    }
  }

  removePreviousPreview() {
    for (let i = 0; i < this.previews.length; i++) {
      this.previews[i].destroy();
    }

    this.previews.length = 0;
  }

  get shotPreviewsLength() {
    return this.previews.length;
  }

  get previews() {
    return this._previews;
  }
}
