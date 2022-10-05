const { expect } = require("chai");
const request = require("supertest");
const { describe, it, after, before } = require("mocha");

const app = require("../app");
const db = require("../models");
const { encode } = require("../utils/jwt");

const mockUser = {
  name: "mock-user-name",
  email: "mock-patient@gmail.com",
  user_type: "patient",
  user_id: "mock-user-id",
};

describe("GET /api/medicine", function () {
  const mockToken = encode(mockUser);

  const registerMockUser = async () => {
    const user = await db.User.create(mockUser);
    const patient = await db.Patient.create({ fk_user_id: user.dataValues.user_id });
    await db.Alarm.create({ fk_patient_id: patient.dataValues.patient_id });
  };

  const removeMockUser = async () => {
    await db.User.destroy({ where: { name: mockUser.name } });
    await db.Patient.destroy({ where: { fk_user_id: null } });
    await db.Alarm.destroy({ where: { fk_patient_id: null } });
  };

  const alarmTime = {
    morning: "07:00",
    lunch: "12:00",
    dinner: "18:00",
    beforeBed: "22:00",
  };

  const pharmacyInfo = {
    name: "updated name",
    address: "updated address",
  };

  before(registerMockUser);
  after(removeMockUser);

  it("should update alarm time", function (done) {
    request(app)
      .put("/api/settings/alarm-time")
      .set({ cookie: `token=${mockToken}` })
      .send({ alarmTime })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.result).to.equal("success");
        expect(res.body.data).to.deep.include(alarmTime);

        return done();
      });
  });

  it("should update pharmacy information", function (done) {
    request(app)
      .put("/api/settings/information")
      .set({ cookie: `token=${mockToken}` })
      .send(pharmacyInfo)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.result).to.equal("success");

        return done();
      });
  });
});
