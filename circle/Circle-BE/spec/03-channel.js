require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");

const initAsyncApp = require("../src/loaders/initAsyncApp");
const Project = require("../models/Project");
const Channel = require("../models/Channel");

const {
  testDbConnect,
  postLoginAndGetCookie,
  cleanUpTestDatabase,
} = require("./utils");

const { MESSAGE, LIMITED_CHANNEL_COUNT } = require("../src/constants");

const TEST_CHANNEL = {
  title: "test",
  description: "test",
  isActive: true,
};

let server = null;
let projectId = "";

describe("* channels API", () => {
  before(async () => {
    const newProject = {
      title: "test",
    };

    const app = await initAsyncApp(express());
    server = request.agent(app);

    await testDbConnect();

    const postLoginResponse = await postLoginAndGetCookie(server);
    const sessionCookie = postLoginResponse.headers["set-cookie"][0];
    await server.set("Cookie", sessionCookie);

    const postProjectResponse = await server
      .post("/projects")
      .send(newProject)
      .expect(200);

    projectId = postProjectResponse.body.id;
  });

  after(async () => {
    await cleanUpTestDatabase();
    await mongoose.disconnect();
  });

  describe("[POST] /projects/:projectId/channels", () => {
    afterEach(async () => {
      await Channel.deleteMany({});
      await Project.findByIdAndUpdate(projectId, { channels: [] });
    });

    it("요청 성공시, 200 코드와 채널 id를 응답", async () => {
      const response = await server
        .post(`/projects/${projectId}/channels`)
        .send(TEST_CHANNEL)
        .expect(200);

      const createdChannelId = response.body.id;

      expect(response.body).to.haveOwnProperty("id");
      expect(mongoose.Types.ObjectId.isValid(createdChannelId)).to.be.true;

      const allChannels = await Channel.find({});
      const createdChannel = await Channel.findById(createdChannelId);

      expect(allChannels.length).to.equal(1);
      expect(createdChannel.title).to.equal(TEST_CHANNEL.title);
    });

    it("projectId가 올바르지 않을 시, 400 코드와 에러 메시지를 응답", async () => {
      const response = await server
        .post("/projects/invalidProjectId/channels")
        .send(TEST_CHANNEL)
        .expect(400);

      expect(response.body).to.haveOwnProperty("message");
      expect(response.body.message).to.equal(MESSAGE.BAD_REQUEST);

      const allChannels = await Channel.find({});
      const createdChannel = await Channel.findOne({
        title: TEST_CHANNEL.title,
      });

      expect(allChannels.length).to.equal(0);
      expect(createdChannel).to.be.null;
    });

    it("채널 생성 갯수 제한을 초과하면, 423 코드와 에러 메시지를 응답", async () => {
      for (let i = 1; i <= LIMITED_CHANNEL_COUNT; i++) {
        const newChannel = await new Channel({
          _id: mongoose.Types.ObjectId(),
          title: `${TEST_CHANNEL.title}${i}`,
          isActive: TEST_CHANNEL.isActive,
        }).save();

        await Project.findByIdAndUpdate(projectId, {
          $push: { channels: newChannel._id },
        });
      }

      const response = await server
        .post(`/projects/${projectId}/channels`)
        .send(TEST_CHANNEL)
        .expect(423);

      expect(response.body).to.haveOwnProperty("message");
      expect(response.body.message).to.equal(MESSAGE.LIMITED_CHANNEL);

      const allChannels = await Channel.find({});
      const createdChannel = await Channel.findOne({
        title: TEST_CHANNEL.title,
      });

      expect(allChannels.length).to.equal(LIMITED_CHANNEL_COUNT);
      expect(createdChannel).to.be.null;
    });
  });

  describe("[PUT] /projects/:projectId/channels/:channelId", () => {
    let channelId = "";

    beforeEach(async () => {
      const newChannel = await new Channel({
        _id: mongoose.Types.ObjectId(),
        ...TEST_CHANNEL,
      }).save();

      channelId = newChannel._id;
    });

    afterEach(async () => {
      await Channel.deleteMany({});
    });

    it("요청 성공시, 200 코드와 성공 메시지로 응답하고, 해당 채널의 내용이 수정되어야 함", async () => {
      const response = await server
        .put(`/projects/${projectId}/channels/${channelId}`)
        .send({
          title: `${TEST_CHANNEL.title} edited`,
          description: `${TEST_CHANNEL.description} edited`,
        })
        .expect(200);

      expect(response.body).to.haveOwnProperty("result");
      expect(response.body.result).to.equal(MESSAGE.SUCCESS);

      const editedChannel = await Channel.findById(channelId);

      expect(editedChannel.title).to.equal(`${TEST_CHANNEL.title} edited`);
      expect(editedChannel.description)
        .to.equal(`${TEST_CHANNEL.description} edited`);
    });

    it("channelId가 올바르지 않을 시, 400 코드와 에러 메시지로 응답", async () => {
      const response = await server
        .put(`/projects/${projectId}/channels/invalidChannelId`)
        .send({
          title: `${TEST_CHANNEL.title} edited`,
        })
        .expect(400);

      expect(response.body).to.haveOwnProperty("message");
      expect(response.body.message).to.equal(MESSAGE.BAD_REQUEST);
    });
  });

  describe("[DELETE] /projects/:projectId/channels/:channelId", () => {
    let channelId = "";

    beforeEach(async () => {
      const newChannel = await new Channel({
        _id: mongoose.Types.ObjectId(),
        ...TEST_CHANNEL,
      }).save();

      channelId = newChannel._id;

      await Project.findByIdAndUpdate(projectId, {
        $push: { channels: channelId },
      });
    });

    afterEach(async () => {
      await Channel.deleteMany({});
      await Project.findByIdAndUpdate(projectId, { channels: [] });
    });

    it("요청 성공시, 200 코드와 성공 메시지로 응답하고, 해당 채널 정보는 존재하지 않아야 함", async () => {
      const response = await server
        .delete(`/projects/${projectId}/channels/${channelId}`)
        .expect(200);

      expect(response.body).to.haveOwnProperty("result");
      expect(response.body.result).to.equal(MESSAGE.SUCCESS);

      const deletedChannel = await Channel.findById(channelId);
      const targetProject = await Project.findById(projectId);

      expect(deletedChannel).to.be.null;
      expect(targetProject.channels.length).to.equal(0);
    });

    it("channelId가 올바르지 않을 시, 400 코드와 에러 메시지로 응답", async () => {
      const response = await server
        .delete(`/projects/${projectId}/channels/invalidChannelId`)
        .expect(400);

      expect(response.body).to.haveOwnProperty("message");
      expect(response.body.message).to.equal(MESSAGE.BAD_REQUEST);
    });
  });
});
