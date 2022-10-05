const { expect } = require("chai");
const request = require("supertest");
const createError = require("http-errors");
const { describe, it, after, before } = require("mocha");

const app = require("../app");
const db = require("../models");
const { encode } = require("../utils/jwt");
const { MESSAGE } = require("../constants");

const mockUser = {
  name: "mock-user-name",
  email: "mock-pharmacist@gmail.com",
  user_type: "pharmacist",
  user_id: "mock-user-id",
};

describe("GET /api/medicine", function () {
  const mockToken = encode(mockUser);

  const registerMockUser = async () => {
    const user = await db.User.create(mockUser);
    const pharmacist = await db.Pharmacist.create({ fk_user_id: user.dataValues.user_id });
    await db.Queue.create({ fk_pharmacist_id: pharmacist.dataValues.pharmacist_id });
  };

  const removeMockUser = async () => {
    await db.User.destroy({ where: { name: mockUser.name } });
    await db.Pharmacist.destroy({ where: { fk_user_id: null } });
    await db.Queue.destroy({ where: { fk_pharmacist_id: null } });
  };

  before(registerMockUser);
  after(removeMockUser);

  it("should return medicine", function (done) {
    request(app)
      .get(encodeURI("/api/medicines/medicine?name=타이레놀"))
      .set({ cookie: `token=${mockToken}` })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.data).to.deep.include({
          medicine_id: "199303108",
        });

        return done();
      });
  });

  it("should return null when there is no search result", function (done) {
    request(app)
      .get(encodeURI("/api/medicines/medicine?name=invalid"))
      .set({ cookie: `token=${mockToken}` })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.data).to.equal(null);

        return done();
      });
  });

  it("should return 400 when there is no search keyword", function (done) {
    request(app)
      .get(encodeURI("/api/medicines/medicine?name="))
      .set({ cookie: `token=${mockToken}` })
      .expect(400)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).to.deep.include(createError(400, MESSAGE.INVALID_MEDICINE_NAME));

        return done();
      });
  });
});
