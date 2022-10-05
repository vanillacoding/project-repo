const request = require("supertest");
const connectMongoDB = require("../loader/database");
const app = require("../app");

describe("MongoDB Connection", () => {
  let db;

  beforeAll(() => {
    db = connectMongoDB();
  });

  afterAll(() => {
    db.close();
  });

  describe("GET /game/puzzles", () => {
    it("should return puzzles", async () => {
      const res = await request(app)
        .get("/game/puzzles")
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch("/json");

      const { data } = res.body;

      expect(Array.isArray(data)).toBeTruthy();
      expect(data[0].hasOwnProperty("markup")).toBeTruthy();
      expect(data[0].hasOwnProperty("style")).toBeTruthy();
      expect(data[0].hasOwnProperty("output")).toBeTruthy();
      expect(data.length).toBe(20);
    });
  });

  describe("GET /game/passwords", () => {
    it("should return passwords", async () => {
      const res = await request(app)
        .get("/game/passwords")
        .set("Accept", "application/json");

      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch("/json");

      const { data } = res.body;

      expect(Array.isArray(data)).toBeTruthy();
      expect(data[0].hasOwnProperty("name")).toBeTruthy();
      expect(data[0].hasOwnProperty("object")).toBeTruthy();
      expect(data[0].hasOwnProperty("password")).toBeTruthy();
      expect(data.length).toBe(5);
    });
  });
});
