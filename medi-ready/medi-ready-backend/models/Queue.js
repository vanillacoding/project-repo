const Queue = (sequelize, DataTypes) => {
  return sequelize.define(
    "queue",
    {
      queue_id: {
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

module.exports = Queue;
