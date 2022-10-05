export default class Controller {
  constructor(player) {
    this.player = player;
  }

  keyDownController = (event) => {
    this.player.sprite.play();

    switch (event.code) {
      case 'ArrowLeft': {
        if (this.player.left.isUp) {
          this.player.sprite.textures = this.player.playerSheet.walkWest;
          this.player.sprite.vx = -this.player.movementSpeed;
          this.player.sprite.vy = 0;
          this.player.sprite.prevAction = 'standing';
        }
        this.player.left.isDown = true;
        this.player.left.isUp = false;
        this.player.sprite.direction = 'west'
        break;
      }
      case 'ArrowUp': {
        if (this.player.up.isUp) {
          this.player.sprite.textures = this.player.playerSheet.walkNorth;
          this.player.sprite.vy = -this.player.movementSpeed;
          this.player.sprite.vx = 0;
          this.player.sprite.prevAction = 'standing';
        }
        this.player.up.isDown = true;
        this.player.up.isUp = false;
        this.player.sprite.direction = 'north'
        break;
      }
      case 'ArrowRight': {
        if (this.player.right.isUp) {
          this.player.sprite.textures = this.player.playerSheet.walkEast;
          this.player.sprite.vx = this.player.movementSpeed;
          this.player.sprite.vy = 0;
          this.player.sprite.prevAction = 'standing';
        }
        this.player.right.isDown = true;
        this.player.right.isUp = false;
        this.player.sprite.direction = 'east'
        break;
      }
      case 'ArrowDown': {
        if (this.player.down.isUp) {
          this.player.sprite.textures = this.player.playerSheet.walkSouth;
          this.player.sprite.vy = this.player.movementSpeed;
          this.player.sprite.vx = 0;
          this.player.sprite.prevAction = 'standing';
        }
        this.player.down.isDown = true;
        this.player.down.isUp = false;
        this.player.sprite.direction = 'south'
        break;
      }
      default: {
        break;
      }
    }
    this.player.updateNewVideoChatSpaceLocation();
  }

  keyUpController = (event) => {
    switch (event.code) {
      case 'ArrowLeft': {
        if (this.player.left.isDown) {
          this.player.sprite.textures = this.player.playerSheet.standWest;
          this.player.sprite.vx = 0;
        }
        this.player.left.isDown = false;
        this.player.left.isUp = true;
        this.player.sprite.direction = 'west'
        break;
      }
      case 'ArrowUp': {
        if (this.player.up.isDown) {
          this.player.sprite.textures = this.player.playerSheet.standNorth;
          this.player.sprite.vy = 0;
        }
        this.player.up.isDown = false;
        this.player.up.isUp = true;
        this.player.sprite.direction = 'north'
        break;
      }
      case 'ArrowRight': {
        if (this.player.right.isDown) {
          this.player.sprite.textures = this.player.playerSheet.standEast;
          this.player.sprite.vx = 0;
        }
        this.player.right.isDown = false;
        this.player.right.isUp = true;
        this.player.sprite.direction = 'east'
        break;
      }
      case 'ArrowDown': {
        if (this.player.down.isDown) {
          this.player.sprite.textures = this.player.playerSheet.standSouth;
          this.player.sprite.vy = 0;
        }
        this.player.down.isDown = false;
        this.player.down.isUp = true;
        this.player.sprite.direction = 'south'
        break;
      }
      default: {
        break;
      }
    }
    this.player.updateNewVideoChatSpaceLocation();
    this.player.sprite.prevAction = 'moving';
  }
}
