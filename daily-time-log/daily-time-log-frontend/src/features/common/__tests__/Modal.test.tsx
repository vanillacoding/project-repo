import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import Modal from "../Modal";

describe("Modal", () => {
  window.scrollTo = jest.fn();
  const children = <div data-testid="children">children</div>;

  test("render Modal component", () => {
    const onBackgroundClick = jest.fn();

    render(
      <Modal rootId="modal" isShowModal onBackgroundClick={onBackgroundClick}>
        {children}
      </Modal>,
    );

    expect(screen.getByTestId("children")).toHaveTextContent("children");

    fireEvent.click(document.querySelector(".modal-background"));
    expect(onBackgroundClick).toHaveBeenCalledTimes(1);
  });

  test("don't render Modal component", () => {
    const onBackgroundClick = jest.fn();

    render(
      <Modal rootId="modal" isShowModal={false} onBackgroundClick={onBackgroundClick}>
        {children}
      </Modal>,
    );

    expect(screen.queryByTestId("children")).toBeNull();
  });
});
