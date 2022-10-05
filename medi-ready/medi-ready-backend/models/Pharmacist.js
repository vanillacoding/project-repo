const Pharmacist = (sequelize, DataTypes) => {
  return sequelize.define(
    "pharmacist",
    {
      pharmacist_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      pharmacy_name: {
        type: DataTypes.STRING(30),
        defaultValue: "Ph name",
      },
      pharmacy_address: {
        type: DataTypes.STRING,
        defaultValue: "Ph address",
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = Pharmacist;
