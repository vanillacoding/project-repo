import { render, screen } from "@testing-library/react";
import ToastMessage from "../../components/common/ToastMessage";

describe("<ToastMessage />", () => {
  const MESSAGE = "hello, vaco";

  it("props로 전달받은 message가 렌더링되어야 합니다", () => {
    render(
      <ToastMessage
        message={MESSAGE}
        isToastDisplayed={true}
        setIsToastDisplayed={jest.fn}
      />
    );

    expect(screen.getByText(MESSAGE)).toBeInTheDocument();
  });

  it("props로 전달받은 color로 렌더링되어야 합니다", () => {
    const COLOR = "#f2c43d";

    render(
      <ToastMessage
        message={MESSAGE}
        color={COLOR}
        isToastDisplayed={true}
        setIsToastDisplayed={jest.fn}
      />
    );

    expect(screen.getByText(MESSAGE).parentElement).toHaveStyle(`background-color: ${COLOR}`);
  });
});
