import getActionTypes from "../actions/actionTypes";
import authReducer from "../reducers/authReducer";

describe("auth", () => {
  describe("actions", () => {
    it("should create actions", () => {
      const expectedActions = [
        "CHECK_AUTHORIZATION_SUCCESS",
        "PATCH_RESULT_SUCCESS",
        "UNAUTH_MODE_SUCCESS",
        "PLAYER_LOGOUT",
        "STOP_UNAUTH_MODE",
        "PLAYER_MIC_ON",
        "CHECK_AUTHORIZATION_FAIL",
      ];
      const actions = [
        getActionTypes().CHECK_AUTHORIZATION_SUCCESS,
        getActionTypes().PATCH_RESULT_SUCCESS,
        getActionTypes().UNAUTH_MODE_SUCCESS,
        getActionTypes().PLAYER_LOGOUT,
        getActionTypes().STOP_UNAUTH_MODE,
        getActionTypes().PLAYER_MIC_ON,
        getActionTypes().CHECK_AUTHORIZATION_FAIL,
      ];

      expect(actions).toEqual(expectedActions);
    });

    describe("reducer", () => {
      let state = authReducer(undefined, {});

      it("should return initaial state", () => {
        expect(state).toHaveProperty("isAuthorized", false);
        expect(state).toHaveProperty("isMicOn", false);
        expect(state).toHaveProperty("isUnAuthMode", false);
        expect(state).toHaveProperty("playerData", null);
        expect(state).toHaveProperty("error", null);
      });

      it("should check authorization success and fail", () => {
        state = authReducer(state, {
          type: getActionTypes().CHECK_AUTHORIZATION_SUCCESS,
          payload: {
            email: "asiogh@gmail.com",
            name: "noname",
          },
        });

        expect(state).toHaveProperty("playerData", {
          email: "asiogh@gmail.com",
          name: "noname",
        });
        expect(state).toHaveProperty("isAuthorized", true);

        state = authReducer(state, {
          type: getActionTypes().CHECK_AUTHORIZATION_FAIL,
        });

        expect(state).toHaveProperty("playerData", {
          email: "asiogh@gmail.com",
          name: "noname",
        });
        expect(state).toHaveProperty("isAuthorized", false);
      });

      it("should patch result success", () => {
        state = authReducer(state, {
          type: getActionTypes().PATCH_RESULT_SUCCESS,
          payload: {
            title: "littleForest",
            player: {
              email: "asiogh@gmail.com",
              name: "noname",
            },
          },
        });

        expect(state).toHaveProperty("playerData", {
          email: "asiogh@gmail.com",
          name: "noname",
        });
      });

      it("should unAuth mode success and stop unAuth mode", () => {
        state = authReducer(state, {
          type: getActionTypes().UNAUTH_MODE_SUCCESS,
          payload: {
            email: "asiogh@gmail.com",
            name: "noname",
          },
        });

        expect(state).toHaveProperty("playerData", {
          email: "asiogh@gmail.com",
          name: "noname",
        });
        expect(state).toHaveProperty("isUnAuthMode", true);

        state = authReducer(state, {
          type: getActionTypes().STOP_UNAUTH_MODE,
        });

        expect(state).toHaveProperty("playerData", null);
        expect(state).toHaveProperty("isUnAuthMode", false);
      });

      it("should player login and logout", () => {
        state = authReducer(state, {
          type: getActionTypes().PLAYER_LOGIN_SUCCESS,
          payload: {
            email: "asiogh@gmail.com",
            name: "noname",
          },
        });

        expect(state).toHaveProperty("playerData", {
          email: "asiogh@gmail.com",
          name: "noname",
        });
        expect(state).toHaveProperty("isAuthorized", true);

        state = authReducer(state, {
          type: getActionTypes().PLAYER_LOGOUT,
        });

        expect(state).toHaveProperty("playerData", null);
        expect(state).toHaveProperty("isAuthorized", false);
      });

      it("should player mic on", () => {
        state = authReducer(state, {
          type: getActionTypes().PLAYER_MIC_ON,
        });

        expect(state).toHaveProperty("isMicOn", true);
      });
    });
  });
});
