const fastifyPlugin = require("fastify-plugin");
const { Sequelize } = require("sequelize");
const userModel = require("../../models/usersModel/users");
const sessionModel = require("../../models/sessionModel/session");

const databaseConnection = async (fastify, options, done) => {
  try {
    const sequelize = new Sequelize("fastify-ejs", "postgres", "admin", {
      host: "localhost",
      dialect: "postgres",
    });

    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    const User = userModel(sequelize);
    const Session = sessionModel(sequelize);

    fastify.decorate("User", User);
    fastify.decorate("Session", Session);

    await User.sync({ force: false });
    await Session.sync({ force: false });
    fastify.decorate("sequelize", sequelize);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  done();
};

module.exports = fastifyPlugin(databaseConnection);
