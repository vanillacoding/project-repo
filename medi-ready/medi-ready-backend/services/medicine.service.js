const sequelize = require("sequelize");
const Op = sequelize.Op;

const { Medicine, MedicineDetail } = require("../models");

exports.createMany = async (medicines, prescriptionId) => {
  try {
    return await Medicine.bulkCreate(
      medicines.map(({ id }) => {
        return {
          medicine_id: id,
          fk_prescription_id: prescriptionId,
        };
      })
    );
  } catch (error) {
    throw error;
  }
};

exports.increaseFrequency = async (medicines) => {
  try {
    for (let i = 0; i < medicines.length; i++) {
      const target = await MedicineDetail.findOne({
        where: { medicine_id: medicines[i].id },
      });

      await target.increment("frequency", { by: 1 });
    }
  } catch (error) {
    throw error;
  }
};

exports.getMedicineName = async (name) => {
  try {
    return await MedicineDetail.findOne({
      where: {
        itemName: {
          [Op.like]: "%" + name + "%",
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

exports.getMedicineNames = async (search) => {
  try {
    return await MedicineDetail.findAll({
      where: {
        itemName: {
          [Op.like]: "%" + search.trim() + "%",
        },
      },
      order: [["frequency", "DESC"]],
    });
  } catch (error) {
    throw error;
  }
};
