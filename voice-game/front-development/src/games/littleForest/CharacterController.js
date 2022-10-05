import { addEventHelper } from "../../utils/eventListHelper";
import Character from "./Character";
import pickRandom from "../../utils/pickRandom";
import { KEY_CODE } from "../../constants/constants";

class CharacterController {
  constructor(eventList, canvasWidth, canvasHeight, images, characterIndex) {
    this.eventList = eventList;

    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.images = images.characters[characterIndex];

    this.character = new Character(this.images);

    this.initialX = 100;
    this.initialY = 550;
    this.posX = this.initialX;
    this.posY = this.initialY;

    this.gravity = 0;
    this.reaction = 0;

    this.isHit = false;
    this.isInPortal = false;
    this.characterMove = {
      left: false,
      right: false,
      jump: false,
      speed: 3,
      isJumping: false,
      jumpHeight: 20,
    };

    addEventHelper(
      this.eventList,
      window,
      "keydown",
      this.handleKeyEvent.bind(this)
    );
    addEventHelper(
      this.eventList,
      window,
      "keyup",
      this.handleKeyEvent.bind(this)
    );
  }

  draw(ctx, dots, timeStamp) {
    this.characterCenterX = Math.floor(this.posX + (this.character.width / 2));

    if (this.canvasHeight < this.posY - this.character.height) {
      this.posX = this.initialX;
      this.posY = this.initialY;
    }

    if (!this.maxY) {
      this.maxY = this.getMaxY(dots, this.characterCenterX);
    }

    if (this.maxY < this.posY) {

      this.posY = this.maxY;
      this.characterMove.isJumping = false;

      this.gravity = 0;
      this.reaction = 0;

      this.isHit = false;
    }

    this.maxY = this.getMaxY(dots, this.characterCenterX);

    this.handleCharacterMovement(dots);

    this.character.draw(
      ctx,
      this.posX,
      this.posY,
      timeStamp
    );
  }

  getMaxY(dots, x) {
    if (dots[x]) {
      for (const y of dots[x]) {
        if (!this.characterMove.isJumping && this.posY - 20 <= y) {
          return y;
        }

        if (this.posY <= y) {
          return y;
        }
      }
    }
  }

  handleKeyEvent(event) {
    if (this.isInPortal) {
      this.characterMove.left = false;
      this.characterMove.right = false;
      this.characterMove.jump = false;

      return;
    }

    const isKeyDown = event.type === "keydown" ? true : false;

    switch (event.keyCode) {
      case KEY_CODE.A:
        this.characterMove.left = isKeyDown;

        break;
      case KEY_CODE.D:
        this.characterMove.right = isKeyDown;

        break;
      case KEY_CODE.W:
        this.characterMove.jump = isKeyDown;

        break;
      default:
        break;
    }
  }

  handleCharacterMovement() {
    if (this.isInPortal) {
      return;
    }

    this.handleCharacterImage();
    this.character.frameSpeed = 10;

    const isInnerLeftEnd = 0 < this.posX - this.characterMove.speed;
    const isInnerRightEnd = this.posX + this.character.width < this.canvasWidth;

    if (this.characterMove.left && isInnerLeftEnd) {
      this.character.frameSpeed = 50;
      this.posX -= this.characterMove.speed;
    }

    if (!isInnerLeftEnd || !isInnerRightEnd) {
      this.reaction = 0;
    }

    if (this.characterMove.right && isInnerRightEnd) {
      this.character.frameSpeed = 50;
      this.posX += this.characterMove.speed;
    }

    if (this.characterMove.jump && !this.characterMove.isJumping && !this.isHit) {
      this.characterMove.isJumping = true;
      this.gravity -= this.characterMove.jumpHeight;
    }

    if (this.gravity) {
      this.posY += Math.floor(this.gravity);
    }

    if (this.posY !== this.maxY) {
      this.gravity += 1.5;
      this.gravity *= 0.9;
    }

    if (this.reaction) {
      this.posX += Math.floor(this.reaction);
    }

    if (0 < this.reaction) {
      this.reaction -= 0.1;
    }

    if (this.reaction < 0) {
      this.reaction += 0.1;
    }
  }

  handleCharacterImage() {
    if (this.isHit) {
      this.character.currentImg = this.character.imgList.hurt;
      return;
    }

    if (this.characterMove.left) {
      this.character.currentImg = this.character.imgList.walking;
      this.character.isFlipped = true;
      return;
    }

    if (this.characterMove.right) {
      this.character.currentImg = this.character.imgList.walking;
      this.character.isFlipped = false;
      return;
    }

    this.character.currentImg = this.character.imgList.idle;
  }
}

export default CharacterController;
