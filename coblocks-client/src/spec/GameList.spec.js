import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProvider } from "./test-utils";
import { BLOCK_NAMES, WINDOW } from "../config/constants";

describe("GameList 컴포넌트", () => {
  it("GameList 컴포넌트 렌더링시 element 렌더 정상여부체크", () => {
    renderWithProvider(["/game_list"]);

    expect(
      screen.getByText(/도전하고 싶은 맵을 선택하세요./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/stage1/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/assets/image/logo_cat.png",
    );
  });

  it("맵 클릭시 게임 페이지로 이동", async () => {
    const user = userEvent.setup();

    renderWithProvider(["/game_list"]);

    await user.click(screen.getByText(/stage1/i));

    expect(screen.getByText(WINDOW.BLOCKS_SELECTION)).toBeInTheDocument();
    expect(screen.getByText(WINDOW.BLOCKS_LOGIC)).toBeInTheDocument();
    expect(screen.getByText(BLOCK_NAMES.MOVE)).toBeInTheDocument();
    expect(screen.getByText(BLOCK_NAMES.TURN_RIGHT)).toBeInTheDocument();
    expect(screen.getByText(BLOCK_NAMES.TURN_LEFT)).toBeInTheDocument();
    expect(screen.getByText(BLOCK_NAMES.ATTACK)).toBeInTheDocument();
    expect(screen.getByText(BLOCK_NAMES.IF)).toBeInTheDocument();
    expect(screen.getByText(BLOCK_NAMES.WHILE)).toBeInTheDocument();
    expect(screen.getByText(BLOCK_NAMES.REPEAT)).toBeInTheDocument();
  });
});
