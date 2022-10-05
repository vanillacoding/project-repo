import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as userActionCreators from "../../actions/userActionCreators";
import * as actionTypes from "../../actions/actionTypes";

describe("userActionCreators", () => {
  test("action creator function works properly", () => {
    const expectedActions = [
      { type: actionTypes.SET_CURRENT_TEAM, payload: "payload" },
      { type: actionTypes.SET_CURRENT_LOCATION, payload: "payload" },
      { type: actionTypes.SET_CURRENT_SPORTS, payload: "payload" },
    ];

    const actions = [
      userActionCreators.setCurrentTeam("payload"),
      userActionCreators.setCurrentLocation("payload"),
      userActionCreators.setCurrentSports("payload"),
    ];

    expect(actions).toEqual(expectedActions);
  });
});

describe("userActionCreators (thunk)", () => {
  test("thunk function works properly", async () => {
    const store = configureMockStore([thunk])();

    await store.dispatch(userActionCreators.authLogin({
      name: "minho kwon",
      email: "minhob38@gmail.com",
    }));

    const expectedActions = [
      { type: actionTypes.VIEW_LOGIN_REQUEST },
      {
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        payload: {
          email: "minhob38@gmail.com",
          locations: "locations",
          messages: "messages",
          name: "minho kwon",
          sports: "sports",
          teams: "teams",
        },
      },
      { type: actionTypes.HIDE_LOGIN_REQUEST },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });

  test("thunk function works properly", async () => {
    const store = configureMockStore([thunk])();

    await store.dispatch(userActionCreators.authLogout());

    const expectedActions = [
      { type: actionTypes.AUTH_LOGOUT },
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
