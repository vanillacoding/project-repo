import Phaser from "phaser";
import { GAME, SCENE, COLOR } from "../../constants";

interface IGame {
  game: string;
}
export default class GameOver extends Phaser.Scene {
  constructor() {
    super(SCENE.GAMEOVER);
  }

  create({ game }: IGame) {
    const { width, height } = this.scale;

    const x = width / 2;
    const y = height / 2;

    const button = this.add
      .text(x, y, GAME.GAMEOVER_MESSAGE, {
        fontSize: "32px",
        color: COLOR.WHITE_HEX,
        fontFamily: "Arial",
        backgroundColor: COLOR.RED_HEX,
        padding: { left: 30, right: 30, top: 30, bottom: 30 },
      })
      .setOrigin(0.5);

    button.setInteractive();

    button.once("pointerup", async () => {
      this.scene.stop(SCENE.GAMEOVER);
      this.scene.stop(SCENE.STATUS_BAR);
      this.scene.stop(game);

      let stage = 0;

      switch (game) {
        case SCENE.SHOOTING_GAME:
          stage = 1;
          break;
        case SCENE.PUZZLE_GAME:
          stage = 2;
          break;
        case SCENE.MATCHING_GAME:
          stage = 3;
          break;
        default:
          stage = 0;
      }

      const user = this.registry.get("user");
      user.lastStage = Math.max(stage, user.lastStage);

      this.scene.start(SCENE.LOBBY);
      this.scene.run(SCENE.LOBBY_STATUS_BAR, { user });
    });
  }
}
