import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { act } from "react-dom/test-utils";
import OtherGlossaries from "../src/components/OtherGlossaries";
import * as glossaryService from "../src/services/glossaryService";
import { user } from "../src/utils/test-utils";

describe("OtherGlossaries component test", () => {
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

    const fakeGlossaries = [
      {
        userEmail: "aidencoders@gmail.com",
        glossary: {
          keywords: ["nodejs", "react"],
          updatedAt: "2021-09-16T10:42:43.849Z",
          wordPairs: {
            component: "컴포넌트",
            react: "리액트",
          },
        },
      },
      {
        userEmail: "ken77777@gmail.com",
        glossary: {
          keywords: ["react"],
          updatedAt: "2021-09-16T09:57:41.362Z",
          wordPairs: {
            component: "컴포넌트",
            react: "리액트",
          },
        },
      },
    ];

    jest
      .spyOn(glossaryService, "getGlossaries")
      .mockImplementation((idToken, currentPage, limit = 5, searchValue) => {
        if (!searchValue) {
          return Promise.resolve(fakeGlossaries);
        }

        const filteredFakeGlossaries = [];
        fakeGlossaries.forEach((fakeGlossary) => {
          const {
            glossary: { keywords },
          } = fakeGlossary;

          keywords.forEach((keyword) => {
            if (keyword === searchValue) {
              filteredFakeGlossaries.push(fakeGlossary);
            }
          });
        });

        return Promise.resolve(filteredFakeGlossaries);
      });
  });

  test("should rendering, need to show the data received from getGlossaries.", async () => {
    await act(async () => {
      render(
        <Router>
          <OtherGlossaries />
        </Router>,
      );
    });

    expect(screen.getByText("aidencoders@gmail.com의 용어집"))
      .toBeInTheDocument;
    expect(screen.getByText("ken77777@gmail.com의 용어집")).toBeInTheDocument;
  });

  test("if input is empty, error message.", async () => {
    await act(async () => {
      render(
        <Router>
          <OtherGlossaries />
        </Router>,
      );
    });

    const searchButton = screen.getByRole("button", { name: "검색" });

    fireEvent.click(searchButton);

    expect(screen.getByText("검색어를 입력해주세요.")).toBeInTheDocument;
  });

  test("input value and click event, filter glossary", async () => {
    await act(async () => {
      render(
        <Router>
          <OtherGlossaries />
        </Router>,
      );
    });

    const input = screen.getByPlaceholderText("검색어를 입력하세요.");
    const searchButton = screen.getByRole("button", { name: "검색" });

    fireEvent.change(input, {
      target: {
        value: "nodejs",
      },
    });

    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(
      screen.getByText("aidencoders@gmail.com의 용어집"),
    ).toBeInTheDocument();
  });
});
