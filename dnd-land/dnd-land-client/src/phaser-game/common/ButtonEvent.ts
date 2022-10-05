import { COLOR } from "../../constants";

export default function addButtonEvent(
  button: Phaser.GameObjects.Sprite,
  onClick?: () => void,
) {
  button.on("pointerover", () => button.setTint(COLOR.TINT));
  button.on("pointerout", () => button.clearTint());

  if (onClick) {
    button.on("pointerdown", onClick);
  }
}
