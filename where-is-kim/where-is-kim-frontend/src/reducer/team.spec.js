import team, { initialState } from "./team";
import { INITIALIZE_TEAM } from "../constants";

describe("team reducer", () => {
  it("should handle initial state", () => {
    expect(team(undefined, {})).toEqual(initialState);
  });

  describe("INITIALIZE_TEAM", () => {
    const payload = {
      _id: "teamId",
      name: "Vanilla-coding",
      display_name: "Vanilla coding",
      admins: [],
      threads: [],
      records: [],
      location: { latitude: "123", longitude: "456" },
      work_on_time: "09:00",
      work_off_time: "15:00",
      thumbnail: "team.jpg",
      participants: [
        {
          teams: ["team1"],
          _id: "user1",
          username: "Jeong",
          email: "hello@hello",
          profile: "user.jpg",
        },
      ],
    };
    it("basic test", () => {
      expect(team(initialState, { type: INITIALIZE_TEAM, payload })).toEqual({
        id: "teamId",
        displayName: "Vanilla coding",
        location: {
          latitude: "123",
          longitude: "456",
        },
        partById: {
          user1: {
            email: "hello@hello",
            id: "user1",
            isAdmin: false,
            profile: "user.jpg",
            username: "Jeong",
          },
        },
        allpartIds: ["user1"],
        allThreadIds: [],
        threadById: {},
        recordById: {},
        allRecordIds: [],
        onWorkingUser: [],
        offWorkingUser: [],
        connectedUser: [],
        thumbnail: "team.jpg",
      });
    });
  });
});
