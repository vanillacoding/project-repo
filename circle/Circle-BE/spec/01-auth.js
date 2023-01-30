require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const express = require("express");
const { expect } = require("chai");

const initAsyncApp = require("../src/loaders/initAsyncApp");
const { testDbConnect, postLoginAndGetCookie } = require("./utils");

let server = null;

describe("* open server", () => {
  before(async () => {
    const app = await initAsyncApp(express());
    server = request.agent(app);

    await testDbConnect();
  });

  after(() => mongoose.disconnect());

  describe("Get /auth/users", () => {
    it("회원가입 하기", async () => {
      const response = await postLoginAndGetCookie(server);
      expect(response.body.displayName).to.eql(process.env.DISPLAY_NAME);
    });
  });
});
