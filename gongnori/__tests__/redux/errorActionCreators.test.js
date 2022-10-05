import * as errorActionCreators from "../../actions/errorActionCreators";
import * as actionTypes from "../../actions/actionTypes";

describe("errorActionCreators", () => {
  test("action creator function works properly", () => {
    const expectedActions = [
      { type: actionTypes.SET_INITIALIZE_ERROR },
      { type: actionTypes.SET_TEAM_EXIST_ERROR },
    ];

    const actions = [
      errorActionCreators.setInitializeError(),
      errorActionCreators.setTeamExistError(),
    ];

    expect(actions).toEqual(expectedActions);
  });
});
