const fastifyPlugin = require("fastify-plugin");
const fastifyMailer = require("fastify-mailer");
const nodemailer = require("nodemailer");
const mailer = async (fastify, opts) => {
  fastify.register(fastifyMailer, {
    transport: {
      host: "smtp.ethereal.email",
      // host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "martine.bahringer58@ethereal.email",
        pass: "HbMHUWSDemrcRM6hVb",
       
      },
    },
  });
};
module.exports = fastifyPlugin(mailer);
