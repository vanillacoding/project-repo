import Hero from "../../gameObjects/Hero";
import CountDownScene from "../common/CountDownScene";

import { socket } from "../../../utils/socket";
import store from "../../../store";
import { updateGameResult } from "../../../redux/slices/multiplaySlice";
import { Clouds } from "../../../constants/coordinates";
 
export default class MultiStage extends Phaser.Scene {
  constructor() {
    super("multi");

    this.isCoinMessageExist = false;
  }

  init() {
    socket.emit("initGame");

    this.registry.values.score = {
      rabbit: 0,
      carrot: 0,
    };
  }

  create() {
    this.setBackground();

    this.setStatusBar();

    this.successEffect = this.sound.add("success", { loop: false });
    this.coinEffect = this.sound.add("coin", { loop: false });
    this.failEffect = this.sound.add("fail", { loop: false });
    this.mainMusic = this.sound.add("main", { loop: true });
    
    const countDownScene = new CountDownScene(this.scene, this.mainMusic);

    this.scene.add("CountDownScene", countDownScene, true);

    socket.on("loadPlayers", ({ player, otherPlayers }) => {
      this.player = new Hero(this, player.x, player.y, player.role === "rabbit" ? "enemy" : "hero");

      this.player.id = player.userId;
      this.player.role = player.role;

      this.otherPlayers = Object.values(otherPlayers).map((playerInfo) => {
        const player = new Hero(
          this,
          playerInfo.x,
          playerInfo.y,
          playerInfo.role === "rabbit" ? "enemy" : "hero"
        );

        player.id = playerInfo.userId;
        player.role = playerInfo.role;

        return player;
      });

      this.physics.world.enable(
        [this.player, ...this.otherPlayers],
        Phaser.Physics.Arcade.DYNAMIC_BODY
      );

      this.createPlayer(this.player);
      
      this.otherPlayers.forEach((player) => {
        this.createPlayer(player);
      });

      this.playerQueuedPosition = {
        x: this.player.x,
        y: this.player.y,
      };

      this.setCamera();
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.setCoinToMap();

    socket.on("somePlayerMove", ({ x, y, id, anims }) => {
      const [targetPlayer] = this.otherPlayers.filter(
        (player) => player.id === id
      );

      targetPlayer.x = x;
      targetPlayer.y = y;

      targetPlayer.play(anims, true);
    });

    socket.on("updateCount", ({ score, id }) => {
      const [targetPlayer] = this.otherPlayers.filter(
        (player) => player.id === id
      );
      
      if (targetPlayer) {
        targetPlayer.getCoin();
      }
      
      this.registry.values.score = { ...score };
    });

    socket.on("getGameResult", ({ isWin }) => {
      this.scene.pause();

      if (isWin) {
        this.player.setWin();
      } else {
        this.player.setLose();
      }

      store.dispatch(updateGameResult({ isWin }));    
    });
  }

  update() {
    if (!this.player) {
      return;
    }
    
    const currentTime = 90 - this.timer.getElapsedSeconds().toString().substr(0, 2);
    const currentMin = Math.floor(currentTime / 60);
    const currentSecond = currentTime % 60 < 10 ? `0${currentTime % 60}` : currentTime % 60;

    this.countDown.setText(`TIME: ${currentMin}:${currentSecond}`).setDepth(7);

    this.countDown.x = this.player.body.position.x - 450;
    this.countDown.y = this.player.body.position.y - 340;

    this.score.setText(`RABBIT: ${this.registry.values.score.rabbit} CARROT: ${this.registry.values.score.carrot}`).setDepth(7);

    this.score.x = this.player.body.position.x + 130;
    this.score.y = this.player.body.position.y - 340;

    this.player.handleMovement(this.cursors, this.boardLayer);

    if (
      this.player.x !== this.playerQueuedPosition.x ||
      this.player.y !== this.playerQueuedPosition.y
    ) {
      socket.emit("movePlayer", {
        x: this.player.x,
        y: this.player.y,
        anims: this.player.anims.currentAnim.key,
      });
    }

    if (this.coinCount === 0) {
      this.stopGame();
    }
  }

  setBackground() {
    this.map = this.add.tilemap("level3-map");

    const tileset = this.map.addTilesetImage("iso-level3", "tiles");

    this.boardLayer = this.map.createLayer("Tile Layer 1", tileset).setDepth(2);
    this.coinLayer = this.map.createLayer("Tile Layer 2", tileset);

    Clouds.forEach((cloud) => {
      this.add.image(cloud.x, cloud.y, "cloud").setDepth(1);
    });
  }

  setCamera() {
    this.cameras.main.setZoom(1);
    this.cameras.main.startFollow(this.player, true);
  }

  setStatusBar() {
    this.score = this.add
      .text(0, 500, `Rabbit: Carrot: `, {
        fontSize: "35px", 
        fill: "#733F10", 
        fontFamily: "MainFont" 
      });

    this.countDown = this.add
      .text(0, 500, `TIME: `, {
        fontSize: "35px",
        fill: "#733F10", 
        fontFamily: "MainFont" 
      });
    
    this.timer = this.time.delayedCall(90000, this.stopGame, [], this);
  }

  setCoinToMap() {
    this.coins = this.coinLayer.createFromTiles(6, -1, { key: "coin" });

    this.coinCount = this.coins.length;

    this.coins.forEach((coin) => {
      this.physics.add.existing(coin);

      const body = coin.body;

      body.setCircle(32, 31, -1);
      coin.setDepth(5);
    });
  }

  createPlayer(player) {
    this.add.existing(player).setDepth(5);

    if (player.role === "rabbit") {
      player.body.setSize(40, 75, true);
      player.body.setOffset(45, 40);
    } else {
      player.body.setSize(35, 50, true);
      player.body.setOffset(45, 40);
    }

    this.physics.add.overlap(
      player,
      this.coins,
      this.handlePlayerGetCoin,
      this.checkIsCanPlayerGetCoin(player),
      this,
    );
  }

  stopGame() {
    this.time.addEvent({
      callback: () => {
        socket.emit("gameOver", {
          score: this.registry.values.score,
          role: this.player.role,
        });

        this.mainMusic.stop();
        this.successEffect.play();
      },
      callbackScope: this,
      delay: 1000,
    });    
  }

  handlePlayerGetCoin(player, coin) {
    coin.destroy(true);
    
    this.coinCount--;

    player.getCoin();

    this.coinEffect.play();

    if (player.id === this.player.id) {
      socket.emit("userGetCoin", { role: player.role, point: 10 });
    }
  }

  checkIsCanPlayerGetCoin(player) {
    return (object, coin) => {
      if (!player) {
        return false;
      }

      return player.canGetCoin(coin);
    };
  }
}
