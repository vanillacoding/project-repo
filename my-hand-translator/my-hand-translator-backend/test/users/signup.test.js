/* eslint-disable no-unused-expressions */
const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const { describe, before, it, after } = require("mocha");

const User = require("../../models/User");
const Glossary = require("../../models/Glossary");
const Keyword = require("../../models/Keyword");
const { SIGNUP, GLOSSARY } = require("../../constants/error");

const app = require("../../app");

describe("POST /users/signup test", function callback() {
  this.timeout(10000);

  const db = mongoose.connection;

  const mockUser = {
    email: "gNMmCl07Z-L2ND98JC4yx@gmail.com",
    name: "tegNMmCl07Z-L2ND98JC4yxstTestTest",
    keywords: ["4cln7ijIKFR_QQqtwMA2f", "SGtPhaj8kWLHLd3mkLIu4"],
    glossary: { test: "테스트", mock: "목" },
  };

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      return setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  after((done) => {
    try {
      (async () => {
        const user = await User.findOne({ email: mockUser.email })
          .lean()
          .exec();

        if (user) {
          await Glossary.findOneAndDelete({ user: user._id });
        }

        await Keyword.deleteMany({
          $or: [
            { name: "4cln7ijIKFR_QQqtwMA2f" },
            { name: "SGtPhaj8kWLHLd3mkLIu4" },
          ],
        });
        await User.deleteOne({ name: mockUser.name });
        await User.deleteOne({ email: "testUser@gmail.com" });

        done();
      })();
    } catch (error) {
      done(error);
    }
  });

  it("should fail to signup when invalid email passed", (done) => {
    request(app)
      .post("/users/signup")
      .send({ ...mockUser, email: "invalidEmail" })
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.result).to.be.exist;
        expect(res.body.result).to.equal("error");
        expect(res.body.error).to.be.exist;
        expect(res.body.error.message).to.be.exist;
        expect(res.body.error.message).to.equal(SIGNUP.INVALID_EMAIL);

        return done();
      });
  });

  it("should fail to signup when invalid glossary passed", (done) => {
    request(app)
      .post("/users/signup")
      .send({ ...mockUser, glossary: { tooLongWord: "a".padEnd(1001, "b") } })
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.result).to.be.exist;
        expect(res.body.result).to.equal("error");
        expect(res.body.error).to.be.exist;
        expect(res.body.error.message).to.be.exist;
        expect(res.body.error.message).to.equal(
          GLOSSARY.INVALID_GLOSSARY_TARGET_LENGTH,
        );

        return done();
      });
  });

  it("should fail to signup when invalid keywords passed", (done) => {
    request(app)
      .post("/users/signup")
      .send({
        ...mockUser,
        keywords: ["tooLongKeyword".padEnd(1000, "a")],
      })
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.result).to.be.exist;
        expect(res.body.result).to.equal("error");
        expect(res.body.error).to.be.exist;
        expect(res.body.error.message).to.be.exist;
        expect(res.body.error.message).to.equal(SIGNUP.INVALID_KEYWORD_LENGTH);

        return done();
      });
  });

  it("should fail to signup when invalid username passed", (done) => {
    request(app)
      .post("/users/signup")
      .send({
        ...mockUser,
        name: "tooLongName".padEnd(1001, "a"),
      })
      .expect(502)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.result).to.be.exist;
        expect(res.body.result).to.equal("error");
        expect(res.body.error).to.be.exist;
        expect(res.body.error.message).to.be.exist;
        expect(res.body.error.message).to.equal(SIGNUP.INVALID_NAME_LENGTH);

        return done();
      });
  });

  it("should signup(create User, Keywords, Glossary) when valid input passed.", (done) => {
    request(app)
      .post("/users/signup")
      .send(mockUser)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.result).to.be.exist;
        expect(res.body.result).to.equal("ok");
        expect(res.body.glossaryId).to.be.exist;
        expect(mongoose.isValidObjectId(res.body.glossaryId)).to.be.true;

        (async () => {
          expect(
            await Glossary.findById(res.body.glossaryId).populate("user").lean()
              .email,
          ).to.equal(mockUser.email);
        })();

        return done();
      });
  });

  it("should fail to signup when user is already registered", (done) => {
    try {
      (async () => {
        await User.create({
          email: "testUser@gmail.com",
          name: "testUser",
        });

        expect(await User.exists({ email: "testUser@gmail.com" })).to.be.true;
      })();
    } catch (error) {
      return done(error);
    }

    request(app)
      .post("/users/signup")
      .send({
        ...mockUser,
        email: "testUser@gmail.com",
      })
      .expect(401)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.result).to.be.exist;
        expect(res.body.result).to.equal("error");
        expect(res.body.error).to.be.exist;
        expect(res.body.error.message).to.be.exist;
        expect(res.body.error.message).to.equal(SIGNUP.REGISTERED_USER);

        return done();
      });

    return null;
  });
});
