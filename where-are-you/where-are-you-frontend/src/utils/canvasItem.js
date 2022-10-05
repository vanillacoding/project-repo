import {
  getMousePosition,
  isMouseXOnImage,
  isMouseYOnImage
} from "./canvas";

class Item {
  constructor(item) {
    const {
      name,
      x,
      y,
      width,
      height,
      src,
      srcAfter,
      detailImage,
      puzzle,
      password,
      text,
      overlayItems
    } = item;

    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.src = src;
    this.srcAfter = srcAfter;
    this.detailImage = detailImage;
    this.puzzle = puzzle;
    this.password = password;
    this.text = text;
    this.overlayItems = overlayItems;
  }

  load() {
    return new Promise((resolve) => {
      const image = new Image();

      image.src = this.src;
      image.onload = () => {
        if (image.complete) {
          resolve(image);
        }
      };
    });
  }

  async draw(context) {
    const loadedImage = await this.load();
    context.drawImage(loadedImage, this.x, this.y, this.width, this.height);
  }

  remove(context) {
    context.clearRect(this.x, this.y, this.width, this.height);
  }

  change(context) {
    if (this.srcAfter) {
      const originSrc = this.src;
      this.src = this.srcAfter;
      this.srcAfter = originSrc;

      this.remove(context);
      this.draw(context);
    }
  }

  isMouseOn(canvas, event, item = this) {
    const { mouseX, mouseY } = getMousePosition(canvas, event);
    let result = false;

    if (isMouseXOnImage(mouseX, item.x, item.width) && isMouseYOnImage(mouseY, item.y, item.height)) {
      result = true;
    }

    return result;
  }

  checkOverlay(canvas, event, items) {
    let image = this;

    for (let i = 0; i < items.length; i++) {
      if (this.overlayItems.includes(items[i].name) && this.isMouseOn(canvas, event, items[i])) {
        image = items[i];
        break;
      }
    }

    return image;
  }

  runEvent(items, canvas, context, event, callback) {
    let image = this;

    if (this.isMouseOn(canvas, event)) {
      this.change(context);

      if (this.overlayItems) {
        image = this.checkOverlay(canvas, event, items);
      }

      callback(image);
    }
  }
}

export default Item;
