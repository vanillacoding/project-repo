const request = require("supertest");
const { agent } = require("supertest");
const app = require("../../app");

const res = {
  gesture: jest.fn(),
  recentPc: jest.fn(),
};

const req = {
  headers: {
    idToken: jest.fn(),
  },
};

describe("User", () => {
  const userID = "saisiot@gmail.com";

  describe("GET /users/:users_id/gestures", () => {
    it("should not allow invalid token", (done) => {
      request(app)
        .get(`/users/${userID}/gestures`)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it("should respond gesture to a valid user", (done) => {
      agent(app)
        .get(`/users/${userID}/gestures`)
        .set("Authorization", "req.headers.idToken")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.gesture).toContain;
          done();
        });
    });
  });

  describe("/:users_id/pc", () => {
    it("GET / should not allow invalid token", (done) => {
      request(app)
        .get(`/users/${userID}/pc`)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it("GET / should respond pc to a valid user", (done) => {
      agent(app)
        .get(`/users/${userID}/pc`)
        .set("Authorization", "req.headers.idToken")
        .end((err, res) => {
          if (err) return done(err);
          expect(res.recentPc).toContain;
          done();
        });
    });
  });
});
