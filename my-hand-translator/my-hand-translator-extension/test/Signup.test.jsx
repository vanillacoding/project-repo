import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Signup from "../src/components/Signup";
import { user } from "../src/utils/test-utils";
import * as userService from "../src/services/userService";
import chromeStore from "../src/utils/chromeStore";

describe("Signup component test", () => {
  test("user registration should be possible", async () => {
    const mockHandleSignupResult = jest.fn();

    act(() => {
      render(<Signup handleSignupResult={mockHandleSignupResult} user={user} />);
    });

    expect(screen.getByText("사용자 등록하기")).toBeInTheDocument();

    const signupButton = screen.getByRole("button", { name: "사용자 등록하기"});
    const mockSignup = jest.spyOn(userService, "signup").mockImplementation(() => {
      return {
        result: "ok",
      }
    });

    const mockChromeStoreSet = jest.spyOn(chromeStore, "set").mockImplementation(() => {});

    fireEvent.click(signupButton);

    await waitFor(() => {
      expect(mockSignup).toBeCalled();
      expect(mockChromeStoreSet).toBeCalled();
    });
  });
});
