import { IMAGE_TYPE } from "../../constants/constants";

class BackGround {
  constructor(ref, { staticMap, images }) {
    this.canvas = ref.current;
    this.ctx = this.canvas.getContext("2d");

    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.staticMap = staticMap;
    this.images = images;

    this.draw(this.staticMap, this.ctx);
  }

  draw(mapData, ctx) {
    for (let i = 0; i < mapData.length; i++) {
      const { type, index, posX, posY, width, height } = mapData[i];

      ctx.save();

      if (type === IMAGE_TYPE.TILE) {
        const img = this.images.tiles[index];

        ctx.fillStyle = ctx.createPattern(img, "repeat");
        ctx.fillRect(posX, posY, width, height);
      }

      ctx.restore();
    }
  }
}

export default BackGround;
