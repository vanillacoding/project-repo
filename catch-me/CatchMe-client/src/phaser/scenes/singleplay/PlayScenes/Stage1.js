import Stage from "./Stage";
import { Level1 } from "../../../../constants/coordinates";

export default class Stage1 extends Stage {
  constructor() {
    super("stage1");
  }

  init() {
    super.init();
    
    this.registry.values.score = 0;
    this.registry.values.time = 0;
  }

  create() {
    this.game.events.emit("gameStart");
    
    this.setBackground(1);

    this.setCharacters(Level1);

    super.create();
  }

  update() {
    super.update();

    const callback = () => this.scene.start("stage2");

    if (this.coinCount === 0 && !this.isCleared) {
      this.moveNextStage(callback);

      this.isCleared = true;
    }
  }
}
