const Alarm = (sequelize, DataTypes) => {
  return sequelize.define(
    "alarm",
    {
      alarm_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      morning: {
        type: DataTypes.STRING(5),
        defaultValue: "09:00",
      },
      lunch: {
        type: DataTypes.STRING(5),
        defaultValue: "12:00",
      },
      dinner: {
        type: DataTypes.STRING(5),
        defaultValue: "18:00",
      },
      before_bed: {
        type: DataTypes.STRING(5),
        defaultValue: "22:00",
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = Alarm;
