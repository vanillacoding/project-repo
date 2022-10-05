import { MatchingGameCardTypes } from "./../phaser-game/stage3/matchingGameCardTypes";
import { PuzzleGameCardTypes } from "./../phaser-game/stage2/puzzleGameCardTypes";
import DraggableCard from "../phaser-game/stage2/DraggableCard";
import MatchableCard from "~/phaser-game/stage3/MatchableCard";

export interface IStatusBarData {
  game: string;
  totalScore: number;
  scene: Phaser.Scene;
}

export interface ICardBaseData {
  x: number;
  y: number;
  name: string;
  image: string;
  value: string | number;
  scene: Phaser.Scene;
}

export interface ICardData extends ICardBaseData {
  ondragend(
    pointer: Phaser.Input.Pointer,
    gameObject: DraggableCard | MatchableCard,
  ): void;
}

export interface IDraggablePoint extends ICardBaseData {
  ondragend(
    pointer: Phaser.Input.Pointer,
    gameObject: Phaser.GameObjects.Sprite,
  ): void;
}

export interface IGridData {
  rows: number;
  columns: number;
  xStart: number;
  yStart: number;
  xOffset: number;
  yOffset: number;
  scene: Phaser.Scene;
  game: "puzzle-game" | "matching-game";
  cardTypes: PuzzleGameCardTypes[] | MatchingGameCardTypes[];
  onDragEnd(
    pointer: Phaser.Input.Pointer,
    gameObject?: DraggableCard | Phaser.GameObjects.Sprite,
  ): void;
}
