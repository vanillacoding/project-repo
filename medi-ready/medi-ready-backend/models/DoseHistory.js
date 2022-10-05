const DoseHistory = (sequelize, DataTypes) => {
  return sequelize.define(
    "dose_history",
    {
      dose_history_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
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
    },
    {
      timestamps: false,
    }
  );
};

module.exports = DoseHistory;
