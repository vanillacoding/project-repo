const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const { describe, it, before, after } = require("mocha");

const createHttpError = require("../../utils/createHttpError");
const app = require("../../app");
const Translation = require("../../models/Translation");
const { WORD } = require("../../constants/error");

describe("words route test", function callback() {
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

  describe("GET /words/translated?words=USER_INPUT test", () => {
    let storedTranslations = null;

    const createTranslation = (done) => {
      (async () => {
        const translationData = {
          nanoId: "1",
          createdAt: new Date().toISOString(),
          user: "aidencoders@gmail.com",
          origin:
            "As your app grows, you can catch a lot of bugs with typechecking.",
          translated:
            "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
          url: "https://www.naver.com",
          glossary: {
            react: "리액트",
          },
        };

        try {
          await Translation(translationData).save();

          const translation = await Translation.findOne({
            email: translationData.user,
          })
            .lean()
            .exec();

          storedTranslations = JSON.parse(JSON.stringify(translation));
          delete storedTranslations._id;

          return done();
        } catch (error) {
          return done(error);
        }
      })();
    };

    const deleteTranslation = (done) => {
      Translation.findOneAndDelete(
        { user: "aidencoders@gmail.com" },
        (error) => {
          if (error) done(error);
          return done();
        },
      );
    };

    before(createTranslation);
    after(deleteTranslation);

    it("Should return an error if no words", (done) => {
      request(app)
        .get("/words/translated?words=")
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(400, WORD.NO_WORD, 5001),
          );

          return done();
        });
    });

    it("Should return ok if words similarity less than 95%", (done) => {
      request(app)
        .get(
          "/words/translated?words=As your app grows, you can catch a lot of bugs with typ",
        )
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

    it("Should return ok if words similarity over than 95%", (done) => {
      request(app)
        .get(
          "/words/translated?words=As your app grows, you can catch a lot of bugs with typechecking.",
        )
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include({
            result: "ok",
            data: storedTranslations,
          });
          return done();
        });
    });
  });
});
