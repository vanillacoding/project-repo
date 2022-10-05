const { expect } = require("chai");
const { describe, before, after, it } = require("mocha");
const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const { SIGNUP } = require("../../constants/error");
const Translation = require("../../models/Translation");
const createHttpError = require("../../utils/createHttpError");

describe("add translations test", function callback() {
  this.timeout(10000);

  const db = mongoose.connection;

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      return setTimeout(checkDatabaseConnection, 100);
    })();
  });

  after((done) => {
    (async () => {
      try {
        await Translation.findOneAndDelete({ nanoId: "V1StGXR8_Z5jdHi6B-myT" });

        return done();
      } catch (error) {
        return done(error);
      }
    })();
  });

  const body = {
    email: "somting@gmail.com",
    translations: [
      {
        origin:
          "As your app grows, you can catch a lot of bugs with typechecking.",
        translated:
          "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
        url: "http://www.naver.com",
        glossary: {
          react: "리액트",
        },
        createdAt: "2021-09-10T02:08:27.098Z",
        nanoId: "V1StGXR8_Z5jdHi6B-myT",
      },
    ],
  };

  describe("POST /translations", () => {
    it("Should return an error if empty email", (done) => {
      const copyBody = { ...body };

      delete copyBody.email;

      request(app)
        .post("/translations")
        .send(copyBody)
        .expect(502)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(502, SIGNUP.NO_EMAIL, 1000),
          );

          return done();
        });
    });

    it("Should return an error if email format doesn't match.", (done) => {
      const copyBody = { ...body, email: "test" };

      request(app)
        .post("/translations")
        .send(copyBody)
        .expect(502)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(502, SIGNUP.INVALID_EMAIL, 1001),
          );

          return done();
        });
    });

    it("Should return ok if body data", (done) => {
      request(app)
        .post("/translations")
        .send(body)
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include({ result: "ok" });

          return done();
        });
    });
  });
});
