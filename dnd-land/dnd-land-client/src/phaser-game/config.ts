import Phaser from "phaser";

import Lobby from "./scenes/Lobby";
import GameOver from "./scenes/GameOver";
import Preloader from "./scenes/Preloader";
import ShootingGame from "./stage1/Game";
import PuzzleGame from "./stage2/Game";
import MatchingGame from "./stage3/Game";
import GameStatusBar from "./common/GameStatusBar";
import LobbyStatusBar from "./scenes/LobbyStatusBar";
import Stage1GameGuide from "./stage1/GameGuide";
import Stage2GameGuide from "./stage2/GameGuide";
import Stage3GameGuide from "./stage3/GameGuide";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 30 },
    },
  },
  title: "DD Math",
  backgroundColor: "#eae4e9",
  scene: [
    Preloader,
    Lobby,
    LobbyStatusBar,
    PuzzleGame,
    MatchingGame,
    ShootingGame,
    GameStatusBar,
    Stage1GameGuide,
    Stage2GameGuide,
    Stage3GameGuide,
    GameOver,
  ],
};
