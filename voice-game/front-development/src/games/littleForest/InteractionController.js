import Road from "./Road";
import { IMAGE_TYPE } from "../../constants/constants";
import Pad from "./Pad";
import Portal from "./Portal";
import Obstacle from "./Obstacle";

class InteractionController {
  constructor(
    canvasHeight,
    pitchDetectorRef,
    interactionList,
    images,
  ) {
    this.canvasHeight = canvasHeight;

    this.pitchDetectorRef = pitchDetectorRef;
    this.detectorReady = false;

    this.images = images;

    this.interactionList = this.setInteractionList(interactionList);
  }

  setInteractionList(interactionList) {
    const myInteractionList = {
      [IMAGE_TYPE.PAD]: [],
      [IMAGE_TYPE.ROAD]: [],
      [IMAGE_TYPE.OBSTACLE]: [],
    };

    for (const interaction of interactionList) {
      switch (interaction.type) {
        case IMAGE_TYPE.ROAD:
          myInteractionList[IMAGE_TYPE.ROAD].push(
            new Road(
              this.canvasHeight,
              this.pitchDetectorRef,
              interaction,
              this.images,
            )
          );

          break;
        case IMAGE_TYPE.PAD:
          myInteractionList[IMAGE_TYPE.PAD].push(
            new Pad(
              this.pitchDetectorRef,
              interaction,
              this.images,
            )
          );

          break;
        case IMAGE_TYPE.OBSTACLE:
          myInteractionList[IMAGE_TYPE.OBSTACLE].push(
            new Obstacle(interaction, this.images.obstacles)
          );

          break;
        case IMAGE_TYPE.PORTAL:
          myInteractionList[IMAGE_TYPE.PORTAL] = new Portal(interaction, this.images.portal);

          break;
        default:
          break;
      }
    }

    return myInteractionList;
  }

  getRoadDots(ctx, characterX, characterY) {
    const roadDots = [];

    for (const road of this.interactionList[IMAGE_TYPE.ROAD]) {
      roadDots.push(road.draw(ctx, characterX, characterY));
    }

    return roadDots;
  }

  getPadDots(ctx, characterController) {
    const padDots = [];

    for (const pad of this.interactionList[IMAGE_TYPE.PAD]) {
      padDots.push(pad.draw(ctx, characterController));
    }

    return padDots;
  }

  drawObstacle(ctx, characterController, timeStamp) {
    for (const obstacle of this.interactionList[IMAGE_TYPE.OBSTACLE]) {
      obstacle.draw(ctx, characterController, timeStamp);
    }
  }

  drawPortal(ctx, characterController, timeStamp, getNextMap) {
    this.interactionList[IMAGE_TYPE.PORTAL].draw(ctx, characterController, timeStamp, getNextMap);
  }
}

export default InteractionController;
