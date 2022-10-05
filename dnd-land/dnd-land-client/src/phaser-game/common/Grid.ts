import Phaser from "phaser";

import CardBase from "./CardBase";
import DraggableCard from "../stage2/DraggableCard";
import DraggablePoint from "../stage3/DraggablePoint";

import shuffleArray from "../../utils/shuffleArray";

import { IGridData } from "./../../types/game";
import { PuzzleGameCardTypes } from "../stage2/puzzleGameCardTypes";
import { MatchingGameCardTypes } from "../stage3/matchingGameCardTypes";

export default class Grid {
  private rows: number;
  private columns: number;
  private xStart: number;
  private yStart: number;
  private xOffset: number;
  private yOffset: number;
  private cardOrder: number[];

  public scene: Phaser.Scene;
  private _completedCards = 0;
  private _cards: DraggableCard[] = [];
  private cardTypes: PuzzleGameCardTypes[] | MatchingGameCardTypes[];

  onDragEnd: (
    pointer: Phaser.Input.Pointer,
    gameObject?: DraggableCard | Phaser.GameObjects.Sprite,
  ) => void;

  constructor(data: IGridData) {
    const {
      scene,
      rows,
      columns,
      xOffset,
      yOffset,
      xStart,
      yStart,
      cardTypes,
      onDragEnd,
    } = data;

    this.scene = scene;
    this.rows = rows;
    this.columns = columns;

    this.xStart = xStart;
    this.yStart = yStart;
    this.xOffset = xOffset;
    this.yOffset = yOffset;

    this.onDragEnd = onDragEnd;
    this.cardTypes = cardTypes;

    this.cardOrder = this.createCardOrder();
  }

  public addCards(startIndex: number = this.columns * this.rows - 1) {
    for (let i = startIndex; i < this.columns * this.rows; i++) {
      const cardType = this.cardTypes[this.cardOrder[i] || 0];

      const card = new CardBase({
        scene: this.scene,
        x: this.xStart + this.xOffset * Math.floor(i / this.rows),
        y: this.yStart - this.yOffset * (i % this.rows),
        name: cardType.name,
        image: cardType.image,
        value: cardType.value,
      });

      card.depth = 1;
      this.cards.push(card);
    }
  }

  public addDraggableCards(startIndex: number = this.columns * this.rows - 1) {
    for (let i = startIndex; i < this.columns * this.rows; i++) {
      const cardType = this.cardTypes[this.cardOrder.pop() || 0];

      const card = new DraggableCard({
        scene: this.scene,
        x: this.xStart + this.xOffset * Math.floor(i / this.rows),
        y: this.yStart - this.yOffset * (i % this.rows),
        name: cardType.name,
        image: cardType.image,
        value: cardType.value,
        ondragend: (
          pointer: Phaser.Input.Pointer,
          gameObject: DraggableCard,
        ) => {
          this.onDragEnd(pointer, gameObject);
        },
      });

      card.depth = 1;
      this.cards.push(card);
    }
  }

  public addDraggablePoint(startIndex: number = this.columns * this.rows - 1) {
    for (let i = startIndex; i < this.columns * this.rows; i++) {
      const cardType = this.cardTypes[this.cardOrder[i] || 0];

      const point = new DraggablePoint({
        scene: this.scene,
        name: cardType.name,
        image: cardType.image,
        value: cardType.value,
        x: this.xStart + this.xOffset * Math.floor(i / this.rows),
        y: this.yStart - this.yOffset * (i % this.rows),
        ondragend: (
          pointer: Phaser.Input.Pointer,
          gameObject: Phaser.GameObjects.Sprite,
        ) => {
          this.onDragEnd(pointer, gameObject);
        },
      });

      point.depth = 2;
    }
  }

  public moveCardsDown(index: number) {
    this.cards.forEach((card, i) => {
      if (index > i) {
        return;
      }

      card.originalY = card.y + this.yOffset;

      this.scene.tweens.add({
        targets: card,
        duration: 150,
        y: card.y + this.yOffset,
      });
    });

    if (this.completedCards + this.cards.length < this.cardTypes.length - 1) {
      setTimeout(() => this.addDraggableCards(), 300);
    }
  }

  private createCardOrder(): number[] {
    const numberArray = new Array(this.cardTypes.length)
      .fill(null)
      .map((_, i) => i);

    return shuffleArray<number[]>(numberArray, this.columns);
  }

  public removeCompletedCard(order: number) {
    this.cards = this.cards.filter((card, index) => order !== index);
  }

  get completedCards() {
    return this._completedCards;
  }

  set completedCards(number) {
    this._completedCards = number;
  }

  get cards() {
    return this._cards;
  }

  set cards(cardList) {
    this._cards = cardList;
  }
}
