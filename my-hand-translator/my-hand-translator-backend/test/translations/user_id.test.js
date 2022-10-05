const mongoose = require("mongoose");
const request = require("supertest");
const { expect } = require("chai");
const { describe, it, before, after } = require("mocha");

const createHttpError = require("../../utils/createHttpError");
const app = require("../../app");
const Translation = require("../../models/Translation");
const { TRANSLATIONS, GLOSSARY } = require("../../constants/error");
const { RESULT } = require("../../constants/responseMessages");

describe("/translations/:user_id", function callback() {
  this.timeout(1000);

  const db = mongoose.connection;

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      return setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  describe("GET /translations/:user_id?page=STRING&limit=STRING test", () => {
    const mockTranslations = {
      nanoId: "1",
      origin: "test1",
      user: "test-translations@gmail.com",
      glossary: {
        react: "리액트",
      },
      translated: "성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
      url: "http://www.naver.com",
      createdAt: new Date().toISOString(),
    };

    let storedTranslations = null;

    const createMock = async () => {
      await new Translation(mockTranslations).save();
    };

    const deleteMock = async () => {
      await Translation.findOneAndDelete({ email: mockTranslations.email });
    };

    const findTranslationAsync = async () => {
      const translation = await Translation.findOne({
        email: mockTranslations.email,
      })
        .lean()
        .exec();
      storedTranslations = JSON.parse(JSON.stringify(translation));
    };

    before(async () => {
      await createMock();
      await findTranslationAsync();
    });
    after(deleteMock);

    it("Should return an error if there is no page query", (done) => {
      request(app)
        .get("/translations/somting@gmail.com")
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(400, TRANSLATIONS.NO_PAGE, 4007),
          );

          return done();
        });
    });

    it("Should return an error if there is no number shape page query", (done) => {
      request(app)
        .get("/translations/somting@gmail.com?page=someting")
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(400, TRANSLATIONS.NAN_PAGE, 4008),
          );

          return done();
        });
    });

    it("Should return an error if there is no number shape limit query", (done) => {
      request(app)
        .get("/translations/somting@gmail.com?page=1&limit=someting")
        .expect(400)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(400, TRANSLATIONS.NAN_LIMIT, 4009),
          );

          return done();
        });
    });

    it("Should return an translation list", (done) => {
      request(app)
        .get(`/translations/${mockTranslations.user}?page=1&limit=5`)
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include({
            result: RESULT.OK,
            data: [storedTranslations],
          });

          return done();
        });
    });
  });

  describe("POST /translations/:user_id test", () => {
    const mockUserId = "something@gmail.com";

    const deleteMock = async () => {
      await Translation.findOneAndDelete({
        translated:
          "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
      });
    };

    after(deleteMock);

    it("Should return an error if invalid user id format", (done) => {
      request(app)
        .post("/translations/asdf")
        .send({})
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

    it("Should return an error if there is no glossary", (done) => {
      request(app)
        .post(`/translations/${mockUserId}`)
        .send({
          origin:
            "As your app grows, you can catch a lot of bugs with typechecking.",
          translated:
            "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
          url: "http://www.naver.com",
        })
        .expect(502)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(502, GLOSSARY.NO_GLOSSARY, 3000),
          );

          return done();
        });
    });

    it("Should return an error if there is invalid glossary", (done) => {
      request(app)
        .post(`/translations/${mockUserId}`)
        .send({
          origin:
            "As your app grows, you can catch a lot of bugs with typechecking.",
          translated:
            "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
          url: "http://www.naver.com",
          glossary: {
            react: "",
          },
        })
        .expect(502)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(502, GLOSSARY.INVALID_GLOSSARY_TARGET_LENGTH, 3001),
          );

          return done();
        });
    });

    it("Should return an error if there is no text", (done) => {
      request(app)
        .post(`/translations/${mockUserId}`)
        .send({
          translated:
            "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
          url: "http://www.naver.com",
          glossary: {
            react: "리액트",
          },
        })
        .expect(502)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(502, TRANSLATIONS.NO_TEXT, 4001),
          );

          return done();
        });
    });

    it("Should return an error if there is no translated", (done) => {
      request(app)
        .post(`/translations/${mockUserId}`)
        .send({
          origin:
            "As your app grows, you can catch a lot of bugs with typechecking.",
          url: "http://www.naver.com",
          glossary: {
            react: "리액트",
          },
        })
        .expect(502)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(502, TRANSLATIONS.NO_TRANSLATED, 4002),
          );

          return done();
        });
    });

    it("Should return an error if there is no URL", (done) => {
      request(app)
        .post(`/translations/${mockUserId}`)
        .send({
          origin:
            "As your app grows, you can catch a lot of bugs with typechecking.",
          translated:
            "앱이 성장함에 따라 유형 검사로 많은 버그를 잡을 수 있습니다.",
          glossary: {
            react: "리액트",
          },
          nanoId: "1",
        })
        .expect(502)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.deep.include(
            createHttpError(502, TRANSLATIONS.NO_URL, 4003),
          );

          return done();
        });
    });
  });
});
