const { expect } = require("chai");
const request = require("supertest");
const createError = require("http-errors");
const { describe, it, after, before } = require("mocha");

const app = require("../app");
const db = require("../models");
const { encode } = require("../utils/jwt");
const { MESSAGE } = require("../constants");

const mockUser = {
  name: "mock-user-name",
  email: "mock-pharmacist@gmail.com",
  user_type: "pharmacist",
  user_id: "mock-user-id",
};

describe("POST /api/auth/login (pharmacist) test", function () {
  it("should return an error when there is no user information", function (done) {
    request(app)
      .post("/api/auth/login")
      .send({})
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.include(createError(502, MESSAGE.INVALID_USER_DATA));

        return done();
      });
  });
});

describe("POST /api/auth/login (pharmacist) test", function () {
  const removeMockUser = async () => {
    await db.User.destroy({ where: { name: mockUser.name } });
    await db.Pharmacist.destroy({ where: { fk_user_id: null } });
    await db.Queue.destroy({ where: { fk_pharmacist_id: null } });
  };

  after(removeMockUser);

  it("should register when a user login for the first time", function (done) {
    request(app)
      .post("/api/auth/login")
      .send(mockUser)
      .expect(201)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.data).to.deep.include({
          name: mockUser.name,
          email: mockUser.email,
          user_type: mockUser.user_type,
        });

        return done();
      });
  });

  it("should just login when it is not the first time", function (done) {
    request(app)
      .post("/api/auth/login")
      .send(mockUser)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.data).to.deep.include({
          name: mockUser.name,
          email: mockUser.email,
          user_type: mockUser.user_type,
        });

        return done();
      });
  });
});

describe("GET /api/auth/check", function () {
  const mockToken = encode(mockUser);

  const registerMockUser = async () => {
    const user = await db.User.create(mockUser);
    const pharmacist = await db.Pharmacist.create({ fk_user_id: user.dataValues.user_id });
    await db.Queue.create({ fk_pharmacist_id: pharmacist.dataValues.pharmacist_id });
  };

  const removeMockUser = async () => {
    await db.User.destroy({ where: { name: mockUser.name } });
    await db.Pharmacist.destroy({ where: { fk_user_id: null } });
    await db.Queue.destroy({ where: { fk_pharmacist_id: null } });
  };

  before(registerMockUser);
  after(removeMockUser);

  it("should return user information", function (done) {
    request(app)
      .get("/api/auth/check")
      .set({ cookie: `token=${mockToken}` })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.data).to.deep.include({
          name: mockUser.name,
          email: mockUser.email,
          user_type: mockUser.user_type,
        });

        return done();
      });
  });
});
