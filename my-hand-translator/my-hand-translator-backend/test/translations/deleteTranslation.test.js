const { describe, it, before, beforeEach, afterEach } = require("mocha");
const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");

const createHttpError = require("../../utils/createHttpError");
const { RESULT } = require("../../constants/responseMessages");
const { TRANSLATIONS } = require("../../constants/error");
const Translation = require("../../models/Translation");
const app = require("../../app");

describe("delete translation test", function cb() {
  this.timeout(1000);

  const db = mongoose.connection;
  let translationId = null;

  const createTranslation = (done) => {
    const translationData = {
      nanoId: "1",
      createdAt: new Date().toISOString(),
      user: "test@gmail.com",
      origin:
        "As your app grows, you can catch a lot of bugs with typechecking.",
      translated:
        "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
      url: "https://www.naver.com",
      glossary: {
        react: "리액트",
      },
    };

    (async () => {
      try {
        const translation = await Translation(translationData).save();

        translationId = translation.id;

        return done();
      } catch (error) {
        return done(error);
      }
    })();
  };

  const deleteTranslation = (done) => {
    (async () => {
      try {
        await Translation.findByIdAndDelete(translationId);

        return done();
      } catch (error) {
        return done(error);
      }
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

  describe("DELETE /translations/:translation_id test", () => {
    beforeEach(createTranslation);
    afterEach(deleteTranslation);

    it("Should return an error if empty translation_id", (done) => {
      request(app)
        .delete("/translations/1")
        .expect(502)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(502, TRANSLATIONS.INVALID_TRANSLATED_ID, 4007),
          );

          return done();
        });
    });

    it("Should return an ok if translation_id delete", (done) => {
      request(app)
        .delete(`/translations/${translationId}`)
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include({ result: RESULT.OK });

          return done();
        });
    });
  });
});
