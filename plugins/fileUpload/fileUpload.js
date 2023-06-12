("use strict");

const fileUpload = require("fastify-file-upload");

const fp = require("fastify-plugin");
module.exports = fp(async function (fastify, opts) {
  fastify.register(fileUpload);
});
