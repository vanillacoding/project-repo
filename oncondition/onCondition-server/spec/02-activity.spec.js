const request = require("supertest");

const { dbConnect, dbDisconnect } = require("./db");
const app = require("../app");

const User = require("../models/User");
const Activity = require("../models/Activity");
const Comment = require("../models/Comment");
const Step = require("../models/Step");
const {
  mockToken,
  mockUserId,
  mockUser,
  mockComment,
  mockActivityId,
  mockActivity,
  mockStep,
} = require("./mockData");

const { OK } = require("../constants/statusCodes");
const TIME_OUT = 30000;

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("activity controller test", () => {
  jest.setTimeout(TIME_OUT);

  afterEach(async () => {
    try {
      await User.deleteMany();
      await Activity.deleteMany();
    } catch (err) {
      console.log(`err: ${err} cannot create mock activity`);
    }
  });

  describe("endpoint /:creatorId/activity/:activityId", () => {
    beforeEach(async () => {
      try {
        await User.create(mockUser);
        await Activity.create(mockActivity);
      } catch (err) {
        console.log(`err: ${err} cannot create mock activity`);
      }
    });

    test("it should response activity for GET /:creatorId/activity/:activityId", async () => {
      const { _id: mockCommentId } = await Comment.create(mockComment);

      await Activity.findByIdAndUpdate(mockActivityId, {
        $push: { comments: mockCommentId },
      });

      const spyFindById = jest.spyOn(Activity, "findById");
      const res = await request(app)
        .get(`/${mockUserId}/activity/${mockActivityId}`)
        .set("authorization", `Bearer ${mockToken}`)
        .expect(OK)
        .expect("Content-Type", /json/);

      expect(spyFindById).toBeCalledTimes(1);
      expect(spyFindById).toBeCalledWith(mockActivityId);

      expect(res.body).toBeTruthy();
      expect(res.body.result).toBe("ok");
      expect(res.body.accessLevel).toBe("creator");
      expect(res.body.data).toBeTruthy();

      const activity = res.body.data;

      expect(activity._id).toBe(mockActivityId);
      expect(activity.creator).toBe(mockUserId);
      expect(activity.sessionId).toBe("AA-BB-CC"),
      expect(activity.duration).toBe(1);

      const date = new Date(activity.date);

      expect(date.getTime()).toBeTruthy();
      expect(activity.type).toBe("Walking");

      expect(activity.comments).toBeInstanceOf(Array);
      expect(activity.comments.length).toBe(1);

      const comment = activity.comments[0];

      expect(comment.category).toBe("Activity");
      expect(typeof comment.creator).toBe("object");
      expect(comment.creator._id).toBe(mockUserId);
      expect(comment.creator.name).toBe(mockUser.name);
      expect(comment.ratingId).toBe(mockActivityId);
    });

    test("it should update activity for PATCH /:creatorId/activity/:activityId", async () => {
      const spyUpdate = jest.spyOn(Activity, "findByIdAndUpdate");
      const mockHeartCount = 8;

      await request(app)
        .patch(`/${mockUserId}/activity/${mockActivityId}`)
        .set("authorization", `Bearer ${mockToken}`)
        .send({ heartCount: 8, text: "updated" })
        .expect(OK)
        .expect("Content-Type", /json/)
        .expect({ result: "ok" });

      expect(spyUpdate).toBeCalledTimes(1);
      expect(spyUpdate).toBeCalledWith(mockActivityId, {
        rating: { heartCount: mockHeartCount, text: "updated" },
      });

      const updatedActivity = await Activity.findById(mockActivityId);

      expect(updatedActivity.rating.heartCount).toBe(mockHeartCount);
      expect(updatedActivity.rating.text).toBe("updated");
    });

    test("it should delete activity for DELETE /:creatorId/activity/:activityId", async () => {
      const spyDelete = jest.spyOn(Activity, "findByIdAndDelete");

      await request(app)
        .delete(`/${mockUserId}/activity/${mockActivityId}`)
        .set("authorization", `Bearer ${mockToken}`)
        .expect(OK)
        .expect("Content-Type", /json/)
        .expect({ result: "ok" });

      expect(spyDelete).toBeCalledTimes(1);
      expect(spyDelete).toBeCalledWith(mockActivityId);
      expect(await Activity.findById(mockActivityId)).toBeNull;
    });
  });

  describe("endpoint GET for /:creatorId/activity", () => {
    beforeEach(async () => {
      const pendingActivities = [];
      const date = Date.now();
      const lengthFor3Page = 15;

      for (let i = 0; i < lengthFor3Page; i++) {
        pendingActivities.push(Activity.create({
          ...mockActivity,
          _id: null,
          date: new Date(date + i),
          duration: ((value) => value)(i),
        }));
      }

      try {
        await User.create(mockUser);
        await Promise.all(pendingActivities);
      } catch (err) {
        console.log(`err: ${err} cannot create mock activities`);
      }
    });

    test("it should response activities with no page option", async () => {
      const spyFind = jest.spyOn(Activity, "find");
      const defaultPage = 1;
      const pageLimit = 7;

      const res = await request(app)
        .get(`/${mockUserId}/activity`)
        .set("authorization", `Bearer ${mockToken}`)
        .expect(OK)
        .expect("Content-Type", /json/);

      expect(spyFind).toBeCalledTimes(1);
      expect(res.body).toBeTruthy();
      expect(res.body.result).toBe("ok");
      expect(res.body.prevPage).toBe(null);
      expect(res.body.nextPage).toBe(defaultPage + 1);
      expect(res.body.data).toBeTruthy();
      expect(res.body.data.activities).toBeTruthy();

      const activities = res.body.data.activities;
      const activityKeys = activities.map(({ _id }) => _id);
      const uniqueKeys = [...new Set(activityKeys)];
      const isSortedByDate = activities.slice(0, activities.length - 1)
        .every((activity, i) => {
          return new Date(activity.date) >= new Date(activities[i + 1].date);
        });

      expect(activities.length).toBe(pageLimit);
      expect(uniqueKeys.length).toBe(pageLimit);
      expect(isSortedByDate).toBeTruthy();
    });

    test("it should response activities for specific page", async () => {
      const page = 2;
      const res = await request(app)
        .get(`/${mockUserId}/activity`)
        .set("authorization", `Bearer ${mockToken}`)
        .set("page", page)
        .expect(OK)
        .expect("Content-Type", /json/);

      expect(res.body).toBeTruthy();
      expect(res.body.result).toBe("ok");
      expect(res.body.prevPage).toBe(page - 1);
      expect(res.body.nextPage).toBe(page + 1);
      expect(res.body.data).toBeTruthy();
      expect(res.body.data.activities).toBeTruthy();

      const activities = res.body.data.activities;
      const durations = activities.map(({ duration }) => duration);

      // sorted by date, and later day has bigger value in mock data
      // eslint-disable-next-line no-magic-numbers
      expect(durations).toEqual([7, 6, 5, 4, 3, 2, 1]);
    });

    test("it should response activities for specific page, when next is lastPage", async () => {
      const page = 3;
      const res = await request(app)
        .get(`/${mockUserId}/activity`)
        .set("authorization", `Bearer ${mockToken}`)
        .set("page", page)
        .expect(OK)
        .expect("Content-Type", /json/);

      expect(res.body).toBeTruthy();
      expect(res.body.result).toBe("ok");
      expect(res.body.prevPage).toBe(page - 1);
      expect(res.body.nextPage).toBe(null);
      expect(res.body.data).toBeTruthy();
      expect(res.body.data.activities).toBeTruthy();

      const activities = res.body.data.activities;
      const durations = activities.map(({ duration }) => duration);

      expect(durations).toEqual([0]);
    });

    test("it should not response sleep data when no data", async () => {
      const res = await request(app)
        .get(`/${mockUserId}/activity`)
        .set("authorization", `Bearer ${mockToken}`)
        .expect(OK)
        .expect("Content-Type", /json/);

      expect(res.body).toBeTruthy();
      expect(res.body.result).toBe("ok");
      expect(res.body.data).toBeTruthy();
      expect(res.body.data.stepCount).toBe(0);
    });

    test("it should response step data", async () => {
      await Step.create(mockStep);

      const res = await request(app)
        .get(`/${mockUserId}/activity`)
        .set("authorization", `Bearer ${mockToken}`)
        .expect(OK)
        .expect("Content-Type", /json/);

      expect(res.body).toBeTruthy();
      expect(res.body.result).toBe("ok");
      expect(res.body.data).toBeTruthy();
      expect(res.body.data.stepCount).toBeTruthy();
      expect(res.body.data.stepCount).toBe(mockStep.count);
    });
  });
});
