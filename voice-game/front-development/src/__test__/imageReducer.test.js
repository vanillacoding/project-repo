import getActionTypes from "../actions/actionTypes";
import imageReducer from "../reducers/imageReducer";

describe("image", () => {
  describe("actions", () => {
    it("should create actions", () => {
      const expectedActions = [
        "STORE_IMAGE",
      ];
      const actions = [
        getActionTypes().STORE_IMAGE,
      ];

      expect(actions).toEqual(expectedActions);
    });
  });

  describe("reducer", () => {
    let state = imageReducer(undefined, {});

    it("should return the initialState", () => {
      expect(state).toHaveProperty("littleForest", {});
      expect(state).toHaveProperty("monsterEscape", {});
      expect(state).toHaveProperty("energyBattle", {});
      expect(state).toHaveProperty("isLoaded", {
        littleForest: false,
        monsterEscape: false,
        energyBattle: false
      });
    });

    it("should store image", () => {
      state = imageReducer(state, {
        type: getActionTypes().STORE_IMAGE,
        payload: {
          name: "energyBattle",
          image: {
            idle: new Image(),
            walking: new Image(),
          },
        },
      });

      expect(state).toHaveProperty("energyBattle", {
        idle: new Image(),
        walking: new Image(),
      });
      expect(state).toHaveProperty("isLoaded", {
        littleForest: false,
        monsterEscape: false,
        energyBattle: true,
      });
    });
  });
});
