import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import renderer from "react-test-renderer";
import UserDetail from ".";

describe("<UserDetail />", () => {
  const mockStore = configureMockStore([thunk]);
  let store = null;
  let component = null;

  beforeEach(() => {
    store = mockStore({
      auth: {
        userInfo: {
          userName: "mock name 1",
          thumnail: "mock thumnail",
        },
      },
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <UserDetail />
      </Provider>
    );
  });

  it("should render with given state from redux store", () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should dispatch an action on button click", () => {
    renderer.act(() => {
      component.root.findByProps({ type: "text" })
        .props.onChange({ target: { value: "mock name 2 " } });
    });

    expect(component.toJSON()).toMatchSnapshot();

    renderer.act(() => {
      component.root.findByProps({ className : "user-name-button" })
        .props.onClick({ preventDefault: jest.fn() });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
