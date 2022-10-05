const User = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      user_type: {
        type: DataTypes.ENUM("patient", "pharmacist"),
        defaultValue: "patient",
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        validate: {
          isEmail: true,
        },
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
      },
      notification_token: {
        type: DataTypes.STRING,
        defaultValue: null,
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

module.exports = User;
