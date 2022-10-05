const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const request = supertest(app);
const User = require("../models/User");

const {
  TEST_EMAIL,
  TEST_NICKNAME,
  TEST_PASSWORD
} = require("../constants/testInfomations");

require("dotenv").config();

describe("user signup & login test", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    });
  });

  describe("POST /auth", () => {
    it("should user signup", (done) => {
      request
        .post("/auth")
        .send({
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
          nickname: TEST_NICKNAME
        })
        .expect(201)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          const { errorMessage } = res.body;

          expect(errorMessage).toBe(null);
          done();
        });
    });
  });

  describe("PUT /auth", () => {
    it("should user login", (done) => {
      request
        .put("/auth")
        .send({
          email: TEST_EMAIL,
          password: TEST_PASSWORD
        })
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          const { errorMessage, loginInfo, token } = res.body;

          await User.findOneAndDelete({ email: TEST_EMAIL });

          expect(errorMessage).toBe(null);
          expect(loginInfo).toBeTruthy();
          expect(token).toBeTruthy();
          done();
        });
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
