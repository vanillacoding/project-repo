const request = require("supertest");
const connectMongoDB = require("../loader/database");
const Review = require("../models/Review");
const app = require("../app");

describe("MongoDB Connection", () => {
  let db;

  beforeAll(() => {
    db = connectMongoDB();
  });

  afterAll(() => {
    db.close();
  });

  describe("GET /review", () => {
    it("should return reviews", async () => {
      const res = await request(app)
        .get("/review")
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch("/json");

      const { data } = res.body;

      expect(Array.isArray(data)).toBeTruthy();
      expect(data[0].hasOwnProperty("clearTime")).toBeTruthy();
      expect(data[0].hasOwnProperty("name")).toBeTruthy();
      expect(data[0].hasOwnProperty("content")).toBeTruthy();
    });
  });

  describe("POST /review", () => {
    it("should create review", async () => {
      const review = {
        name: "TEST",
        clearTime: 150,
        content: "test text"
      };
      const res = await request(app)
        .post("/review")
        .send(review);

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch("/json");

      const { data } = res.body;

      expect(data._id).toBeDefined();
      expect(data.name).toBe(review.name);
      expect(data.clearTime).toBe(review.clearTime);
      expect(data.content).toBe(review.content);

      await Review.findByIdAndDelete({ _id: data._id });
    });
  });
});
