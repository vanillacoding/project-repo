const request = require("supertest");

const app = require("../../app");

const randomString = Math.random().toString(36).substring(2, 12);
const testUserId = process.env.TEST_USER_ID;
const testProjectId = process.env.TEST_PROJECT_ID;

describe("POST /api/auth/signup", () => {
  it("Succeed sign up", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        username: "test",
        email: `${randomString}@gmail.com`,
        password: "test12345",
        passwordConfirm: "test12345",
      })
      .expect(200);
  });

  it("Fail sign up when format of email is wrong", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        username: "test",
        email: `test`,
        password: "test12345",
        passwordConfirm: "test12345",
      })
      .expect(400);
  });

  it("Fail sign up when password doesn't match", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        username: "test",
        email: `${randomString}@gmail.com`,
        password: "test12345",
        passwordConfirm: "test67890",
      })
      .expect(400);
  });

  it("Fail sign up when email is already in use", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({
        username: "test",
        email: "test@gmail.com",
        password: "test12345",
        passwordConfirm: "test12345",
      })
      .expect(400);
  });
});

describe("POST /api/auth/login", () => {
  it("Succeed login", async () => {
    await request(app)
      .post("/api/auth/login")
      .set({
        email: "sample@gmail.com",
        password: "test12345",
      })
      .expect(200);
  });

  it("Fail login when email is not valid", async () => {
    await request(app)
      .post("/api/auth/login")
      .set({
        email: `${randomString}${randomString}@gmail.com`,
        password: "test12345",
      })
      .expect(400);
  });

  it("Fail login when password is wrong", async () => {
    await request(app)
      .post("/api/auth/login")
      .set({
        email: "sample@gmail.com",
        password: "test67890",
      })
      .expect(400);
  });
});

describe("Can not make a request before login", () => {
  it("GET /api/users/:userId/projects", async () => {
    await request(app).get(`/api/users/${testUserId}/projects`).expect(401);
  });

  it("POST /api/users/:userId/projects", async () => {
    await request(app)
      .post(`/api/users/${testUserId}/projects`)
      .send({ projectName: "test" })
      .expect(401);
  });

  it("PATCH /api/projects/:projectId", async () => {
    await request(app)
      .patch(`/api/projects/${testProjectId}`)
      .send({ code: { html: "test", css: "test", js: "test" } })
      .expect(401);
  });

  it("DELETE /api/projects/:projectId", async () => {
    await request(app).delete(`/api/projects/${testProjectId}`).expect(401);
  });

  it("POST /api/projects/:projectId/deployment", async () => {
    await request(app)
      .post(`/api/projects/${testProjectId}/deployment`)
      .expect(401);
  });
});
