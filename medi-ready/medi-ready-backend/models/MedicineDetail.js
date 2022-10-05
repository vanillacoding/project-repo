const MedicineDetail = (sequelize, DataTypes) => {
  return sequelize.define(
    "medicine_detail",
    {
      medicine_id: {
        type: DataTypes.STRING(15),
        primaryKey: true,
        allowNull: false,
      },
      itemName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      frequency: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = MedicineDetail;
