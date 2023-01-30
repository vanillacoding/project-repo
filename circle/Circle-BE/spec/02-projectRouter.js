require("dotenv").config();

const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const { expect } = require("chai");

const initAsyncApp = require("../src/loaders/initAsyncApp");
const { testDbConnect, postLoginAndGetCookie } = require("./utils");
const ProjectModel = require("../models/Project");

let server = null;
let sessionCookie = "";

describe("* projects Router", () => {
  before(async () => {
    const app = await initAsyncApp(express());
    server = request.agent(app);

    await testDbConnect();

    const postLoginResponse = await postLoginAndGetCookie(server);
    sessionCookie = postLoginResponse.headers["set-cookie"][0];
    await server.set("Cookie", sessionCookie)
  });

  after(async () => {
    await mongoose.disconnect();
  });

  let projectId = "";

  it("post /projects", async () => {
    const newProject = {
      title: "test",
    };

    const response = await server
      .post("/projects")
      .send(newProject)
      .expect(200);

    projectId = response.body.id;
  });

  it("Get /projects", async () => {
    const response = await server
      .get("/projects")
      .expect(200);

    const targetProject = response.body
      .map((project) => project._id)
      .find((id) => id === projectId);

    expect(!!targetProject).to.be.true;
  });

  it("Put /projects/:projectId", async () => {
    const newTitle = { title: "test2" };

    await server
      .put(`/projects/${projectId}`)
      .send(newTitle)
      .expect(200);

    const targetProject = await ProjectModel.findById(projectId).lean().exec();
    expect(targetProject.title).to.equal(newTitle.title);
  });

  it("Delete /projects/:projectId", async () => {
    const response = await server
      .delete(`/projects/${projectId}`)
      .expect(200);

    expect(response.body).to.eql({ result: "success" });
  });
});
