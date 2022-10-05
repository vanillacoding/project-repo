import user, { initialState } from "./user";
import { INITIALIZE_USER } from "../constants";

describe("user reducer", () => {
  it("should handle initial state", () => {
    expect(user(undefined, {})).toEqual(initialState);
  });

  describe("INITIALIZE_USER", () => {
    const payload = {
      _id: "userId",
      username: "Jeong",
      email: "hello@hello",
      profile: "https://wik.s3.ap-northeast-2.amazonaws.com/user/IMG_2360.jpg",
      teams: [
        {
          _id: "teamId",
          participants: ["user1"],
          admins: ["user1"],
          threads: ["thread1"],
          records: ["record1"],
          name: "vanilla_1",
          display_name: "vanilla 1",
          created_by: "user1",
          location: { latitude: "37.7285155", longitude: "126.77925739999998" },
          work_on_time: "09:00",
          work_off_time: "18:00",
          thumbnail: "teamThumbnail.jpg",
        },
      ],
    };
    it("basic test", () => {
      expect(user(initialState, { type: INITIALIZE_USER, payload })).toEqual({
        allTeamIds: ["teamId"],
        email: "hello@hello",
        id: "userId",
        username: "Jeong",
        teamById: {
          teamId: {
            displayName: "vanilla 1",
            id: "teamId",
            name: "vanilla_1",
          },
        },
      });
    });
  });
});
