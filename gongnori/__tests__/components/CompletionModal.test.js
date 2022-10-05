import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react-native";
import CompletionModal from "../../components/CompletionModal";
import store from "../../store/store";

describe("<CompletionModal />", () => {
  test("content should be rendered and visible should be same as props", () => {
    const { queryByText, queryByTestId } = render(
      <Provider store={store}>
        <CompletionModal
          content={"완료되었습니다."}
          visible={true}
        />
      </Provider>
    );

    const $modal = queryByTestId("modal");

    expect(queryByText("완료되었습니다.")).not.toBeNull();
    expect($modal.props.visible).toBe(true);
  });
});
