import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSelector } from "react-redux";
import { Route, MemoryRouter } from "react-router-dom";

import { act } from "react-dom/test-utils";
import { user } from "../src/utils/test-utils";
import EditGlossary from "../src/components/EditGlossary";

import * as glossaryService from "../src/services/glossaryService";

describe("EditGlossary component test", () => {
  beforeAll(() => {
    const mockData = {
      hasBucket: true,
      glossaryData: {
        component: "컴포넌트",
        react: "리액트",
      },
    };

    jest
      .spyOn(glossaryService, "getCsvFromGoogleStorage")
      .mockImplementation(() => {
        return Promise.resolve(mockData);
      });
  });

  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({
        user,
      }),
    );
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  test("initial render with mockData", async () => {
    await act(async () => {
      render(<EditGlossary />);
    });

    expect(screen.getByText("component")).toBeInTheDocument();
    expect(screen.getByText("컴포넌트")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("리액트")).toBeInTheDocument();
  });

  test("When the input value is empty should error message shown.", async () => {
    await act(async () => {
      render(<EditGlossary />);
    });

    const addButton = screen.getByRole("button", { name: "추가" });
    fireEvent.click(addButton);

    expect(screen.getByText("원문 단어를 입력해 주세요."));

    const textInput = screen.getByPlaceholderText("text");
    fireEvent.change(textInput, {
      target: {
        value: "react",
      },
    });
    fireEvent.click(addButton);

    expect(screen.getByText("번역 할 단어를 입력해 주세요."));

    const translationInput = screen.getByPlaceholderText("translation");
    fireEvent.change(translationInput, {
      target: {
        value: "리액트",
      },
    });
    fireEvent.click(addButton);

    expect(screen.getByText("이미 등록되어 있습니다."));
  });

  test("the event must operate when the add button is pressed.", async () => {
    await act(async () => {
      render(<EditGlossary />);
    });

    const textInput = screen.getByPlaceholderText("text");
    const translationInput = screen.getByPlaceholderText("translation");
    const addButton = screen.getByRole("button", { name: "추가" });

    fireEvent.change(textInput, {
      target: {
        value: "express",
      },
    });

    fireEvent.change(translationInput, {
      target: {
        value: "익스프레스",
      },
    });

    fireEvent.click(addButton);

    expect(textInput).toHaveTextContent("");
    expect(translationInput).toHaveTextContent("");
    expect(screen.getByText("express")).toBeInTheDocument();
    expect(screen.getByText("익스프레스")).toBeInTheDocument();
  });
});
