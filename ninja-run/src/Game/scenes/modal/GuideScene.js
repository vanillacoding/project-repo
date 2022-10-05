import Phaser from "phaser";
import { GUIDE_SCENE } from "../../constants/scenes";

const WOOD_PANEL = "woodPanel";
const WOOD_ROUND_PANEL = "woodRoundPanel";
const WOOD_TITLE_PANEL = "woodTitlePanel";
const RED_CROSS = "redCross";
const CLICK = "click";
const SHURIKEN = "shuriken";
const MOUSE_CURSOR = "mouseCursor";
const A_KEY = "Akey";
const D_KEY = "Dkey";
const PLATFORM = "platform";
const RED_BIRD = "redBird";
const PLUS_ONE = "plusOne";
const WHITE_CIRCLE = "whiteCircle";

export default class GuideScene extends Phaser.Scene {
  constructor(parent, nextScene, zone, width, height) {
    super(GUIDE_SCENE);

    this.parent = parent;
    this.nextScene = nextScene;
    this.zone = zone;
    this.worldWidth = width;
    this.worldHeigth = height;
    this.worldCenter = { x: width / 2, y: height / 2 };
    this.fontSize = "40px";

    this.woodPanel = null;
    this.woodTitlePanel = null;
    this.woodRoundPanel = null;
    this.redCross = null;
    this.redCrossShadow = null;
  }

  preload() {
    this.load.image(WOOD_PANEL, "assets/images/Game/guide/woodPanel.png");
    this.load.image(WOOD_TITLE_PANEL, "assets/images/Game/guide/woodTitlePanel.png");
    this.load.image(WOOD_ROUND_PANEL, "assets/images/Game/guide/woodRoundPanel.png");
    this.load.image(RED_CROSS, "assets/images/Game/guide/redCross.png");

    this.load.image(CLICK, "assets/images/Game/guide/click.png");
    this.load.image(SHURIKEN, "assets/images/Game/shuriken_spin.png");
    this.load.image(MOUSE_CURSOR, "assets/images/Game/guide/mouseCursor.png");

    this.load.image(A_KEY, "assets/images/Game/guide/Akey.png");
    this.load.image(D_KEY, "assets/images/Game/guide/Dkey.png");

    this.load.image(PLATFORM, "assets/images/Game/pad_small.png");

    this.load.image(RED_BIRD, "assets/images/Game/guide/redBirdForguide.png");
    this.load.image(PLUS_ONE, "assets/images/Game/guide/plusOne.png");
    this.load.image(WHITE_CIRCLE, "assets/images/Game/guide/whiteCircle.png");
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");

    this.#createWoodPanel();

    const minX = this.worldCenter.x - (this.woodPanel.displayWidth / 2);
    const maxX = this.worldCenter.x + (this.woodPanel.displayWidth / 2);
    const minY = this.worldCenter.y - (this.woodPanel.displayHeight / 2);

    this.#createTitle(this.worldCenter.x, minY);
    this.#createExitButton(maxX, minY);

    const textYOffset = 100;
    const textLineHeight = 130;
    const textIndenting = 70;
    const whiteSpaceDistance = 30;
    const indentedXPosition = minX + textIndenting;

    const firstLineYCordinate = minY + textYOffset;
    this.#writeFirstLine(indentedXPosition, firstLineYCordinate, whiteSpaceDistance);

    const secondLineYCordinate = firstLineYCordinate + textLineHeight;
    this.#writeSecondLine(indentedXPosition, secondLineYCordinate, whiteSpaceDistance);

    const thirdLineYCordinate = secondLineYCordinate + textLineHeight;
    this.#writeThirdLine(indentedXPosition, thirdLineYCordinate, whiteSpaceDistance);

    const forthLineYCordinate = thirdLineYCordinate + textLineHeight;
    this.#writeForthLine(indentedXPosition, forthLineYCordinate, whiteSpaceDistance);
  }

  #createWoodPanel() {
    this.woodPanel = this.add.image(this.worldCenter.x, this.worldCenter.y, WOOD_PANEL)
      .setOrigin(0.5)
      .setScale(0.6);
    this.woodPanel.setDisplaySize(this.worldWidth * 0.9, this.worldHeigth * 0.9);
  }

  #createTitle(xCordinate, yCordinate) {
    const createWoodTitlePanel = (xCordinate, yCordinate) => {
      this.woodTitlePanel = this.add.image(xCordinate, yCordinate, WOOD_TITLE_PANEL)
        .setOrigin(0.5, 0.3)
        .setScale(0.2);
    };

    const createTitleText = (xCordinate, yCordinate, textContent) => {
      this.guideTitleText = this.add.text(xCordinate, yCordinate, textContent, {
        fontSize: this.fontSize,
        fontStyle: "bold",
      }).setOrigin(0.45, 0);
    };

    createWoodTitlePanel(xCordinate, yCordinate);
    createTitleText(xCordinate, yCordinate, "How To Play!");
  }

  #createExitButton(xCordinate, yCordinate) {
    const createWoodRoundPanel = (xCordinate, yCordinate) => {
      this.woodRoundPanel = this.add.image(xCordinate, yCordinate, WOOD_ROUND_PANEL)
        .setOrigin(1, 0.3)
        .setScale(0.1);
    };

    const createRedCross = (xCordinate, yCordinate) => {
      this.redCrossShadow = this.add.image(xCordinate - 15 + 3, yCordinate + 3, RED_CROSS)
        .setOrigin(1, 0.1)
        .setScale(0.1)
        .setVisible(false);
      this.redCrossShadow.tint = 0x000000;
      this.redCrossShadow.alpha = 0.6;

      this.redCross = this.add.image(xCordinate - 15, yCordinate, RED_CROSS)
        .setOrigin(1, 0.1)
        .setScale(0.1)
        .setInteractive();

      this.redCross.on("pointerover", () => {
        this.redCrossShadow.setVisible(true);
      });

      this.redCross.on("pointerout", () => {
        this.redCrossShadow.setVisible(false);
      });

      this.redCross.on("pointerup", () => {
        window.localStorage.setItem("isVisit", true);

        this.scene.remove();

        this.parent.scene.add(this.nextScene.key, this.nextScene.object, true);
        this.parent.scene.resume();
      });
    };

    createWoodRoundPanel(xCordinate, yCordinate);
    createRedCross(xCordinate, yCordinate);
  }

  #writeFirstLine(firstXCoord, yCoord, wSpace) {
    this.click = this.add.image(firstXCoord, yCoord, CLICK)
      .setOrigin(0, 0.6)
      .setScale(0.2);

    const secondXCoord = this.#getNextXCordinate(firstXCoord, this.click, wSpace);
    this.textBeforeClick = this.#createNormalText(
      secondXCoord,
      yCoord,
      "to Shoot"
    );

    const thirdXCoord = this.#getNextXCordinate(secondXCoord, this.textBeforeClick, wSpace);
    this.shuriken = this.add.image(thirdXCoord, yCoord, SHURIKEN)
      .setOrigin(0, 0.3);

    const forthXCoord = this.#getNextXCordinate(thirdXCoord, this.shuriken, wSpace);
    this.textBeforeShuriken = this.#createNormalText(
      forthXCoord,
      yCoord,
      "to"
    );

    const fifthXCoord = this.#getNextXCordinate(forthXCoord, this.textBeforeShuriken, wSpace);
    this.mouseCursor = this.add.image(fifthXCoord, yCoord, MOUSE_CURSOR)
      .setOrigin(0, 0.4)
      .setScale(0.1);
  }

  #writeSecondLine(firstXCoord, yCoord, wSpace) {
    this.Akey = this.add.image(firstXCoord, yCoord, A_KEY)
      .setOrigin(0, 0.3)
      .setScale(0.6);

    const secondXCoord = this.#getNextXCordinate(firstXCoord, this.Akey, wSpace);
    this.Dkey = this.add.image(secondXCoord, yCoord, D_KEY)
      .setOrigin(0, 0.3)
      .setScale(0.6);

    const thirdXCoord = this.#getNextXCordinate(secondXCoord, this.Dkey, wSpace);
    this.textBeforeDkey = this.#createNormalText(
      thirdXCoord,
      yCoord,
      "to Accelerate Swing!"
    );
  }

  #writeThirdLine(firstXCoord, yCoord, wSpace) {
    this.thirdLineFirstText = this.#createNormalText(
      firstXCoord,
      yCoord,
      "Hit"
    );

    const secondXCoord = this.#getNextXCordinate(firstXCoord, this.thirdLineFirstText, wSpace);
    this.platform = this.add.image(secondXCoord, yCoord, PLATFORM)
      .setOrigin(0, 0.1)
      .setScale(0.5);

    const thirdXCoord = this.#getNextXCordinate(secondXCoord, this.platform, wSpace);
    this.textBeforePlatform = this.#createNormalText(
      thirdXCoord,
      yCoord,
      "to Swing!"
    );
  }

  #writeForthLine(firstXCoord, yCoord, wSpace) {
    this.forthLineFirstText = this.#createNormalText(
      firstXCoord,
      yCoord,
      "Hit"
    );

    const secondXCoord = this.#getNextXCordinate(firstXCoord, this.forthLineFirstText, wSpace);
    this.redBird = this.add.image(secondXCoord, yCoord, RED_BIRD)
      .setOrigin(0, 0.2)
      .setScale(0.1);

    const thirdXCoord = this.#getNextXCordinate(secondXCoord, this.redBird, wSpace);
    this.textBeforeRedBird = this.#createNormalText(
      thirdXCoord,
      yCoord,
      "or Each 10 Sec, Score"
    );

    const forthXCoord = this.#getNextXCordinate(thirdXCoord, this.textBeforeRedBird, wSpace);
    this.whiteCircle = this.add.image(forthXCoord - 3, yCoord + 5, WHITE_CIRCLE)
      .setOrigin(0.2, 0.4)
      .setScale(0.3);

    this.plusOne = this.add.image(forthXCoord, yCoord, PLUS_ONE)
      .setOrigin(0, 0.4)
      .setScale(0.2);
  }

  #createNormalText(xCoordinate, yCoordinate, textContent) {
    const textObject = this.add.text(
      xCoordinate,
      yCoordinate,
      textContent,
      {
        fontSize: this.fontSize,
      }
    );

    return textObject;
  }

  #getNextXCordinate(previousXCoordinate, frontObject, whiteSpaceDistance) {
    return previousXCoordinate + frontObject.displayWidth + whiteSpaceDistance;
  }
}
