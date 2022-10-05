const { USER_TYPE } = require("../constants");
const { User, Patient, Pharmacist, Queue, Alarm } = require("../models");

const fetchToNotificationServer = require("../utils/sendNotifications");

exports.findUser = async (userInfo) => {
  const { email, name, user_type } = userInfo;

  try {
    return await User.findOne({
      where: {
        email,
        name,
        user_type,
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (userInfo) => {
  const { email, name, user_type, picture } = userInfo;

  try {
    const user = await User.create({
      email,
      name,
      user_type,
      picture,
    });

    if (user_type === USER_TYPE.PATIENT) {
      const patient = await Patient.create({
        fk_user_id: user.dataValues.user_id,
      });

      await Alarm.create({
        fk_patient_id: patient.dataValues.patient_id,
      });
    }

    if (user_type === USER_TYPE.PHARMACIST) {
      const pharmacist = await Pharmacist.create({
        fk_user_id: user.dataValues.user_id,
      });

      await Queue.create({
        fk_pharmacist_id: pharmacist.dataValues.pharmacist_id,
      });
    }

    return user;
  } catch (error) {
    throw error;
  }
};

exports.findPatientId = async (userId) => {
  try {
    const user = await User.findOne({
      include: [
        {
          model: Patient,
          attributes: ["patient_id"],
        },
      ],
      raw: true,
      where: { user_id: userId },
    });

    return user["patient.patient_id"];
  } catch (error) {
    throw error;
  }
};

exports.findPharmacistId = async (userId) => {
  try {
    const user = await User.findOne({
      include: [
        {
          model: Pharmacist,
          attributes: ["pharmacist_id"],
        },
      ],
      raw: true,
      where: { user_id: userId },
    });

    return user["pharmacist.pharmacist_id"];
  } catch (error) {
    throw error;
  }
};

exports.dequeue = async (patientId) => {
  try {
    await Patient.update(
      {
        fk_queue_id: null,
      },
      { where: { patient_id: patientId } }
    );
  } catch (error) {
    throw error;
  }
};

exports.changePharmacistSetting = async (id, name, address) => {
  try {
    return await Pharmacist.update(
      {
        pharmacy_name: name,
        pharmacy_address: address,
      },
      {
        where: { pharmacist_id: id },
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.getAlarmTime = async (patientId) => {
  return await Alarm.findOne({ where: { fk_patient_id: patientId } });
};

exports.changeAlarmSettings = async (patientId, alarmTime) => {
  const { morning, lunch, dinner, beforeBed } = alarmTime;

  try {
    return await Alarm.update(
      {
        morning,
        lunch,
        dinner,
        before_bed: beforeBed,
      },
      {
        where: { fk_patient_id: patientId },
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.findPharmacistInfo = async (userId) => {
  try {
    const pharmacist = await User.findOne({
      where: { user_id: userId },
      include: [
        {
          model: Pharmacist,
          attributes: ["pharmacy_name", "pharmacy_address"],
        },
      ],
      raw: true,
    });

    const pharmacy_name = pharmacist["pharmacist.pharmacy_name"];
    const pharmacy_address = pharmacist["pharmacist.pharmacy_address"];

    return { pharmacy_name, pharmacy_address };
  } catch (error) {
    throw error;
  }
};

exports.updateNotificationToken = async (userId, notificationToken) => {
  try {
    await User.update(
      {
        notification_token: notificationToken,
      },
      {
        where: { user_id: userId },
      }
    );
  } catch (error) {
    throw error;
  }
};

exports.registerPushNotification = async (patientId, duration, doseTimes) => {
  try {
    const patient = await Patient.findOne({
      where: { patient_id: patientId },
      raw: true,
    });
    const patientUserId = patient.fk_user_id;

    const user = await User.findOne({
      where: { user_id: patientUserId },
      raw: true,
    });

    const notificationToken = user.notification_token;

    const alarmTime = await Alarm.findOne({
      where: { fk_patient_id: patientId },
      raw: true,
    });

    const information = {
      notificationToken,
      duration,
      alarmTime,
      doseTimes,
    };

    fetchToNotificationServer(information);
  } catch (error) {
    throw error;
  }
};
