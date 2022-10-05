const Prescription = (sequelize, DataTypes) => {
  return sequelize.define(
    "prescription",
    {
      prescription_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      is_alarm_on: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      expiration_date: {
        type: DataTypes.DATE,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: "please enter description",
      },
      morning: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lunch: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      dinner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      before_bed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = Prescription;
