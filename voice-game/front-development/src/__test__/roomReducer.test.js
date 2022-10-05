import getActionTypes from "../actions/actionTypes";
import roomReducer from "../reducers/roomReducer";

describe("room", () => {
  describe("actions", () => {
    it("should create actions", () => {
      const expectedActions = [
        "FETCH_ROOMS_SUCCESS",
        "FETCH_ROOMS_FAIL",
        "CREATE_ROOM_SUCCESS",
        "JOIN_ROOM_SUCCESS",
      ];
      const actions = [
        getActionTypes().FETCH_ROOMS_SUCCESS,
        getActionTypes().FETCH_ROOMS_FAIL,
        getActionTypes().CREATE_ROOM_SUCCESS,
        getActionTypes().JOIN_ROOM_SUCCESS,
      ];

      expect(actions).toEqual(expectedActions);
    });
  });

  describe("reducer", () => {
    let state = roomReducer(undefined, {});

    it("should return the initialState", () => {
      expect(state).toHaveProperty("littleForest", []);
      expect(state).toHaveProperty("monsterEscape", []);
      expect(state).toHaveProperty("energyBattle", []);
      expect(state).toHaveProperty("error", null);
    });

    it("should fetch rooms success", () => {
      state = roomReducer(state, {
        type: getActionTypes().FETCH_ROOMS_SUCCESS,
        payload: {
          gameTitle: "littleForest",
          rooms: ["room1", "room2"],
        },
      });

      expect(state).toHaveProperty("littleForest", ["room1", "room2"]);
    });

    it("should fetch rooms fail", () => {
      state = roomReducer(state, {
        type: getActionTypes().FETCH_ROOMS_FAIL,
        payload: new Error("this is error"),
      });

      expect(state).toHaveProperty("error", new Error("this is error"));
    });

    it("should create room success", () => {
      state = roomReducer(state, {
        type: getActionTypes().CREATE_ROOM_SUCCESS,
        payload: {
          title: "monsterEscape",
          players: 1,
        }
      });

      expect(state).toHaveProperty("monsterEscape", [{
        title: "monsterEscape",
        players: 1,
      }]);
    });

    it("should join room sucess", () => {
      state = roomReducer(state, {
        type: getActionTypes().JOIN_ROOM_SUCCESS,
        payload: {
          title: "energyBattle",
          rooms: [{
            title: "energyBattle",
            players: 2,
          },
          {
            title: "energyBattle",
            players: 3,
          }],
        },
      });

      expect(state).toHaveProperty("energyBattle", [
        {
          title: "energyBattle",
          players: 2,
        },
        {
          title: "energyBattle",
          players: 3,
        }
      ]);
    });
  });
});
