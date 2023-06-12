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
        // service: "gmail",
        // host: "gsmtp.gmail.com",
        // port: 587,
        // auth: {
        //   user: "cnabinrgmail.com",
        //   pass: "N@bbu@ktm",
      },
    },
  });
};
module.exports = fastifyPlugin(mailer);
