import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useSelector } from "react-redux";
import { Route, MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { user } from "../src/utils/test-utils";
import DetailOtherGlossary from "../src/components/DetailOtherGlossary";
import { OTHER_GLOSSARY } from "../src/constants/url";

import * as glossaryService from "../src/services/glossaryService";
import chromeStore from "../src/utils/chromeStore";

describe("DetailOtherGlossary component test", () => {
  const createMockFunctions = () => {
    const mockUpdateGoogleStorage = jest
      .spyOn(glossaryService, "updateCsvFromGoogleStorage")
      .mockImplementation(() => {});
    const createGlossary = jest
      .spyOn(glossaryService, "createGlossaryFromGoogleTranslation")
      .mockImplementation(() => {});
    const mockUpdateServer = jest
      .spyOn(glossaryService, "updateGlossaryFromServer")
      .mockImplementation(() => {});

    return {
      mockUpdateGoogleStorage,
      createGlossary,
      mockUpdateServer,
    };
  };

  beforeAll(() => {
    const glossaryData = {
      "ken777@gmail.com": {
        react: "리액트",
        nodejs: "노드",
      },
      "aidencoders@gmail.com": {
        express: "익스프레스",
      },
    };

    jest
      .spyOn(glossaryService, "getGlossaryFromServer")
      .mockImplementation(({ userId }) => {
        return Promise.resolve(glossaryData[userId]);
      });

    jest.spyOn(chromeStore, "set").mockImplementation(() => {});

    jest.spyOn(chromeStore, "get").mockImplementation(() => {});
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

  test("initial rendering, server off", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/other-glossaries/ken777@gmail.com"]}>
          <Route path={OTHER_GLOSSARY}>
            <DetailOtherGlossary />
          </Route>
        </MemoryRouter>,
      );
    });

    expect(
      screen.getByText("해당 서비스는 서버 연결이 필요합니다."),
    ).toBeInTheDocument();
  });

  test("initial rendering, server on", async () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: {
          ...user,
          isServerOn: true,
        },
      }),
    );

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/other-glossaries/ken777@gmail.com"]}>
          <Route path={OTHER_GLOSSARY}>
            <DetailOtherGlossary />
          </Route>
        </MemoryRouter>,
      );
    });

    expect(screen.getByText("내 용어집")).toBeInTheDocument();
    expect(screen.getByText("ken777의 용어집")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("리액트")).toBeInTheDocument();
    expect(screen.getByText("nodejs")).toBeInTheDocument();
    expect(screen.getByText("express")).toBeInTheDocument();
    expect(screen.getByText("익스프레스")).toBeInTheDocument();
  });

  test("apply button click event", async () => {
    useSelector.mockImplementation((selector) =>
      selector({
        user: {
          ...user,
          isServerOn: true,
        },
      }),
    );

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/other-glossaries/ken777@gmail.com"]}>
          <Route path={OTHER_GLOSSARY}>
            <DetailOtherGlossary />
          </Route>
        </MemoryRouter>,
      );
    });

    const { mockUpdateGoogleStorage, createGlossary, mockUpdateServer } =
      createMockFunctions();

    const applyButton = screen.getByRole("button", { name: "적용하기" });

    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(mockUpdateGoogleStorage).toBeCalled();
      expect(createGlossary).toBeCalled();
      expect(mockUpdateServer).toBeCalled();
    });
  });
});
