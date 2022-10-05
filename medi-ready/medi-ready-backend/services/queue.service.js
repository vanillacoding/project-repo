const { Queue, Pharmacist, Patient, User } = require("../models");

exports.createQueue = async (pharmacistId) => {
  try {
    return await Queue.findOrCreate({
      where: { fk_pharmacist_id: pharmacistId },
      raw: true,
    });
  } catch (error) {
    throw error;
  }
};

exports.updateQueue = async (patientId, queueId) => {
  try {
    return await Patient.update(
      { fk_queue_id: queueId },
      {
        where: { patient_id: patientId },
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.findQueue = async (pharmacistId) => {
  try {
    return await Pharmacist.findOne({
      include: [
        {
          model: Queue,
        },
      ],
      where: { fk_user_id: pharmacistId },
      raw: true,
    });
  } catch (error) {
    throw error;
  }
};

exports.getQueueList = async (queueId) => {
  try {
    return await Patient.findAll({
      where: { fk_queue_id: queueId },
      include: [{ model: User }],
    });
  } catch (error) {
    throw error;
  }
};
