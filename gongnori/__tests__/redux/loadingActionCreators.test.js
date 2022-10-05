import * as loadingActionCreators from "../../actions/loadingActionCreators";
import * as actionTypes from "../../actions/actionTypes";

describe("loadingActionCreators", () => {
  test("action creator function works properly", () => {
    const expectedActions = [
      { type: actionTypes.VIEW_LOGIN_REQUEST },
      { type: actionTypes.HIDE_LOGIN_REQUEST },
      { type: actionTypes.VIEW_INPUT_ALERT },
      { type: actionTypes.HIDE_INPUT_ALERT },
      { type: actionTypes.VIEW_MATCH_LOADING },
      { type: actionTypes.HIDE_MATCH_LOADING },
      { type: actionTypes.VIEW_RANK_LOADING },
      { type: actionTypes.HIDE_RANK_LOADING },
      { type: actionTypes.VIEW_MESSAGE_LOADING },
      { type: actionTypes.HIDE_MESSAGE_LOADING },
      { type: actionTypes.VIEW_HEADER_RIGHT_LOADING },
      { type: actionTypes.HIDE_HEADER_RIGHT_LOADING },
      { type: actionTypes.VIEW_COMPLETION },
      { type: actionTypes.HIDE_COMPLETION },
    ];

    const actions = [
      loadingActionCreators.viewLoginRequest(),
      loadingActionCreators.hideLoginRequest(),
      loadingActionCreators.viewInputAlert(),
      loadingActionCreators.hideInputAlert(),
      loadingActionCreators.viewMatchLoading(),
      loadingActionCreators.hideMatchLoading(),
      loadingActionCreators.viewRankLoading(),
      loadingActionCreators.hideRankLoading(),
      loadingActionCreators.viewMessageLoading(),
      loadingActionCreators.hideMessageLoading(),
      loadingActionCreators.viewHeaderRightLoading(),
      loadingActionCreators.hideHeaderRightLoading(),
      loadingActionCreators.viewCompletion(),
      loadingActionCreators.hideCompletion(),
    ];

    expect(actions).toEqual(expectedActions);
  });
});
