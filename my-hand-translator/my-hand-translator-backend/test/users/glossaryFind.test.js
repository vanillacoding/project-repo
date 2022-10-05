const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const { describe, it, before, after } = require("mocha");

const createHttpError = require("../../utils/createHttpError");
const app = require("../../app");
const User = require("../../models/User");
const { TRANSLATIONS } = require("../../constants/error");
const Glossary = require("../../models/Glossary");
const { RESULT } = require("../../constants/responseMessages");

describe("find glossary test", function cb() {
  this.timeout(10000);

  const db = mongoose.connection;
  let userWithGlossary = null;
  let userWithoutGlossary = null;
  let glossary = null;

  const createMockData = (done) => {
    (async () => {
      userWithGlossary = await User.create({
        email: "test@vc.com",
        name: "test",
      });

      userWithoutGlossary = await User.create({
        email: "test@gmail.com",
        name: "test",
      });

      glossary = await Glossary.create({
        user: userWithGlossary,
        keywords: ["react"],
        wordPairs: {
          react: "리액트",
          component: "컴포넌트",
        },
      });

      done();
    })();
  };

  const deleteMock = (done) => {
    (async () => {
      await User.findByIdAndDelete(userWithGlossary.id);
      await User.findByIdAndDelete(userWithoutGlossary.id);
      await Glossary.findByIdAndDelete(glossary.id);

      done();
    })();
  };

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      return setTimeout(checkDatabaseConnection, 100);
    })();
  });

  describe("GET /users/:user_id/glossary test", () => {
    before(createMockData);
    after(deleteMock);

    it("Should return an error if invalid email", (done) => {
      request(app)
        .get("/users/test/glossary")
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(400, TRANSLATIONS.INVALID_USER_ID, 4005),
          );

          return done();
        });
    });

    it("Should return if user hasn't glossary", (done) => {
      request(app)
        .get("/users/test@gmail.com/glossary")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            console.log(err);
            return done(err);
          }

          expect(res.body).to.deep.include({ result: RESULT.OK, data: null });

          return done();
        });
    });

    it("Should return if user has glossary", (done) => {
      request(app)
        .get("/users/test@vc.com/glossary")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include({
            result: RESULT.OK,
            data: JSON.parse(JSON.stringify(glossary.wordPairs)),
          });

          return done();
        });
    });
  });
});
