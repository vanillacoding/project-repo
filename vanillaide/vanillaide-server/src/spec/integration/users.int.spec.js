const request = require("supertest");
const app = require("../../app");

const testUserId = process.env.TEST_USER_ID;
let agent;

beforeAll(async () => {
  agent = request.agent(app);

  await agent
    .post("/api/auth/login")
    .set({
      email: "sample@gmail.com",
      password: "test12345",
    })
    .expect(200);
});

describe("GET /api/users/:userId/projects", () => {
  it("Succeed to get project list", async () => {
    await agent
      .get(`/api/users/${testUserId}/projects`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .expect(200);
  });

  it("Fail to get project list when user id is invalid", async () => {
    await agent
      .get(`/api/users/wrongUserId/projects`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .expect(400);
  });

  it("Fail to get project list for non-existing user", async () => {
    await agent
      .get(`/api/users/635651386a6fad0a047849e5/projects`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .expect(400);
  });
});

describe("POST /api/users/:userId/projects", () => {
  it("Succeed to make a new project", async () => {
    await agent
      .post(`/api/users/${testUserId}/projects`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .send({ projectName: "test project" })
      .expect(201);
  });

  it("Fail to make a new project when project name is not provided", async () => {
    await agent
      .post(`/api/users/${testUserId}/projects`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .send({ projectName: "" })
      .expect(400);
  });

  it("Fail to make a new project when user id is invalid", async () => {
    await agent
      .post(`/api/users/wrongUserId/projects`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .send({ projectName: "test project" })
      .expect(400);
  });

  it("Fail to make a new project for non-existing user", async () => {
    await agent
      .post(`/api/users/635651386a6fad0a047849e5/projects`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .send({ projectName: "test project" })
      .expect(400);
  });
});
