const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

const User = require("../models/User");

describe("App TEST", function () {
  this.timeout(7000);

  const mongoose = require("mongoose");
  const db = mongoose.connection;

  const mockUser = {
    email: "test@test.com",
    name: "test",
  };
  let mockUserId = null;
  let token = null;

  const createUser = async () => {
    const user = await User.create(mockUser);
    mockUserId = user._id;
  };

  const deleteUser = async () => {
    await User.findByIdAndDelete(mockUserId);
  };

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });
  before(createUser);
  after(deleteUser);

  beforeEach((done) => {
    request(app)
      .post("/auth/login")
      .send(mockUser)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);

        token = res.body.token;

        done();
      });
  });

  afterEach(() => {
    token = null;
  });

  describe("GET `/users`", () => {
    it("should get all users", (done) => {
      request(app)
        .get("/users")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const users = res.body;

          expect(users).to.exist;
          expect(Array.isArray(users)).to.be.true;

          done();
      });
    });
  });

  describe("POST `/auth/login`", () => {
    it("should add a new user into the database", (done) => {
      request(app)
        .post("/auth/login")
        .send(mockUser)
        .expect(201)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.eql("success");
          expect(res.body.message).to.eql("로그인에 성공했습니다.");

          const testUser = await User.findOne({ email: mockUser.email });

          expect(testUser).to.exist;
          expect(testUser._id).to.exist;
          expect(mongoose.Types.ObjectId.isValid(testUser._id)).to.be.true;

          done();
        });
    });
  });

  describe("PATCH `/battle`", () => {
    it("should patch score", (done) => {
      request(app)
        .patch("/battle")
        .set("cookie", `authToken=${token}`)
        .send({ email: mockUser.email })
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.eql("success");

          const testUser = await User.findOne({ email: mockUser.email });

          expect(testUser.winningPoint).to.eql(10);

          done();
      });
    });
  });
});
