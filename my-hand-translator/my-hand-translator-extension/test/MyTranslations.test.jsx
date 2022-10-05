import React from "react";
import "@testing-library/jest-dom";
import { useSelector } from "react-redux";
import { render, fireEvent } from "@testing-library/react";

import MyTranslations from "../src/components/MyTranslations";
import { user } from "../src/utils/test-utils";

jest.mock("react-redux");

describe("MyTranslations component test", () => {
  beforeAll(async () => {
    window.IntersectionObserver = class IntersectionObserver {
      constructor(callback) {
        this.callback = callback;
      }

      disconnect() {
        return null;
      }

      observe() {
        return null;
      }

      takeRecords() {
        return null;
      }

      unobserve() {
        return null;
      }
    };

    useSelector.mockImplementation((selector) =>
      selector({
        user,
      }),
    );
  });

  afterAll(() => {
    delete window.IntersectionObserver;
  });

  test("should initial rendering showing translations with server off", () => {
    const { getByText } = render(<MyTranslations />);

    expect(getByText("react")).not.toBeNull();
    expect(getByText("리액트")).not.toBeNull();
    expect(getByText("vanilla")).not.toBeNull();
  });

  test("should to be able to search the contents.", () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <MyTranslations />,
    );

    const input = getByPlaceholderText("검색어를 입력하세요.");
    const button = getByRole("button", { name: "검색" });

    fireEvent.change(input, {
      target: {
        value: "리액트",
      },
    });

    fireEvent.click(button);

    expect(getByText("리액트")).not.toBeNull();
  });
});
