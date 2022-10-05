const request = require("supertest");

const { dbConnect, dbDisconnect } = require("./db");
const app = require("../app");

const User = require("../models/User");
const Activity = require("../models/Activity");
const Comment = require("../models/Comment");
const {
  mockToken,
  mockFriendToken,
  mockUserId,
  mockUser,
  mockFriend,
  mockComment,
  mockCommentId,
  mockActivityId,
  mockActivity,
} = require("./mockData");

const { OK, UNAUTHORIZED } = require("../constants/statusCodes");
const TIME_OUT = 30000;

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("comment controller test /:creatorId/:category/:ratingId/comment", () => {
  jest.setTimeout(TIME_OUT);

  beforeEach(async () => {
    try {
      await User.create(mockUser);
      await Activity.create(mockActivity);
    } catch (err) {
      console.log(`err: ${err} cannot set environment for mockComment`);
    }
  });

  afterEach(async () => {
    try {
      await User.deleteMany();
      await Activity.deleteMany();
      await Comment.deleteMany();
    } catch (err) {
      console.log(`err: ${err} cannot clean up environment for mockComment`);
    }
  });

  describe("POST /", () => {
    test("it should create comment", async () => {
      const createdActivity = await Activity.findById(mockActivityId);
      const spyCreate = jest.spyOn(Comment, "create");

      expect(createdActivity.comments.length).toBe(0);

      const newDate = new Date();
      const res = await request(app)
        .post(`/${mockUserId}/activity/${mockActivityId}/comment`)
        .set("authorization", `Bearer ${mockToken}`)
        .send({ date: newDate, content: "mock comment" })
        .expect(OK)
        .expect("Content-Type", /json/)
        .expect({ result: "ok" });

      expect(spyCreate).toBeCalledTimes(1);
      expect(spyCreate).toBeCalledWith({
        category: "Activity",
        ratingId: mockActivityId,
        creator: mockUserId,
        date: newDate,
        content: "mock comment",
      });

      const updatedActivity = await Activity.findById(mockActivityId);

      expect(updatedActivity.comments.length).toBe(1);

      const createdCommentId = updatedActivity.comments[0];
      const createdComment = await Comment.findById(createdCommentId);

      expect(createdComment).toHaveProperty("category");
      expect(createdComment).toHaveProperty("ratingId");
      expect(createdComment).toHaveProperty("creator");
      expect(createdComment).toHaveProperty("date");
      expect(createdComment).toHaveProperty("content");

      const commentDate = new Date(createdComment.date);

      expect(commentDate.getTime()).toBeTruthy();
      expect(commentDate).toEqual(newDate);
      expect(createdComment.category).toBe("Activity");
      expect(createdComment.ratingId.equals(updatedActivity._id)).toBeTruthy();
      expect(createdComment.creator.toString()).toBe(mockUserId);
      expect(createdComment.content).toBe("mock comment");
    });
  });

  describe("PATCH /:commentId", () => {
    test("it should update comment", async () => {
      await Comment.create(mockComment);

      const spyFindById = jest.spyOn(Comment, "findById");
      const newDate = new Date();

      const res = await request(app)
        .patch(`/${mockUserId}/activity/${mockActivityId}/comment/${mockCommentId}`)
        .set("authorization", `Bearer ${mockToken}`)
        .send({ date: newDate, content: "updated" })
        .expect(OK)
        .expect("Content-Type", /json/)
        .expect({ result: "ok" });

      expect(spyFindById).toBeCalledTimes(1);
      expect(spyFindById).toBeCalledWith(mockCommentId);

      const updatedComment = await Comment.findById(mockCommentId);
      const commentDate = new Date(updatedComment.date);

      expect(commentDate.getTime()).toBeTruthy();
      expect(commentDate).toEqual(newDate);
      expect(updatedComment.content).toBe("updated");
    });
  });

  describe("DELETE /:commentId", () => {
    test("it should delete comment", async () => {
      await request(app)
        .post(`/${mockUserId}/activity/${mockActivityId}/comment`)
        .set("authorization", `Bearer ${mockToken}`)
        .send({ date: new Date(), content: "mock comment" })
        .expect(OK)
        .expect("Content-Type", /json/);

      const activity = await Activity.findById(mockActivityId);

      expect(activity.comments.length).toBe(1);

      const createdCommentId = activity.comments[0];
      const createdComment = await Comment.findById(createdCommentId);

      expect(createdComment).toHaveProperty("content");
      expect(createdComment.content).toBe("mock comment");

      const spyFindById = jest.spyOn(Comment, "findById");

      const res = await request(app)
        .delete(`/${mockUserId}/activity/${mockActivityId}/comment/${createdCommentId}`)
        .set("authorization", `Bearer ${mockToken}`)
        .expect(OK)
        .expect("Content-Type", /json/)
        .expect({ result: "ok" });

      expect(spyFindById).toBeCalledTimes(1);
      expect(spyFindById).toBeCalledWith(createdCommentId.toString());

      const updatedActivity = await Activity.findById(mockActivityId);
      const deletedComment = await Comment.findById(mockCommentId);

      expect(deletedComment).toBeNull();
      expect(updatedActivity.comments.length).toBe(0);
    });

    test("it should not delete comment by request of non-creator", async () => {
      await request(app)
        .post(`/${mockUserId}/activity/${mockActivityId}/comment`)
        .set("authorization", `Bearer ${mockToken}`)
        .send({ date: new Date(), content: "mock comment" })
        .expect(OK)
        .expect("Content-Type", /json/);

      const activity = await Activity.findById(mockActivityId);

      expect(activity.comments.length).toBe(1);

      const createdCommentId = activity.comments[0];
      const createdComment = await Comment.findById(createdCommentId);

      expect(createdComment).toHaveProperty("content");
      expect(createdComment.content).toBe("mock comment");

      const spyFindById = jest.spyOn(Comment, "findById");

      await User.create(mockFriend);
      await request(app)
        .delete(`/${mockUserId}/activity/${mockActivityId}/comment/${createdCommentId}`)
        .set("authorization", `Bearer ${mockFriendToken}`)
        .expect(UNAUTHORIZED);

      expect(spyFindById).toBeCalledTimes(0);

      const updatedActivity = await Activity.findById(mockActivityId);
      const targetComment = await Comment.findById(createdCommentId);

      expect(targetComment).toBeTruthy();
      expect(targetComment.content).toBe("mock comment");
      expect(updatedActivity.comments.length).toBe(1);
    });
  });
});
