const { sequelize } = require("../models");

const connectSequelize = async () => {
  try {
    sequelize.sync({ force: false });
    console.log("database connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectSequelize;
