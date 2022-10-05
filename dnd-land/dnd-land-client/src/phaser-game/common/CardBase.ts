import Phaser from "phaser";

import MatchingGame from "../stage3/Game";

import { COLOR } from "../../constants";
import { ICardBaseData } from "../../types/game";

export default class CardBase extends Phaser.GameObjects.Container {
  private spriteCard: Phaser.GameObjects.Sprite;
  private _originalX!: number;
  private _originalY!: number;

  public readonly value: string | number;
  public readonly fruit: string;
  public readonly name: string;

  constructor(data: ICardBaseData) {
    const { scene, x, y, value, name, image } = data;

    const spriteCard = new Phaser.GameObjects.Sprite(scene, 2, 4, "card");
    const spriteImage = new Phaser.GameObjects.Sprite(
      scene,
      0,
      0,
      image,
    ).setOrigin(0.5, 0.5);

    super(scene, x, y, [spriteCard, spriteImage]);

    spriteImage.setDisplaySize(85, 85);

    const randomDegree = Math.floor(Math.random() * 4) * 90;
    spriteImage.angle = scene instanceof MatchingGame ? randomDegree : 0;

    this.spriteCard = spriteCard;

    this.name = name;
    this.scene = scene;
    this.value = value;
    this.fruit = name.slice(0, name.length - 1);

    this.originalX = x;
    this.originalY = y;

    this.setSize(this.spriteCard.width, this.spriteCard.height);

    this.on("pointerover", () => this.spriteCard.setTint(COLOR.TINT));
    this.on("pointerout", () => this.spriteCard.clearTint());

    this.scene.add.existing(this);
  }

  get originalX() {
    return this._originalX;
  }

  set originalX(newX: number) {
    this._originalX = newX;
  }

  get originalY() {
    return this._originalY;
  }

  set originalY(newY: number) {
    this._originalY = newY;
  }
}
