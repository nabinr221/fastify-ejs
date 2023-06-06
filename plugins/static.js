"use strict";

const fp = require("fastify-plugin");
const fastifyStatic = require("@fastify/static");
const path = require("path");

module.exports = fp(async function (fastify, opts) {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
  });
});
