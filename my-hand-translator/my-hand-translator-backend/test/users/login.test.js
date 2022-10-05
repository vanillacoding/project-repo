const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const { describe, it, before, after } = require("mocha");

const createHttpError = require("../../utils/createHttpError");
const User = require("../../models/User");
const { LOGIN } = require("../../constants/error");
const { USER } = require("../../constants/responseMessages");

const app = require("../../app");

describe("POST /users/login test", function callback() {
  this.timeout(10000);

  const db = mongoose.connection;

  const mockUser = {
    email: "something1@gmail.com",
    name: "hongildong",
  };

  const createMockUser = async () => {
    await new User(mockUser).save();
  };

  const deleteMockUser = async () => {
    await User.findOneAndDelete({ email: mockUser.email });
  };

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      return setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  before(createMockUser);
  after(deleteMockUser);

  it("Should return an error if there is no email", (done) => {
    request(app)
      .post("/users/login")
      .send({})
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.include(
          createHttpError(502, LOGIN.EMAIL_EMPTY, 1000),
        );

        return done();
      });
  });

  it("Should return an error if invalid email format", (done) => {
    request(app)
      .post("/users/login")
      .send({ email: "invalid email" })
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.include(
          createHttpError(502, LOGIN.EMAIL_INVALID, 1001),
        );

        return done();
      });
  });

  it("Should return an 'User not found' message when there is no user information in the database", (done) => {
    request(app)
      .post("/users/login")
      .send({ email: "notFound@gmail.com" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const result = {
          glossaryId: null,
          result: "ok",
          isUser: false,
          message: USER.NOT_FOUND,
        };

        expect(res.body).to.deep.equal(result);

        return done();
      });
  });

  it("Should return an 'User found' message when there is user information in the database", (done) => {
    request(app)
      .post("/users/login")
      .send({ email: mockUser.email })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        const result = {
          result: "ok",
          isUser: true,
          message: USER.FOUND,
          glossaryId: null,
        };

        expect(res.body).to.deep.equal(result);

        return done();
      });
  });
});
