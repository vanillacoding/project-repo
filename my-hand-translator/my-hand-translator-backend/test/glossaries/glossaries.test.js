/* eslint-disable no-unused-expressions */
const mongoose = require("mongoose");
const { describe, before, after, it } = require("mocha");

const request = require("supertest");
const { expect } = require("chai");
const User = require("../../models/User");
const Glossary = require("../../models/Glossary");
const Keyword = require("../../models/Keyword");
const app = require("../../app");

describe("GET /glossaries?keyword=<WORD>&page=<Number>&limit=<Number> test", function callback() {
  this.timeout(10000);

  const db = mongoose.connection;

  const mockUser1 = {
    email: "mockUser1@gmail.com",
    name: "mockUser1",
    keywords: ["user1Keyword"],
    glossary: { user1word: "유저1의용어" },
  };

  const mockUser2 = {
    email: "mockUser2@gmail.com",
    name: "mockUser2",
    keywords: ["user2Keyword"],
    glossary: { user2word: "유저2의용어" },
  };

  before((done) => {
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      return setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  before((done) => {
    request(app)
      .post("/users/signup")
      .send(mockUser1)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
      });

    request(app)
      .post("/users/signup")
      .send(mockUser2)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        return done();
      });
  });

  after((done) => {
    try {
      (async () => {
        const userFilter = {
          $or: [{ email: mockUser1.email }, { email: mockUser2.email }],
        };

        const [{ _id: user1Id }, { _id: user2Id }] = await User.find(userFilter)
          .lean()
          .exec();

        await User.deleteMany(userFilter);

        await Keyword.deleteMany({
          $or: [
            { name: mockUser1.keywords[0] },
            { name: mockUser2.keywords[0] },
          ],
        });

        await Glossary.deleteMany({
          $or: [{ user: user1Id }, { user: user2Id }],
        });

        done();
      })();
    } catch (error) {
      done(error);
    }
  });

  it("should return all glossaries when keyword passed is empty", (done) => {
    request(app)
      .get("/glossaries?keyword=&limit=2&page=1")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.result).to.be.exist;
        expect(res.body.result).to.equal("ok");
        expect(res.body.data).to.be.exist;
        expect(res.body.data.length).to.equal(2);
        expect(res.body.data[0].userEmail).to.be.exist;
        expect(res.body.data[0].glossary.keywords).to.exist;
        expect(res.body.data[0].glossary.wordPairs).to.exist;
        expect(res.body.data[0].glossary.updatedAt).to.exist;

        return done();
      });
  });

  it("should return correct glossaries when certain keyword passed", (done) => {
    request(app)
      .get("/glossaries?keyword=user1&limit=2&page=1")
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.result).to.be.exist;
        expect(res.body.result).to.equal("ok");
        expect(res.body.data).to.be.exist;
        expect(res.body.data.length).to.equal(1);
        expect(res.body.data[0].userEmail).to.equal("mockUser1@gmail.com");
        expect(res.body.data[0].glossary.keywords).to.deep.equal([
          "user1Keyword",
        ]);
        expect(res.body.data[0].glossary.wordPairs).to.deep.equal({
          user1word: "유저1의용어",
        });

        return done();
      });
  });

  it("should return correct page of glossaries when certain page passed sorted by updatedAt", (done) => {
    (async () => {
      try {
        const user = await User.findOne({
          email: "mockUser2@gmail.com",
        });
        await Glossary.updateOne(
          { user: user._id },
          { $set: { wordPairs: { user2word: "업데이트된 유저2의 용어" } } },
        );

        request(app)
          .get("/glossaries?keyword=user&limit=1&page=1")
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            expect(res.body.result).to.be.exist;
            expect(res.body.result).to.equal("ok");
            expect(res.body.data).to.be.exist;
            expect(res.body.data.length).to.equal(1);
            expect(res.body.data[0].userEmail).to.equal("mockUser2@gmail.com");
            expect(res.body.data[0].glossary.keywords).to.deep.equal([
              "user2Keyword",
            ]);
            expect(res.body.data[0].glossary.wordPairs).to.deep.equal({
              user2word: "업데이트된 유저2의 용어",
            });

            return null;
          });

        request(app)
          .get("/glossaries?keyword=user&limit=1&page=2")
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            expect(res.body.result).to.be.exist;
            expect(res.body.result).to.equal("ok");
            expect(res.body.data).to.be.exist;
            expect(res.body.data.length).to.equal(1);
            expect(res.body.data[0].userEmail).to.equal("mockUser1@gmail.com");
            expect(res.body.data[0].glossary.keywords).to.deep.equal([
              "user1Keyword",
            ]);
            expect(res.body.data[0].glossary.wordPairs).to.deep.equal({
              user1word: "유저1의용어",
            });

            return done();
          });
      } catch (error) {
        done(error);
      }
    })();
  });
});
