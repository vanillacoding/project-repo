import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MockTheme from "./mockTheme";
import Error from "../pages/Error";
import { removeError } from "../features/errorSlice";

const mockDispatch = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

jest.mock("react-router", () => ({
  useHistory: () => ({ push: mockHistoryPush }),
}));

describe("Error Component", () => {
  test("should render with error code", () => {
    const props = {
      statusCode: 404,
      message: "페이지를 찾을 수 없습니다",
    };

    const { getByText } = render(
      <MockTheme>
        <Error {...props} />
      </MockTheme>,
    );

    expect(getByText("404: 페이지를 찾을 수 없습니다")).toBeInTheDocument();
  });

  test("should dispatch removeError when click confirm", () => {
    const props = {
      statusCode: 404,
      message: "페이지를 찾을 수 없습니다",
    };

    const { container } = render(
      <MockTheme>
        <Error {...props} />
      </MockTheme>,
    );
    const $confirm = container.querySelector("button");

    expect($confirm.textContent).toBe("Confirm");

    fireEvent.click($confirm);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(removeError());
  });

  test("should dispatch removeError and go home when click cancel", () => {
    const props = {
      statusCode: 404,
      message: "페이지를 찾을 수 없습니다",
    };

    const { container } = render(
      <MockTheme>
        <Error {...props} />
      </MockTheme>,
    );
    const $cancel = container.querySelectorAll("button")[1];

    expect($cancel.textContent).toBe("Go home");

    fireEvent.click($cancel);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(removeError());
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });
});
