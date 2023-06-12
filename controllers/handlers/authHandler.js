const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const fs = require("fs/promises");
const { fileURLToPath } = require("url");
const path = require("path");
const ejs = require("ejs");

// const saltRounds = 10;

/**
 * hanlder for user add
 */

const singupHandler = async (request, reply) => {
  const users = request.server.User;
  const mailer = request.server.mailer;

  try {
    const hash = await bcrypt.hashSync(request.body.password, 10);
    request.body.password = hash;
    const user = await users.findOne({
      where: { username: request.body.username },
    });
    if (!user) {
      const userData = await users.create(request.body);
      if (userData) {
        const templatePath = path.join(
          __dirname,
          "../../templates/emails/emailTemplate.ejs"
        );
        const template = await fs.readFile(templatePath, "utf-8");
        const emailTemplate = ejs.render(template, {
          receiver: userData.name,
          email: userData.username,
          password: request.body.password,
          accountId: request.body.id,
        });

        await mailer.sendMail({
          from: "nabinr221@gmail.com", // sender address
          to: request.body.username, // list of receivers
          subject: "Account Creation Successful!", // Subject line
          html: emailTemplate,
        });
        reply.redirect("/users");
      } else {
        reply.code(400).send({ error: "something went worng !!! " });
      }
    } else {
      reply.code(409).send({ error: "user already axist !!!" });
    }
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: "Internal Server Error" });
  }
};
const loginHandler = async (request, reply) => {
  const users = request.server.User;
  try {
    const userData = await users.findOne({
      where: { username: request.body.username },
    });
    if (userData) {
      const { username, password } = userData;
      const isMatched = bcrypt.compareSync(request.body.password, password);
      if (username && isMatched) {
        request.session.userId = userData.id;
        reply.code(200).send({ msg: "Logged in successfully" });
      } else {
        reply.code(401).send({ msg: "Invalid Email and Password" });
      }
    } else {
      reply.code(404).send({ msg: "User doesn't exist" });
    }
  } catch (error) {
    reply.code(500).send("Internal Server Error");
  }
};

module.exports = { singupHandler, loginHandler };
