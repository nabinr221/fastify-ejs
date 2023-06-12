const { DataTypes } = require("sequelize");

const sessionModel = (sequelize) => {
  return sequelize.define(
    "Session",
    {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      expires: DataTypes.DATE,
      data: DataTypes.TEXT,
    },
    {
      // Other model options go here
      tableName: "sessions",
      timestamps: true, // don't forget to enable timestamps!
      // createdAt: false, // I don't want createdAt
      // updatedAt: false, // "updateTimestamp", // I want updatedAt to actually be called updateTimestamp
    }
  );
};

module.exports = sessionModel;
