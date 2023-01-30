const request = require("supertest");
const app = require("../../app");

const testProjectId = process.env.TEST_PROJECT_ID;
const randomString = Math.random().toString(36).substring(2, 12);
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

describe("PATCH /api/projects/:projectId", () => {
  it("Succeed to save codes in database", async () => {
    await agent
      .patch(`/api/projects/${testProjectId}`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .send({
        code: { html: randomString, css: randomString, js: randomString },
      })
      .expect(200);
  });

  it("Fail to save codes in database when project id is invalid", async () => {
    await agent
      .patch("/api/projects/wrongProjectId")
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .send({
        code: { html: randomString, css: randomString, js: randomString },
      })
      .expect(400);
  });

  it("Fail to save codes in database for non-existing projects", async () => {
    await agent
      .patch(`/api/projects/63566429d28d7d5f1098c7f4`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .send({
        code: { html: randomString, css: randomString, js: randomString },
      })
      .expect(400);
  });
});

describe("POST /api/projects/:projectId/deployment", () => {
  it("Succeed to deploy a project and generate a link", async () => {
    await agent
      .post(`/api/projects/${testProjectId}/deployment`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .expect(200);
  });

  it("Fail to deploy a project when project id is invalid", async () => {
    await agent
      .post(`/api/projects/wrongProjectId/deployment`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .expect(400);
  });

  it("Fail to deploy a project which does not exist", async () => {
    await agent
      .post(`/api/projects/63566429d28d7d5f1098c7f4/deployment`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .expect(400);
  });
});

describe("GET /api/projects/:projectId/deployment", () => {
  it("Succeed to get a deployed page", async () => {
    const res = await agent
      .get(`/api/projects/${testProjectId}/deployment`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`);

    expect(res.text).toContain("test");
  });

  it("Fail to deploy a project when project id is invalid", async () => {
    await agent
      .get(`/api/projects/wrongProjectId/deployment`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .expect(400);
  });

  it("Fail to deploy a project which does not exist", async () => {
    await agent
      .get(`/api/projects/63566429d28d7d5f1098c7f4/deployment`)
      .set("Authorization", `Bearer ${process.env.AUTH_TOKEN}`)
      .expect(400);
  });
});
