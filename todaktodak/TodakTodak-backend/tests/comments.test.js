const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const {
  TEST_EMAIL,
  TEST_NICKNAME,
  TEST_PASSWORD,
  TEST_POST_TYPE,
  TEST_POST_TITLE,
  TEST_POST_CONTENT,
  TEST_POST_CATEGORY,
  TEST_POST_ANONYMOUS,
  TEST_COMMENT_CONTENT,
  TEST_UPDATE_COMMENT_CONTENT,
  TEST_SECOUND_COMMENT_CONTENT
} = require("../constants/testInfomations");

require("dotenv").config();

describe("COMMENT CRUD test", () => {
  let postId;
  let accessToken;
  let testCommentId;
  let deletedCommentId;

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

  describe("PATCH /post/comments", () => {
    beforeEach((done) => {
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
        .end(async (err, res) => {
          if (err) return done(err);

          const testPost = await Post.findOne({ title: TEST_POST_TITLE }).lean();

          postId = testPost._id;
          done();
        });
    });

    it("should add new comment to the test post", (done) => {
      request
        .patch("/post/comments")
        .set({ "Authorization": accessToken })
        .send({
          postId,
          content: TEST_COMMENT_CONTENT
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const { errorMessage, postComments } = res.body;

          expect(errorMessage).toBe(null);
          expect(postComments.length).toBe(1);
          expect(postComments[0].user).toBe(TEST_EMAIL);
          expect(postComments[0].nickname).toBe(TEST_NICKNAME);
          expect(postComments[0].content).toBe(TEST_COMMENT_CONTENT);
          done();
        });
    });
  });

  describe("GET /comment", () => {
    it("should get my comments", (done) => {
      request
        .get("/comment")
        .set({ "Authorization": accessToken })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const { errorMessage, comments } = res.body;

          expect(errorMessage).toBe(null);
          expect(comments.length).toBe(1);
          expect(comments[0].user).toBe(TEST_EMAIL);
          expect(comments[0].nickname).toBe(TEST_NICKNAME);
          expect(comments[0].content).toBe(TEST_COMMENT_CONTENT);

          request
            .patch("/post/comments")
            .set({ "Authorization": accessToken })
            .send({
              postId,
              content: TEST_SECOUND_COMMENT_CONTENT
            })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);

              const { errorMessage, postComments } = res.body;

              expect(errorMessage).toBe(null);
              expect(postComments.length).toBe(2);
              expect(postComments[1].content).toBe(TEST_SECOUND_COMMENT_CONTENT);
              done();
          });
        });
    });

    describe("PATCH /comment", () => {
      beforeEach(async () => {
        const testComment = await Comment
          .findOne({ content: TEST_COMMENT_CONTENT })
          .lean();

        testCommentId = testComment._id;
      });

      it("should update comment", (done) => {
        request
          .patch("/comment")
          .set({ "Authorization": accessToken })
          .send({
            commentId: testCommentId,
            comment: TEST_UPDATE_COMMENT_CONTENT
          })
          .expect(200)
          .end(async (err, res) => {
            if (err) return done(err);

            const updatedComment = await Comment
              .findById(testCommentId)
              .lean();

            const { errorMessage } = res.body;

            expect(errorMessage).toBe(null);
            expect(updatedComment.content).toBe(TEST_UPDATE_COMMENT_CONTENT);
            done();
          });
        });
    });

    describe("DELETE /comment/:commentId", () => {
      beforeEach(async () => {
        const targetComment = await Comment
          .findOne({ content: TEST_SECOUND_COMMENT_CONTENT })
          .lean();

        deletedCommentId = targetComment._id;
      });

      it("should delete comment", (done) => {
        request
          .delete(`/comment/${deletedCommentId}`)
          .set({ "Authorization": accessToken })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);

            const { errorMessage, comments } = res.body;

            expect(errorMessage).toBe(null);
            expect(comments.length).toBe(1);
            expect(comments[0].content).toBe(TEST_UPDATE_COMMENT_CONTENT);
            done();
          });
        });
    });
  });

  afterAll(async () => {
    await Comment.findByIdAndDelete(testCommentId);
    await Post.findOneAndDelete({ title: TEST_POST_TITLE });
    await User.findOneAndDelete({ email: TEST_EMAIL });
    await mongoose.disconnect();
  });
});
