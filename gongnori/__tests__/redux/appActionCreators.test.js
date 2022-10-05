import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as appActionCreators from "../../actions/appActionCreators";
import * as actionTypes from "../../actions/actionTypes";

describe("appActionCreators", () => {
  test("action creator function works properly", () => {
    const expectedActions = [
      { type: actionTypes.SET_MESSAGE_FILTER, payload: "payload" },
    ];

    const actions = [
      appActionCreators.setMessageFilter("payload"),
    ];

    expect(actions).toEqual(expectedActions);
  });
});

describe("appActionCreators (thunk)", () => {
  test("thunk function works properly", async () => {
    const store = configureMockStore([thunk])();

    await store.dispatch(appActionCreators.getMatch(
      { province: "경기도", city: "용인시", district: "수지구" },
      "football",
      2021,
      6,
      1
    ));

    const expectedActions = [
      { type: actionTypes.VIEW_MATCH_LOADING },
      { type: actionTypes.LOAD_MATCH_SUCCESS, payload: {} },
      { type: actionTypes.HIDE_MATCH_LOADING },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("thunk function works properly", async () => {
    const store = configureMockStore([thunk])();

    await store.dispatch(appActionCreators.getPlayground(
      { province: "경기도", city: "용인시", district: "수지구" },
      "football"
    ));

    const expectedActions = [
      { type: actionTypes.LOAD_PLAYGROUNDS_SUCCESS, payload: {} },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
