import { IMAGE_TYPE } from "../../constants/constants";

const mapList = [
  {
    tiles: [
      [IMAGE_TYPE.TILE, 1, 0, 18, 1, 1, 10],
      [IMAGE_TYPE.TILE, 0, 24, 18, 1, 1],
      [IMAGE_TYPE.TILE, 0, 24, 17, 1, 1],
      [IMAGE_TYPE.TILE, 0, 24, 16, 1, 1],
      [IMAGE_TYPE.TILE, 0, 24, 15, 1, 1],
      [IMAGE_TYPE.TILE, 0, 24, 14, 1, 1],
      [IMAGE_TYPE.TILE, 0, 24, 13, 1, 1],
      [IMAGE_TYPE.TILE, 1, 24, 12, 1, 1],
    ],
    interactionList: [
      [IMAGE_TYPE.ROAD, 9, 17, 14, 5, 1, 0],

      [IMAGE_TYPE.PORTAL, 28, 7, 5, 5],
    ],
  },
  {
    tiles: [
      [IMAGE_TYPE.TILE, 1, 0, 18, 1, 1, 7],
      [IMAGE_TYPE.TILE, 1, 3, 16, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 3, 14, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 5, 12, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 7, 12, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 9, 12, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 12, 13, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 14, 16, 1, 1, 1],

      [IMAGE_TYPE.TILE, 0, 24, 18, 1, 1],
      [IMAGE_TYPE.TILE, 0, 24, 17, 1, 1],
      [IMAGE_TYPE.TILE, 0, 24, 16, 1, 1],
      [IMAGE_TYPE.TILE, 0, 24, 15, 1, 1],
      [IMAGE_TYPE.TILE, 0, 24, 14, 1, 1],
      [IMAGE_TYPE.TILE, 0, 24, 13, 1, 1],
      [IMAGE_TYPE.TILE, 1, 24, 12, 1, 1],

      [IMAGE_TYPE.TILE, 1, 24, 6, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 26, 8, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 24, 10, 1, 1, 1],

    ],
    interactionList: [
      [IMAGE_TYPE.ROAD, 14, 15, 9, 5, 1, 0],

      [IMAGE_TYPE.PAD, 24, 5, 5, 2, 15, 1, 0],

      [IMAGE_TYPE.PORTAL, 9, 0, 5, 5],
    ],
  },
  {
    tiles: [
      [IMAGE_TYPE.TILE, 1, 0 , 18, 1, 1, 7],
      [IMAGE_TYPE.TILE, 1, 3, 16, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 3, 14, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 5, 12, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 7, 12, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 9, 13, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 12, 14, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 15, 18, 1, 1, 1],

      [IMAGE_TYPE.TILE, 1, 24, 6, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 26, 8, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 24, 10, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 25, 12, 1, 1, 1],

      [IMAGE_TYPE.TILE, 1, 13, 10, 1, 1, 1],
      [IMAGE_TYPE.TILE, 1, 11, 9, 1, 1, 1],

    ],
    interactionList: [
      [IMAGE_TYPE.ROAD, 15, 17, 10, 5, 1, 0],
      [IMAGE_TYPE.ROAD, 11, 8, 10, 5, 1, 0],

      [IMAGE_TYPE.OBSTACLE, 3, 12, 2, 2, 10, 0, 1],
      [IMAGE_TYPE.OBSTACLE, 5, 5, 2, 2, 10, 0, 2],

      [IMAGE_TYPE.PAD, 25, 11, 5, 2, 10, 1, 0],
      [IMAGE_TYPE.PAD, 24, 5, 5, 2, 15, 1, 0],

      [IMAGE_TYPE.PORTAL, 9, 0, 5, 5],
    ],
  },
];

export default mapList;
