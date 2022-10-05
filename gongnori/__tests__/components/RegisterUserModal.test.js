import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import RegisterUserModal from "../../components/RegisterUserModal";
import store from "../../store/store";

describe("<RegisterUserModal />", () => {
  test("press button should request server and close modal", async () => {
    const mockFn = jest.fn();

    const { queryByTestId } = render(
      <Provider store={store}>
        <RegisterUserModal
          setIsModal={mockFn}
          visible={true}
        />
      </Provider>
    );

    const $touchableWithoutFeedback = queryByTestId("touchable-without-feedback");
    const $customButton = queryByTestId("custom-button");

    fireEvent.press($customButton);

    await waitFor(() => fireEvent.press($touchableWithoutFeedback));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
