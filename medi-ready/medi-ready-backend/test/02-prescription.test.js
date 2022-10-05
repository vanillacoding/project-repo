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

describe("POST /api/prescriptions/new", function () {
  const pharmacistMockToken = encode(mockPharmacist);

  const prescriptionForm = {
    doseTimes: { morning: true, lunch: true, dinner: true, before_bed: true },
    medicines: [
      { id: "199603002", name: "어린이타이레놀현탁액" },
      { id: "197000040", name: "대웅우루사연질캡슐" },
    ],
    duration: "5",
    description: "잘 챙겨 드세요",
    patient_id: null,
  };

  const registerMock = async () => {
    const patientUser = await db.User.create(mockPatient);
    const patient = await db.Patient.create({ fk_user_id: patientUser.dataValues.user_id });
    await db.Alarm.create({ fk_patient_id: patient.dataValues.patient_id });

    const pharmacistUser = await db.User.create(mockPharmacist);
    const pharmacist = await db.Pharmacist.create({
      fk_user_id: pharmacistUser.dataValues.user_id,
    });
    await db.Queue.create({ fk_pharmacist_id: pharmacist.dataValues.pharmacist_id });

    prescriptionForm.patient_id = patient.dataValues.patient_id;
  };

  const removeMock = async () => {
    await db.User.destroy({ where: { name: mockPatient.name } });
    await db.Patient.destroy({ where: { fk_user_id: null } });
    await db.Alarm.destroy({ where: { fk_patient_id: null } });

    await db.User.destroy({ where: { name: mockPharmacist.name } });
    await db.Pharmacist.destroy({ where: { fk_user_id: null } });
    await db.Queue.destroy({ where: { fk_pharmacist_id: null } });
    await db.Prescription.destroy({ where: { fk_pharmacist_id: null } });
    await db.Medicine.destroy({ where: { fk_prescription_id: null } });
    await db.DoseHistory.destroy({ where: { fk_prescription_id: null } });
  };

  before(registerMock);
  after(removeMock);

  it("pharmacist should get paginated prescriptions list", function (done) {
    request(app)
      .post("/api/prescriptions/new")
      .set({ cookie: `token=${pharmacistMockToken}` })
      .send(prescriptionForm)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end(async (err, res) => {
        const prescription = await db.Prescription.findOne({
          where: { fk_patient_id: prescriptionForm.patient_id },
        });

        expect(prescription.dataValues.description).to.equal(prescriptionForm.description);
        expect(prescription.dataValues).to.deep.include(prescriptionForm.doseTimes);

        return done();
      });
  });
});
