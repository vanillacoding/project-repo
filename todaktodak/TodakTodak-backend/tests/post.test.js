const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

const Post = require("../models/Post");
const User = require("../models/User");

const {
  TEST_EMAIL,
  TEST_NICKNAME,
  TEST_PASSWORD,
  TEST_POST_TYPE,
  TEST_POST_TITLE,
  TEST_POST_CONTENT,
  TEST_POST_CATEGORY,
  TEST_POST_ANONYMOUS,
  TEST_UPDATE_POST_CATEGORY
} = require("../constants/testInfomations");

require("dotenv").config();

describe("POST CRUD test", () => {
  let accessToken;
  let postId;

  beforeAll((done) => {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true
    })
    .then(() => {
      request
        .post("/auth")
        .send({
          email: TEST_EMAIL,
          password: TEST_PASSWORD,
          nickname: TEST_NICKNAME
        })
        .end((err, res) => {
          if (err) return done(err);
          request
            .put("/auth")
            .send({
              email: TEST_EMAIL,
              password: TEST_PASSWORD,
              nickname: TEST_NICKNAME
            })
            .end((err, res) => {
              if (err) return done(err);

              accessToken = res.body.token;
              done();
            });
        });
    })
    .catch((err) => {
      done(err);
    });
  });

  describe("POST /post", () => {
    it("should create new Post", (done) => {
      request
        .post("/post")
        .set({ "Authorization": accessToken })
        .send({
          postType: TEST_POST_TYPE,
          category: TEST_POST_CATEGORY,
          postTitle: TEST_POST_TITLE,
          worryContents: TEST_POST_CONTENT,
          anonymousType: TEST_POST_ANONYMOUS
        })
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          const { errorMessage } = res.body;

          expect(errorMessage).toBe(null);
          done();
        });
    });
  });

  describe("GET /post/${postId}", () => {
    beforeEach(async () => {
      const testPost = await Post.findOne({ title: TEST_POST_TITLE }).lean();

      postId = testPost._id;
    });

    it("should get detail post", (done) => {
      request
        .get(`/post/${postId}`)
        .set({ "Authorization": accessToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const { errorMessage, post } = res.body;

          expect(errorMessage).toBe(null);
          expect(post.title).toBe(TEST_POST_TITLE);
          expect(post.category).toBe(TEST_POST_CATEGORY);
          expect(post.isPublic).toBe(true);
          expect(post.isAnonymous).toBe(false);
          done();
        });
    });
  });

  describe("PATCH /post", () => {
    it("should update post category", (done) => {
      request
        .patch("/post")
        .set({ "Authorization": accessToken })
        .send({
          postId,
          postType: TEST_POST_TYPE,
          category: TEST_UPDATE_POST_CATEGORY,
          postTitle: TEST_POST_TITLE,
          worryContents: TEST_POST_CONTENT,
          anonymousType: TEST_POST_ANONYMOUS
        })
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          const { errorMessage } = res.body;
          const updatedPost = await Post.findById(postId).lean();

          expect(errorMessage).toBe(null);
          expect(updatedPost.category).toBe(TEST_UPDATE_POST_CATEGORY);
          done();
        });
    });
  });

  describe("DELETE /post/${postId}", () => {
    it("should delete post", (done) => {
      request
        .delete(`/post/${postId}`)
        .set({ "Authorization": accessToken })
        .expect(200)
        .end(async (err, res) => {
          if (err) return done(err);

          const { errorMessage, posts } = res.body;

          expect(errorMessage).toBe(null);
          expect(posts).toStrictEqual([]);
          done();
        });
    });
  });

  afterAll(async () => {
    await User.findOneAndDelete({ email: TEST_EMAIL });
    await mongoose.disconnect();
  });
});
