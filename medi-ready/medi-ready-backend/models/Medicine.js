const Medicine = (sequelize, DataTypes) => {
  return sequelize.define(
    "medicine",
    {
      medicine_id: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = Medicine;
