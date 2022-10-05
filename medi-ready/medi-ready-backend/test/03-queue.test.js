const { expect } = require("chai");
const request = require("supertest");
const { describe, it, after, before } = require("mocha");

const app = require("../app");
const db = require("../models");
const { encode } = require("../utils/jwt");

const mockPatient = {
  name: "mock-user-name",
  email: "mock-patient@gmail.com",
  user_type: "patient",
  user_id: "mock-patient-id",
};

const mockPharmacist = {
  name: "mock-user-name",
  email: "mock-pharmacist@gmail.com",
  user_type: "pharmacist",
  user_id: "mock-pharmacist-id",
};

describe("/api/queue", function () {
  const mockToken = encode(mockPatient);

  const registerMockUser = async () => {
    const patientUser = await db.User.create(mockPatient);
    const patient = await db.Patient.create({ fk_user_id: patientUser.dataValues.user_id });
    await db.Alarm.create({ fk_patient_id: patient.dataValues.patient_id });

    const pharmacistUser = await db.User.create(mockPharmacist);
    const pharmacist = await db.Pharmacist.create({
      fk_user_id: pharmacistUser.dataValues.user_id,
    });
    await db.Queue.create({ fk_pharmacist_id: pharmacist.dataValues.pharmacist_id });
  };

  const removeMockUser = async () => {
    await db.User.destroy({ where: { name: mockPatient.name } });
    await db.Patient.destroy({ where: { fk_user_id: null } });
    await db.Alarm.destroy({ where: { fk_patient_id: null } });

    await db.User.destroy({ where: { name: mockPharmacist.name } });
    await db.Pharmacist.destroy({ where: { fk_user_id: null } });
    await db.Queue.destroy({ where: { fk_pharmacist_id: null } });
  };

  before(registerMockUser);
  after(removeMockUser);

  it("POST /api/queue should register queue", function (done) {
    request(app)
      .post("/api/queue")
      .set({ cookie: `token=${mockToken}` })
      .send({ userId: mockPharmacist.user_id })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        const patient = await db.Patient.findOne({ where: { fk_user_id: mockPatient.user_id } });

        const pharmacist = await db.Pharmacist.findOne({
          where: { fk_user_id: mockPharmacist.user_id },
        });

        const queue = await db.Queue.findOne({
          where: { fk_pharmacist_id: pharmacist.dataValues.pharmacist_id },
        });

        expect(patient.dataValues.fk_queue_id).to.equal(queue.dataValues.queue_id);

        return done();
      });
  });
});
