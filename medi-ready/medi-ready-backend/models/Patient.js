const Patient = (sequelize, DataTypes) => {
  return sequelize.define(
    "patient",
    {
      patient_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = Patient;
