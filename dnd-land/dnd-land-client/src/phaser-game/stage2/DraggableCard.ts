import Phaser from "phaser";

import CardBase from "../common/CardBase";
import { ICardData } from "../../types/game";

export default class DraggableCard extends CardBase {
  constructor(data: ICardData) {
    const { scene, ondragend } = data;

    super(data);

    this.setInteractive({ draggable: true });

    this.scene.input.on(
      "drag",
      (
        pointer: Phaser.Input.Pointer,
        gameObject: CardBase,
        dragX: number,
        dragY: number,
      ) => {
        if (this.name !== gameObject.name) {
          return;
        }

        const xDiff = Math.abs(gameObject.x - dragX);
        const yDiff = Math.abs(gameObject.y - dragY);

        if (!xDiff && !yDiff) {
          return;
        }

        gameObject.x = dragX;
        gameObject.y = dragY;
      },
    );

    scene.input.on(
      "dragend",
      (pointer: Phaser.Input.Pointer, gameObject: DraggableCard) => {
        if (this !== gameObject) {
          return;
        }

        ondragend(pointer, gameObject);
      },
    );

    scene.add.existing(this);
  }
}
