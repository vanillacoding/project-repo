import user, {
  updateUserName,
  updateUserThumnail,
  followUser,
  unfollowUser,
} from "./userSlice";

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  err: null,
};

describe("user reducer", () => {
  it("should handle initial state", () => {
    expect(user(undefined, {})).toEqual(initialState);
  });

  it("should handle UPDATE_USER_NAME", () => {
    expect(
      user(initialState, {
        type: updateUserName.type,
        payload: {
          text: "Run the tests",
          id: 0
        }
      })
    ).toEqual({
      isAuthenticated: false,
      userInfo: {
        text: "Run the tests",
        id: 0
      },
      err: null,
    });
  });

  it("should handle UPDATE_USER_THUMNAIL", () => {
    expect(
      user(initialState, {
        type: updateUserThumnail.type,
        payload: {
          text: "Run the tests",
          id: 1
        }
      })
    ).toEqual({
      isAuthenticated: false,
      userInfo: {
        text: "Run the tests",
        id: 1
      },
      err: null,
    });
  });

  it("should handle FOLLOW_USER", () => {
    expect(
      user(initialState, {
        type: followUser.type,
        payload: {
          text: "Run the tests",
          id: 2
        }
      })
    ).toEqual({
      isAuthenticated: false,
      userInfo: {
        text: "Run the tests",
        id: 2
      },
      err: null,
    });
  });

  it("should handle UNFOLLOW_USER", () => {
    expect(
      user(initialState, {
        type: unfollowUser.type,
        payload: {
          text: "Run the tests",
          id: 3
        }
      })
    ).toEqual({
      isAuthenticated: false,
      userInfo: {
        text: "Run the tests",
        id: 3
      },
      err: null,
    });
  });
});