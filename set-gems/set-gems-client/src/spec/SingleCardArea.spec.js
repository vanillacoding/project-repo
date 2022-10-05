import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { SingleCardArea } from "../components/CardArea";
import * as cardHelpers from "../helper/card";

describe("Single Card Area", () => {
  const spyHandleSuccess = jest.fn();
  const spyHandleGameComplete = jest.fn();

  it("should render 12 cards", () => {
    const { container } = render(
      <SingleCardArea
        onSuccess={spyHandleSuccess}
        onGameCompleted={spyHandleGameComplete}
      />,
    );

    const $cardArea = container.querySelector(".card-area");
    expect($cardArea.children.length).toBe(12);
  });

  it("should toggle selected class if card clicked", () => {
    const { container } = render(
      <SingleCardArea
        onSuccess={spyHandleSuccess}
        onGameCompleted={spyHandleGameComplete}
      />,
    );

    const $card = container.querySelector(".card");

    fireEvent.click($card);

    expect($card.classList.contains("selected")).toBe(true);

    fireEvent.click($card);

    expect($card.classList.contains("selected")).toBe(false);
  });

  it("should add wrong class if selected set is wrong", () => {
    jest.useFakeTimers();

    const { container } = render(
      <SingleCardArea
        onSuccess={spyHandleSuccess}
        onGameCompleted={spyHandleGameComplete}
      />,
    );

    const spyValidateSet = jest.spyOn(cardHelpers, "validateSet")
      .mockImplementation(() => false);

    const $cardArea = container.querySelector(".card-area");
    const [
      $firstCard,
      $secondCard,
      $thirdCard,
      ...restCards
    ] = $cardArea.children;

    fireEvent.click($firstCard);
    fireEvent.click($secondCard);
    fireEvent.click($thirdCard);

    expect(spyValidateSet).toBeCalledTimes(1);
    expect($firstCard.classList.contains("wrong")).toBe(true);
    expect($secondCard.classList.contains("wrong")).toBe(true);
    expect($thirdCard.classList.contains("wrong")).toBe(true);

    restCards.forEach((card) => {
      expect(card.classList.contains("wrong")).toBe(false);
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect($firstCard.classList.contains("wrong")).toBe(false);
    expect($secondCard.classList.contains("wrong")).toBe(false);
    expect($thirdCard.classList.contains("wrong")).toBe(false);

    spyValidateSet.mockRestore();
    jest.clearAllTimers();
  });

  it("should call onSuccess if selected set is correct", () => {
    const maxCardCount = 81;
    const cardPerASet = 3;

    const { container } = render(
      <SingleCardArea
        onSuccess={spyHandleSuccess}
        onGameCompleted={spyHandleGameComplete}
      />,
    );

    const spyValidateSet = jest.spyOn(cardHelpers, "validateSet")
      .mockImplementation(() => true);

    const $cardArea = container.querySelector(".card-area");
    const [
      $firstCard,
      $secondCard,
      $thirdCard,
      ...restCards
    ] = $cardArea.children;

    fireEvent.click($firstCard);
    fireEvent.click($secondCard);
    fireEvent.click($thirdCard);

    expect(spyValidateSet).toBeCalledTimes(1);
    expect(spyHandleSuccess).toBeCalledTimes(1);
    expect(spyHandleSuccess).toBeCalledWith(maxCardCount - cardPerASet);

    spyValidateSet.mockRestore();
  });
});
