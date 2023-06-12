const { DataTypes } = require("sequelize");

const postModel = (sequelize) => {
  return sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: DataTypes.TEXT,
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      tableName: "posts",
      timestamps: true, // don't forget to enable timestamps!
    }
  );
};

    module.exports = postModel;
