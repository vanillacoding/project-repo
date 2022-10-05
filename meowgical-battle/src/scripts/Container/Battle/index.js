import * as PIXI from "pixi.js";
import Drawer from "./Drawer";
import SkillCommandListener from "./SkillCommandListener";
import ArrowIconDisplayer from "./ArrowIconDisplayer";
import StatusBar from "./StatusBar";
import TileGroup from "./TileGroup";
import Player from "./Player";
import ResultModal from "./ResultModal";
import MainMenu from "../MainMenu";
import globalStore from "../../globalStore";
import { canvasSize } from "../../config";
import { actionsInGame } from "../../constants";
import generateRandomString from "../../utils/generateRandomString";

export default class Battle {
  constructor(isHost, peer) {
    this.isHost = isHost;
    this.peer = peer;

    this.container = new PIXI.Container();
    this.container.sortableChildren = true;

    this.backgroundTexture = globalStore
      .getItem("resources")
      .battleBackground
      .texture;

    this.playerArrowIconDisplayerOption = null;
    this.opponentArrowIconDisplayerOption = null;
    this.setArrowIconDisplayerOption();

    this.playerStatusBarOption = null;
    this.opponentStatusBarOption = null;
    this.setStatusBarOptions();

    this.playerTileGroupOption = null;
    this.opponentTileGroupOption = null;
    this.setTileOptions();

    this.playerOption = null;
    this.opponentOption = null;
    this.setPlayersOptions();

    this.winModalOption = null;
    this.defeatModalOption = null;
    this.setResultModalOptions();

    this.backgroundZIndex = -10;
    this.drawerZIndex = 10;

    this.skillCommandListener = null;
    this.createSkillCommandListener();

    this.drawer = null;
    this.createDrawer();

    this.playerArrowIconDisplayer = null;
    this.createPlayerArrowIconDisplayer();
    this.opponentArrowIconDisplayer = null;
    this.createOpponentArrowIconDisplayer();

    this.background = null;
    this.playerStatusBar = null;
    this.opponentStatusBar = null;
    this.playerTileGroup = null;
    this.opponentTileGroup = null;
    this.player = null;
    this.opponent = null;
    this.createBackground();
    this.createPlayerStatusBar();
    this.createOpponentStatusBar();
    this.createPlayerTileGroup();
    this.createOpponentTileGroup();
    this.createPlayer();
    this.createOpponent();

    this.listenOpponentAction();
    this.setSkillCommands();

    this.isPlaying = true;

    this.render();
  }

  setArrowIconDisplayerOption() {
    this.playerArrowIconDisplayerOption = {
      color: "blue",
      size: { width: 100, height: 100 },
      position: { x: 50, y: 250 },
    };

    this.opponentArrowIconDisplayerOption = {
      color: "orange",
      size: { width: 30, height: 30 },
      position: { x: canvasSize.width - 550, y: 200 },
    };

    this.arrowIconDisplayerZIndex = 10;
  }

  setStatusBarOptions() {
    this.statusBarDistance = 500;

    this.playerStatusBarOption = {
      x: canvasSize.width / 2 - this.statusBarDistance,
      y: canvasSize.height / 2 - 400,
      isHost: this.isHost,
    };
    this.opponentStatusBarOption = {
      x: canvasSize.width / 2 + this.statusBarDistance,
      y: canvasSize.height / 2 - 400,
      isHost: !this.isHost,
    };
  }

  setTileOptions() {
    this.tileGroupGap = 440;
    this.tileGroupYOffset = 300;
    this.tileGroupSize = {
      row: 4,
      column: 4,
    };

    this.tileGap = 20;
    this.tileSize = {
      width: 200,
      height: 80,
    };
    this.tileBorderWidth = 10;

    this.hostPlayerTileColor = 0xa8e8ca;
    this.guestPlayerTileColor = 0x9abeff;

    this.playerTileGroupPosition = {
      x: canvasSize.width / 2 - this.tileGroupGap,
      y: canvasSize.height / 2 + this.tileGroupYOffset,
    };
    this.opponentTileGroupPosition = {
      x: canvasSize.width / 2 + this.tileGroupGap,
      y: canvasSize.height / 2 + this.tileGroupYOffset,
    };

    this.playerFirstTilePosition = {
      x: this.playerTileGroupPosition.x -
        (this.tileSize.width / 2) -
        this.tileGap -
        this.tileSize.width,
      y: this.playerTileGroupPosition.y -
        (this.tileSize.height / 2) -
        this.tileGap -
        this.tileSize.height,
    };
    this.opponentFirstTilePosition = {
      x: this.opponentTileGroupPosition.x +
        (this.tileSize.width / 2) +
        this.tileGap +
        this.tileSize.width,
      y: this.opponentTileGroupPosition.y -
        (this.tileSize.height / 2) -
        this.tileGap -
        this.tileSize.height,
    };

    this.playerTileGroupOption = {
      x: this.playerTileGroupPosition.x,
      y: this.playerTileGroupPosition.y,
      row: this.tileGroupSize.row,
      column: this.tileGroupSize.column,
      tileWidth: this.tileSize.width,
      tileHeight: this.tileSize.height,
      tileBorderWidth: this.tileBorderWidth,
      tileBorderColor: this.isHost
        ? this.hostPlayerTileColor
        : this.guestPlayerTileColor,
      tileXGap: this.tileGap,
      tileYGap: this.tileGap,
    };
    this.opponentTileGroupOption = {
      x: this.opponentTileGroupPosition.x,
      y: this.opponentTileGroupPosition.y,
      row: this.tileGroupSize.row,
      column: this.tileGroupSize.column,
      tileWidth: this.tileSize.width,
      tileHeight: this.tileSize.height,
      tileBorderWidth: this.tileBorderWidth,
      tileBorderColor: this.isHost
        ? this.guestPlayerTileColor
        : this.hostPlayerTileColor,
      tileXGap: this.tileGap,
      tileYGap: this.tileGap,
    };
  }

  setPlayersOptions() {
    this.playerOption = {
      isHost: this.isHost,
      isHeadingToRight: true,
      x: this.playerFirstTilePosition.x,
      y: this.playerFirstTilePosition.y,
      columnIndex: 0,
      rowIndex: 0,
      columnRange: this.tileGroupSize.column,
      rowRange: this.tileGroupSize.row,
      xMovingDistance: this.tileSize.width + this.tileGap,
      yMovingDistance: this.tileSize.height + this.tileGap,
      actionCallback: this.sendPlayerAction.bind(this),
      beHitCallback: this.updatePlayerStatusBar.bind(this),
      magicStartCallback: this.renderMagic.bind(this),
      magicTerminationCallback: this.removePlayerMagic.bind(this),
    };
    this.opponentOption = {
      isHost: !this.isHost,
      isHeadingToRight: false,
      x: this.opponentFirstTilePosition.x,
      y: this.opponentFirstTilePosition.y,
      columnIndex: this.tileGroupSize.column - 1,
      rowIndex: 0,
      columnRange: this.tileGroupSize.column,
      rowRange: this.tileGroupSize.row,
      xMovingDistance: this.tileSize.width + this.tileGap,
      yMovingDistance: this.tileSize.height + this.tileGap,
      beHitCallback: this.updateOpponentStatusBar.bind(this),
      magicStartCallback: this.renderMagic.bind(this),
      magicTerminationCallback: this.removeOpponentMagic.bind(this),
    };
  }

  setResultModalOptions() {
    this.winModalOption = {
      width: 600,
      height: 400,
      x: canvasSize.width / 2,
      y: canvasSize.height / 2,
      color: 0xffffff,
      borderWidth: 10,
      borderColor: 0x1e90ff,
    };

    this.defeatModalOption = {
      ...this.winModalOption,
      borderColor: 0xd11137,
    };

    this.resultModalZIndex = 100;
  }

  createSkillCommandListener() {
    this.skillCommandListener = new SkillCommandListener();
  }

  createDrawer() {
    this.drawer = new Drawer(
      this.handleDrawerPointerUp.bind(this),
      this.handleStrokeAdded.bind(this)
    );

    this.drawer.container.zIndex = this.drawerZIndex;
  }

  createPlayerArrowIconDisplayer() {
    this.playerArrowIconDisplayer =
      new ArrowIconDisplayer(
        this.playerArrowIconDisplayerOption
      );

    this.playerArrowIconDisplayer.container.zIndex =
      this.arrowIconDisplayerZIndex;
  }

  createOpponentArrowIconDisplayer() {
    this.opponentArrowIconDisplayer =
      new ArrowIconDisplayer(
        this.opponentArrowIconDisplayerOption
      );

    this.opponentArrowIconDisplayer.container.zIndex =
      this.arrowIconDisplayerZIndex;
  }

  createBackground() {
    this.background = new PIXI.Sprite(this.backgroundTexture);
    this.background.zIndex = this.backgroundZIndex;
  }

  createPlayerStatusBar() {
    this.playerStatusBar = new StatusBar(this.playerStatusBarOption);
  }

  createOpponentStatusBar() {
    this.opponentStatusBar = new StatusBar(this.opponentStatusBarOption);
  }

  createPlayerTileGroup() {
    this.playerTileGroup = new TileGroup(this.playerTileGroupOption);
  }

  createOpponentTileGroup() {
    this.opponentTileGroup = new TileGroup(this.opponentTileGroupOption);
  }

  createPlayer() {
    this.player = new Player(this.playerOption);
  }

  createOpponent() {
    this.opponent = new Player(this.opponentOption);
  }

  createResultModal(isWin) {
    if (isWin) {
      this.resultModal = new ResultModal(
        this.winModalOption,
        true,
        this.returnToMainMenu.bind(this)
      );
    } else {
      this.resultModal = new ResultModal(
        this.defeatModalOption,
        false,
        this.returnToMainMenu.bind(this)
      );
    }

    this.resultModal.container.zIndex = this.resultModalZIndex;
  }

  render() {
    this.container.addChild(
      this.drawer.container,
      this.playerArrowIconDisplayer.container,
      this.opponentArrowIconDisplayer.container,
      this.background,
      this.playerStatusBar.container,
      this.opponentStatusBar.container,
      this.playerTileGroup.container,
      this.opponentTileGroup.container,
      this.player.container,
      this.opponent.container
    );
  }

  handleDrawerPointerUp(directions) {
    this.skillCommandListener.handleCommandListen(directions);
    this.playerArrowIconDisplayer.clearArrowIcons();
    this.sendPlayerAction({
      action: actionsInGame.CLEAR_STROKES,
    });
  }

  handleStrokeAdded(direction) {
    this.playerArrowIconDisplayer.createArrowIcon(direction);

    let toBeInputedArrowDirection = "";
    if (direction === "left") {
      toBeInputedArrowDirection = "right";
    } else if (direction === "right") {
      toBeInputedArrowDirection = "left";
    } else {
      toBeInputedArrowDirection = direction;
    }

    this.sendPlayerAction({
      action: actionsInGame.DRAW_STROKE,
      payload: toBeInputedArrowDirection,
    });
  }

  renderMagic(magic) {
    this.container.addChild(magic.container);
  }

  removePlayerMagic(magic) {
    this.container.removeChild(magic.container);
    delete this.player.magics[magic.magicIndex];
  }

  removeOpponentMagic(magic) {
    this.container.removeChild(magic.container);
    delete this.opponent.magics[magic.magicIndex];
  }

  updatePlayerStatusBar(hittingMagic) {
    this.playerStatusBar.beHit(hittingMagic.damage);
  }

  updateOpponentStatusBar(hittingMagic) {
    this.opponentStatusBar.beHit(hittingMagic.damage);
  }

  collideMagicWithPlayer(hitPlayer, hittingMagic) {
    if (hittingMagic.handleHit) {
      hittingMagic.handleHit();
    }

    hitPlayer.beHit(hittingMagic);
  }

  setSkillCommands() {
    this.skillCommandListener
      .addSkillCommand({
        command: ["left"],
        skill: this.player.moveLeft.bind(this.player),
      })
      .addSkillCommand({
        command: ["right"],
        skill: this.player.moveRight.bind(this.player),
      })
      .addSkillCommand({
        command: ["up"],
        skill: this.player.moveUp.bind(this.player),
      })
      .addSkillCommand({
        command: ["down"],
        skill: this.player.moveDown.bind(this.player),
      })
      .addSkillCommand({
        command: ["right", "left", "right"],
        skill: this.player.castFireball.bind(this.player),
      })
      .addSkillCommand({
        command: ["down", "left", "right", "left", "down"],
        skill: this.player.castLightning.bind(this.player),
      })
      .addSkillCommand({
        command: ["right", "down", "right", "up", "right"],
        skill: this.player.layMine.bind(this.player),
      })
      .addSkillCommand({
        command: ["right", "up", "right", "down", "right"],
        skill: this.player.buildTurret.bind(this.player),
      });
  }

  listenOpponentAction() {
    this.peer.on("data", (data) => {
      const { action, payload } = JSON.parse(data);

      switch (action) {
        case actionsInGame.MOVE_FRONT :
          this.opponent.moveLeft();
          break;
        case actionsInGame.MOVE_BACK:
          this.opponent.moveRight();
          break;
        case actionsInGame.MOVE_UP:
          this.opponent.moveUp();
          break;
        case actionsInGame.MOVE_DOWN:
          this.opponent.moveDown();
          break;
        case actionsInGame.BE_HIT:
          this.collideMagicWithPlayer(
            this.opponent,
            this.player.magics[payload]
          );
          break;
        case actionsInGame.CAST_FIREBALL:
          this.opponent.castFireball();
          break;
        case actionsInGame.CAST_LIGHTNING:
          this.opponent.castLightning();
          break;
        case actionsInGame.LAY_MINE:
          this.opponent.layMine();
          break;
        case actionsInGame.BUILD_TURRET:
          this.opponent.buildTurret();
          break;
        case actionsInGame.DRAW_STROKE:
          this.opponentArrowIconDisplayer
            .createArrowIcon(payload);
          break;
        case actionsInGame.CLEAR_STROKES:
          this.opponentArrowIconDisplayer
            .clearArrowIcons(payload);
          break;
        default:
          break;
      }
    });
  }

  sendPlayerAction(data) {
    if (this.isPlaying) {
      this.peer.send(
        JSON.stringify(data)
      );
    }
  }

  sendStrokeDirection(direction) {
    const data = {};

    if (direction === "left") {
      data.action = actionsInGame.DRAW_LEFT_STROKE;
    } else if (direction === "right") {
      data.action = actionsInGame.DRAW_RIGHT_STROKE;
    } else if (direction === "up") {
      data.action = actionsInGame.DRAW_UP_STROKE;
    } else if (direction === "down") {
      data.action = actionsInGame.DRAW_DOWN_STROKE;
    }

    this.sendPlayerAction(data);
  }

  update() {
    this.checkIsGameOver();
    this.checkIsPlayerHit();
  }

  checkIsPlayerHit() {
    for (const magicIndex in this.opponent.magics) {
      const magic = this.opponent.magics[magicIndex];

      if (magic.checkIsHit && magic.isAbleToHit) {
        const isHit = magic.checkIsHit(this.player);

        if (isHit) {
          this.collideMagicWithPlayer(this.player, magic);
        }
      }
    }
  }

  checkIsGameOver() {
    const playerHp = this.player.hp;
    const opponentHp = this.opponent.hp;

    if (playerHp <= 0 || opponentHp <= 0) {
      this.terminateGame(playerHp > 0);
    }
  }

  terminateGame(isWin) {
    this.isPlaying = false;
    this.drawer.terminateDrawing();

    this.peer.destroy();

    this.createResultModal(isWin);
    this.container.addChild(this.resultModal.container);

    if (isWin) {
      this.opponentStatusBar.portrait.defeat();
      this.player.win();
      this.opponent.beDefeated();
    } else {
      this.playerStatusBar.portrait.defeat();
      this.opponent.win();
      this.player.beDefeated();
    }
  }

  returnToMainMenu() {
    globalStore.setStore(
      "scene",
      new MainMenu(generateRandomString())
    );
  }
}
