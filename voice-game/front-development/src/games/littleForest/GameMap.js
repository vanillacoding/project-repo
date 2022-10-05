import mapList from "./mapList";

import { IMAGE_TYPE } from "../../constants/constants";

class GameMap {
  constructor(tileSize, canvasWidth, canvasHeight, currentMap) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.tileWidth = tileSize;
    this.tileHeight = tileSize;

    this.gameMap = {
      staticDots: [],
      staticMap: [],
      interactionList: [],
    };

    this.currentMap = currentMap;

    this.fillTiles();
    this.fillInteractionList();
  }

  fillInteractionList() {
    for (const interactionPoint of mapList[this.currentMap].interactionList) {
      this.fillInteractionListHelper(...interactionPoint);
    }
  }

  fillInteractionListHelper(type, x, y, width, height, range, option1, option2) {
    const interaction = {
      type,
      posX: x * this.tileWidth,
      posY: y * this.tileHeight,
      width: width * this.tileWidth,
      height: height * this.tileHeight,
    };

    switch (type) {
      case IMAGE_TYPE.ROAD:
        interaction.pointer = {
          index: option1,
          range: this.tileWidth * range,
        };

        break;
      case IMAGE_TYPE.PAD:
        interaction.pointer = {
          index: option1,
          range: this.tileWidth,
        };
        interaction.pad = {
          index: option2,
          range: this.tileWidth * range,
        };

        break;
      case IMAGE_TYPE.OBSTACLE:
        interaction.range = this.tileWidth * range;
        interaction.index = option1;
        interaction.speed = option2;

        break;
      default:
        break;
    }

    this.gameMap.interactionList.push(interaction);
  }

  fillTiles() {
    for (const tile of mapList[this.currentMap].tiles) {
      this.fillTilesHelper(...tile);
    }
  }

  fillTilesHelper(type, index, x, y, width, height, length) {
    const posY = y * height * this.tileHeight;
    const myWidth = width * this.tileWidth;
    const myLength = length
      ? length
      : (this.canvasWidth - x * myWidth) / myWidth;

    if (index === 1) {
      for (let i = 0; i < myLength * myWidth; i++) {
        const posX = x * myWidth + i;

        if (this.gameMap.staticDots[posX]) {
          this.gameMap.staticDots[posX].push(posY);
        } else {
          this.gameMap.staticDots[posX] = [posY];
        }

        this.gameMap.staticDots[posX].sort((a, b) => a - b);
      }
    }

    for (let i = 0; i < myLength; i++) {
      const posX = (x + i) * myWidth;

      this.gameMap.staticMap.push({
        type,
        index,
        posX,
        posY,
        width: myWidth,
        height: this.tileHeight,
      });
    }
  }
}

export default GameMap;
