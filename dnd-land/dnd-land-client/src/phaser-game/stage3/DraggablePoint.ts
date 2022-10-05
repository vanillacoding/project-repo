import Phaser from "phaser";

import MatchingGame from "./Game";
import { SOUND } from "../../constants";
import { IDraggablePoint } from "../../types/game";

export default class DraggablePoint extends Phaser.GameObjects.Container {
  public name: string;
  public value: string | number;

  constructor(data: IDraggablePoint) {
    const { x, y, name, value, scene, ondragend } = data;

    const pointImage = new Phaser.GameObjects.Image(scene, 70, 0, "point");
    const leftPoint = new Phaser.GameObjects.Sprite(scene, -70, 0, "point");
    const rightPoint = new Phaser.GameObjects.Sprite(scene, 70, 0, "point");

    super(scene, x, y, [leftPoint, rightPoint, pointImage]);

    this.name = name;
    this.value = value;

    this.setTouchArea(rightPoint);

    this.scene.input.on(
      "dragstart",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Sprite,
      ) => {
        if (this !== gameObject.parentContainer) {
          return;
        }

        this.scene.sound.play(SOUND.DRAG, { volume: 0.5 });
      },
    );

    this.scene.input.on(
      "drag",
      (
        pointer: Phaser.Input.Pointer,
        point: Phaser.GameObjects.Sprite,
        dragX: number,
        dragY: number,
      ) => {
        const startingPoint = point.parentContainer;

        if (this !== startingPoint) {
          return;
        }

        const distanceX = Math.abs(point.x - dragX);
        const distanceY = Math.abs(point.y - dragY);

        if (!distanceX && !distanceY) {
          return;
        }

        point.x = pointer.x - startingPoint.x;
        point.y = pointer.y - startingPoint.y;

        (scene as MatchingGame).drawLine(point);
      },
    );

    this.scene.input.on(
      "dragend",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Sprite,
      ) => {
        if (this !== gameObject.parentContainer) {
          return;
        }

        ondragend(pointer, gameObject);
      },
    );

    (scene as MatchingGame).addNewPoint = leftPoint;

    if (value === "green") {
      leftPoint.alpha = 0;
    }

    if (value === "blue") {
      rightPoint.destroy();
      pointImage.destroy();
    }

    scene.add.existing(this);
  }

  private setTouchArea(rightPoint: Phaser.GameObjects.Sprite) {
    rightPoint.setSize(
      rightPoint.displayWidth + 130,
      rightPoint.displayHeight + 80,
    );
    rightPoint.setInteractive({ draggable: true });

    rightPoint.input.hitArea.x -= 100;
    rightPoint.input.hitArea.y -= 50;

    rightPoint.setDataEnabled();

    rightPoint.data.set("originalX", 70);
    rightPoint.data.set("originalY", 0);
  }
}
