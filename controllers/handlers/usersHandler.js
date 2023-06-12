const { Op } = require("sequelize");
const fs = require("fs/promises");
const { fileURLToPath } = require("url");
const path = require("path");
const ejs = require("ejs");

const getUsersHandler = async (request, reply) => {
  const User = request.server.User;
  try {
    const usersData = await User.findAll();
    await reply.view("pages/usersList.ejs", {
      usersData,
      pageTitle: "usersList",
    });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};
/**
 * handler for user details
 */
const getUserDetailsHandler = async (request, reply) => {
  const User = request.server.User;
  const { id } = request.params;
  try {
    const userData = await User.findByPk(id);
    if (!userData) {
      reply.code(404).send({ error: "Data Not Found" });
    } else {
      await reply.view("pages/editUser.ejs", {
        userData,
        pageTitle: "Edit User",
      });
    }
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};

const updateUserHandler = async (request, reply) => {
  const users = request.server.User;
  const mailer = request.server.mailer;
  const { id } = request.params;
  try {
    const usersData = await users.update(request.body, { where: { id } });
    if (!usersData) {
      reply.code(400).send({ error: "Something went worng !!!" });
    } else {
      const templatePath = path.join(
        __dirname,
        "../../templates/emails/userUpdateMail.ejs"
      );
      const template = await fs.readFile(templatePath, "utf-8");
      const emailTemplate = ejs.render(template, {
        receiver: request.body.name,
        username: request.body.username,
      });

      await mailer.sendMail({
        from: "nabinr221@gmail.com", // sender address
        to: request.body.username, // list of receivers
        subject: "Account Updated Successful!", // Subject line
        html: emailTemplate,
      });

      reply.redirect("/users");
    }
  } catch (error) {
    reply.code(500).send({ error: "Internal Server error" });
  }
};

const deleteUserHandler = async (request, reply) => {
  const User = request.server.User;
  const { id } = request.params;
  try {
    const userData = await User.destroy({ where: { id } });
    if (userData) {
      reply.code(200).send({ msg: "Data deleted succesfully" });
    } else {
      reply.code(400).send({ error: "something went worng!! " });
    }
  } catch (error) {
    reply.code(500).send({ error: "Internal Server error" });
  }
};

module.exports = {
  getUsersHandler,
  deleteUserHandler,
  updateUserHandler,
  getUserDetailsHandler,
};
