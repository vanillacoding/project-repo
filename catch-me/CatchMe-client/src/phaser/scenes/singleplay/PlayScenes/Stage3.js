import Stage from "./Stage";

import { Level3 } from "../../../../constants/coordinates";

export default class Stage3 extends Stage {
  constructor() {
    super("stage3");
  }

  create() {
    this.setBackground(3);

    this.setCharacters(Level3);

    super.create();
  }

  update() {
    super.update();

    const callback = () => this.game.events.emit("gameClear", { score: this.registry.values.score, time: this.registry.values.time });

    if (this.coinCount === 0 && !this.isCleared) {
      this.moveNextStage(callback);

      this.isCleared = true;
    }
  }
}
