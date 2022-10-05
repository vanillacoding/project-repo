import CharacterController from "./CharacterController";
import DotsController from "./Dots";
import InteractionController from "./InteractionController";

class Game {
  constructor(ref, {
    pitchDetectorRef,
    staticDots,
    interactionList,
    getNextMap,
    images,
    characterIndex,
  }) {
    this.canvas = ref.current;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.staticDots = staticDots;
    this.getNextMap = getNextMap;

    this.eventList = [];

    this.dotsController = new DotsController();
    this.characterController = new CharacterController(
      this.eventList,
      this.width,
      this.height,
      images,
      characterIndex
    );
    this.interactionController = new InteractionController(
      this.height,
      pitchDetectorRef,
      interactionList,
      images
    );

    window.requestAnimationFrame(this.animate.bind(this));
  }

  async animate(timeStamp) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.characterX = this.characterController.characterCenterX;
    this.characterY = this.characterController.posY;

    const dots = this.dotsController.fiilStaticDots(this.staticDots);
    const roadDots = this.interactionController.getRoadDots(
      this.ctx,
      this.characterX,
      this.characterY
    );
    const padDots = this.interactionController.getPadDots(
      this.ctx,
      this.characterController
    );

    this.dotsController.mergeRoadDots(this.ctx, dots, roadDots);
    this.dotsController.mergePadDots(dots, padDots);

    this.interactionController.drawPortal(this.ctx, this.characterController, timeStamp, this.getNextMap);
    this.interactionController.drawObstacle(this.ctx, this.characterController, timeStamp);

    this.characterController.draw(this.ctx, dots, timeStamp);

    this.animationFrameId = window.requestAnimationFrame(
      this.animate.bind(this)
    );
  }
}

export default Game;
