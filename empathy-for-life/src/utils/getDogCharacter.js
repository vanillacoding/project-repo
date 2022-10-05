const getDogCharacter = (character) => {
  const initValues = {
    initX: 0,
    initY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    gap: 0,
    gapX: 0,
    maxX: 0,
    maxY: 0,
  }
  const dogCharacter = {
    walk: {
      up: { ...initValues },
      right: { ...initValues },
      down: { ...initValues },
      left: { ...initValues },
      toUp: function () {
        if (this.up.maxX === this.up.x) {
          this.up.x = this.up.initX;
        } else {
          this.up.x += this.up.gapX;
        }
      },
      toRight: function () {
        if (this.right.maxX === this.right.x) {
          this.right.x = this.right.initX;
        } else {
          this.right.x += this.right.gapX;
        }
      },
      toDown: function () {
        if (this.down.maxX === this.down.x) {
          this.down.x = this.down.initX;
        } else {
          this.down.x += this.down.gapX;
        }
      },
      toLeft: function () {
        if (this.left.maxX === this.left.x) {
          this.left.x = this.left.initX;
        } else {
          this.left.x += this.left.gapX;
        }
      },
    },
  };

  const { up, right, down, left } = dogCharacter.walk;

  if (character === "darkShiba") {
    up.initX = 369;
    up.initY = 184;
    up.x = up.initX;
    up.y = up.initY;
    up.width = 44;
    up.height = 78;
    up.gap = 42;
    up.gapX = up.width + up.gap;
    up.maxX = up.initX + up.gapX * 3;
    right.initX = 353;
    right.initY = 108;
    right.x = right.initX;
    right.y = right.initY;
    right.width = 70;
    right.height = 68;
    right.gap = 16;
    right.gapX = right.width + right.gap;
    right.maxX = right.initX + right.gapX * 3;
    down.initX = 366;
    down.initY = 12;
    down.x = down.initX;
    down.y = down.initY;
    down.width = 44;
    down.height = 78;
    down.gap = 42;
    down.gapX = down.width + down.gap;
    down.maxX = down.initX + down.gapX * 3;
    left.initX = 355;
    left.initY = 280;
    left.x = left.initX;
    left.y = left.initY;
    left.width = 71;
    left.height = 68;
    left.gap = 15;
    left.gapX = left.width + left.gap;
    left.maxX = left.initX + left.gapX * 3;
  } else if (character === "grayShiba") {
    up.initX = 713;
    up.initY = 184;
    up.x = up.initX;
    up.y = up.initY;
    up.width = 44;
    up.height = 78;
    up.gap = 42;
    up.gapX = up.width + up.gap;
    up.maxX = up.initX + up.gapX * 3;
    right.initX = 697;
    right.initY = 108;
    right.x = right.initX;
    right.y = right.initY;
    right.width = 73;
    right.height = 68;
    right.gap = 13;
    right.gapX = right.width + right.gap;
    right.maxX = right.initX + right.gapX * 3;
    down.initX = 710;
    down.initY = 12;
    down.x = down.initX;
    down.y = down.initY;
    down.width = 44;
    down.height = 78;
    down.gap = 42;
    down.gapX = down.width + down.gap;
    down.maxX = down.initX + down.gapX * 3;
    left.initX = 697;
    left.initY = 280;
    left.x = left.initX;
    left.y = left.initY;
    left.width = 73;
    left.height = 65;
    left.gap = 13;
    left.gapX = left.width + left.gap;
    left.maxX = left.initX + left.gapX * 3;
  } else {
    up.initX = 28;
    up.initY = 186;
    up.x = up.initX;
    up.y = up.initY;
    up.width = 44;
    up.height = 76;
    up.gap = 42;
    up.gapX = up.width + up.gap;
    up.maxX = up.initX + up.gapX;
    right.initX = 19;
    right.initY = 111;
    right.x = right.initX;
    right.y = right.initY;
    right.width = 67;
    right.height = 65;
    right.gap = 18;
    right.gapX = right.width + right.gap;
    right.maxX = right.initX + right.gapX * 3
    down.initX = 22;
    down.initY = 20;
    down.x = down.initX;
    down.y = down.initY;
    down.width = 44;
    down.height = 70;
    down.gap = 42;
    down.gapX = down.width + down.gap;
    down.maxX = down.initX + down.gapX * 3;
    left.initX = 11;
    left.initY = 283;
    left.x = left.initX;
    left.y = left.initY;
    left.width = 65;
    left.height = 65;
    left.gap = 20;
    left.gapX = left.width + left.gap;
    left.maxX = left.initX + left.gapX * 3;
  }

  return dogCharacter;
};

export default getDogCharacter;
